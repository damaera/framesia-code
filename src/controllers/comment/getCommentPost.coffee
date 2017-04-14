Comment = require '../../models/comment'
Love = require '../../models/love'
Post = require '../../models/post'

_ = require 'lodash'

module.exports = (req, res, next) ->
  { articleId } = req.params
  { last, first } = req.query

  Post.findOne { _id: articleId }
  .select 'user'
  .lean()
  .exec (err, post) ->
    if not post
    then res.json { error: true, message: 'Article not found' }
    else

      findData =
        post: articleId

      if not req.user
        findData.is_published = { $ne: false }

      if req.user
        if not req.user._id is post.user
          findData.$or = [
              {
                is_published: { $ne: false }
              }
              {
                is_published: false
                user: req.user._id
              }
            ]

      if last
        findData._id = { $lt: last }
      else if first
        findData._id = { $gt: first }


      Comment.find findData
      .select 'user content created_at love_count is_published'
      .sort '-_id'
      .limit 2
      .lean()
      .populate 'user', '_id username name'
      .exec (err, comments) ->
        if req.user
          userId = req.user._id
          Love.find {
            user: userId
            love_type: 'Comment'
          }
          .lean()
          .exec (err, loves) ->
            commentLoveIds = _.map loves, 'to'
            comments2 = []

            _.map comments, (comment) ->

              if _.some commentLoveIds, comment._id
                comment.is_loving = true

              if comment.user._id.equals userId
                comment.is_yours = true

              comments2.push comment

            res.json { is_login: true, comments: comments2 }
        else
          res.json { is_login: false, comments: comments }
