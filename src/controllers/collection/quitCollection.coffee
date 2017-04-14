Collection = require '../../models/collection'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    userId = req.user._id

    # if not you
    Collection.findOne {
      _id: collectionId
      owner: { $ne: userId }
      $or: [
        { admin: userId }
        { member: userId }
      ]
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

        if isAdmin
          col.admin.pull userId
        else if isMember
          col.member.pull userId

        col.save (err) ->
          res.redirect "/c/#{col.username}/people"
