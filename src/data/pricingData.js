const receptionistFeatures = [
  '24/7 AI receptionist',
  'Calendar integration',
  'Setup and onboarding',
  'Custom integrations',
  'CRM integration',
  'Appointment management',
  'OTP verification',
  'Call summaries',
]

const outboundFeatures = [
  '24/7 AI outbound calling',
  'Lead list and CRM sync',
  'Multi-attempt follow-up',
  'Custom qualification scripts',
  'Calendar booking automation',
  'Live handoff to your team',
  'Call summaries and transcripts',
  'Campaign analytics dashboard',
]

const receptionistIncludedFeatures = receptionistFeatures.map((label) => ({ label, included: true }))
const outboundIncludedFeatures = outboundFeatures.map((label) => ({ label, included: true }))

export const receptionistPricingPlans = [
  {
    tier: 'GROWTH',
    description: 'For small practices looking to automate',
    minutes: '100 min / mo',
    price: '$59',
    badge: null,
    subBadge: null,
    featured: false,
    features: receptionistIncludedFeatures,
  },
  {
    tier: 'SCALE',
    description: 'For growing businesses needing more capacity',
    minutes: '500 min / mo',
    price: '$299',
    badge: 'START HERE',
    subBadge: null,
    featured: false,
    features: receptionistIncludedFeatures,
  },
  {
    tier: 'ENTERPRISE',
    description: 'For large practices with high call volumes',
    minutes: '2,000 min / mo',
    price: '$999',
    originalPrice: '$1,199',
    discountText: 'FIRST MONTH',
    badge: 'MOST POPULAR',
    subBadge: null,
    featured: true,
    promoNote: 'First month only. Renews at $1,199/mo + tax.',
    features: receptionistIncludedFeatures,
  },
  {
    tier: 'CUSTOM',
    description: 'For tailored workflows and call volumes',
    minutes: 'Custom min / mo',
    price: 'Custom',
    badge: null,
    subBadge: null,
    featured: false,
    ctaLabel: 'Contact Sales Team',
    features: receptionistIncludedFeatures,
  },
]

export const outboundPricingPlans = [
  {
    tier: 'GROWTH',
    description: 'For teams launching outbound automation',
    minutes: '100 min / mo',
    price: '$59',
    badge: null,
    subBadge: null,
    featured: false,
    features: outboundIncludedFeatures,
  },
  {
    tier: 'SCALE',
    description: 'For growing teams running daily campaigns',
    minutes: '500 min / mo',
    price: '$299',
    badge: 'START HERE',
    subBadge: null,
    featured: false,
    features: outboundIncludedFeatures,
  },
  {
    tier: 'ENTERPRISE',
    description: 'For high-volume outbound operations',
    minutes: '2,000 min / mo',
    price: '$999',
    originalPrice: '$1,199',
    discountText: 'FIRST MONTH',
    badge: 'MOST POPULAR',
    subBadge: null,
    featured: true,
    promoNote: 'First month only. Renews at $1,199/mo + tax.',
    features: outboundIncludedFeatures,
  },
  {
    tier: 'CUSTOM',
    description: 'For custom workflows and large data sets',
    minutes: 'Custom min / mo',
    price: 'Custom',
    badge: null,
    subBadge: null,
    featured: false,
    ctaLabel: 'Contact Sales Team',
    features: outboundIncludedFeatures,
  },
]

export const pricingPlans = receptionistPricingPlans
