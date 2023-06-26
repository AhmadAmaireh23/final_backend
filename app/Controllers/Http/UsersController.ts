import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import I18n from '@ioc:Adonis/Addons/I18n'

export default class UsersController {
  public async getUser(ctx: HttpContextContract) {
    var authObject = await ctx.auth.authenticate()
    var user = await User.findOrFail(authObject.id)
    return user
  }

  public async getAll(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var users = await User.query()
    return users
  }

  public async check(ctx: HttpContextContract) {
    const email = ctx.request.input('email')
    const user = await User.findBy('email', email)
    console.log(email)

    if (user == null) {
      return 1
    }
    return 0
  }
  public async login(ctx: HttpContextContract) {
    var object = ctx.request.all()
    var email = object.email
    var password = object.password
    var result = await ctx.auth.attempt(email, password)
    return result
  }
  public async logout(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    await ctx.auth.logout()
    return { message: 'Logout' }
  }
  public async create(ctx: HttpContextContract) {
    const newSchema = schema.create({
      firstName: schema.string.nullableAndOptional(),
      lastName: schema.string.nullableAndOptional(),
      gender: schema.string.nullableAndOptional(),
      image: schema.string.nullableAndOptional(),
      birthDate: schema.string.nullableAndOptional(),
      email: schema.string({}, [
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
        }),
      ]),
      password: schema.string(),
    })
    var languageFromHeader = ctx.request.header('language')
    var langauge: string = languageFromHeader != null ? languageFromHeader : 'ar'
    console.log('Language', langauge)
    const fields = await ctx.request.validate({
      schema: newSchema,
      messages: {
        'required': 'The {{ field }} is required to create a new account',
        'email.unique': 'Email not available',
        'email.required': I18n.locale(langauge).formatMessage('users.required', { field: 'email' }),
        'email.email': 'Email must be an email format',
        'password.required': I18n.locale(langauge).formatMessage('users.required', {
          field: 'password',
        }),
      },
    })
    var user = new User()
    user.firstName = fields.firstName!
    user.lastName = fields.lastName!
    user.gender = fields.gender!
    user.birthDate = fields.birthDate!
    user.email = fields.email
    user.image = fields.image!
    user.password = fields.password
    var newUser = await user.save()
    return newUser
  }

    public async update(ctx: HttpContextContract) {
    var image = ctx.request.input('image')
    console.log(image)

    var object = await ctx.auth.authenticate()
    const newSchema = schema.create({
      firstName: schema.string.nullableAndOptional(),
      image: schema.string.nullableAndOptional(),

      email: schema.string.nullableAndOptional(),
      lastName: schema.string.nullableAndOptional(),
      gender: schema.string.nullableAndOptional(),
      birthDate: schema.string.nullableAndOptional(),
    })
    const fields = await ctx.request.validate({ schema: newSchema })

    var id = ctx.params.id

    var profile = await User.findOrFail(id)
    profile.firstName = fields.firstName!
    profile.email = fields.email!
    profile.lastName = fields.lastName!
    profile.gender = fields.gender!
    profile.birthDate = fields.birthDate!
    var result = await profile.save()
    return result
  }



  public async updateImage(ctx: HttpContextContract) {
    var object = await ctx.auth.authenticate()
    var user = await User.findOrFail(object.id)

    var image = ctx.request.input('image')
    console.log(image)

    const newSchema = schema.create({
      firstName: schema.string.nullableAndOptional(),
      email: schema.string.nullableAndOptional(),
      lastName: schema.string.nullableAndOptional(),
      gender: schema.string.nullableAndOptional(),
      birthDate: schema.string.nullableAndOptional(),
    })
    const fields = await ctx.request.validate({ schema: newSchema })

    var id = user.id

    var profile = await User.findOrFail(id)
    profile.firstName = fields.firstName!
    profile.email = fields.email!
    profile.lastName = fields.lastName!
    profile.image = image!
    profile.gender = fields.gender!
    profile.birthDate = fields.birthDate!
    var result = await profile.save()
    return result
  }
}
