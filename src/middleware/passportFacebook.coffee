CONFIG = require '../config'

User = require '../models/user'

module.exports = (passport, FacebookStrategy) ->

  passport.serializeUser (user, done) ->
    done null, user

  passport.deserializeUser (obj, done) ->
    done null, obj

  passport.use new FacebookStrategy {
    clientID: CONFIG.facebook.clientID
    clientSecret: CONFIG.facebook.clientSecret
    callbackURL: CONFIG.facebook.callbackURL
    profileFields: CONFIG.facebook.profileFields
  }, (accessToken, refreshToken, profile, done) ->
    data = profile._json
    # form =
    #   id: data.id
    #   name: data.name
    #   firstName: data.first_name
    #   lastName: data.last_name
    #   # email: data.emails
    #   # picture: data.picture.data.url
    # done null, form
    # console.log data
    process.nextTick () ->

      query = { facebook_id: data.id }
      if data.email
        query = {
          $or: [
            { facebook_id: data.id }
            { email: data.email }
          ]
        }

      User
        .findOne query
        .exec (err, users) ->
          if users
            console.log users
            if users.email
              if users.google_id
                users.facebook_id = data.id
                users.save (err, data) ->
                  if not err
                    done null, data
                  else
                    console.log err
              else done null, users
            else
              users.email = data.email
              users.save (err, data) ->
                if not err
                  done null, data
                else
                  console.log err
          else
            userData = {
              name: data.name
              picture: data.picture.data.url
              is_new: true
              facebook_id: data.id
              email: data.email
            }
            newUser = new User userData
            newUser.save (err, data) ->
              if not err
                done null, data
              else
                console.log err
