express = require 'express'
router = express.Router()

Post = require '../../models/post'
Link = require '../../models/link'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { id } = req.body

  # Post
  # .findOne {_id: id}
  # .exec (err, linkItem) ->
  #   if linkItem

