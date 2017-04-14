express = require 'express'
router = express.Router()

router.get '/twitter', (req, res, next) ->
  res.render 'embed/twitter'

router.get '/fb-video', (req, res, next) ->
  res.render 'embed/fb-video'

router.get '/fb-post', (req, res, next) ->
  res.render 'embed/fb-post'

module.exports = router
