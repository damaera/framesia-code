Comment = require '../../models/comment'
Post = require '../../models/post'
User = require '../../models/user'
Notif = require '../../models/notif'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
    res.status(403).json { err: true, message: 'Unauthorized' }
  else
    { content, comment_id } = req.body

    content = content
      .replace /</g, '&lt;'

    Comment.findOne { _id: comment_id }
      .exec (err, comment) ->

        replyData =
          content: content
          user: req.user._id

        # get @username in content
        mentionRegex = /@([a-z0-9_]{3,16})/g
        mentionList = _.map (_.uniq content.match mentionRegex), (str) ->
          str.substring 1

        comment.replies.push replyData
        comment.replies_count += 1

        comment.save (err) ->
          # save notification
          if not comment.user.equals req.user._id
            notifData =
              from: req.user._id
              to: comment.user
              notif_type: 'reply-comment'
              object:
                post_id: comment.post
                comment_id: comment._id
                reply_id: comment.replies[comment.replies.length - 1]._id

            newNotif = new Notif notifData
            newNotif.save (err) ->
              console.log

            # set notification if mention happen
            if mentionList.length > 0
              User.find { username: { $in: mentionList }}
                .lean()
                .exec (err, users) ->

                  for user in users

                    if not comment.user.equals user._id
                      notifData =
                        from: req.user._id
                        to: user._id
                        notif_type: 'mention-comment-post'
                        object:
                          post_id: newComment.post
                          comment_id: newComment._id

                      newNotif = new Notif notifData
                      newNotif.save (err) ->
                        console.log

          res.json { err: false, message: 'Success' }
