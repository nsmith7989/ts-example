import * as React from 'react'

import Goodbye from '../components/Goodbye'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: calc(100% - 2em);
`

export default () => (
  <Container>
    <Goodbye name="random" />
  </Container>
)
