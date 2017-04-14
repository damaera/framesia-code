express = require 'express'
router = express.Router()

getLoveArticle = require './getLoveArticle'
postLove = require './postLove'

router.get '/:articleId', getLoveArticle
router.post '/', postLove

module.exports = router
