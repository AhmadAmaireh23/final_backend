import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Location from 'App/Models/Location'

export default class LocationsController {
  public async getAll(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var result = await Location.query()
    return result
  }
}
