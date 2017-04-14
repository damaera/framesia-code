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
    User
      .findOne {
        facebook_id: data.id
      }
      .exec (err, users) ->
        if users
        then done null, users
        else
          userData = {
            name: data.name
            picture: data.picture.data.url
            is_new: true
            facebook_id: data.id
          }
          newUser = new User userData
          newUser.save (err, data) ->
            if not err
              userData._id = data._id
              done null, userData
            else
              console.log err
