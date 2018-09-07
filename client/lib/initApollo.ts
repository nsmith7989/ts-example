import * as fetch from 'isomorphic-unfetch'

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

export let apolloClient: ApolloClient<any>

const isBrowser: boolean = !!(process as any).browser

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  ;(global as any).fetch = fetch
}

function create(initialState: any) {
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.GRAPHQL_URI // Server URL (must be absolute)
    }),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo(initialState?: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
