express = require 'express'
router = express.Router()

getFollow = require './getFollow'
addFollow = require './addFollow'

router.get '/:followType/:followId', getFollow
router.post '/', addFollow

module.exports = router
