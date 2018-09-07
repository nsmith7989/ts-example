import * as React from 'react'

import WithData from '../lib/withData'
import styled from 'styled-components'
import Goodbye from '../components/Goodbye'
import { Query } from 'react-apollo'
import { QueryFeatureToggle } from '../components/FeatureToggle'

const Hello = styled.div`
  margin: 1rem;
  font-size: 2rem;
  font-weight: 900;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: calc(100% - 2em);
`

export default WithData(() => {
  return (
    <Container>
      <Hello>Hello, World!</Hello>
      <Goodbye name={'visitor'} />
    </Container>
  )
})
