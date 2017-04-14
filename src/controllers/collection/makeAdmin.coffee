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
        isMember = false
        _.map col.member, (member) ->
          if member.equals userId
            isMember = true

        if !isMember
          res.status(500).json { error: 'Not member'}
        else
          Collection.find {
            admin: userId
          }
          .select ''
          .lean()
          .exec (err, usersCol) ->
            if col.admin.length >= 7
              res.status(500).json { error: 'Maximum admin per collection is 7'}
            else if usersCol.length >= 7
              res.status(500).json { error: 'Maximum admin per user is 7'}
            else
              col.member.pull userId
              col.admin.addToSet userId

              col.save (err) ->
                res.redirect "/c/#{col.username}/people"
