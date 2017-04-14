Follow = require '../../models/follow'
User = require '../../models/user'
Collection = require '../../models/collection'

# Tag = require '../../models/tag'
Notif = require '../../models/notif'

module.exports = (req, res, next) ->

  if not req.user
    res.json { err: true, message: 'Unauthorized' }
  else
    { followId, followType } = req.body

    userId = req.user._id
    userName = req.user.name

    followData =
      from: userId
      to: followId
      follow_type: followType

    Follow
    .findOne followData
    .exec (err, followItem) ->
      if err
      then res.json { err: true, message: 'Server Error' }
      else
        # if already follow, delete
        if followItem
          dataInc = {}
          if followType is 'User'
            Model = User
            dataInc = { following_user_count : -1 }
          else if followType is 'Collection'
            Model = Collection
            dataInc = { following_col_count : -1 }
          # else if followType is 'Tag'
          #   Model = Tag
          #   dataInc = { following_tag_count : -1 }

          User.findOneAndUpdate { _id: userId }, { $inc: dataInc }
            .exec (err) ->
              console.log err
          Model.findOneAndUpdate { _id: followId }, { $inc: { follower_count: -1 }}
            .exec (err) ->

              if followType is 'User'
                notifData =
                  from: userId
                  to: followId
                  notif_type: 'follow'
                  # object:
                  #   user_id: doc._id

                Notif
                .findOne notifData
                .exec (err, notif) ->
                  notif?.remove (err) ->
                    console.log

          followItem.remove (err) ->
            if err
            then res.json { err: true, message: 'Server Error' }
            else res.json { err: false, message: 'Unfollow success!', following: false }

        # prevent follow self
        else if followId is userId
        then res.json { err: true, message: 'Self follow' }

        # new follow
        else
          dataInc = {}
          if followType is 'User'
            Model = User
            dataInc = { following_user_count : 1 }
          else if followType is 'Collection'
            Model = Collection
            dataInc = { following_col_count : 1 }
          # else if followType is 'Tag'
          #   Model = Tag
          #   dataInc = { following_tag_count : 1 }

          User.findOneAndUpdate { _id: userId }, { $inc: dataInc }
          .lean()
          .exec (err) ->
            console.log err

          Model.findOneAndUpdate { _id: followId }, { $inc: { follower_count: 1 }}
          .lean()
          .exec (err, doc) ->
            if followType is 'User'
              notifData =
                from: userId
                to: doc._id
                notif_type: 'follow'
                created_at: Date.now()
                object:
                  user_id: doc._id

              newNotif = new Notif notifData
              newNotif.save (err) ->
                socketUser = doc._id.toString()
                req.io.to(socketUser).emit 'notif', true

          newFollow = new Follow followData
          newFollow.save (err) ->
            if err
            then res.json { err: true, message: 'Server Error' }
            else res.json { err: false, message: 'Follow success!', following: true }
