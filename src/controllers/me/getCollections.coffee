Collection = require '../../models/collection'

_ = require 'lodash'

module.exports = (req, res, next) ->
  userId = req.user._id
  findData =
    $or: [
      { admin: userId }
      { member: userId }
    ]

  Collection.find findData
  .select 'user name username description follower_count edited_at'
  .lean()
  .exec (err, collections) ->
    # collections2 = []
    # _.map collections, (col) ->
    #   if _.includes userId, col.admin
    #   then col.is_admin = true
    #   collections2.push col
    res.json collections
