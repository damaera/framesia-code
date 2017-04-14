Post = require '../../models/post'
Stat = require '../../models/stat'
Love = require '../../models/love'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { since } = req.query
  since or= 'today'
  now = new Date()

  sinceTime = new Date(now.setDate(now.getDate()-1))

  if since is 'weekly'
    sinceTime = new Date(now.setDate(now.getDate()-7))
  else if since is 'monthly'
    sinceTime = new Date(now.setDate(now.getDate()-30))


  Post.find {
    user: req.user._id
    is_published: true
    is_repost: false
  }
  .select 'title slug'
  .lean()
  .exec (err, posts) ->

    postIds = _.map posts, '_id'

    Stat.aggregate [
      {
        $match:
          article: { $in : postIds }
          time: { $gt: sinceTime }
      }
      {
        $group:
          _id: { article: '$article', type: '$stat_type' }
          count: { '$sum': 1 }
      }
    ], (err, stats) ->
      Love.aggregate [
        {
          $match:
            to: { $in: postIds }
            love_type: 'Post'
            created_at: { $gt: sinceTime }
        }
        {
          $group:
            _id: '$to'
            count: { '$sum': 1 }
        }
      ], (err, loves) ->
        posts2 = []

        _.map posts, (post) ->

          post.views = 0
          post.reads = 0
          post.loves = 0

          _.map stats, (stat) ->
            if post._id.equals stat._id.article
              if stat._id.type is 'view'
                post.views = stat.count
              else if stat._id.type is 'read'
                post.reads = stat.count
          _.map loves, (love) ->
            if post._id.equals love._id
              post.loves = love.count

          posts2.push post

        res.render 'stats', { posts: posts2 }
