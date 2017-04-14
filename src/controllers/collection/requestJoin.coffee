Collection = require '../../models/collection'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    userId = req.user._id

    #
    Collection.findOne {
      _id: collectionId
      is_anyone_can_join: true
    }
    .exec (err, col) ->
      if not col
      then res.status(403).json { error: 'Unauthorized or collection not found' }
      else
        isAdmin = false
        isMember = false
        _.map col.admin, (admin) ->
          if admin.equals userId
            isAdmin = true
        _.map col.member, (member) ->
          if member.equals userId
            isMember = true

        if not (isAdmin or isMember)
          col.member_requested.addToSet userId

        col.save (err) ->
          res.json { error: false, message: 'Requested' }
