import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Stadium from './Stadium';

export default class OpenTime extends BaseModel {
  public static table = 'opening_times'

  @column({ isPrimary: true })
  public id: number
  @column({ serializeAs: "day_of_week" })
  public dayOfWeek: String;

  @column({ serializeAs: "open_time" })
  public openTime: String;
  @column({ serializeAs: "close_time" })
  public closeTime: String;
  @column({ serializeAs: "stadium_id" })
  public stadiumId: number;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => Stadium, {
    foreignKey: 'stadiumId',
  })
  public stadium: BelongsTo<typeof Stadium>

}

