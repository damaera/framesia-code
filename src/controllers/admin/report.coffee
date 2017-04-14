Report = require '../../models/report'
Block = require '../../models/block'
Post = require '../../models/post'

_ = require 'lodash'

module.exports = (req, res, next) ->
  Report.aggregate [
    {
      $group:
        _id: '$post'
        count: { '$sum': 1 }
        reasons: { $addToSet: "$reason" }
        users: { $addToSet: "$user" }
    }
    {
      $sort: { count: -1 }
    }
    {
      $limit: 50
    }
  ], (err, reports) ->
    reportIds = _.map reports, '_id'

    Block.find { block_id: { $in: reportIds }, block_type: 'Post' }
    .lean()
    .exec (err, blocks) ->

      Post.find { _id: { $in: reportIds }}
      .select 'title subtitle slug'
      .lean()
      .exec (err, posts) ->
        posts2 = []
        _.map reports, (report) ->
          _.map posts, (post) ->
            if report._id.equals post._id
              post.count = report.count
              post.reasons = report.reasons
              post.users = report.users
              posts2.push post

        _.map blocks, (block) ->
          i = 0
          _.map posts2, (post) ->
            if block.block_id.equals post._id
              console.log 's'
              posts2.splice i, 1
            i++


        res.render 'admin-report', { posts: posts2 }