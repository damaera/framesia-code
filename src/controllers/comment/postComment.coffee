Comment = require '../../models/comment'
Post = require '../../models/post'
User = require '../../models/user'
Notif = require '../../models/notif'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
    res.status(403).json { err: true, message: 'Unauthorized' }
  else
    { content, article_id } = req.body

    # XSS
    content = content
      .replace /</g, '&lt;'

    Post.findOne { _id: article_id }
    .exec (err, post) ->

      commentData =
        content: content
        post: article_id
        user: req.user._id
        is_published: post.is_published
        created_at: Date.now()

      # get @username in content
      mentionRegex = /@([a-z0-9_]{3,16})/g
      mentionList = _.map (_.uniq content.match mentionRegex), (str) ->
        str.substring 1


      newComment = new Comment commentData
      newComment.save (err) ->

        # save notification
        if not newComment.user.equals req.user._id
          notifData =
            from: req.user._id
            to: newComment.user
            notif_type: 'comment'
            object:
              post_id: newComment.post
              comment_id: newComment._id

          newNotif = new Notif notifData
          newNotif.save (err) ->
            socketUser = newComment.user.toString()
            req.io.to(socketUser).emit 'notif', true

        if post.is_published
          # increment post count
          post.comment_count += 1
          post.save (err) ->
            console.log

          # set notification if mention happen
          if mentionList.length > 0
            User.find { username: { $in: mentionList }}
            .lean()
            .exec (err, users) ->
              for user in users
                if req.user._id isnt user._id
                  notifData =
                    from: req.user._id
                    to: user._id
                    notif_type: 'mention-comment'
                    object:
                      post_id: newComment.post
                      comment_id: newComment._id

                  newNotif = new Notif notifData
                  newNotif.save (err) ->
                    socketUser = user._id.toString()
                    req.io.to(socketUser).emit 'notif', true

        res.json { err: false, message: 'Success' }
