catalogPick = require './util/catalogPick'
ip2country = require 'ip2country'

module.exports = (app, passport, io) ->

  ensuredLogin = require './middleware/ensuredLogin'
  locales = require './middleware/locales'
  trailingSlash = require './middleware/trailingSlash'
  analytic = require './middleware/analytic'
  sitemap = require './middleware/sitemap'

  app.use trailingSlash
  app.use ensuredLogin
  app.use locales
  # app.use analytic

  app.use (req, res, next) ->
    req.country = (ip2country req.ip).toLowerCase()
    next()

  app.use (req, res, next) ->

    # console.log req.country

    locale = req.user?.language_chosen or 'id'

    req.setLocale locale
    res.locals.setLocale locale

    res.locals.CATALOG = catalogPick(req.getCatalog locale)

    if req.user
      app.set 'userId', req.user._id
    else
      app.set 'userId', 0

    next()

  # a for auth
  app.get '/a/facebook', passport.authenticate 'facebook'
  app.get '/a/facebook/callback', (passport.authenticate 'facebook', { failureRedirect: '/', successRedirect: '/' })
  app.get '/a/google', passport.authenticate 'google'
  app.get '/a/google/callback', (passport.authenticate 'google', { failureRedirect: '/', successRedirect: '/' })


  socketViewArticle = require './controllers/socket/viewArticle'
  socketReadArticle = require './controllers/socket/readArticle'

  io.on 'connection', (socket) ->
    userId = app.get 'userId'
    socket.join userId

    socket.on 'view-article', (data) ->
      socketViewArticle data, userId
    socket.on 'read-article', (data) ->
      socketReadArticle data, userId

  app.use (req, res, next) ->
    req.io = io
    next()

  app.get '/a/logout', (req, res) ->
    req.logout()
    res.redirect '/'

  app.get '/!', (req, res) ->
    res.send '!!'

  app.get '/sitemap.xml', sitemap

  user = require './controllers/user'
  post = require './controllers/post'
  love = require './controllers/love'
  follow = require './controllers/follow'
  comment = require './controllers/comment'
  collection = require './controllers/collection'
  search = require './controllers/search'
  me = require './controllers/me'
  home = require './controllers/home'
  embed = require './controllers/embed'
  trend = require './controllers/trend'
  read = require './controllers/read'
  admin = require './controllers/admin'

  app.use '/c', collection
  app.use '/c', comment
  app.use '/', home
  app.use '/u', user
  app.use '/p', post
  app.use '/f', follow
  app.use '/l', love
  app.use '/s', search
  app.use '/e', embed
  app.use '/t', trend
  app.use '/read', read
  app.use '/me', me
  app.use '/x', admin
