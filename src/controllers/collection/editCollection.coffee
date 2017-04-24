
CONFIG = require '../../config'

Collection = require '../../models/collection'
User = require '../../models/user'

# gm = require 'gm'

# jimp = require 'jimp'

firebase = require '../../firebase'

base64Image = require '../../util/base64Image'

{ upload } = require '../../cloudinary'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(401).json { error: 'Unauthorized' }
  else
    { collectionId } = req.params
    Collection.findOne {
      _id: collectionId
      admin: req.user._id
    }
    .exec (err, col) ->
      if not col
      then res.status(401).json { error: 'Unauthorized or collection not found' }
      else
        post = req.body
        is_anyone_can_join = if post.is_anyone_can_join is 'on' then true else false
        is_anyone_can_request = if post.is_anyone_can_request is 'on' then true else false


        if is_anyone_can_request
          is_anyone_can_post = if post.is_anyone_can_post is 'on' then true else false

        col.name = post.name
        col.username = post.username
        col.description = post.description

        col.is_anyone_can_join = is_anyone_can_join
        col.is_anyone_can_request = is_anyone_can_request
        col.is_anyone_can_post = is_anyone_can_post

        picture = post.picture
        delete post.picture
        col.tags = post.tags.split ','

        col.edited_at = new Date()

        colNameRegex = new RegExp "^#{col.username}$", 'i'

        Collection.findOne { username: colNameRegex, _id: { $ne: col._id }}
        .lean()
        .exec (err, findCol) ->
          if findCol
            res.json { error: 'Username already taken' }
          else
            callback = (ress) ->
              console.log
            upload picture, callback, { public_id: "col/#{col._id}" }
            # buffer = (base64Image picture).data
            # if buffer
            #   jimp.read buffer, (err, img) ->
            #     if err then console.log err
            #     img.cover 200, 200
            #       .write "#{CONFIG.imgDir}col/#{col._id}-200.jpg"
            #     img.cover 100, 100
            #       .write "#{CONFIG.imgDir}col/#{col._id}-100.jpg"
            #     img.cover 50, 50
            #       .write "#{CONFIG.imgDir}col/#{col._id}-50.jpg"
              # gm buffer
              #   .resize '200', '200'
              #   .write "#{CONFIG.imgDir}col/#{col._id}-200.jpg", (err) ->
              #     console.log
              # gm buffer
              #   .resize '100', '100'
              #   .write "#{CONFIG.imgDir}col/#{col._id}-100.jpg", (err) ->
              #     console.log
              # gm buffer
              #   .resize '50', '50'
              #   .write "#{CONFIG.imgDir}col/#{col._id}-50.jpg", (err) ->
              #     console.log

            col.save (err) ->
              res.redirect "/c/#{col.username}"
