import * as React from 'react'

import { Component } from 'react'

interface GoodbyeProps {
  name: string
  onClick: () => void
}

class Goodbye extends Component<GoodbyeProps> {
  handleClick = () => {
    const { onClick } = this.props
    onClick()
  }

  render() {
    const { name } = this.props
    return (
      <button onClick={this.handleClick}>
        <label>click me, {name}</label>
      </button>
    )
  }
}

export default Goodbye
