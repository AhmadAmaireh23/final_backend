import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OpeningTime from 'App/Models/OpeningTime'

export default class OpeningTimesController {
  public async getAll(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var stadiumId = ctx.request.input('stadiumId')
    var query = OpeningTime.query().preload('stadium')
    if (stadiumId) {
      query.where('stadium_id', stadiumId)
    }
    var result = await query
    console.log(result)
    return result
  }
}
