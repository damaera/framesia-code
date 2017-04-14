express = require 'express'
router = express.Router()

editUser = require './editUser'
getUsername = require './getUsername'
getId = require './getId'

getLovedArticles = require './getLovedArticles'
getCollections = require './getCollections'
getFollowingCollections = require './getFollowingCollections'

getFeedLovedArticles = require './getFeedLovedArticles'
getFeedCollections = require './getFeedCollections'
getFeedFollowingCollections = require './getFeedFollowingCollections'


# GET users listing.
router.get '/first-time', (req, res, next) ->
  if req.user.is_new
  then res.render 'edit-user'
  else res.redirect '/me/edit'

# GET user by username
router.get '/:userId', getId
router.get '/:username', getUsername


router.get '/:username/loved-articles', getLovedArticles
router.get '/:username/collections', getCollections
router.get '/:username/following-collections', getFollowingCollections


router.get '/:username/feed-loved-articles', getFeedLovedArticles
router.get '/:username/feed-collections', getFeedCollections
router.get '/:username/feed-following-collections', getFeedFollowingCollections

router.post '/edit', editUser

module.exports = router
