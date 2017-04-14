Collection = require '../../models/collection'
Post = require '../../models/post'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    { article, answer } = req.body
    userId = req.user._id

    # if not you
    Collection.findOne {
      _id: collectionId
      articles_request: article
      is_anyone_can_request: true
    }
    .exec (err, col) ->
      if not col
      then res.status(403).json { error: 'Unauthorized or collection not found' }
      else
        # check admin
        isAdmin = false
        _.map col.admin, (admin) ->
          if admin.equals userId
            isAdmin = true

        if !isAdmin
          res.status(403).json { error: 'Unauthorized' }
        else
          Post.findOne {
            _id: article
          }
          .exec (err, post) ->
            if answer is 'yes'

              col.articles_request.pull article

              post.collections.addToSet collectionId
              post.save (err) ->
                console.log

            else if answer is 'no'

              col.articles_request.pull article

            col.save (err) ->
              res.redirect "/c/#{col.username}/articles"
