Block = require '../../models/block'

module.exports = (req, res, next) ->

  Block.find { block_type: 'Post' }
  .populate 'block_id', 'title subtitle slug'
  .limit 30
  .lean()
  .exec (err, blocks) ->
    res.render 'admin-unblock', { blocks: blocks }