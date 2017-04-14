Collection = require '../../models/collection'

_ = require 'lodash'

module.exports = (req, res, next) ->
  { collectionId } = req.params
  Collection.findOne {
    _id: collectionId
    is_anyone_can_join: true
  }
  .lean()
  .exec (err, col) ->
    if not col
      res.json { error: 'Unauthorized' }
    else
      if req.user
        userId = req.user._id
        isAdmin = false
        isMember = false
        _.map col.admin, (userAdmin) ->
          if userAdmin.equals userId
            isAdmin = true
        _.map col.member, (userMember) ->
          contributedUser.push userMember
          if userMember.equals userId
            isMember = true

        if not (isAdmin or isMember)
          res.json { error: false, requested: false }
        else
          res.json { error: false, requested: true }
      else
        res.json { error: 'Unauthorized' }
