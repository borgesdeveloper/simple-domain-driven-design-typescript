import { User } from '@core/users/user-model'
import { IAuthService } from 'src/application/auth/iauth-service'
import { IUserService } from 'src/application/users/iuser-service'
import { inject, injectable } from 'tsyringe'

@injectable()
export class AuthController {
  public authService?: IAuthService
  public userService?: IUserService

  constructor (
      @inject('IAuthService') authService: IAuthService,
      @inject('IUserService') userService: IUserService) {
    this.authService = authService
    this.userService = userService
  }

  public async register (request: any, http: any) {
    try {
      const user = request.payload as User
      const userCreated = await this.authService?.register(user)

      return await http.response({
        success: true,
        data: userCreated,
      })
    } catch (error) {
      if (Array.isArray(error)) {
        return await http
          .response({
            erros: [...error],
          })
          .code(400)
      }
      return await http
        .response({
          ...error,
        }).code(400)
    }
  }

  public async authenticate (request: any, http: any) {
    const user = request.payload as User
    try {
      const token = await this.authService?.authenticate(user)
      return await http.response({
        success: true,
        token: token,
      })
    } catch (error) {
      return await http
        .response({
          error: error.message,
          message: 'user not found!',
        })
        .code(400)
    }
  }
}
