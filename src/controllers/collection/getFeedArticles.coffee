Post = require '../../models/post'
Love = require '../../models/love'
Collection = require '../../models/collection'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { collectionName } = req.params
  { last } =  req.query

  Collection.findOne {
    username: collectionName
  }
  .select ''
  .lean()
  .exec (err, col) ->
    if not col
    then res.json { error: true, message: 'Collection not found' }
    else
      dataFind =
        collections: col._id
      if last
        dataFind.published_at = { $lt: last }

      Post.find dataFind
      .select '_id title subtitle slug user love_count published_at reading_time tags is_cover is_link source hostname url'
      .populate 'user', '_id name username'
      .sort '-published_at'
      .limit 7
      .lean()
      .exec (err, posts) ->
        if not req.user
          res.json posts
        else
          Love.find { user: req.user._id, love_type: 'Post' }
          .select 'to'
          .lean()
          .exec (err, loves) ->
            posts2 = []
            articleLoveIds = _.map loves, 'to'

            _.map posts, (post) ->
              if _.some articleLoveIds, post._id
                post.is_loving = true
              posts2.push post

            res.json posts2
