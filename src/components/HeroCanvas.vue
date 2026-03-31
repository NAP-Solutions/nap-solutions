<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const emit = defineEmits(['intro-done'])
const canvasRef = ref(null)

let renderer, scene, camera, uniforms, ro, ioObserver
let shaderMaterial, quadMesh
let animId = 0
let resizeRaf = 0
let simTime = 0
let lastTickMs = 0
let lastFrameMs = 0
let isVisible = true
let introDone = false
// -1 = not started  |  ≥0 = wall-clock second when IO fired  |  -2 = done
let ringStartTime = -1

// ─────────────────────────────────────────────────────────────────────────────
// Vertex shader — puts the PlaneGeometry(2,2) directly in clip space
// ─────────────────────────────────────────────────────────────────────────────
const vertexShader = /* glsl */`void main(){ gl_Position = vec4(position,1.0); }`

// ─────────────────────────────────────────────────────────────────────────────
// Fragment shader
//
// Two visual layers, composed inside the same draw call:
//
//  FLUID  — simplex-noise organic background (always running)
//  RING   — concentric-ring animation used as a circle mask
//
// uMaskR drives the expanding circle boundary:
//   r < uMaskR  →  fluid is visible  (inside the ring)
//   r > uMaskR  →  white             (outside the ring)
//
// uRingTime is derived from uMaskR (= 4 × uMaskR) so the leading ring line
// in the animation always sits exactly on the mask edge.
//
// uBlend (0→1) cross-fades out the ring composite and locks to pure fluid.
// ─────────────────────────────────────────────────────────────────────────────
const fragmentShader = /* glsl */`
  precision highp float;

  uniform vec2  uResolution;
  uniform float uTime;      // fluid clock  (always running)
  uniform float uRingTime;  // ring clock   (= 4 × uMaskR, driven from JS)
  uniform float uMaskR;     // expanding circle radius: 0 → ~2.5
  uniform float uBlend;     // 0 = ring composite  |  1 = pure fluid

  // ── Fluid palette + physics ──────────────────────────────────────────────
  uniform vec3  uColor1, uColor2, uColor3, uColor4;
  uniform vec3  uLightPos;
  uniform float uDepth, uSpeed, uNoiseScale, uWarpAmount;
  uniform float uFoldFrequency, uAngle, uConnections, uShadowWidth;
  uniform float uPixelSize;   // mosaic block size in canvas-pixels (0 = off)

  // ── Ashima 3-D simplex noise ─────────────────────────────────────────────
  vec3 mod289v3(vec3 x){ return x - floor(x*(1./289.))*289.; }
  vec4 mod289v4(vec4 x){ return x - floor(x*(1./289.))*289.; }
  vec4 permute(vec4 x){ return mod289v4(((x*34.)+1.)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159-0.85373472095314*r; }

  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy)), x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz), l=1.-g;
    vec3 i1=min(g.xyz,l.zxy), i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx, x2=x0-i2+C.yyy, x3=x0-D.yyy;
    i=mod289v3(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z), x_=floor(j*ns.z), y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy, y=y_*ns.x+ns.yyyy, h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy), b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1., s1=floor(b1)*2.+1., sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy, a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x), p1=vec3(a0.zw,h.y), p2=vec3(a1.xy,h.z), p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
    return 105.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  // ── Fluid surface height ─────────────────────────────────────────────────
  float getSurface(vec2 p){
    float c=cos(uAngle),s=sin(uAngle);
    vec2 rp=mat2(c,-s,s,c)*p;
    float n1=snoise(vec3(rp*uNoiseScale*.25,              uTime*uSpeed*.7));
    float n2=snoise(vec3(rp*uNoiseScale*.25+vec2(21.4,15.2),uTime*uSpeed*.9));
    vec2 flow=vec2(n1+sin(rp.x*uNoiseScale*.5+uTime*uSpeed)*.3,
                   n2+cos(rp.y*uNoiseScale*.5-uTime*uSpeed)*.3);
    vec2 wp=rp+flow*(uWarpAmount*.12);
    float freq=uFoldFrequency*.5;
    float ph=sin(wp.y*freq+flow.y*2.)*uConnections;
    return (sin(wp.x*freq+ph*uWarpAmount*.3)*.85
            +snoise(vec3(wp*.5,uTime*uSpeed*.5))*.15)*.5;
  }

  // ── Fluid colour ─────────────────────────────────────────────────────────
  vec3 computeFluid(vec2 p){
    vec2 e=vec2(.09,0.);
    float dx=(getSurface(p+e.xy)-getSurface(p-e.xy))/(2.*e.x);
    float dy=(getSurface(p+e.yx)-getSurface(p-e.yx))/(2.*e.x);
    vec3  N=normalize(vec3(-dx,-dy,max(uDepth,.02)));
    float diff=dot(N,normalize(uLightPos))*.5+.5;
    float t=clamp(diff+getSurface(p)*.04,0.,1.); t=t*t*(3.-2.*t);
    vec3 col=mix(uColor1,uColor2,smoothstep(0.,          uShadowWidth+.15,t));
    col     =mix(col,    uColor3,smoothstep(uShadowWidth+.05,.65,         t));
    col     =mix(col,    uColor4,smoothstep(.55,1.05,t));
    return col;
  }

  void main(){
    // ── Exact screen UV (grain only — never used for colour sampling) ─────
    vec2 st  = gl_FragCoord.xy / uResolution;

    // ── Pixel-block snap — ALL colour work uses block-centre coords ───────
    // This means both the fluid AND the ring/mask are drawn at block
    // resolution, so the whole intro + background looks pixelated.
    float ps  = max(uPixelSize, 1.0);
    vec2  pxC = (floor(gl_FragCoord.xy / ps) + 0.5) * ps;

    // fluid space (aspect-corrected, pixelated)
    vec2  p   = (pxC / uResolution) * 2.0 - 1.0;
    p.x      *= uResolution.x / uResolution.y;

    // ring space (pixelated) — ruv.x used for vertical-line modulation
    vec2  ruv = (pxC * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    float r   = length(ruv);

    // ── Fluid (pixelated) ─────────────────────────────────────────────────
    vec3 fc = computeFluid(p);

    // ── Pure-fluid shortcut (active once sequence is done) ───────────────
    // uBlend reaches 1.0 and stays there — skip ring work entirely.
    vec3 finalColor;

    if(uBlend >= 0.999){
      finalColor = fc;
    } else {

      // ── Ring animation ─────────────────────────────────────────────────
      // uRingTime = 4 × uMaskR, so the leading ring (i=0, j=0) sits at:
      //   fract(uRingTime × 0.05) × 5 = fract(0.2 × uMaskR) × 5 ≈ uMaskR
      // — exactly on the mask boundary.
      float t  = uRingTime * 0.05;
      float lw = 0.003;
      vec3 rings = vec3(0.0);
      for(int j=0;j<3;j++){
        for(int i=0;i<5;i++){
          float fi=float(i), fj=float(j);
          rings[j] += lw*fi*fi / abs(
            fract(t - 0.01*fj + fi*0.01)*5.0 - r + mod(abs(ruv.x), 0.18)
          );
        }
      }
      vec3 purple=vec3(.482,.188,1.);
      vec3 cyan  =vec3(0.,.831,.753);
      vec3 indigo=vec3(.22,.43,.96);
      vec3 ringGlow = clamp(rings.r,0.,1.)*purple
                    + clamp(rings.g,0.,1.)*cyan
                    + clamp(rings.b,0.,1.)*indigo;
      ringGlow = clamp(ringGlow, 0., 1.);

      // ── Circle mask ────────────────────────────────────────────────────
      // Soft boundary — fluid inside, white outside
      float outside = smoothstep(uMaskR-0.04, uMaskR+0.04, r);
      vec3 masked = mix(fc, vec3(1.0), outside);

      // Ring glow confined to a band around the mask edge so no ring
      // artifacts bleed into the fluid area or far into the white area
      float edgeDist = abs(r - uMaskR);
      float edgeGlow = 1.0 - smoothstep(0.0, 0.15, edgeDist);
      masked = mix(masked, ringGlow, edgeGlow * 0.98);

      // ── Cross-fade back to pure fluid ──────────────────────────────────
      finalColor = mix(masked, fc, uBlend);
    }

    // ── Dual-frequency film grain (applied to final composite) ───────────
    float g1 = fract(sin(dot(st,      vec2(127.1,311.7)))*43758.5453);
    float g2 = fract(sin(dot(st*.37,  vec2(269.5,183.3)))*17231.8473);
    finalColor += (mix(g1,g2,.4)-.5)*.025;

    gl_FragColor = vec4(clamp(finalColor,0.,1.), 1.0);
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// NAP fluid palette
// ─────────────────────────────────────────────────────────────────────────────
const FLUID = {
  color1:'#eaf2ff', color2:'#a8c5fd', color3:'#99e4ff', color4:'#ffffff',
  depth:0.04, lightX:0.97, lightY:-0.36, speed:0.09, angle:1.5708,
  foldFrequency:1.7, warpAmount:3.8, noiseScale:0.72, connections:0.87, shadowWidth:0.01,
}

// ─────────────────────────────────────────────────────────────────────────────
// Timing (seconds, relative to ringStartTime)
//
//  ┌─ INTRO (0.2 s) ─┬──────── EXPAND (1.5 s) ──────────┐
//  │ uBlend 1 → 0    │ uMaskR 0 → 3.2  uBlend = 0       │ → DONE (instant)
//  └─────────────────┴──────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────
const INTRO    = 0.2
const EXPAND   = 1.5
const T1       = INTRO
const T2       = INTRO + EXPAND
const MAX_R    = 3.2     // exceeds screen diagonal so ring blows past edges

function ease(x){ return x*x*(3-2*x) }   // Hermite smoothstep

onMounted(() => {
  const el = canvasRef.value
  const targetEl = el.parentElement || el
  const getDprCap = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const isLowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4
    return (isMobile || isLowMemory) ? 1.25 : 1.5
  }
  const getDpr = () => Math.min(window.devicePixelRatio || 1, getDprCap())
  const getCssSize = () => ({ w: el.clientWidth, h: el.clientHeight })
  const { w: W, h: H } = getCssSize()
  const FRAME_MS = 1000 / 45

  scene = new THREE.Scene()
  camera = new THREE.Camera()
  camera.position.z = 1

  uniforms = {
    uResolution: { value: new THREE.Vector2(W, H) },
    uTime: { value: 0 },
    uRingTime: { value: 0 },
    uMaskR: { value: 0 },
    uBlend: { value: 1 },
    uColor1: { value: new THREE.Color(FLUID.color1) },
    uColor2: { value: new THREE.Color(FLUID.color2) },
    uColor3: { value: new THREE.Color(FLUID.color3) },
    uColor4: { value: new THREE.Color(FLUID.color4) },
    uDepth: { value: FLUID.depth },
    uLightPos: { value: new THREE.Vector3(FLUID.lightX, FLUID.lightY, 1) },
    uSpeed: { value: FLUID.speed },
    uNoiseScale: { value: FLUID.noiseScale },
    uWarpAmount: { value: FLUID.warpAmount },
    uFoldFrequency: { value: FLUID.foldFrequency },
    uAngle: { value: FLUID.angle },
    uConnections: { value: FLUID.connections },
    uShadowWidth: { value: FLUID.shadowWidth },
    uPixelSize: { value: 9 * getDpr() },
  }

  shaderMaterial = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
  quadMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial)
  quadMesh.frustumCulled = false
  scene.add(quadMesh)

  renderer = new THREE.WebGLRenderer({
    canvas: el,
    antialias: false,
    powerPreference: 'high-performance',
  })

  let lastW = 0
  let lastH = 0
  let lastDpr = 0

  function resizeRenderer() {
    resizeRaf = 0
    const { w, h } = getCssSize()
    if (!w || !h) return

    const dpr = getDpr()
    if (w === lastW && h === lastH && dpr === lastDpr) return
    lastW = w
    lastH = h
    lastDpr = dpr

    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h, false)
    uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height)
    uniforms.uPixelSize.value = 9 * dpr
  }

  function scheduleResize() {
    if (resizeRaf) return
    resizeRaf = requestAnimationFrame(resizeRenderer)
  }

  function startLoop() {
    if (animId) return
    lastTickMs = 0
    lastFrameMs = 0
    animId = requestAnimationFrame(animate)
  }

  function stopLoop() {
    if (!animId) return
    cancelAnimationFrame(animId)
    animId = 0
    lastTickMs = 0
    lastFrameMs = 0
  }

  function animate(nowMs) {
    animId = requestAnimationFrame(animate)

    if (lastFrameMs && (nowMs - lastFrameMs) < FRAME_MS) return
    lastFrameMs = nowMs

    if (!lastTickMs) {
      lastTickMs = nowMs
    }
    const dt = Math.min((nowMs - lastTickMs) / 1000, 0.05)
    lastTickMs = nowMs

    simTime += dt
    uniforms.uTime.value = simTime

    if (ringStartTime >= 0) {
      const re = simTime - ringStartTime

      if (re < T1) {
        const p = ease(re / INTRO)
        uniforms.uBlend.value = 1.0 - p
        uniforms.uMaskR.value = p * 0.25
        uniforms.uRingTime.value = uniforms.uMaskR.value * 4.0
      } else if (re < T2) {
        const p = (re - T1) / EXPAND
        uniforms.uBlend.value = 0.0
        uniforms.uMaskR.value = 0.25 + p * (MAX_R - 0.25)
        uniforms.uRingTime.value = uniforms.uMaskR.value * 4.0
      } else {
        uniforms.uBlend.value = 1.0
        uniforms.uMaskR.value = MAX_R
        if (!introDone) {
          introDone = true
          emit('intro-done')
        }
        ringStartTime = -2
        if (!isVisible) stopLoop()
      }
    }

    renderer.render(scene, camera)
  }

  resizeRenderer()

  ro = new ResizeObserver(scheduleResize)
  ro.observe(targetEl)

  let fired = false
  ioObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      isVisible = entry.isIntersecting || entry.intersectionRatio > 0
      if (isVisible) {
        startLoop()
      }

      if (entry.intersectionRatio >= 0.15 && !fired) {
        fired = true
        ringStartTime = simTime
      }

      if (!isVisible && ringStartTime === -2) {
        stopLoop()
      }
    }
  }, { threshold: [0, 0.15] })

  ioObserver.observe(targetEl)

  isVisible = (() => {
    const rect = targetEl.getBoundingClientRect()
    return rect.bottom > 0 && rect.top < window.innerHeight
  })()

  if (isVisible) startLoop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  cancelAnimationFrame(resizeRaf)
  ro?.disconnect()
  ioObserver?.disconnect()
  if (quadMesh) {
    quadMesh.geometry.dispose()
    scene?.remove(quadMesh)
  }
  shaderMaterial?.dispose()
  renderer?.forceContextLoss()
  renderer?.dispose()
  quadMesh = null
  shaderMaterial = null
  scene = null
  camera = null
  uniforms = null
})
</script>

<template>
  <canvas ref="canvasRef" class="hero-canvas" />
</template>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: -40px;          /* overshoot so blur-edge softness stays off-screen */
  width: calc(100% + 80px);
  height: calc(100% + 80px);
  display: block;
  z-index: 0;
  /* filter: blur(2px); */
}
</style>

