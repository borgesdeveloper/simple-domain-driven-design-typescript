import { container } from 'tsyringe'
import InitServer from './server'

async function Routes (){
    await InitServer().then((server)=>{
        
        server.route({
            method: 'GET',
            path: '/v1/users',
            options: { auth: 'authjwt' },
            handler: async (request: any, http: any) =>
              await ((await container.resolve('UserController')) as any).getAll(request, http),
          })
          server.route({
            method: 'DELETE',
            path: '/v1/users',
            options: { auth: 'authjwt' },
            handler: async (request: any, http: any) =>
              await ((await container.resolve('UserController')) as any).remove(request, http),
          })
          server.route({
            method: 'PUT',
            path: '/v1/users',
            options: { auth: 'authjwt' },
            handler: async (request: any, http: any) =>
              await ((await container.resolve('UserController')) as any).update(request, http),
          })
          server.route({
            method: 'POST',
            path: '/v1/users',
            options: { auth: 'authjwt' },
            handler: async (request: any, http: any) =>
              await ((await container.resolve('UserController')) as any).create(request, http),
          })
          server.route({
            method: 'GET',
            path: '/v1/users/id',
            options: { auth: 'authjwt' },
            handler: async (request: any, http: any) =>
              await ((await container.resolve('UserController')) as any).getById(request, http),
          })
          

          server.route({
            method: 'POST',
            path: '/v1/auth',
            options: { auth: false },
            handler: async (request: any, http: any) =>
              await ((await container.resolve('AuthController')) as any).authenticate(request, http),
          })
          
          server.route({
            method: 'POST',
            path: '/v1/auth/sign',
            options: { auth: false },
            handler: async (request: any, http: any) =>
              await ((await container.resolve('AuthController')) as any).register(request, http),
          })

    })   
}

export default Routes