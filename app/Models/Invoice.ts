import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import Reservation from './Reservation';

export default class Invoice extends BaseModel {
  public static table = 'invoice'

 
  @column({ serializeAs: "invoice_number" })
  public invoiceNumber: string;
  @column({ serializeAs: "due_date" })
  public dueDate: string;
  @column({ serializeAs: "issue_date" })
  public issueDate: string;
  @column({ serializeAs: "user_id" })
  public userId: Number;
  @column({ serializeAs: "reservation_id",isPrimary:true })
  public reservationId: Number;

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Reservation, {
    foreignKey: 'reservationId',
  })
  public reservation: BelongsTo<typeof Reservation>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
}
