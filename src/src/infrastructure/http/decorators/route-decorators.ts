import { RouteDefinition } from "./route-definition"

export const Get = ({ path, authorization = false } : { path: string; authorization: boolean; }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

    routes.push({
      requestMethod: 'get',
      path,
      authorization,
      methodName: propertyKey,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}
export const Post = ({ path, authorization = false } : { path: string; authorization: boolean; }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

    routes.push({
      requestMethod: 'post',
      path,
      methodName: propertyKey,
      authorization,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}
export const Put = ({ path, authorization = false } : { path: string; authorization: boolean; }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

    routes.push({
      requestMethod: 'put',
      path,
      authorization,
      methodName: propertyKey,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}
export const Delete = ({ path, authorization = false } : { path: string; authorization: boolean; }): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>

    routes.push({
      requestMethod: 'delete',
      path,
      authorization,
      methodName: propertyKey,
    })
    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}
