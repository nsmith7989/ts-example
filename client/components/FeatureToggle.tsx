import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import idx from 'idx'

export const QueryFeatureToggle = gql`
  query FeatureToggles($names: [String]!) {
    featureToggles(names: $names) {
      name
      enabled
    }
  }
`

export type FeatureToggleProps = {
  children: (isEnabled: boolean) => React.ReactNode
  name: string
}

export const makeFeatureToggleConsumer = (
  toggles: string[]
): React.StatelessComponent<FeatureToggleProps> => (
  props: FeatureToggleProps
) => (
  <Query
    query={QueryFeatureToggle}
    fetchPolicy="cache-only"
    variables={{ names: toggles }}
  >
    {({ data, loading, error }) => {
      if (loading) {
        return null
      }
      if (error) {
        throw error
      }
      const allToggles = idx(data, _ => _.featureToggles) || []
      const searchedToggle = allToggles.find(
        (toggle: { name: string; enabled: boolean }) =>
          toggle.name === props.name
      )
      return props.children(searchedToggle ? searchedToggle.enabled : false)
    }}
  </Query>
)
