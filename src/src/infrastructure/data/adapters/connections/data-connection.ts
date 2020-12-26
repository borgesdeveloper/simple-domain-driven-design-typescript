import { injectable, inject } from 'tsyringe'
import { Connection, QueryRunner } from 'typeorm'
import { IDataConnection } from './idata-connection'

@injectable()
export default class DataConnection implements IDataConnection {
  protected connection: Connection
  protected queryRunner: QueryRunner

  constructor (
    @inject('QueryRunner') queryRunner: QueryRunner,
    @inject('Connection') connection: Connection) {
    this.connection = connection
    this.queryRunner = queryRunner
  }

  public inTransaction (): boolean {
    return this.queryRunner.isTransactionActive
  }

  public async rollbackTransaction () {
    await this.queryRunner.rollbackTransaction()
  }

  public getQueryRunner () : QueryRunner {
    return this.queryRunner
  }

  public getConnection (): Connection {
    return this.connection
  }

  public async startTransaction () {
    await this.queryRunner.startTransaction()
  }

  public async commitTransaction () {
    await this.queryRunner.commitTransaction()
  }
}
