Post = require '../../models/post'

_ = require 'lodash'

module.exports = (req, res, next) ->
  { q, last, post, autocomplete } = req.query

  q or= 0
  last or= 0

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

  if post

    Post
    .find findData
    .select '_id title subtitle slug user published_at is_cover love_count reading_time is_repost repost is_response response tags edited_at'
    .populate 'user', '_id name username updated_at'
    .populate populateQueryResponse
    .skip last
    .limit 7
    .lean()
    .exec (err, posts) ->
      res.json posts


  else
    Post.aggregate [
      {
        $match:
          tags: new RegExp q, 'i'
          is_published: true
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
    ], (err, tags) ->
      res.json tags