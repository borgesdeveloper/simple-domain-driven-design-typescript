import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUserTable1608954146179 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  default: 'uuid_generate_v4()',
                  isPrimary: true,
                },
                {
                  name: 'email',
                  type: 'varchar',
                },
                {
                  name: 'password',
                  type: 'varchar',
                },
                {
                  name: 'active',
                  type: 'boolean',
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                },
                {
                  name: 'deleted_at',
                  type: 'timestamp',
                },
              ],
            }),
            true,
          )
      
          await queryRunner.createIndex(
            'users',
            new TableIndex({
              name: 'IDX_USER_ID',
              columnNames: ['id'],
            }),
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }
}
