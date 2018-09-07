import * as React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

interface Props {
  flags: string[]
  children: React.ReactNode
}

interface FeatureFlag {
  name: string
  enabled: boolean
}

type FeatureFlagData = {
  featureToggles: FeatureFlag[]
}

interface FeatureFlagVariables {
  flags: string[]
}

export const QueryFeatureToggle = gql`
  query FeatureToggles($names: [String]!) {
    featureToggles(names: $names) @client {
      name
      enabled
    }
  }
`

class FeatureFlagQuery extends Query<FeatureFlagData, FeatureFlagVariables> {}

export const WithFeatureFlags = ({ flags, children }: Props) => {
  // flags prop is for the flags specific to this component
  return (
    <FeatureFlagQuery query={QueryFeatureToggle} variables={{ flags }}>
      {({ data, loading }) => {
        if (data && !loading) {
          const { featureToggles } = data
          // assuming that we only care about one feature flag for this component
          if (featureToggles.length > 0 && !featureToggles[0].enabled) {
            return null
          }

          return children
        }

        return null
      }}
    </FeatureFlagQuery>
  )
}

// usage

// export default () => {
//   return (
//     <WithFeatureFlags flags={['SOME_FLAG']}>
//       <p>hello</p>
//     </WithFeatureFlags>
//   )
// }
