Post = require '../../models/post'
Comment = require '../../models/comment'

module.exports = (req, res, next) ->
  { articleId } = req.params

  mongoIdRegex = /^[0-9a-fA-F]{24}$/
  if articleId.match mongoIdRegex
    populateQuery =
      path: 'response'
      select: '_id title subtitle slug user love_count comment_count repost_count'
      populate:
        path: 'user'
        select: '_id name username'
        model: 'User'

    Post.findOne {
      _id: articleId
    }
    .populate 'user', '_id name username description'
    .populate populateQuery
    .lean()
    .exec (err, article) ->
      if err
      then next err
      else
        if article
          if article.is_published
          then res.redirect "/p/#{ encodeURI article.slug }"
          # then res.json article
          Comment.find {
            post: article._id
          }
          .populate 'user', '_id name username'
          .lean()
          .exec (err, comments) ->
            res.render 'article', { user: article.user, article: article, comments: comments }

        else next new Error 'Article not found'
  else next()
