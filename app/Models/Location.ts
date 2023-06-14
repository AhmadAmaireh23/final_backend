import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Location extends BaseModel {
  public static table = 'locations'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "lng" })
  public lng: number;
  @column({ serializeAs: "lat" })
  public lat: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
}
