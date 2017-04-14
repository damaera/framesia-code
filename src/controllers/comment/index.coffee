express = require 'express'
router = express.Router()

postComment = require './postComment'
deleteComment = require './deleteComment'
getCommentPost = require './getCommentPost'
# postReply = require './postReply'

router.get '/a/:articleId', getCommentPost

router.post '/', postComment
router.post '/delete/:commentId', deleteComment
# router.post '/reply', postReply

module.exports = router
