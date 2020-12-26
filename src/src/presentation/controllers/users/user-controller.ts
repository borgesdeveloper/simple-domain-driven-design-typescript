import { inject, injectable } from 'tsyringe'
import { Md5 } from 'md5-typescript'
import { IUserService } from 'src/application/users/iuser-service'
import { User } from '@core/users/user-model'

@injectable()
export default class UserController {
  public userService?: IUserService

  constructor (
    @inject('IUserService') userService: IUserService) {
    this.userService = userService
  }

  public async getAll (request: any, http: any) {
    try {
      const data = await this.userService?.getAll()
      return http.response({
        data: data,
      })
    } catch (error) {
      return http.response({
        ...error,
      }).code(400)
    }
  }

  public async getById (request: any, http: any) {
    const params = request.query

    try {
      const data = await this.userService?.getById(params.id)
      return http.response({
        data: data,
      })
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        return http.response({
          message: 'user not found!',
        }).code(400)
      }
      return http.response({
        ...error,
        message: error.message,
      }).code(400)
    }
  }

  public async create (request: any, http: any) {
    try {
      const user = request.payload as User
      user.password = Md5.init(user.password)
      const data = await this.userService?.create(user)
      return http.response({
        data: data,
      })
    } catch (error) {
      return http.response({
        ...error,
      }).code(400)
    }
  }

  public async update (request: any, http: any) {
    try {
      const user = request.payload as User
      const data = await this.userService?.update(user)
      return http.response({
        data: data,
      })
    } catch (error) {
      return http.response({
        ...error,
      }).code(400)
    }
  }

  public async remove (request: any, http: any) {
    try {
      const params = request.query
      const data = await this.userService?.removeById(params.id)
      return http.response({
        data: data,
      })
    } catch (error) {
      return http.response({
        ...error,
      }).code(400)
    }
  }
}
