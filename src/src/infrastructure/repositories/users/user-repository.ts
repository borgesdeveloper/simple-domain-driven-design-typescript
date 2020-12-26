import { IUserRepository } from '@core/users/iuser-repository'
import { User } from '@core/users/user-model'
import { IDataConnection } from '@infrastructure/data/adapters/connections/idata-connection'
import { inject, injectable } from 'tsyringe'
import { QueryRunner, Repository } from 'typeorm'

@injectable()
export class UserRepository implements IUserRepository {
  protected repository: Repository<User>
  protected dataConnection : IDataConnection

  constructor (
    @inject('IDataConnection') dataConnection: IDataConnection,
    @inject('UserRepository') repository: Repository<User>) {
    this.repository = repository
    this.dataConnection = dataConnection
  }

  async update (user: User) {
    await this.repository
      .createQueryBuilder()
      .update(User)
      .set({
        password: user.password,
        active: user.active,
      }).where('id = :id', { id: user.id })
      .useTransaction(this.dataConnection.getQueryRunner().isTransactionActive)
      .execute()
    return user
  }

  async remove (uid: string): Promise<any> {
    return await this.dataConnection.getConnection()?.createQueryBuilder()
      .delete().from(User).where('id = :id', { id: uid })
      .useTransaction(this.dataConnection.inTransaction())
      .execute()
  }

  async getById (uid: string): Promise<User> {
    return (await this.repository?.findOneOrFail({
      id: uid,
    })) as User
  }

  async create (user: User): Promise<User> {
    if (this.dataConnection.inTransaction()) {
      return await this.save(this.dataConnection.getQueryRunner(), user)
    }
    return (await this.repository?.save(user)) as User
  }

  async authenticate (user: User): Promise<User> {
    return (await this.repository?.findOne({
      email: user.email,
      password: user.password,
    })) as User
  }

  async getAll (): Promise<User[]> {
    return (await this.repository?.find()) || []
  }

  async save (queryRunner: QueryRunner, user:User): Promise<User> {
    const newuser = new User()
    newuser.email = user.email
    newuser.password = user.password
    newuser.active = user.active
    return await queryRunner.manager.save(newuser as User)
  }
}
