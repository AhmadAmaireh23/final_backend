import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address';
import Location from './Location';

export default class Stadium extends BaseModel {

  public static table = 'football_stadiums'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "name" })
  public name: string;
  @column({ serializeAs: "image" })
  public image: string;
  @column({ serializeAs: "price" })
  public price: number;

  @column({ serializeAs: "rating" })
  public rating: number;
  @column({ serializeAs: "description" })
  public description: string;


  @column({ serializeAs: "address_id" })
  public addressId: number;
  @column({ serializeAs: "location_id" })
  public locationId: number;
  


  @belongsTo(() => Address, {
    foreignKey: 'addressId',
  })
  public address: BelongsTo<typeof Address>


  @belongsTo(() => Location, {
    foreignKey: 'locationId',
  })
  public location: BelongsTo<typeof Location>



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  

}

