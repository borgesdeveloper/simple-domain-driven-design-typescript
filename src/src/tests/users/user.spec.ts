import 'reflect-metadata'
import { Md5 } from 'md5-typescript'
import { Connection, createConnection, getConnectionOptions, Repository } from 'typeorm'
import { User } from '../../domain/users/user-model'

describe('User domain', () => {
  let connection: Connection
  let repository: Repository<User>

  beforeAll(async function () {
    const connectionOptions = await getConnectionOptions()

    connection = (await createConnection({
      ...connectionOptions,
      entities: [User],
    })) as Connection

    repository = await connection.getRepository(User)
  })

  afterAll(async function () {
    await connection.close()
  })

  it('should connect to repository', async () => {
    expect(connection.isConnected).toBeTruthy()
  })

  it('should create an new user', async () => {
    let user = new User()
    user.email = 'gabrielborges.web@gmail.com'
    user.password = Md5.init('12345')
    user.active = true
    user = await repository?.save(user)

    expect(user).toBeTruthy()
  })
})
