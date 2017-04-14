# Comment = require '../../models/comment'
# Collection = require '../../models/collection'
# Post = require '../../models/post'
# User = require '../../models/user'
# Love = require '../../models/love'
# Stat = require '../../models/stat'
# Follow = require '../../models/follow'

module.exports = (req, res, next) ->
  { collection, query } = req.query
  query or= '{}'
  

  if collection and query
    Model = require "../../models/#{collection}"

    try
      query = JSON.parse query
    Model
    .find query
    .limit 10
    .exec (err, result ) ->
      query = JSON.stringify query, null, 2
      if err
        res.render 'admin-query', { result: JSON.stringify(err), collection: collection, query: query }
      else
        res.render 'admin-query', { result: JSON.stringify(result), collection: collection, query: query }

  else
    res.render 'admin-query'