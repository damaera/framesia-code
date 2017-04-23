CONFIG = require '../config'

User = require '../models/user'

module.exports = (passport, GoogleStrategy, app) ->

  passport.serializeUser (user, done) ->
    done null, user

  passport.deserializeUser (obj, done) ->
    done null, obj

  passport.use new GoogleStrategy {
    clientID: '350935981608-ok6if6vslgnsa6apkibufd65ojfkiifl.apps.googleusercontent.com'
    clientSecret: 'RLRxJE6ZLEIHuC5ckC0VybVB'
    callbackURL: 'http://localhost:8080/a/google/callback'
    scope: ['profile', 'email']
  }, (token, refreshToken, profile, done) ->
    data = profile._json
    console.log data
    process.nextTick () ->
      User
        .findOne {
          $or: [
            { google_id: data.id }
            { email: data.emails[0].value }
          ]
        }
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