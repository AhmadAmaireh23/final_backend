import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Country extends BaseModel {

  public static table = 'countries'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "country_name" })
  public countryName: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
