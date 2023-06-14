import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class PaymentsController {
  public async gets(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var result = await Payment.query().preload('user').orderBy('id', 'desc').first()
    return result
  }
  public async getAll(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var result = await Payment.query().preload('user').orderBy('id', 'desc')
    return result
  }

  public async getById(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var id = ctx.params.id
    var result = await Payment.query().where('id', id).preload('user').firstOrFail()
    return result
  }
  public async create(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var authObject = await ctx.auth.authenticate()
    var user = await User.findOrFail(authObject.id)

    const newSchema = schema.create({
      amount: schema.number(),
      userId: schema.number.nullableAndOptional(),
      stadiumId: schema.number.nullableAndOptional(),
      reservationId: schema.number.nullableAndOptional(),
      paymentMethod: schema.string(),
      status: schema.string(),
      paymentDate: schema.string(),
    })
    const fields = await ctx.request.validate({ schema: newSchema })

    var payment = new Payment()
    payment.paymentDate = fields.paymentDate
    payment.userId = user.id
    payment.reservationId = fields.reservationId!
    payment.stadiumId = fields.stadiumId!
    payment.amount = fields.amount
    payment.status = fields.status
    payment.paymentMethod = fields.paymentMethod

    var result = await payment.save()
    return result
  }
}
