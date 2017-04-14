Comment = require '../../models/comment'
Post = require '../../models/post'
Love = require '../../models/love'
Notif = require '../../models/notif'

module.exports = (req, res, next) ->

  { commentId } = req.params

  if not req.user
    res.json { error: true, message: 'Unauthorized' }
  else
    Comment.findOne {
      _id: commentId
      user: req.user._id
    }
    .select 'post love_count'
    .exec (err, comment) ->
      if comment
        Post.findOneAndUpdate { _id: comment.post }, { $inc : { comment_count: -1 }}
        .exec (err, post) ->
          console.log

        if comment.love_count > 0
          Love.find { love_type: 'Comment', to: commentId }
          .remove()
          .exec()

        Notif.find { 'object.comment_id': commentId }
        .remove()
        .exec()


        comment.remove (err) ->
          res.json { error: false }
      else
        res.json { error: true, message: 'Unauthorized' }
