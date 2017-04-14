Collection = require '../../models/collection'
Post = require '../../models/post'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    articleId = req.body.article

    # must admin
    Collection.findOne {
      _id: collectionId
      admin: req.user._id
    }
    .exec (err, col) ->
      if not col
      then res.status(403).json { error: 'Unauthorized or collection not found' }
      else
        Post.findOne {
          _id: articleId
          collections: collectionId
        }
        .exec (err, post) ->
          if not post
          then res.status(403).json { error: 'Not in collection' }
          else
            col.main_featured_article = articleId
            col.save (err) ->
              res.redirect "/c/#{col.username}/articles"
        
