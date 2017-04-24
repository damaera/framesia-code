User = require '../../models/user'
Love = require '../../models/love'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { username } = req.params

  User.findOne {
    username: username
  }
  .select ''
  .lean()
  .exec (err, user) ->
    if err
      res.json { error: true }
    else
      { last } = req.query

      findData =
        user: user._id
        love_type: 'Post'

      if last
        findData._id = { $lt: last }

       populateQuery =
        path: 'to'
        select: '_id title subtitle slug user is_cover love_count reading_time published_at edited_at'
        populate:
          path: 'user'
          select: '_id name username updated_at'
          model: 'User'

      Love.find findData
      .sort '-_id'
      .limit 5
      .lean()
      .populate populateQuery
      .exec (err, posts) ->
        posts2 = []
        _.map posts, (post) ->
          pp = post.to
          pp.loveId = post._id
          pp.is_loving = false
          posts2.push pp
        res.json posts2

