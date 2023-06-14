import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Reservation from 'App/Models/Reservation'
import User from 'App/Models/User'

export default class ReservationsController {
  public async getAll(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var authObject = await ctx.auth.authenticate()
    var user = await User.findOrFail(authObject.id)

    var userId = user.id
    var stadiumId = ctx.request.input('stadiumId')
    var status = ctx.request.input('status')

    var query = Reservation.query()

    if (status) {
      query.where('status', status)
    }
    if (stadiumId) {
      query.where('stadium_id', stadiumId)
    }
    if (userId) {
      query.where('user_id', userId)
    }

    var result = await query
      .preload('user')
      .preload('stadium', (query) =>
        query.preload('address', (query) => {
          query.preload('city', (query) => {
            query.preload('country')
          })
        })
      )
      .orderBy('id', 'desc')
    console.log(result)
    return result
  }

  public async getReservation(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()

    var userId = ctx.request.input('userId')
    var stadiumId = ctx.request.input('stadiumId')

    var query = Reservation.query()

    if (stadiumId) {
      query.where('stadium_id', stadiumId)
    }

    var result = await query.preload('user').preload('stadium').orderBy('id', 'desc').first()
    return result
  }

  public async getById(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var id = ctx.params.id
    var result = await Reservation.query()
      .where('id', id)
      .preload('user')
      .preload('stadium')
      .firstOrFail()
    console.log(result)

    return result
  }

  public async create(ctx: HttpContextContract) {
    var authObject = await ctx.auth.authenticate()
    var user = await User.findOrFail(authObject.id)

    const newSchema = schema.create({
      startTime: schema.string(),
      endTime: schema.string(),
      date: schema.string(),
      total: schema.number(),
      numPeople: schema.number(),
      numHour: schema.number(),
      status: schema.number(),
      userId: schema.number.nullableAndOptional(),
      stadiumId: schema.number(),
    })
    const fields = await ctx.request.validate({ schema: newSchema })

    var reservation = new Reservation()
    reservation.startTime = fields.startTime
    reservation.endTime = fields.endTime
    reservation.date = fields.date
    reservation.total = fields.total
    reservation.status = fields.status
    reservation.numPeople = fields.numPeople
    reservation.numHour = fields.numHour
    reservation.userId = user.id
    reservation.stadiumId = fields.stadiumId

    var reservations = await Reservation.query()
      .where('stadium_id', fields.stadiumId)
      .where(function (query) {
        query
          .where(function (query) {
            query.where('start_time', '<', fields.endTime).where('end_time', '>', fields.startTime)
          })
          .orWhere(function (query) {
            query
              .where('start_time', '>=', fields.startTime)
              .where('start_time', '<', fields.endTime)
          })
          .orWhere(function (query) {
            query.where('end_time', '>', fields.startTime).where('end_time', '<=', fields.endTime)
          })
          .orWhere(function (query) {
            query
              .where('start_time', '<=', fields.startTime)
              .where('end_time', '>=', fields.endTime)
          })
      })
      .where('status', 1)
      .where('date', fields.date)

    const totalNumPeople = reservations.reduce((total, r) => {
      return total + r.numPeople
    }, 0)
    console.log(totalNumPeople)

    if (totalNumPeople >= 24) {
      throw new Error('The stadium is already fully reserved.')
    }

    var result = await reservation.save()
    return result
  }
  public async update(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    const newSchema = schema.create({
      status: schema.number.nullableAndOptional(),
    })
    const fields = await ctx.request.validate({ schema: newSchema })

    var status = ctx.request.input('status')
    var id = ctx.request.input('id')
    console.log(id)
    console.log(status)

    var reservation = await Reservation.findOrFail(id)
    reservation.status = status
    var result = await reservation.save()
    return result
  }
}
