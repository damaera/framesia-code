Love = require '../../models/love'
Post = require '../../models/post'
Comment = require '../../models/comment'
Notif = require '../../models/notif'

crypto = require 'crypto'

module.exports = (req, res, next) ->
  if not req.user
    res.json { err: true, message: 'Unauthorized' }
  else
    { to, love_type } = req.body

    userId = req.user._id
    userName = req.user.name

    loveData =
      user: userId
      to: to
      love_type: love_type

    Love
    .findOne loveData
    .exec (err, loveItem) ->
      if err
      then res.json { err: true, message: 'Server Error' }
      else
        # if already love, delete
        if loveItem
          # decrement love_count in Post
          if love_type is 'Post'
            Post.findOneAndUpdate { _id: to }, { $inc : { love_count: -1 }}
            .exec (err, post) ->
              # delete notif
              notifData =
                from: userId
                to: post.user
                notif_type: 'love-post'
                object:
                  post_id: post._id

              Notif
              .findOne notifData
              .exec (err, notif) ->
                notif?.remove (err) ->
                  console.log

          # decrement love_count in Comment
          else if love_type is 'Comment'
            Comment.findOneAndUpdate { _id: to }, { $inc : { love_count: -1 }}
            .exec (err, comment) ->
              # delete notif
              notifData =
                from: userId
                to: comment.user
                notif_type: 'love-comment'
                object:
                  post_id: comment.post
                  comment_id: comment._id

              Notif
              .findOne notifData
              .exec (err, notif) ->
                notif?.remove (err) ->
                  console.log

          loveItem.remove (err) ->
            if err
            then res.json { err: true, message: 'Server Error' }
            else res.json { err: false, message: 'Delete Love success!', loving: false }

        # new love
        else
          # increment love_count in Post
          if love_type is 'Post'
            Post.findOneAndUpdate { _id: to }, { $inc : { love_count: 1 }}
            .exec (err, post) ->

              if not post.user.equals userId

                notifData =
                  from: userId
                  to: post.user
                  notif_type: 'love-post'
                  created_at: Date.now()
                  object:
                    post_id: post._id


                newNotif = new Notif notifData
                newNotif.save (err) ->
                  socketUser = post.user.toString()
                  req.io.to(socketUser).emit 'notif', true

          # increment love_count in Comment
          if love_type is 'Comment'
            Comment.findOneAndUpdate { _id: to }, { $inc : { love_count: 1 }}
            .exec (err, comment) ->

              if not comment.user.equals userId

                notifData =
                  from: userId
                  to: comment.user
                  notif_type: 'love-comment'
                  created_at: Date.now()
                  object:
                    post_id: comment.post
                    comment_id: comment._id

                # saving notif
                newNotif = new Notif notifData
                newNotif.save (err) ->
                  socketUser = comment.user.toString()
                  req.io.to(socketUser).emit 'notif', true

          # saving new love
          loveData.created_at = new Date
          newLove = new Love loveData
          newLove.save (err) ->
            if err
            then res.json { err: true, message: 'Server Error' }
            else res.json { err: false, message: 'Love success!', loving: true }
