import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Review from 'App/Models/Review'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class ReviewsController {
  public async getAll(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var userId = ctx.request.input('userId')
    var stadiumId = ctx.request.input('stadiumId')

    var query = Review.query().preload('user').preload('stadium')
    if (userId) {
      query.where('user_id', userId)
    }
    if (stadiumId) {
      query.where('stadium_id', stadiumId)
    }

    var result = await query
    return result
  }

  public async getByuser(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var user = await User.findOrFail(object.id)
    var stadiumId = ctx.request.input('stadiumId')

    var query = Review.query().preload('user').preload('stadium')
    if (user.id) {
      query.where('user_id', user.id)
    }
    if (stadiumId) {
      query.where('stadium_id', stadiumId)
    }

    var result = await query
    return result
  }

  public async create(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var authObject = await ctx.auth.authenticate()
    var user = await User.findOrFail(authObject.id)

    const newSchema = schema.create({
      userId: schema.number.nullableAndOptional(),
      stadiumId: schema.number(),
      comment: schema.string(),
      rating: schema.number(),
    })
    const fields = await ctx.request.validate({ schema: newSchema })
    var review = new Review()
    review.rating = fields.rating
    review.comment = fields.comment
    review.stadiumId = fields.stadiumId
    review.userId = user.id

    var result = await review.save()
    return result
  }
}
