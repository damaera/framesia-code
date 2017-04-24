Post = require '../../models/post'

module.exports = (req, res, next) ->
  if req.user
    populateQuery =
      path: 'response'
      select: '_id title subtitle slug user love_count comment_count repost_count edited_at'
      populate:
        path: 'user'
        select: '_id name username updated_at'
        model: 'User'

    Post.findOne {
      _id: req.params.articleId
      user: req.user._id
    }
    .populate populateQuery
    .lean()
    .exec (err, article) ->
      if err
      then next err
      else
        if article
        then res.render 'edit-article', { article: article, respond: article.response }
        else next new Error 'Article not found'
  else res.redirect '/'
