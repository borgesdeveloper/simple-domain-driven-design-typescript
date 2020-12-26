import { PrimaryColumn, Column, Generated } from 'typeorm'

export default abstract class Base {
  @PrimaryColumn({
    type: 'uuid',
  })
  @Generated('uuid')
  id!: string

  @Column({ nullable: true })
  created_at: string

  @Column({ nullable: true })
  updated_at: string

  @Column({ nullable: true })
  deleted_at: string
}
