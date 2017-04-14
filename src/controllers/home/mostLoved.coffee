Post = require '../../models/post'
Love = require '../../models/love'

_ = require 'lodash'

module.exports = (req, res, next) ->

  oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)

  Love.aggregate [
    {
      $match:
        love_type: 'Post'
        created_at: { $gte: oneDayAgo }
    }
    {
      $group:
        _id: '$to'
        count: { '$sum': 1 }
    }
    {
      $sort: { count: -1 }
    }
    {
      $limit: 10
    }
  ], (err, posts) ->

    postIds = _.map posts, '_id'

    Post
    .find { _id: { $in : postIds }}
    .select 'title slug'
    .lean()
    .exec (err, posts2) ->

      posts3 = []

      _.map posts2, (post2) ->
        post3 = post2
        _.map posts, (post) ->
          if post._id.equals post2._id
            post3.count = post.count
            posts3.push post3

      res.json _.sortBy posts3, (o) -> o.count * -1
