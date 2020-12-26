import { User } from '@core/users/user-model';
import { IService } from '@core/base/iservice'
export interface IUserService extends IService<User> {
  removeById(id:string) : void
}
