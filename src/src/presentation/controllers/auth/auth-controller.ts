import { User } from '@core/users/user-model'
import { Request, ResponseToolkit } from '@hapi/hapi'
import { Controller } from '@infrastructure/http/decorators/controller-decorator'
import { Post, Put } from '@infrastructure/http/decorators/route-decorators'
import { IAuthService } from 'src/application/auth/iauth-service'
import { IUserService } from 'src/application/users/iuser-service'
import { inject, injectable } from 'tsyringe'

@injectable()
@Controller('/v1/auth')
export class AuthController {
  public authService: IAuthService
  public userService: IUserService

  constructor (@inject('IAuthService') authService: IAuthService, @inject('IUserService') userService: IUserService) {
    this.authService = authService
    this.userService = userService
  }

  @Post({
    path: 'sign-up',
    authorization: false
  })
  public async signup (request : Request, http: ResponseToolkit) {
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

  @Put({
    path: 'sign-in',
    authorization: false
  })
  public async signin (request : Request, http: ResponseToolkit) {

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
