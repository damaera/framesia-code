Collection = require '../../models/collection'
User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  { collectionName } = req.params
  Collection.findOne {
    username: collectionName
  }
  .populate 'owner', 'name username description updated_at'
  .populate 'admin', 'name username description updated_at'
  .populate 'member', 'name username description updated_at'
  .populate 'member_requested', 'name username description updated_at'
  .lean()
  .exec (err, col) ->
    if not col
      next()
    else
      isOwner = false
      isAdmin = false
      if req.user
        userId = req.user._id.toString()
        _.map col.admin, (userAdmin) ->
          if userAdmin._id.equals userId then isAdmin = true

        if col.owner._id.equals userId then isOwner = true

      res.render 'collection-people', { collection: col, is_owner: isOwner, is_admin: isAdmin }
