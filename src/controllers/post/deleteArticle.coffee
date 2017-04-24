glob = require 'glob'
fs = require 'fs'

CONFIG = require '../../config'

Post = require '../../models/post'
Love = require '../../models/love'
Comment = require '../../models/comment'
Notif = require '../../models/notif'
Stat = require '../../models/stat'

module.exports = (req, res, next) ->
  post = req.body

  if !req.user then res.json { error: 'Unauthorized' }
  else
    # glob.glob "#{CONFIG.imgDir}post/#{post.id}*", (err, files) ->
    #   for file in files
    #     fs.unlink file

    Post.findOne {
      _id: post.id
      user: req.user._id
    }
    .exec (err, deletedPost) ->
      if err
      then next err
      else if deletedPost
        deletedId = deletedPost._id
        if deletedPost.love_count > 0
          Love.find { love_type: 'Post', to: deletedId }
          .remove()
          .exec()

        if deletedPost.comment_count > 0
          Comment.find { post: deletedId }
          .remove()
          .exec()

        if deletedPost.is_repost
          Post.find { repost: deletedId }
          .remove()
          .exec()
        else
          Notif.find { 'object.post_id': deletedId }
          .remove()
          .exec()

          Stat.find { article: deletedId }
          .remove()
          .exec()

        if deletedPost.is_response and deletedPost.is_published
          Post.findOneAndUpdate { _id: deletedPost.response }, { $inc : { response_count: -1 }}
          .exec (err, post) ->
            console.log

          Notif.find {
            notif_type: 'respond'
            'object.post_id': deletedId
          }
          .remove()
          .exec()

        deletedPost.remove (err) ->
          if post.url
          then res.redirect post.url
          else res.redirect '/'

      else res.json { error: 'Article not found' }
