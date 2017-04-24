User = require '../../models/user'
# Collection = require '../../models/collection'
Follow = require '../../models/follow'

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
    .select ''
    .lean()
    .exec (err, user) ->
      if err
        next err
      else
        if user
          Follow.find {
            from: user._id
            follow_type: 'Collection'
          }
          .populate 'to', '_id name username description updated_at'
          .lean()
          .exec (err, follows) ->
            collections = _.map follows, 'to'
            res.json { collections: collections }
        else res.json { error: 'user not found' }