Notif = require '../../models/notif'

module.exports = (req, res, next) ->

  Notif.update {
    to: req.user._id
    is_read: false
  }, {
    is_read: true
  }, (err, notifs) ->

    socketUser = req.user._id.toString()
    req.io.to(socketUser).emit 'read-notif', true

    res.json notifs
