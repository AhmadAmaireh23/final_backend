import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import City from './City';

export default class Address extends BaseModel {
  public static table = 'address'
  @column({ isPrimary: true })
  public id: string
  @column({ serializeAs: "city_id" })
  public cityId: number;
  @column({ serializeAs: "address" })
  public address: string;

  @belongsTo(() => City, {
    foreignKey: 'cityId',
  })

  public city: BelongsTo<typeof City>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
