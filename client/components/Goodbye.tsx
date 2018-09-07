import * as React from 'react'
import { FeatureToggleConsumer, A } from 'lib/setupFeatureToggles'

interface Props {
  name: string
}

interface State {
  count: number
}

class Goodbye extends React.Component<Props, State> {
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState((prevState: State) => ({
      count: prevState.count + 1
    }))
  }

  render() {
    return (
      <FeatureToggleConsumer name={A}>
        {enabled => {
          if (!enabled) return null
          return (
            <button onClick={this.handleClick}>
              <label>
                hello {name}, the current count is: {this.state.count}
              </label>
            </button>
          )
        }}
      </FeatureToggleConsumer>
    )
  }
}

export default Goodbye
