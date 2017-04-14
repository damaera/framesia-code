Collection = require '../../models/collection'
User = require '../../models/user'

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
        col.featured_articles.pull articleId
        col.save (err) ->
          res.redirect "/c/#{col.username}/articles"
        
