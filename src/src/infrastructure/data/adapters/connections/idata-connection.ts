import { Connection, QueryRunner } from 'typeorm'

export interface IDataConnection {
   getConnection() : Connection
   startTransaction() : void
   rollbackTransaction() : void
   commitTransaction() : void
   getQueryRunner() : QueryRunner
   inTransaction() : boolean
}
