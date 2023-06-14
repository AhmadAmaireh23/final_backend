  import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import Stadium from './Stadium';

export default class Reservation extends BaseModel {
  public static table = 'reservations'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "start_time" })
  public startTime: String;
  @column({ serializeAs: "end_time" })
  public endTime: String;
  @column({ serializeAs: "date" })
  public date: string;

  @column({ serializeAs: "total" })
  public total: number;
  @column({ serializeAs: "status" })
  public status: number;

  @column({ serializeAs: "num_hour" })
  public numHour: number;


  @column({ serializeAs: "num_people" })
  public numPeople: number;

  @column({ serializeAs: "user_id" })
  public userId: number;

  @column({ serializeAs: "stadium_id" })
  public stadiumId: number;



  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>


  @belongsTo(() => Stadium, {
    foreignKey: 'stadiumId',
  })
  public stadium: BelongsTo<typeof Stadium>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
