Post = require '../../models/post'

module.exports = (req, res, next) ->

  { last } = req.query

  findData =
    user: req.user._id
    is_published: false

  if last
    findData.edited_at = { $lt: last }

  Post.find findData
  .sort '-edited_at'
  .select '_id title subtitle slug created_at edited_at is_cover word_count reading_time is_published'
  .lean()
  .exec (err, posts) ->
    res.json posts
    # res.render 'me-draft', { post: posts }
