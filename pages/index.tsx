import * as React from 'react'

import Products from '../components/Products'
import WithData from '../lib/withData'
import styled from 'styled-components'

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

export default WithData(() => (
  <Container>
    <Hello>Hello, World!</Hello>
    <Products />
  </Container>
))
