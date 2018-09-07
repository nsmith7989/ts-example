import * as cors from 'cors'
import * as signale from 'signale'

import { GraphQLServer } from 'graphql-yoga'

const MockFeatureToggles: Array<{
  name: string
  enabled: boolean
}> = [
  { name: 'A', enabled: false },
  { name: 'B', enabled: true },
  { name: 'C', enabled: false },
  { name: 'D', enabled: true },
  { name: 'E', enabled: false },
  { name: 'F', enabled: true },
  { name: 'G', enabled: true },
  { name: 'H', enabled: false },
  { name: 'I', enabled: true },
  { name: 'J', enabled: false },
  { name: 'K', enabled: true },
  { name: 'M', enabled: false },
  { name: 'N', enabled: true },
  { name: 'L', enabled: false },
  { name: 'O', enabled: true },
  { name: 'P', enabled: false },
  { name: 'Q', enabled: true },
  { name: 'R', enabled: false },
  { name: 'S', enabled: true },
  { name: 'T', enabled: false },
  { name: 'U', enabled: true },
  { name: 'V', enabled: false },
  { name: 'W', enabled: true },
  { name: 'Y', enabled: false },
  { name: 'Z', enabled: true }
]

const resolvers = {
  Query: {
    featureToggles: (_, args: { names: string[] }) => {
      const { names } = args
      const foundFeatures = names.map((name: string) => {
        return MockFeatureToggles.find(feature => feature.name === name)
      })
      return foundFeatures
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.express
  .use(cors())
  .options('*', cors())
  .disable('x-powered-by')

server.start(() => {
  signale.success(`>> App available at http://localhost:3000`)
  signale.success(`>> Apollo Server running GraphQL at :4000`)
})
