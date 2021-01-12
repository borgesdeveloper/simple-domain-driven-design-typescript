import { IUserRepository } from '@core/users/iuser-repository'
import { User } from '@core/users/user-model'
import { IDataConnection } from '@infrastructure/data/adapters/connections/idata-connection'
import { inject, injectable } from 'tsyringe'
import { IUserService } from './iuser-service'

@injectable()
export class UserService implements IUserService {
  protected userRepository: IUserRepository
  protected dataConnection : IDataConnection

  constructor (
    @inject('IUserRepository') userRepository: IUserRepository,
    @inject('IDataConnection') dataConnection : IDataConnection,
  ) {
    this.dataConnection = dataConnection
    this.userRepository = userRepository
  }

  async removeById (id: string) {
    try {
      await this.dataConnection.startTransaction()
      const userFound = await this.getById(id)
      await this.userRepository.remove(userFound.id)
      await this.dataConnection.commitTransaction()
    } catch (error) {
      await this.dataConnection.rollbackTransaction()
      throw error
    }
  }

  async create (user: User): Promise<User> {
    try {
      await this.dataConnection.startTransaction()
      user = await this.userRepository?.create(user)
      await this.dataConnection.commitTransaction()
      return user
    } catch (error) {
      await this.dataConnection.rollbackTransaction()
      throw error
    }
  }

  async update (user: User): Promise<User> {
    try {
      await this.dataConnection.startTransaction()
      user = await this.userRepository?.update(user)
      await this.dataConnection.commitTransaction()
      return user
    } catch (error) {
      await this.dataConnection.rollbackTransaction()
      throw error
    }
  }

  async remove (user: User) : Promise<User>{
    try {
      await this.dataConnection.startTransaction()
      await this.userRepository.remove(user.id)
      await this.dataConnection.commitTransaction()
      return await user;
    } catch (error) {
      await this.dataConnection.rollbackTransaction()
      throw error
    }
  }

  async getById (uid: string): Promise<User> {
    const userFound = (await this.userRepository.getById(uid)) as User
    return userFound
  }

  async getAll (): Promise<User[]> {
    return await this.userRepository.getAll()
  }
}
