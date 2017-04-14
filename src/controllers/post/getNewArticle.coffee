Post = require '../../models/post'

module.exports = (req, res, next) ->
  if req.user
    { respond } = req.query
    if respond
      Post.findOne {
        _id: respond
        is_published: true
      }
      .select '_id title subtitle slug user love_count comment_count repost_count tags'
      .populate 'user', '_id name username'
      .lean()
      .exec (err, article) ->

        res.render 'new-article', { respond: article }
    else
      res.render 'new-article'
  else res.redirect '/'
