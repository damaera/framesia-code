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
    select: '_id title subtitle slug user love_count reading_time edited_at'
    populate:
      path: 'user'
      select: '_id name username updated_at'
      model: 'User'

  populateQueryResponse =
    path: 'response'
    select: '_id title subtitle slug user love_count edited_at'
    populate:
      path: 'user'
      select: '_id name username updated_at'
      model: 'User'


  Post.find findData
  .select '_id title subtitle slug user published_at is_cover love_count reading_time is_repost repost is_response response is_repost_link repost_link tags collections is_link source url hostname edited_at'
  .populate 'user', 'name username updated_at'
  .populate 'collections', 'name username updated_at'
  .populate 'repost_link', 'title subtitle slug source hostname url edited_at'
  .populate populateQueryRepost
  .populate populateQueryResponse
  .sort '-published_at'
  .limit 7
  .lean()
  .exec (err, posts) ->



    res.json posts
