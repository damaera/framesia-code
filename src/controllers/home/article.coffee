User = require '../../models/user'
Post = require '../../models/post'
Comment = require '../../models/comment'

module.exports = (req, res, next) ->
  populateQuery =
    path: 'response'
    select: '_id title subtitle slug user love_count comment_count repost_count'
    populate:
      path: 'user'
      select: '_id name username'
      model: 'User'
  { username, slug } = req.params

  if username.length < 3
  then next()
  else
    User.findOne {
      username: username
    }
    .exec (err, user) ->
      if err
      then next err
      else if user
        Post.findOne {
          user: user._id
          slug: slug
          is_published: true
        }
        .populate populateQuery
        .lean()
        .exec (err, post) ->
          if err
          then next err
          else if post
            Comment.find {
              post: post._id
            }
            .populate 'user', '_id name username'
            .populate 'replies.user', '_id name username'
            .lean()
            .exec (err, comments) ->
              res.render 'article', { user: user, article: post, comments: comments }
          else
            next new Error 'Article not found'
      else
        next new Error 'User not found'
