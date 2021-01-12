import { container } from 'tsyringe'
import { RouteDefinition } from './decorators/route-definition'

const registerRoutes = async (server:any, controller:any) => {
  if (controller) {
    [controller].forEach((controller) => {
      container.register(controller.name, {
        useClass: controller,
      })
      const routes : Array<RouteDefinition> = Reflect.getMetadata('routes', controller)

      if (routes) {
        routes.forEach(async (route : any) => {
          if (route.path) {
            server.route({
              path: `${Reflect.getMetadata('prefix', controller)}/${route.path}`,
              method: route.requestMethod,
              options: { auth: (route.authorization ? 'authjwt' : false) },
              handler: async (request: any, http: any) => await ((await container.resolve(controller.name)) as any)[route.methodName](request, http),
            })
          }
        })
      }
    })
  }
}

export default registerRoutes