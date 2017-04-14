Post = require '../../models/post'
Stat = require '../../models/stat'
Love = require '../../models/love'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { since } = req.query
  since or= 'today'
  now = new Date()

  # country_chosen = 'intl'
  # if req.user
  #   country_chosen = req.user.country_chosen
  # else if /^(id)$/.test req.country
  #   country = req.country

  sinceTime = new Date(now.setDate(now.getDate()-1))

  if since is 'weekly'
    since = 'This week'
    sinceTime = new Date(now.setDate(now.getDate()-7))
  else if since is 'monthly'
    since = 'This month'
    sinceTime = new Date(now.setDate(now.getDate()-30))
  else
    since = 'Today'


  # User.find {
  #   country_chosen: country_chosen
  # }
  # .select ''
  # .lean()
  # .exec (err, users) ->

  #   userIds = _.map users, '_id'

  dataMatch =
    love_type: 'Post'
    created_at: { $gt: sinceTime }
    # user: { $in: userIds }

  Love.aggregate [
    {
      $match: dataMatch
    }
    {
      $group:
        _id: '$to'
        count: { '$sum': 1 }
    }
    { $sort: { count: -1 }}
    { $limit: 20 }
  ], (err, loves) ->

    articleIds = _.map loves, '_id'

    Post.find {
      _id: { $in: articleIds }
      is_published: true
    }
    .select 'title subtitle slug user is_cover love_count'
    .populate 'user', 'name username'
    .lean()
    .exec (err, posts) ->

      posts2 = []
      _.map loves, (love) ->
        _.map posts, (post) ->
          if post._id.equals love._id
            post.love_since = love.count
            posts2.push post

      res.render 'trending', { posts: posts2, since: since }
