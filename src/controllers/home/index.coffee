express = require 'express'
router = express.Router()

# home = require './home'
# username = require './username'
mostLoved = require './mostLoved'
getStream = require './getStream'
getTrending = require './getTrending'
getHome = require './getHome'

router.get '/', getHome


router.get '/stream', getStream

router.get '/trending', getTrending

router.get '/most-loved', mostLoved


# router.get '/:username', username
# router.get '/:username/:slug', article


module.exports = router
