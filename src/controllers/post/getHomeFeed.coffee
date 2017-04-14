Post = require '../../models/post'
# Love = require '../../models/love'
# Follow = require '../../models/follow'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { last } = req.query

  findData =
    is_link: { $ne: true }
    is_repost_link: { $ne: true }
    is_repost: false
    is_published: true

  if last
    findData.published_at = { $lt: last }

  populateQueryRepost =
    path: 'repost'
    select: '_id title subtitle slug user love_count reading_time'
    populate:
      path: 'user'
      select: '_id name username'
      model: 'User'

  populateQueryResponse =
    path: 'response'
    select: '_id title subtitle slug user love_count'
    populate:
      path: 'user'
      select: '_id name username'
      model: 'User'


  Post.find findData
  .select '_id title subtitle slug user published_at is_cover love_count reading_time is_repost repost is_response response is_repost_link repost_link tags collections is_link source url hostname'
  .populate 'user', 'name username'
  .populate 'collections', 'name username'
  .populate 'repost_link', 'title subtitle slug source hostname url'
  .populate populateQueryRepost
  .populate populateQueryResponse
  .sort '-published_at'
  .limit 7
  .lean()
  .exec (err, posts) ->



    res.json posts
