import { makeFeatureToggleConsumer } from 'components/FeatureToggle'

// maintain a list of feature toggles specific to this application

export const A = 'A'
export const B = 'B'
export const C = 'C'

export const FeatureToggleConsumer = makeFeatureToggleConsumer([A, B, C])
