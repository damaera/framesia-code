Collection = require '../../models/collection'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    { user, answer } = req.body
    userId = req.user._id

    # if not you
    Collection.findOne {
      _id: collectionId
      is_anyone_can_join: true
    }
    .exec (err, col) ->
      if not col
      then res.status(403).json { error: 'Unauthorized or collection not found' }
      else
        isAdmin = false
        _.map col.admin, (admin) ->
          if admin.equals userId
            isAdmin = true

        if !isAdmin
          res.status(403).json { error: 'Unauthorized' }
        else
          if answer is 'yes'
            col.member.addToSet user

          col.member_requested.pull user
          col.save (err) ->
            res.redirect "/c/#{col.username}/people"
