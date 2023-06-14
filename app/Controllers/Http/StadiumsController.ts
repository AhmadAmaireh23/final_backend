import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stadium from 'App/Models/Stadium'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Review from 'App/Models/Review'

export default class StadiumsController {
  public async getAll(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var result = await Stadium.query()
      .preload('address', (query) => {
        query.preload('city', (query) => {
          query.preload('country')
        })
      })
      .preload('location')

    return result
  }
  public async getSearch(ctx: HttpContextContract) {
    try {
      var object = await ctx.auth.authenticate()
      const query = ctx.request.input('query')
      var result = await Stadium.query()
        .where('name', 'LIKE', query + '%')
        .preload('address', (query) => {
          query.preload('city', (query) => {
            query.preload('country')
          })
        })
        .preload('location')
        .firstOrFail()
      console.log(query)
      console.log(result)

      return result
    } catch (error) {
      console.log(error)
      return {
        message: 'No matching row found',
        stack: error.stack,
      }
    }
  }

  public async update(ctx: HttpContextContract) {
    var id = ctx.params.id

    var object = await ctx.auth.authenticate()
    const query = Review.query()
      .sum('rating as totalRating')
      .where('stadium_id', id)
      .groupBy('stadium_id')
    const tot = await query.first()
    const count = await query.first()
    if (tot && tot.$extras && tot.$extras['totalRating']) {
      const s = await Stadium.find(id)

      if (s) {
        s.rating = tot.$extras['totalRating']
        var r = await s.save()
        console.log(r.rating)
      }
    } else {
      console.log(null)
    }

    const query2 = Review.query()
      .count('rating as countRating')
      .where('stadium_id', id)
      .groupBy('stadium_id')

    const counts = await query2.first()

    if (counts && counts.$extras && counts.$extras['countRating']) {
      console.log(counts.$extras['countRating'])

      const newSchema = schema.create({})
    } else {
    }

    const newSchema = schema.create({})
    const fields = await ctx.request.validate({ schema: newSchema })

    var id = ctx.params.id

    var stadium = await Stadium.findOrFail(id)
    stadium.rating = r!.rating / counts!.$extras['countRating']
    var result = await stadium.save()
    return result
  }
}
