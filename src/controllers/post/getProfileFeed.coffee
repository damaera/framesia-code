Post = require '../../models/post'
Love = require '../../models/love'
Follow = require '../../models/follow'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { userId } = req.params
  { last } =  req.query

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

  findData =
    user: userId
    is_published: true

  if last
    findData.published_at = { $lt : last }

  Post.find findData
  .sort '-published_at'
  .select '_id title subtitle slug user published_at is_cover love_count reading_time is_repost repost is_response is_repost_link repost_link response tags edited_at'
  .populate 'user', '_id name username updated_at'
  .populate 'repost_link', 'title subtitle slug source hostname url edited_at'
  .populate populateQueryRepost
  .populate populateQueryResponse
  .limit 7
  .lean()
  .exec (err, posts) ->
    if req.user
      Love.find { user: req.user._id, love_type: 'Post' }
        .select 'to'
        .lean()
        .exec (err, loves) ->

          Post.find { is_repost: true, user: req.user._id }
            .select 'repost'
            .lean()
            .exec (err, repost) ->

              posts2 = []
              articleLoveIds = _.map loves, 'to'
              articleRepostIds = _.map repost, 'repost'

              _.map posts, (post) ->
                if _.some articleLoveIds, post._id
                  post.is_loving = true
                if _.some articleRepostIds, post._id
                  post.is_reposting = true
                if post.is_repost
                  post.is_reposting = true
                  if _.some articleLoveIds, post.repost?._id
                    post.is_loving = true
                posts2.push post
              res.json posts2
    else
      res.json posts
