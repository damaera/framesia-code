Collection = require '../../models/collection'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    userId = req.body.user

    # must owner
    Collection.findOne {
      _id: collectionId
      owner: req.user._id
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
          res.status(500).json { error: 'Not admin'}
        else
          col.admin.pull userId
          col.member.addToSet userId

          col.save (err) ->
            res.redirect "/c/#{col.username}/people"
