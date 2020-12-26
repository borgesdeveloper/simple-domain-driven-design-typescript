import { User } from "@core/users/user-model";

export interface IAuthService {
  authenticate(user: User): any
  register(user: User): any
}
