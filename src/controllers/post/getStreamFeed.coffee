Post = require '../../models/post'
Love = require '../../models/love'
Follow = require '../../models/follow'

_ = require 'lodash'

module.exports = (req, res, next) ->

  if not req.user
    res.json { error: 'Unauthorized' }
  else
    Follow.find { from: req.user._id }
    .lean()
    .exec (err, follows) ->

      userFollowed = [req.user._id]
      collectionFollowed = []
      tagFollowed = []

      _.map follows, (follow) ->

        { follow_type, to } = follow

        if follow_type is 'User'
          userFollowed.push to
        else if follow_type is 'Collection'
          collectionFollowed.push to
        else if follow_type is 'Tag'
          tagFollowed.push to


      { last } = req.query

      findData =
        $or: [
          { user: { $in: userFollowed }}
          { collections: { $in: collectionFollowed }}
        ]
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
      .select '_id title subtitle slug user published_at is_cover love_count reading_time is_repost repost is_response response is_repost_link repost_link tags collections source hostname url edited_at'
      .populate 'user', 'name username updated_at'
      .populate 'collections', 'name username updated_at'
      .populate 'repost_link', 'title subtitle slug source hostname url edited_at'
      .populate populateQueryRepost
      .populate populateQueryResponse
      .sort '-published_at'
      .limit 7
      .lean()
      .exec (err, posts) ->
        # my love
        Love.find { user: req.user._id, love_type: 'Post' }
        .select 'to'
        .lean()
        .exec (err, loves) ->

          # Post.find { is_repost: true, user: req.user._id }
          # .select 'repost'
          # .lean()
          # .exec (err, repost) ->

          posts2 = []
          articleLoveIds = _.map loves, 'to'
          # articleRepostIds = _.map repost, 'repost'

          _.map posts, (post) ->
            if _.some articleLoveIds, post._id
              post.is_loving = true
            # if _.some articleRepostIds, post._id
            #   post.is_reposting = true


            # get intersect Collection followed with collection in post
            # to know from what collection i follow which have the article
            post.from_collection = []
            _.map post.collections, (col1) ->
              _.map collectionFollowed, (col2) ->
                if col1._id.equals col2
                  post.from_collection.push col1

            posts2.push post

          res.json posts2
