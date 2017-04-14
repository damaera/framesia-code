crypto = require 'crypto'
CONFIG = require '../config'

TEXT = require '../util/i18n'

BIG_NUMBER = (require 'big-number').n


module.exports = (req, res, next) ->


  res.locals.PATH = req.path
  res.locals.QUERY = req.query

  res.locals.API_URL = CONFIG.apiUrl
  res.locals.SITE_URL = CONFIG.siteUrl
  res.locals.ASSET_URL = CONFIG.assetUrl
  res.locals.IMG_URL = CONFIG.imgUrl

  res.locals.BIG_NUMBER = BIG_NUMBER
  res.locals.USER = req.user

  res.locals.CSRF = req.csrfToken()

  next()
