express = require 'express'
router = express.Router()

getTrendArticles = require './getTrendArticles'
getTrendTopics = require './getTrendTopics'

router.get '/articles', getTrendArticles
router.get '/topics', getTrendTopics

module.exports = router
