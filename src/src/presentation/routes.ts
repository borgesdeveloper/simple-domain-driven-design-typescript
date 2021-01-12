import { AuthController } from "@controllers/auth/auth-controller"
import { UserController } from "@controllers/users/user-controller"
import registerRoutes from "@infrastructure/http/route-register"
import initServer from "./server"


const routes = async () => {
  await initServer()
    .then(async (server) => {
      await registerRoutes(server, AuthController)
      await registerRoutes(server, UserController)
    }).catch(console.log)
}

export default routes
