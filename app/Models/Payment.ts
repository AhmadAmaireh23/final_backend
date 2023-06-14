import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Stadium from './Stadium'
import Reservation from './Reservation'

export default class Payment extends BaseModel {
  public static table = 'payments'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'amount' })
  public amount: number
  @column({ serializeAs: 'payment_date' })
  public paymentDate: string

  @column({ serializeAs: 'user_id' })
  public userId: number
  @column({ serializeAs: 'reservation_id' })
  public reservationId: number
  @column({ serializeAs: 'stadium_id' })
  public stadiumId: number
  @column({ serializeAs: 'payment_method' })
  public paymentMethod: string

  @column({ serializeAs: 'status' })
  public status: string

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Stadium, {
    foreignKey: 'stadiumId',
  })
  public stadium: BelongsTo<typeof Stadium>

  @belongsTo(() => Reservation, {
    foreignKey: 'reservationId',
  })
  public reservation: BelongsTo<typeof Reservation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
