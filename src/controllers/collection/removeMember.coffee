Collection = require '../../models/collection'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    userId = req.body.user

    # must admin
    Collection.findOne {
      _id: collectionId
      admin: req.user._id
    }
    .exec (err, col) ->
      if not col
      then res.status(403).json { error: 'Unauthorized or collection not found' }
      else
        isMember = false
        _.map col.member, (member) ->
          if member.equals userId
            isMember = true

        if !isMember
          res.status(500).json { error: 'Not member'}
        else
          col.member.pull userId

          col.save (err) ->
            res.redirect "/c/#{col.username}/people"
