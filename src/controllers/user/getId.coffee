User = require '../../models/user'

module.exports = (req, res, next) ->

  { userId } = req.params

  if /^[a-fA-F0-9]{24}$/.test userId

    User.findOne {
      _id: userId
    }
    .select 'username'
    .lean()
    .exec (err, user) ->
      if err
        next err
      else
        if user
        then res.redirect "/u/#{user.username}"
        else next()
  else
    next()
