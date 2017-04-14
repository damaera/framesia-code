Post = require '../../models/post'
Collection = require '../../models/collection'

mongoose = require 'mongoose'
_ = require 'lodash'

fs = require 'fs'

module.exports = (req, res, next) ->

  config = JSON.parse fs.readFileSync "#{__dirname}/../../setting.json", 'utf8'
    
  { editor_collection } = config


  if !req.user
  then res.redirect '/'
  else
    
    editorCountry = editor_collection[req.user.country_chosen]

    populateQuery1 =
      path: 'featured_articles'
      select: 'title subtitle is_cover is_cover_full user published_at love_count slug'
      populate:
        path: 'user'
        select: '_id name username'
        model: 'User'
    populateQuery2 =
      path: 'main_featured_article'
      select: 'title subtitle is_cover is_cover_full user published_at love_count slug'
      populate:
        path: 'user'
        select: '_id name username'
        model: 'User'
    Collection.findOne {
      username: editorCountry
    }
    .select 'featured_articles main_featured_article'
    .populate populateQuery1
    .populate populateQuery2
    .exec (err, col) ->
      res.render 'stream', { collection: col }