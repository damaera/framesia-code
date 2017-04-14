
CONFIG = require '../../config'

Collection = require '../../models/collection'
User = require '../../models/user'

# gm = require 'gm'

# jimp = require 'jimp'

base64Image = require '../../util/base64Image'

_ = require 'lodash'

{ upload } = require '../../cloudinary'

module.exports = (req, res, next) ->
  if not req.user
  then res.status(403).json { error: 'Unauthorized' }
  else
    post = req.body

    is_anyone_can_join = if post.is_anyone_can_join is 'on' then true else false
    is_anyone_can_request = if post.is_anyone_can_request is 'on' then true else false

    if is_anyone_can_request
      is_anyone_can_post = if post.is_anyone_can_post is 'on' then true else false

    post.is_anyone_can_join = is_anyone_can_join
    post.is_anyone_can_request = is_anyone_can_request
    post.is_anyone_can_post = is_anyone_can_post

    picture = post.picture
    delete post.picture
    post.tags = post.tags.split ','


    colNameRegex = new RegExp "^#{post.username}$", 'i'

    Collection.findOne { username: colNameRegex }
    .lean()
    .exec (err, findCol) ->
      if findCol
        res.json { error: 'Username already taken' }
      else
        # new collection
        newCollection = new Collection post

        callback = (ress) ->
          console.log
        upload picture, callback, { public_id: "col/#{newCollection._id}" }
        # buffer = (base64Image picture).data
        # if buffer
        #   jimp.read buffer, (err, img) ->
        #     if err then console.log err
        #     img.cover 200, 200
        #       .write "#{CONFIG.imgDir}col/#{newCollection._id}-200.jpg"
        #     img.cover 100, 100
        #       .write "#{CONFIG.imgDir}col/#{newCollection._id}-100.jpg"
        #     img.cover 50, 50
        #       .write "#{CONFIG.imgDir}col/#{newCollection._id}-50.jpg"
          # gm buffer
          #   .resize '200', '200'
          #   .write "#{CONFIG.imgDir}col/#{newCollection._id}-200.jpg", (err) ->
          #     console.log
          # gm buffer
          #   .resize '100', '100'
          #   .write "#{CONFIG.imgDir}col/#{newCollection._id}-100.jpg", (err) ->
          #     console.log
          # gm buffer
          #   .resize '50', '50'
          #   .write "#{CONFIG.imgDir}col/#{newCollection._id}-50.jpg", (err) ->
          #     console.log

        userId = req.user._id

        newCollection.admin = [userId]
        newCollection.owner = userId

        invitedUsers = post.invite.toLowerCase()
          .replace /@/g, '' # remove @ symbol
          .replace (new RegExp req.user.username, 'g'), '' # remove you
          .split ' '

        invitedUsers = _.uniq invitedUsers

        User.find { username: { $in: invitedUsers }}
        .select '_id'
        .lean()
        .exec (err, users) ->
          invitedUsers = []
          for user in users
            invitedUsers.push user._id.toString()

          newCollection.member = invitedUsers

          newCollection.save (err) ->
            res.redirect "/c/#{newCollection.username}"
