import { Md5 } from 'md5-typescript'
import { Entity, Column, BeforeInsert, BeforeUpdate, AfterInsert } from 'typeorm'
import { IsNotEmpty, validate, IsBoolean, IsEmail } from 'class-validator'
import Base from '../base/base-model'

@Entity({ name: 'users' })
export class User extends Base {
  @IsEmail()
  @IsNotEmpty({
    message: 'is not null',
  })
  @Column()
  public email: string

  @IsNotEmpty({
    message: 'is not null',
  })
  @Column()
  public password: string

  @IsBoolean()
  @Column()
  public active: boolean

  @BeforeUpdate()
  beforeUpdate () {
    this.updated_at = new Date().toISOString()
  }

  @AfterInsert()
  afterInsert () {
  }

  @BeforeInsert()
  async beforeInsert () {
    let errors = []
    errors = await validate(this)
    if (errors.length > 0) {
      throw errors
    }
    this.created_at = new Date().toISOString()
  }

  async encryptPassword () {
    this.password = Md5.init(this.password)
  }
}
