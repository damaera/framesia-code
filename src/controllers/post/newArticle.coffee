# gm = require 'gm'

# jimp = require 'jimp'

base64Image = require '../../util/base64Image'
purifyHtml = require '../../util/purifyHtml'

slugify = require 'arslugify'

CONFIG = require '../../config'

Post = require '../../models/post'
Notif = require '../../models/notif'

franc = require 'franc'

readingTime = require '../../util/readingTime'

iso6393 = require 'iso-639-3'


{ upload } = require '../../cloudinary'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
    res.json { err: true, message: 'Unauthorized' }
  else
    # res.json JSON.parse req.body.data
    postData = JSON.parse req.body.data

    postTemp = {}

    postTemp.content = postData.data
    postTemp.title = postData.title
    postTemp.is_title_center = postData.isTitleCenter
    postTemp.is_cover = postData.isCover

    # get title and subtitle
    counter = 0
    allContent = postData.title

    # image and media, affect reading time
    mediaReadTime = 0

    ii = 0

    isHeading = false

    userId = req.user._id
    userName = req.user.name

    for item in postData.data

      if item.content
        postTemp.content[ii].content = purifyHtml item.content
      ii++

      if item.type isnt 'IFRAME' and item.type isnt 'FIGURE' and item.type isnt 'HR'
        itemText = item.content?.replace(/<.*?>/g, '').replace(/&nbsp;/g, ' ')

        if itemText isnt ''
          if item.list
            for list in item.list
              itemTextList = list.replace /<.*?>/g, ''
              itemText += "#{itemTextList} "
          if counter is 0

            subtitle = itemText

            if item.isDropCap is true and item.dropCapChar
              subtitle = item.dropCapChar + subtitle

            if subtitle.length > 240
            then postTemp.subtitle = "#{subtitle[0..240]}… "
            else postTemp.subtitle = subtitle
          counter++
          allContent += "#{itemText} "

      else if item.type is 'FIGURE'
        mediaReadTime += 4000
      else if item.type is 'IFRAME'
        mediaReadTime += 7000

    if postData.title.length > 3 and allContent.length > 20

      postTemp.language_detected = (iso6393.get franc allContent).iso6391
      lang = postTemp.language_detected
      { time, words } = (readingTime allContent, lang)
      postTemp.reading_time = time*1 + mediaReadTime
      postTemp.word_count = words

      postTemp.is_published = JSON.parse req.body.is_published
      postTemp.tags = JSON.parse req.body.tags

      postTemp.is_response = JSON.parse req.body.is_response
      if postTemp.is_response
        postTemp.response = req.body.response

      # if published, set slug
      if postTemp.is_published
        Puid = require 'puid'
        puid = new Puid true
        postTemp.slug = "#{ slugify postTemp.title }--#{ puid.generate() }"
        postTemp.published_at = new Date

      postTemp.created_at = new Date
      postTemp.edited_at = new Date

      # Model
      newPost = new Post postTemp
      newPost.user = userId

      # make cover
      newPost.is_cover_full = false
      if postData.isCover
        newPost.cover = { width: postData.cover.width, height: postData.cover.height }
        if postData.cover.width >= 1200 and postData.cover.height >= 600
          newPost.is_cover_full = true

      # console.log newPost
      # res.json {}

      # saving
      newPost.save (err) ->
        if err
        then next err
        else
          # saving cover
          if newPost.is_cover
            callback = (ress) ->
              console.log ress
            upload postData.cover.data, callback, { public_id: "post/#{newPost._id}-cover" }
            # buffer = (base64Image postData.cover.data).data
            # if buffer
            #   jimp.read buffer, (err, img) ->
            #     if err then console.log err
            #     img.write "#{CONFIG.imgDir}post/#{newPost._id}-jumbo-cover.jpg"
            #     img.cover 640, 360
            #       .write "#{CONFIG.imgDir}post/#{newPost._id}-big-cover.jpg"
            #     img.cover 140, 120
            #       .write "#{CONFIG.imgDir}post/#{newPost._id}-cover.jpg"
            #     img.cover 240, 150
            #       .write "#{CONFIG.imgDir}post/#{newPost._id}-medium-cover.jpg"
              # gm buffer
              #   .write "#{CONFIG.imgDir}post/#{newPost._id}-jumbo-cover.jpg", (err) ->
              #     console.log
              # gm buffer
              #   .resize '640', '360', '^'
              #   .gravity 'Center'
              #   .crop '640', '360'
              #   .write "#{CONFIG.imgDir}post/#{newPost._id}-big-cover.jpg", (err) ->
              #     console.log
              # gm buffer
              #   .resize '140', '120', '^'
              #   .gravity 'Center'
              #   .crop '140', '120'
              #   .write "#{CONFIG.imgDir}post/#{newPost._id}-cover.jpg", (err) ->
              #     console.log
              # gm buffer
              #   .resize '240', '150', '^'
              #   .gravity 'Center'
              #   .crop '240', '150'
              #   .write "#{CONFIG.imgDir}post/#{newPost._id}-medium-cover.jpg", (err) ->
              #     console.log
          # saving all images
          for img in postData.img
            callback = (ress) ->
              console.log
            upload img.data, callback, { public_id: "post/#{newPost._id}-#{img.id}" }
            # buffer = (base64Image img.data).data
            # if buffer
            #   jimp.read buffer, (err, img) ->
            #     if err then console.log err
            #     img.write "#{CONFIG.imgDir}post/#{newPost._id}-#{img.id}.jpg"
              # gm buffer
              #   .write "#{CONFIG.imgDir}post/#{newPost._id}-#{img.id}.jpg", (err) ->
              #     console.log

          urlBack = "/p/#{newPost._id}"

          # if publish
          if newPost.is_published

            urlBack = "/p/#{newPost.slug}"

            if newPost.is_response
              # increment response_count from article
              Post.findOneAndUpdate { _id: newPost.response }, { $inc : { response_count: 1 }}
              .exec (err, post) ->
                # save notif
                if not post.user.equals userId
                  # body...
                  notifData =
                    from: userId
                    to: post.user
                    notif_type: 'respond'
                    object:
                      post_id: newPost._id


                  newNotif = new Notif notifData
                  newNotif.save (err) ->
                    socketUser = post.user.toString()
                    notifData.from = { _id: userId, name: userName }
                    req.io.to(socketUser).emit 'notif', notifData

          res.json {
            urlBack: urlBack
            articleId: newPost._id
          }
    else res.json { error: true, message: 'too short' }