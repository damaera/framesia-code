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

  dataMatch =
    love_type: 'Post'
    # user: { $in: userIds }
    created_at: { $gt: sinceTime }

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
    { $limit: 7 }
  ], (err, loves) ->

    articleIds = _.map loves, '_id'

    Post.find {
      _id: { $in: articleIds }
      is_published: true
    }
    .select 'title subtitle slug user edited_at'
    .populate 'user', 'name username updated_at'
    .lean()
    .exec (err, posts) ->

      res.json posts
