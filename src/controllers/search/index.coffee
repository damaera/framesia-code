express = require 'express'
router = express.Router()

Post = require '../../models/post'

collections = require './collections'
users = require './users'
topics = require './topics'
posts = require './posts'

router.get '/collections', collections
router.get '/users', users
router.get '/topics', topics
router.get '/posts', posts

router.get '/', (req, res, next) ->
  { q, type } = req.query
  q = q or ''
  type = type or ''

  res.render 'search', { query: q, type: type }

module.exports = router
