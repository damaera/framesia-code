express = require 'express'
router = express.Router()

# getMeCollection = require './getMeCollection'
# router.get '/feed-me-collections', getMeCollection

getCollection = require './getCollection'
getEditCollection = require './getEditCollection'
getPeopleCollection = require './getPeopleCollection'
getArticleCollection = require './getArticleCollection'

router.get '/:collectionName', getCollection
router.get '/:collectionName/edit', getEditCollection
router.get '/:collectionName/people', getPeopleCollection
router.get '/:collectionName/articles', getArticleCollection

getFeedArticles = require './getFeedArticles'
getFeedRequestedArticles = require './getFeedRequestedArticles'

router.get '/:collectionName/feed-requested-articles', getFeedRequestedArticles
router.get '/:collectionName/feed-articles', getFeedArticles

getRequestJoin = require './getRequestJoin'

router.get '/request-join/:collectionId', getRequestJoin

newCollection = require './newCollection'
editCollection = require './editCollection'
addArticle = require './addArticle'
deleteCollection = require './deleteCollection'

router.post '/new-collection', newCollection
router.post '/edit-collection/:collectionId', editCollection
router.post '/delete-collection/:collectionId', deleteCollection
router.post '/add-article', addArticle

invitePeople = require './invitePeople'
makeAdmin = require './makeAdmin'
removeAdmin = require './removeAdmin'
removeMember = require './removeMember'
quitCollection = require './quitCollection'
requestJoin = require './requestJoin'
acceptMember = require './acceptMember'
acceptArticle = require './acceptArticle'
removeArticle = require './removeArticle'

makeFeatured = require './makeFeatured'
mainFeatured = require './mainFeatured'
removeFeatured = require './removeFeatured'
removeMainFeatured = require './removeMainFeatured'


router.post '/invite-people/:collectionId', invitePeople
router.post '/make-admin/:collectionId', makeAdmin
router.post '/remove-admin/:collectionId', removeAdmin
router.post '/remove-member/:collectionId', removeMember
router.post '/quit-collection/:collectionId', quitCollection
router.post '/request-join/:collectionId', requestJoin
router.post '/accept-member/:collectionId', acceptMember
router.post '/accept-article/:collectionId', acceptArticle
router.post '/remove-article/:collectionId', removeArticle

router.post '/make-featured/:collectionId', makeFeatured
router.post '/main-featured/:collectionId', mainFeatured
router.post '/remove-featured/:collectionId', removeFeatured
router.post '/remove-main-featured/:collectionId', removeMainFeatured




module.exports = router
