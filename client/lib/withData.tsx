import * as PropTypes from 'prop-types'
import * as React from 'react'

import { ApolloProvider, getDataFromTree } from 'react-apollo'

import { ApolloClient } from 'apollo-client'
import Head from 'next/head'
import { NextJSPage } from './Page'
import initApollo from './initApollo'
import { NextContext } from 'next'

const isBrowser: boolean = !!(process as any).browser

export function getComponentDisplayName(Component: NextJSPage) {
  return Component.displayName || Component.name || 'Unknown'
}

export default (ComposedComponent: any) => {
  return class WithData extends NextJSPage {
    public static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent
    )})`

    public static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    public static async getInitialProps(ctx: NextContext) {
      let serverState = { apollo: {} }
      let composedInitialProps = {}

      const apollo = initApollo()

      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps({
          ...ctx,
          apollo,
          isBrowser
        })
      }

      if (!isBrowser) {
        const url = { query: ctx.query, pathname: ctx.pathname }

        try {
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent {...{ url, ...composedInitialProps }} />
            </ApolloProvider>
          )
        } catch (error) {}

        Head.rewind()

        serverState = {
          apollo: {
            data: apollo.cache.extract()
          }
        }
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    private apollo: ApolloClient<any>

    constructor(props: any, ctx) {
      super(props, ctx)
      this.apollo = initApollo(this.props.serverState.apollo.data)
    }

    public render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
