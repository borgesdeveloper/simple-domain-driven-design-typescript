import Hapi from '@hapi/hapi'
import * as dotenv from 'dotenv'

dotenv.config()
async function initServer () {
  const server = new Hapi.Server()
  server.settings.port = process.env.PORT || 3333
  server.settings.routes = {
    cors: {
      origin: ['*'],
    },
  }
  server.settings.debug = {
    request: ['error'],
  }

  await server.register(require('@hapi/jwt'))
  server.auth.strategy('authjwt', 'jwt', {
    keys: process.env.SECRET_KEY as string,

    verify: {
      aud: 'audience:security',
      iss: 'issuer:security',
      sub: false,
      nbf: false,
      exp: true,
    },

    validate: (token: any, request: any, h: any) => {
      console.log(request);
      const result = {} as any
      const TOKEN = token.token

      if (!TOKEN) {
        result.isValid = false
        return result
      }

      result.isValid = true
      result.payload = token.decoded.payload
      return result
    },
  })

  server.auth.default('authjwt')
  server.start()
  return server
}
export default initServer
