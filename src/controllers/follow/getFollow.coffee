Follow = require '../../models/follow'

module.exports = (req, res, next) ->

  if not req.user
    res.json { err: true, message: 'Unauthorized' }

  else
    userId = req.user._id
    { followId, followType } = req.params

    followData =
      from: userId
      to: followId
      follow_type: followType

    Follow
      .findOne followData
      .lean()
      .exec (err, data) ->
        if err
        then res.json { err: true, message: 'Server Error' }
        else if data
        then res.json { err: false, message: 'Already follow', following: true }
        else res.json { err: false, message: 'Not follow', following: false  }
