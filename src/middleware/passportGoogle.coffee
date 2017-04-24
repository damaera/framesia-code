CONFIG = require '../config'

User = require '../models/user'

module.exports = (passport, GoogleStrategy, app) ->

  passport.serializeUser (user, done) ->
    done null, user

  passport.deserializeUser (obj, done) ->
    done null, obj

  passport.use new GoogleStrategy {
    clientID: CONFIG.google.clientID
    clientSecret: CONFIG.google.clientSecret
    callbackURL: CONFIG.google.callbackURL
    scope: CONFIG.google.scope
  }, (token, refreshToken, profile, done) ->
    data = profile._json
    process.nextTick () ->
      query = { google_id: data.id }
      if data.emails[0].value
        query = {
          $or: [
            { google_id: data.id }
            { email: data.emails[0].value }
          ]
        }
      User
        .findOne query
        .exec (err, users) ->
          if users
            if users.email
              if users.facebook_id
                users.google_id = data.id
                users.save (err, data) ->
                  if not err
                    done null, data
                  else
                    console.log err
              else done null, users
            else
              users.email = data.emails[0].value
              users.save (err, data) ->
                if not err
                  done null, data
                else
                  console.log err
          else
            userData = {
              name: data.displayName
              picture: data.image.url
              is_new: true
              google_id: data.id
              email: data.emails[0].value
            }
            newUser = new User userData
            newUser.save (err, data) ->
              if not err
                userData._id = data._id
                done null, userData
              else
                console.log err