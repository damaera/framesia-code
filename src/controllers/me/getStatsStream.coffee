Post = require '../../models/post'
Stat = require '../../models/stat'

_ = require 'lodash'

module.exports = (req, res, next) ->

  Post.find {
    user: req.user._id
    is_published: true
    is_repost: false
  }
  .select ''
  .lean()
  .exec (err, posts) ->

    postIds = _.map posts, '_id'

    oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    Stat.aggregate [
      {
        $match:
          article: { $in : postIds }
          stat_type: 'read'
          time: { $gte: oneWeekAgo }
      }
      {
        $group:
          _id: { day: { $dayOfWeek: '$time' }}
          count: { '$sum': 1 }
      }
    ], (err, stats) ->
      readDay = stats[0].count
      readWeek = 0
      _.map stats, (stat) ->
        readWeek += stat.count

      res.json { day: readDay, week: readWeek }
