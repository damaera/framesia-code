express = require 'express'
router = express.Router()

getArticle = require './getArticle'
getArticleId = require './getArticleId'
getNewArticle = require './getNewArticle'
getArticleIdEdit = require './getArticleIdEdit'

getHomeFeed = require './getHomeFeed'
getStreamFeed = require './getStreamFeed'
getProfileFeed = require './getProfileFeed'

getFeedArticleId = require './getFeedArticleId'


deleteArticle = require './deleteArticle'
newArticle = require './newArticle'
editArticle = require './editArticle'
publishArticle = require './publishArticle'
repostArticle = require './repostArticle'
repostArticleLink = require './repostArticleLink'
reportArticle = require './reportArticle'


# GET new article
router.get '/new-article', getNewArticle

router.get '/new-collection', (req, res, next) ->
  if req.user
  then res.render 'new-collection'
  else res.redirect '/'

# GET new article
router.get '/try-editor', (req, res, next) ->
  res.render 'try-editor'

router.get '/home-feed', getHomeFeed
router.get '/stream-feed', getStreamFeed
router.get '/profile-feed/:userId', getProfileFeed

router.get '/:articleId', getArticleId
router.get '/:slug', getArticle
router.get '/:articleId/edit', getArticleIdEdit

router.get '/:articleId/my-activity', getFeedArticleId

router.post '/delete-article', deleteArticle
router.post '/new-article', newArticle
router.post '/edit-article', editArticle
router.post '/publish-article', publishArticle
router.post '/repost-article', repostArticle
router.post '/repost-article-link', repostArticleLink
router.post '/report-article', reportArticle

module.exports = router
