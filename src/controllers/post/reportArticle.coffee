Post = require '../../models/post'

Report = require '../../models/report'

module.exports = (req, res, next) ->
  if not req.user
    res.json { err: true, message: 'Unauthorized' }
  else

    { article_id, reason } = req.body

    Post.findOne { _id: article_id, is_repost: false }
    .exec (err, post) ->
      if post
        dataReport =
          post: article_id
          time: Date.now()
          reason: reason
          user: req.user._id

        newReport = new Report dataReport
        newReport.save (err) ->
          res.send "Report send"
      else
        res.send "Article not found"