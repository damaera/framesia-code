express = require 'express'
router = express.Router()

userWhiteList = ['damaera']

router.all '*', (req, res, next) ->
  if not req.user
  then res.status(403).send ''
  else
    whiteList = false
    for uname in userWhiteList
      if req.user.username == uname
        whiteList = true

    if whiteList is true
    then next()
    else res.status(403).send ''

router.get '/super-admin', (req, res, next) ->
  res.send 'super-admin'

unblock = require './unblock'
report = require './report'
query = require './query'

router.get '/super-admin-report', report
router.get '/super-admin-query', query
router.get '/super-admin-unblock', unblock

postBlock = require './postBlock'
postUnblock = require './postUnblock'

router.post '/block-article', postBlock
router.post '/unblock-article', postUnblock

module.exports = router