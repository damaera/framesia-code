Post = require '../../models/post'
Love = require '../../models/love'
Collection = require '../../models/collection'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
    res.json { error: 'Unauthorized' }
  else
    { collectionName } = req.params
    userId = req.user._id

    populateQuery =
      path: 'articles_request'
      select: '_id title subtitle slug user published_at is_cover love_count reading_time is_repost repost is_response response tags collections edited_at'
      populate:
        path: 'user'
        select: '_id name username updated_at'
        model: 'User'

    Collection.findOne {
      username: collectionName
    }
    .populate populateQuery
    .lean()
    .exec (err, col) ->
      if not col
      then res.json { error: true, message: 'Collection not found' }
      else
        if !col.is_anyone_can_request or col.is_anyone_can_post
          res.redirect "/c/#{col.username}"
        else
          isAdmin = false
          _.map col.admin, (admin) ->
            if admin.equals userId
              isAdmin = true
          if !isAdmin
            res.redirect "/c/#{col.username}"
          else
            res.json col.articles_request
