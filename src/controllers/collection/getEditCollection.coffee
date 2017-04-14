Collection = require '../../models/collection'
# User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if req.user
    { collectionName } = req.params
    Collection.findOne { username: collectionName }
    .lean()
    .exec (err, col) ->
      if not col
        next()
      else
        isAdmin = false
        userId = req.user._id
        _.map col.admin, (userAdmin) ->
          if userAdmin.equals userId then isAdmin = true


        if isAdmin
          isOwner = false
          if col.owner.equals userId
            isOwner = true
          res.render 'edit-collection', { collection: col, isOwner: isOwner }
        else res.redirect "/c/#{col.username}"
  else
    res.status(403).redirect "/"
