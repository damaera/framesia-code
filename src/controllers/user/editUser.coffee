
CONFIG = require '../../config'

User = require '../../models/user'

# gm = require 'gm'

# jimp = require 'jimp'
{ upload, image } = require '../../cloudinary'

base64Image = require '../../util/base64Image'

module.exports = (req, res, next) ->
  post = req.body
  post.userId = req.user._id
  User.findById post.userId, (err, user) ->
    if err
    then next new Error 'User not found'
    else
      user.username = post.username
      user.description = post.description
      user.is_new = false
      user.picture = undefined
      user.language_chosen = post.language_chosen
      user.country_chosen = post.country_chosen
      user.update_at = Date.now()

      uNameRegex = new RegExp "^#{user.username}$", 'i'

      User.findOne { username: uNameRegex, _id: { $ne: user._id }}
      .exec (err, findUser) ->
        if findUser
          res.json { error: 'Username already taken' }
        else
          if post.picture isnt ''
            callback = (ress) ->
              req.login user, (err) ->
                user.save (err) ->
                  if err
                  then next new Error err.message
                  else res.redirect '/'
            upload post.picture, callback, { public_id: "/ava/#{user._id}" }

            # buffer = (base64Image post.picture).data
            # if buffer
            #   jimp.read buffer, (err, img) ->
            #     if err then console.log err
                # storageRef = firebase.storageRef
                # img.cover 200, 200
                #   .getBuffer jimp.MIME_JPEG, (img2) ->
                #     storageRef
                #       .child "#{CONFIG.imgDir}ava/#{user._id}-200.jpg"
                #       .put img2
                # img.cover 100, 100
                #   .write "#{CONFIG.imgDir}ava/#{user._id}-100.jpg"
                # img.cover 50, 50
                #   .write "#{CONFIG.imgDir}ava/#{user._id}-50.jpg"
                # req.login user, (err) ->
                #   user.save (err) ->
                #     if err
                #     then next new Error err.message
                #     else res.redirect '/'

              # gm buffer
              #   .resize '200', '200'
              #   .write "#{CONFIG.imgDir}ava/#{user._id}-200.jpg", (err) ->
              #     console.log
              # gm buffer
              #   .resize '100', '100'
              #   .write "#{CONFIG.imgDir}ava/#{user._id}-100.jpg", (err) ->
              #     console.log
              # gm buffer
              #   .resize '50', '50'
              #   .write "#{CONFIG.imgDir}ava/#{user._id}-50.jpg", (err) ->
              #     req.login user, (err) ->
              #       user.save (err) ->
              #         if err
              #         then next new Error err.message
              #         else res.redirect '/'
          else
            req.login user, (err) ->
              user.save (err) ->
                if err
                then next new Error err.message
                else res.redirect '/'
