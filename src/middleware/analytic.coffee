Analytic = require '../models/analytic'
Stat = require '../models/stat'

ip2country = require 'ip2country'

module.exports = (req, res, next) ->

  UAparser = require 'ua-parser-js'
  UAheader = req.headers['user-agent']
  UA = UAparser UAheader

  isXhr = req.xhr or ( req.headers.accept.indexOf('json') > -1 )

  ip = req.ip
  country =  ip2country req.ip

  analyticData =
    path: req.path
    is_xhr: isXhr
    is_fresh: false
    ip: ip
    method: req.method
    time: new Date
    country: country

  if not isXhr
    analyticData.referer = req.headers.referer
    analyticData.query = req.query

  if req.fresh
    analyticData.is_fresh = true
    analyticData.browser =
      name: UA.browser.name
      version: UA.browser.version
    analyticData.os =
      name: UA.os.name
      version: UA.browser.version
    analyticData.country = country

  if req.user
    analyticData.user = req.user._id

  newAnalytic = new Analytic analyticData
  newAnalytic.save (err) ->
    console.log

  req.analytic = analyticData

  next()
