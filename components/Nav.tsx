import Link from 'next/link'
import styled from 'styled-components'

const NavButton = styled.a`
  margin: 1rem;

  &:hover {
    color: red;
    cursor: pointer;
  }
`

export default () => (
  <>
    <Link prefetch href="/">
      <NavButton>Home</NavButton>
    </Link>
    <Link prefetch href="/about">
      <NavButton>About</NavButton>
    </Link>
  </>
)
