Collection = require '../../models/collection'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if req.user
    userId = req.user._id
    findData =
      $or: [
        { admin: userId }
        { member: userId }
      ]

    Collection.find findData
    .select 'name username edited_at'
    .lean()
    .exec (err, collections) ->
      res.json collections

  else
    res.status(403).json { error: 'Unauthorized' }
