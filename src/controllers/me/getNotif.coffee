Notif = require '../../models/notif'

module.exports = (req, res, next) ->
  { last } = req.query

  findData =
    to: req.user._id

  if last
    findData._id = { $lt: last }

  Notif.find findData
  .populate 'from', 'name username'
  .populate 'object.post_id', 'slug title'
  .populate 'object.comment_id', 'content'
  .sort '-_id'
  .limit 5
  .lean()
  .exec (err, notifs) ->
    res.json { notifs: notifs, menotif: true }
