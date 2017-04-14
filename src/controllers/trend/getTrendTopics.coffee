Post = require '../../models/post'
Stat = require '../../models/stat'
Love = require '../../models/love'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->

  now = new Date()
  sinceTime = new Date(now.setDate(now.getDate()-1))

  # country_chosen = 'intl'
  # if req.user
  #   country_chosen = req.user.country_chosen

  # dataFind = {}

  # if country_chosen isnt 'intl'
  #   dataFind =
  #     country_chosen: country_chosen

  # User.find dataFind
  # .select ''
  # .lean()
  # .exec (err, users) ->

  #   userIds = _.map users, '_id'

  Post.aggregate [
    {
      $match:
        is_published: true
        # user: { $in: userIds }
        published_at: { $gt: sinceTime }
    }
    {
      $unwind: '$tags'
    }
    {
      $group:
        _id: '$tags'
        count: { '$sum': 1 }
    }
    {
      $sort: { count: -1 }
    }
    {
      $limit: 10
    }
  ], (err, posts) ->
    res.json posts
