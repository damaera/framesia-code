Post = require '../../models/post'
Love = require '../../models/love'
Comment = require '../../models/comment'

module.exports = (req, res, next) ->
  if req.user
    { articleId } = req.params
    userId = req.user._id
    dataReturn =
      loved: false
      commented: false
      responded: false
      reposted: false

    Love.findOne { user: userId, love_type: 'Post', to: articleId }
    .select ''
    .lean()
    .exec (err, love) ->
      if love
        dataReturn.loved = true

      Comment.findOne { post: articleId, user: userId }
      .select ''
      .lean()
      .exec (err, comment) ->
        if comment
          dataReturn.commented = true

        Post.find {
          user: userId
          is_published: true
          $or: [
            { response: articleId }
            { repost: articleId }
            { repost_link: articleId }
          ]
        }
        .select 'response repost repost_link'
        .lean()
        .exec (err, posts) ->
          for post in posts
            if post.response?.equals articleId
              dataReturn.responded = true
            if post.repost?.equals articleId
              dataReturn.reposted = true
            if post.repost_link?.equals articleId
              dataReturn.linkReposted = true

          res.json dataReturn
