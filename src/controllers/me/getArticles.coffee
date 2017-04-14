Post = require '../../models/post'

module.exports = (req, res, next) ->

  { last } = req.query
  findData =
    user: req.user._id
    is_published: true
    is_repost: { $ne: true }

  if last
    findData.edited_at = { $lt: last }

  Post.find findData
  .sort '-edited_at'
  .select '_id title subtitle slug created_at edited_at is_cover word_count reading_time is_published'
  .limit 7
  .lean()
  .exec (err, posts) ->
    res.json posts
    # res.render 'me-article', { post: posts }
