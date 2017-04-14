Block = require '../../models/block'

module.exports = (req, res, next) ->
  { _id } = req.body

  Block.findOne { _id: _id }
  .exec (err, block) ->
    if block
      block.remove (err) ->
        res.redirect '/x/super-admin-unblock'
    else
      res.send "Article not found"