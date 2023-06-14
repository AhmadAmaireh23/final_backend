import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Address from './Address';


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column({ serializeAs: "email" })
  public email: string;

  @column({ serializeAs: "password" })
  public password: string;

  @column({ serializeAs: "first_name" })
  public firstName: string;

  @column({ serializeAs: "last_name" })
  public lastName: string;
  @column({ serializeAs: "image" })
  public image: string;


  @column({ serializeAs: "gender" })
  public gender: string;

  @column({ serializeAs: "birth_date" })
  public birthDate: string;

  @column({ serializeAs: "address_id" })
  public addressId: number;

  


  @belongsTo(() => Address, {
    foreignKey: 'addressId',
  })
  public address: BelongsTo<typeof Address>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}