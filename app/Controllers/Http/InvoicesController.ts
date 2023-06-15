import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invoice from 'App/Models/Invoice'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class InvoicesController {
  public async getInvoice(ctx: HttpContextContract) {
    var authObject = await ctx.auth.authenticate()
    const reservationId = parseInt(ctx.request.input('reservationId'), 10);

    try {
      var result = await Invoice.query().where('reservation_id', reservationId).firstOrFail()
      return result
    } catch (error) {
      return console.log('here', error)
    }
  }

  public async create(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var authObject = await ctx.auth.authenticate()
    var user = await User.findOrFail(authObject.id)

    const newSchema = schema.create({
      invoiceNumber: schema.string(),
      dueDate: schema.string(),
      issueDate: schema.string(),
      reservationId: schema.number(),
    })
    const fields = await ctx.request.validate({ schema: newSchema })
    var invoice = new Invoice()
    invoice.invoiceNumber = fields.invoiceNumber
    invoice.dueDate = fields.dueDate
    invoice.issueDate = fields.issueDate
    invoice.reservationId = fields.reservationId
    invoice.userId = user.id

    var result = await invoice.save()
    return result
  }
}
