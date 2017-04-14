Love = require '../../models/love'

module.exports = (req, res, next) ->
  if not req.user
    res.json { err: true, message: 'Unauthorized' }

  userId = req.user._id
  { articleId } = req.params

  loveData =
    user: userId
    to: articleId
    love_type: 'posts'

  Love
    .findOne loveData
    .exec (err, data) ->
      if err
      then res.json { err: true, message: 'Server Error' }
      else if data
      then res.json { article: articleId, err: false, message: 'Already Loved', loving: true }
      else res.json { err: false, message: 'Not Loved', loving: false  }
