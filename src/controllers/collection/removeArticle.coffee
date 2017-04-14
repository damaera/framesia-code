Collection = require '../../models/collection'
User = require '../../models/user'
Post = require '../../models/post'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    { article } = req.body
    userId = req.user._id


    Collection.findOne {
      _id: collectionId
    }
    .exec (err, col) ->
      if not col
      then res.status(403).json { error: 'Collection not found' }
      else
        Post.findOne {
          _id: article
        }
        .exec (err, post) ->
          if not post
          then res.json { error: 'article not found' }
          else
            isAdmin = false
            _.map col.admin, (admin) ->
              if admin.equals userId
                isAdmin = true

            # admin or article owner can delete
            if isAdmin or (post.user.equals userId)
              post.collections.pull collectionId

            post.save (err) ->
              res.redirect "/c/#{col.username}/articles"
