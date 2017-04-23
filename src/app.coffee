path = require 'path'
favicon = require 'serve-favicon'
logger = require 'morgan'
session = require 'express-session'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
i18n = require 'i18n'
helmet = require 'helmet'
csrf = require 'csurf'

MongoStore = (require 'connect-mongo') session

express = require 'express'
app = express()
http = (require 'http').Server app
io = (require 'socket.io')(http)

{ dbUrl } = require './config'

# createServer = require "auto-sni"

mongoose = require 'mongoose'
passport = require 'passport'

FacebookStrategy = (require 'passport-facebook').Strategy
passportFacebook = require './middleware/passportFacebook'
passportFacebook passport, FacebookStrategy, app

GoogleStrategy = (require 'passport-google-oauth').OAuth2Strategy
passportGoogle = require './middleware/passportGoogle'
passportGoogle passport, GoogleStrategy, app

i18n.configure
  locales: ['en', 'id', 'ja']
  cookie: 'lang'
  directory: __dirname + '/locales'

app.set 'env', 'development'
# app.set 'env', 'production'

# view engine setup
app.set 'views', path.join __dirname, 'views'
app.set 'view engine', 'jade'

# uncomment after placing your favicon
app.use favicon "#{__dirname}/favicon.ico"
app.use logger 'dev'

# app.use '/fr-img', express.static __dirname + '../fr-img/'
app.use '/asset/frms', express.static __dirname + '../asset/frms'

csrfProtection = csrf { cookie: true }

app.use bodyParser.json limit: '64mb'
app.use bodyParser.urlencoded { limit: '64mb', extended: true }
app.use cookieParser()
app.use csrfProtection
app.use session {
  saveUninitialized: false
  resave: false
  secret: 'donquixote doflamingo'
  store: new MongoStore {
    url: "#{dbUrl}/frms-sess"
  }
}



# csrf
app.use i18n.init
app.use helmet()

# passport
app.use passport.initialize()
app.use passport.session()

connect = () ->
  options =
    server:
      socketOptions:
        keepAlive: 1
  mongoose.connect "#{dbUrl}", options
connect()

console.log __dirname

mongoose.connection.on 'error', console.log
mongoose.connection.on 'disconnected', connect

# io.on 'connection', (socket) ->
#   socket.join
#   (io.to socket.id).emit 'notif', socket.id

# app.use express.static path.join __dirname, 'public'
app.use '/asset', express.static path.join __dirname, '../asset'
app.use '/fr-img', express.static path.join __dirname, '../fr-img'

# routes
routes = require './routes'
routes app, passport, io


app.use (err, req, res, next) ->
  if err.code isnt 'EBADCSRFTOKEN'
  then next err
  else
    res.status 403
    res.send 'csrf'


# catch 404 and forward to error handler
app.use (req, res, next) ->
  err = new Error 'Not Found'
  err.status = 404
  next err

# error handlers


# development error handler
# will print stacktrace
# if app.get('env') is 'development'

app.use (err, req, res, next) ->
  res.status err.status or 500
  if req.xhr
    res.json err.message
  else
    res.render 'error',
      message: err.message,
      error:
        stack: ''
        status: ''

# production error handler
# no stacktraces leaked to user
# app.use (err, req, res, next) ->
#   res.status err.status or 500
#   res.render 'error/index',
#     message: err.message,
#     error: {}

# Create HTTP server.
# http = require 'http'
# server = http.createServer app


port = process.env.PORT || 8080;

http.listen port, () ->
  console.log "listening... on #{port}"
# Listen on provided port, on all network interfaces.
# server.listen 2000
# console.log 'hore'

# sniOptions =
#   email: 'damaera@live.com'
#   agreeTos: true
#   ports:
#     http: 2020
#     https: 2021

# createServer sniOptions, app
