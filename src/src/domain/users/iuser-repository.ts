import { IRepository } from '@core/base/irepository'
import { QueryRunner } from 'typeorm'
import { User } from './user-model'
export interface IUserRepository extends IRepository<User> {
  authenticate(user: User) : Promise<User>
  save(queryRunner: QueryRunner, user:User) : Promise<User>
}
