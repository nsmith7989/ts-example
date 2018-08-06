import * as express from 'express'
import * as next from 'next'

const signale = require('signale')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('*', (req, res) => handle(req, res))
  server.listen(process.env.PORT || 3000, err => {
    if (err) {
      throw new Error(err)
    }

    signale.success('Server is running on port 3000')
  })
})
