Post = require '../../models/post'
Love = require '../../models/love'
User = require '../../models/user'

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
          res.render 'user-collections', { user: user }
        else next()