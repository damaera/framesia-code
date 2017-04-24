Post = require '../../models/post'

_ = require 'lodash'

module.exports = (req, res, next) ->
  { q, last } = req.query

  console.log req.query

  last = last*1 or 0
  q or= 0

  qRegex = new RegExp q, "i"

  populateQueryResponse =
    path: 'response'
    select: '_id title subtitle slug user edited_at'
    populate:
      path: 'user'
      select: '_id name username updated_at'
      model: 'User'

  findData =
    $text: { $search : q }
    is_published: true
    is_repost: false

  findScore =
    score: { $meta: 'textScore' }

  Post
    .find findData, findScore
    .select '_id title subtitle slug user published_at is_cover love_count reading_time is_response response tags is_link url hostname edited_at'
    .populate 'user', '_id name username updated_at'
    .populate populateQueryResponse
    .sort { score: { $meta: 'textScore' }}
    .skip last
    .limit 7
    .lean()
    .exec (err, posts) ->
      res.json posts