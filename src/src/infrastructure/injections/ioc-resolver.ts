import { User } from "@core/users/user-model"
import DataConnection from "@infrastructure/data/adapters/connections/data-connection"
import { UserRepository } from "@infrastructure/repositories/users/user-repository"
import { AuthService } from "src/application/auth/auth-service"
import { UserService } from "src/application/users/user-service"
import { container } from "tsyringe"
import { createConnection, getConnectionOptions } from "typeorm"


export default class IocResolver{
    
    public async resolve(){

        container.register('IDataConnection',{
            useClass: DataConnection
        })
        container.register('IAuthService', {
            useClass: AuthService,
        })

        container.register('IUserService', {
            useClass: UserService,
        })

        container.register('IUserRepository', {
            useClass: UserRepository,
        })


        const connectionOptions = await getConnectionOptions()

        const connection = await createConnection({
            ...connectionOptions,
            entities: [
                User,
            ],
        })

        await Promise.all([
            await connection.runMigrations(),
            await connection.synchronize()],
        )

        container.registerInstance('Connection', connection)
        container.registerInstance('QueryRunner', await connection.createQueryRunner())
        container.registerInstance('UserRepository', await connection.getRepository(User))
 
    }
}