import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import Stadium from './Stadium';

export default class Address extends BaseModel {
  public static table = 'reviews'
  @column({ isPrimary: true })
  public id: string
  @column({ serializeAs: "user_id" })
  public userId: number;
  @column({ serializeAs: "stadium_id" })
  public stadiumId: number;

  @column({ serializeAs: "comment" })
  public comment: string;
  @column({ serializeAs: "rating" })
  public rating: number;


  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Stadium, {
    foreignKey: 'stadiumId',
  })
  public stadium: BelongsTo<typeof Stadium>


  @column.dateTime({ autoCreate: true })
  @column({ serializeAs: "created_at" })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  totalRating: number;
}
