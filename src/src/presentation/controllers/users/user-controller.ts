import { inject, injectable } from 'tsyringe'
import { Md5 } from 'md5-typescript'
import { IUserService } from 'src/application/users/iuser-service'
import { User } from '@core/users/user-model'
import { Controller } from '@infrastructure/http/decorators/controller-decorator'
import { Delete, Get, Post, Put } from '@infrastructure/http/decorators/route-decorators'
import { Request, ResponseToolkit } from '@hapi/hapi'

@injectable()
@Controller('/v1/users')
export class UserController {
  public userService?: IUserService

  constructor (
    @inject('IUserService') userService: IUserService) {
    this.userService = userService
  }

  @Get({
    path:'',
    authorization: true
  })
  public async getAll (request : Request, http: ResponseToolkit) {
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

  @Get({
    path:'{id}',
    authorization: true
  })
  public async getById (request : Request, http: ResponseToolkit) {
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

  @Post({
    path:'',
    authorization: true
  })
  public async create (request : Request, http: ResponseToolkit) {
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

  @Put({
    path:'',
    authorization: true
  })
  public async update (request : Request, http: ResponseToolkit) {
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

  @Delete({
    path:'',
    authorization: true
  })
  public async remove (request : Request, http: ResponseToolkit) {
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
