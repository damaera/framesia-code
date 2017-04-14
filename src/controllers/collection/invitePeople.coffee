Collection = require '../../models/collection'
User = require '../../models/user'
Notif = require '../../models/notif'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    post = req.body
    { collectionId } = req.params

    # if not admin
    Collection.findOne {
      _id: collectionId
      admin: req.user._id
    }
    .exec (err, col) ->
      if not col
      then res.status(403).json { error: 'Unauthorized or collection not found' }
      else
        invitedUsers = post.invite
          .replace /@/g, '' # remove @ symbol
          .replace (new RegExp req.user.username, 'g'), '' # remove you
          .split ' '

        invitedUsers = _.uniq invitedUsers

        User.find { username: { $in: invitedUsers }}
        .select ''
        .lean()
        .exec (err, users) ->

          dataNotifs = []

          for user in users
            dataNotif =
              from: req.user._id
              notif_type: 'invited-to-col'
              to: user._id
              object:
                collection_id: col._id
              created_at: Date.now()

            dataNotifs.push dataNotif
            col.member.addToSet user._id

          Notif.create dataNotifs, (err) ->
            for user in users
              socketUser = user._id.toString()
              req.io.to(socketUser).emit 'notif', true

          col.save (err) ->
            res.redirect "/c/#{col.username}/people"
