User = require '../../models/user'
Collection = require '../../models/collection'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { username } = req.params
  if username.length < 3
  then next()
  else

    uNameRegex = new RegExp "^#{username}$", 'i'
    User.findOne {
      username: uNameRegex
    }
    .lean()
    .exec (err, user) ->
      if err
        next err
      else
        if user
          Collection.find {
            $or: [
              { admin: user._id }
              { member: user._id }
            ]
          }
          .select 'name username description updated_at'
          .lean()
          .exec (err, cols) ->
            res.json { collections: cols }
        else res.json { error: 'user not found' }