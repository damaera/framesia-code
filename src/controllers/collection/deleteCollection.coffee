glob = require 'glob'
fs = require 'fs'

CONFIG = require '../../config'

Collection = require '../../models/collection'
Post = require '../../models/post'
Follow = require '../../models/follow'
Notif = require '../../models/notif'

module.exports = (req, res, next) ->
  post = req.body

  if !req.user then res.json { error: 'Unauthorized' }
  else

    { collectionId } = req.params
    { username } = req.body

    glob.glob "#{CONFIG.imgDir}col/#{collectionId}*", (err, files) ->
      for file in files
        fs.unlink file

    Collection.findOne {
      _id: collectionId
      username: username
      owner: req.user._id
    }
    .exec (err, deletedCol) ->
      if err
      then next err
      else if deletedCol
        Post.update { collections: deletedCol._id }, { collections: { $pull: deletedCol._id }}, {multi: true}, (err, raw) ->
          console.log

        Follow.find { follow_type: 'Collection' , to: deletedCol._id }
        .remove()
        .exec()

        Notif.find { 'object.collection_id': deletedCol._id }
        .remove()
        .exec()

        deletedCol.remove (err) ->
          res.redirect '/me/collections'

      else res.json { error: 'Collection not found' }
