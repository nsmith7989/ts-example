import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import idx from 'idx'

const { Provider, Consumer } = React.createContext([])

export const QueryFeatureToggle = gql`
  query FeatureToggles($names: [String]!) {
    featureToggles(names: $names) {
      name
      enabled
    }
  }
`

type Props = {
  children: React.ReactNode
  toggles: string[]
}

type State = {
  toggles: string[]
}

export class FeatureToggleQuery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      toggles: props.toggles
    }
  }

  render() {
    const { toggles } = this.props
    const { children } = this.props
    return (
      <Query query={QueryFeatureToggle} variables={{ names: toggles }}>
        {() => <Provider value={toggles}>{children}</Provider>}
      </Query>
    )
  }
}

type FeatureToggleProps = {
  children: (isEnabled: boolean) => React.ReactNode
  name: string
}

export const FeatureToggle = (props: FeatureToggleProps) => (
  <Consumer>
    {toggles => (
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
    )}
  </Consumer>
)
