import * as React from 'react'

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
    const { name } = this.props
    return (
      <button onClick={this.handleClick}>
        <label>
          hello {name}, the current count is: {this.state.count}
        </label>
      </button>
    )
  }
}

export default Goodbye
