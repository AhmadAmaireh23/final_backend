import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Country from './Country';

export default class City extends BaseModel {
  public static table = 'cities'

  @column({ isPrimary: true })
  public id: number
  @column({ serializeAs: "city_name" })
  public cityName: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ serializeAs: "country_id" })
  public countryId: number;

  @belongsTo(() => Country, {
    foreignKey: 'countryId',
  })
  public country: BelongsTo<typeof Country>

}
