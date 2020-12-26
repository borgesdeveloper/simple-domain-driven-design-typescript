import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { IAuthService } from './iauth-service'
import { Md5 } from 'md5-typescript'
import { IUserRepository } from '@core/users/iuser-repository'
import { IUserService } from '../users/iuser-service'
import { User } from '@core/users/user-model'

dotenv.config()

@injectable()
export class AuthService implements IAuthService {
  protected userRepository: IUserRepository
  protected userService: IUserService

  constructor (
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('IUserService') userService: IUserService,
  ) {
    this.userRepository = userRepository
    this.userService = userService
  }

  async register (user: User) {
    user.password = Md5.init(user.password)
    return await this.userService.create(user)
  }

  public async authenticate (user: User): Promise<any> {
    user.password = Md5.init(user.password)

    const userFound = await this.userRepository?.authenticate(user)
    const secret = process.env.SECRET_KEY as string

    if (!userFound) {
      return Promise.reject(new Error('User not found!'))
    }

    const clains = {
      uid: user.email,
      aud: 'audience:security',
      iss: 'issuer:security',
    }

    const token = jwt.sign(clains, secret, {
      expiresIn: 14400,
    })

    return await {
      auth: true,
      user: user,
      token: token,
    }
  }
}
