Post = require '../../models/post'

Block = require '../../models/block'

module.exports = (req, res, next) ->
  { article_id, block_type } = req.body

  Post.findOne { _id: article_id, is_repost: false }
  .exec (err, post) ->
    if post
      dataBlock =
        block_id: article_id
        time: Date.now()
        block_type: block_type

      newBlock = new Block dataBlock
      newBlock.save (err) ->
        res.redirect '/x/super-admin-report'
    else
      res.send "Article not found"