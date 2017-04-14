Post = require '../../models/post'
Love = require '../../models/love'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { username } = req.params
  if username.length < 3
  then next()
  else


    User.findOne {
      username: username
    }
    .exec (err, user) ->
      if err
        next err
      else
        res.render 'profile', { user: user }
  #
  #       populateQueryRepost =
  #         path: 'repost'
  #         select: '_id title subtitle slug user love_count comment_count repost_count'
  #         populate:
  #           path: 'user'
  #           select: '_id name username'
  #           model: 'User'
  #
  #
  #       populateQueryResponse =
  #         path: 'response'
  #         select: '_id title subtitle slug user'
  #         populate:
  #           path: 'user'
  #           select: '_id name username'
  #           model: 'User'
  #
  #       Post.find {
  #         user: user._id
  #         is_published: true
  #       }
  #       .sort '-_id'
  #       .select '_id title subtitle slug user published_at is_cover love_count comment_count repost_count word_count reading_time language_detected is_repost repost is_response response'
  #       .populate 'user', '_id name username'
  #       .populate populateQueryRepost
  #       .populate populateQueryResponse
  #       .lean()
  #       .exec (err, posts) ->
  #         if req.user
  #           Love.find { user: req.user._id, love_type: 'Post' }
  #             .select 'to'
  #             .lean()
  #             .exec (err, loves) ->
  #
  #               Post.find { is_repost: true, user: req.user._id }
  #                 .select 'repost'
  #                 .lean()
  #                 .exec (err, repost) ->
  #
  #                   posts2 = []
  #                   articleLoveIds = _.map loves, 'to'
  #                   articleRepostIds = _.map repost, 'repost'
  #
  #                   _.map posts, (post) ->
  #                     if _.some articleLoveIds, post._id
  #                       post.is_loving = true
  #                     if _.some articleRepostIds, post._id
  #                       post.is_reposting = true
  #                     if post.is_repost
  #                       post.is_reposting = true
  #                       if _.some articleLoveIds, post.repost?._id
  #                         post.is_loving = true
  #                     posts2.push post
  #                   res.render 'profile', { user: user, post: posts2 }
  #         else
  #           res.render 'profile', { user: user, post: posts }
  #         # res.render 'profile', { user: user, post: post }
  #     else
  #       next new Error 'User not found'
