const allFeatures = [
  '24/7 AI receptionist',
  'Calendar integration',
  'Setup & onboarding',
  'Custom integrations',
  'CRM integration',
  'Appointment management',
  'OTP verification',
  'Call summaries',
]

const includedFeatures = allFeatures.map((label) => ({ label, included: true }))

export const pricingPlans = [
  {
    tier: 'GROWTH',
    description: 'For small practices looking to automate',
    minutes: '100 min / mo',
    price: '$59',
    badge: null,
    subBadge: null,
    featured: false,
    features: includedFeatures,
  },
  {
    tier: 'SCALE',
    description: 'For growing businesses needing more capacity',
    minutes: '500 min / mo',
    price: '$299',
    badge: 'START HERE',
    subBadge: null,
    featured: false,
    features: includedFeatures,
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
    features: includedFeatures,
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
    features: includedFeatures,
  },
]
