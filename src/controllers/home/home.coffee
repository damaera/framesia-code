Post = require '../../models/post'
Love = require '../../models/love'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if req.user
  then res.redirect '/stream'
  else res.render 'home'
