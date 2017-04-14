User = require '../../models/user'

_ = require 'lodash'

module.exports = (req, res, next) ->
  { q, last } = req.query
  last = last*1 or 0

  console.log last

  qRegex = new RegExp q, "i"

  findData = 
    $text: { $search : q }

  findScore =
    score: { $meta: 'textScore' }

  User.find findData, findScore
  .select 'name username description'
  .skip last
  .limit 7
  .sort { score: { $meta: 'textScore' }}
  .lean()
  .exec (err, users) ->
    res.json users
