express = require 'express'
router = express.Router()

getDrafts = require './getDrafts'
getArticles = require './getArticles'
getLovedArticles = require './getLovedArticles'
getCollections = require './getCollections'
getStatsStream = require './getStatsStream'
getNotif = require './getNotif'

readNotif = require './readNotif'
stats = require './stats'

# GET users listing.
router.all '*', (req, res, next) ->
  if not req.user
  then res.redirect '/'
  else next()

router.get '/edit', (req, res, next) ->
  res.render 'edit-user'

router.get '/stats', stats

router.get '/articles', (req, res, next) ->
  res.render 'me-article'
router.get '/drafts', (req, res, next) ->
  res.render 'me-draft'
router.get '/loved-articles', (req, res, next) ->
  res.render 'me-loved-article'
router.get '/notifications', (req, res, next) ->
  res.render 'me-notif'

router.get '/stats-stream', getStatsStream

router.get '/collections', (req, res, next) ->
  Collection = require '../../models/collection'

  _ = require 'lodash'

  userId = req.user._id
  findData =
    $or: [
      { admin: userId }
      { member: userId }
    ]

  Collection.find findData
  .select 'user name username description admin member'
  .lean()
  .exec (err, collections) ->
    admin = []
    member = []
    _.map collections, (col) ->

      isAdmin = false
      _.map col.admin, (admin) ->
        if admin.equals userId
          isAdmin = true

      if isAdmin
      then admin.push col
      else member.push col
    res.render 'me-collection', { admin: admin, member: member }
  # res.render 'me-collection'

# router.get '/loved-articles', getLovedArticles

router.get '/feed-drafts', getDrafts
router.get '/feed-articles', getArticles
router.get '/feed-loved-articles', getLovedArticles
router.get '/feed-collections', getCollections
router.get '/feed-notif', getNotif

router.post '/read-notif', readNotif


module.exports = router
