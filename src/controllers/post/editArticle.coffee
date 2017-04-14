# gm = require 'gm'

# jimp = require 'jimp'

base64Image = require '../../util/base64Image'
# slugify = require '../../util/slugify'
purifyHtml = require '../../util/purifyHtml'

jsondiffpatch = require 'jsondiffpatch'

CONFIG = require '../../config'

Post = require '../../models/post'
Notif = require '../../models/notif'

slugify = require 'arslugify'
franc = require 'franc'

readingTime = require '../../util/readingTime'

iso6393 = require 'iso-639-3'

{ upload } = require '../../cloudinary'

module.exports = (req, res, next) ->
  if not req.user
    res.json { err: true, message: 'Unauthorized' }
  else
    # res.json JSON.parse req.body.data
    postData = (JSON.parse req.body.data) or { data: {} }

    articleId = req.body.id

    is_published = req.body.is_published
    tags = JSON.parse req.body.tags

    userId = req.user._id
    userName = req.user.name

    Post.findOne {
      _id: articleId
      user: userId
    }
    .exec (err, post) ->
      if err
      then next err
      else if post
        newContent = jsondiffpatch.patch post.content, postData.data
        post.content = newContent

        post.title = req.body.title
        post.is_title_center = req.body.isTitleCenter

        if req.body.isCoverChanged
          post.is_cover = req.body.isCover
          post.cover.width = req.body.cover.width
          post.cover.height = req.body.cover.height

        counter = 0
        allContent = post.title

        # image and media, affect reading time
        mediaReadTime = 0
        # console.log post
        # res.json {}

        ii = 0
        for item in newContent
          if item.content
            post.content[ii].content = purifyHtml item.content
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
                then post.subtitle = "#{subtitle[0..240]}… "
                else post.subtitle = subtitle
              counter++
              allContent += "#{itemText} "

          else if item.type is 'FIGURE'
            mediaReadTime += 4000
          else if item.type is 'IFRAME'
            mediaReadTime += 7000

        console.log allContent

        if post.title.length > 3 and allContent.length > 20

          post.language_detected = (iso6393.get franc allContent).iso6391
          lang = post.language_detected
          { time, words } = (readingTime allContent, lang)
          post.reading_time = time*1 + mediaReadTime
          post.word_count = words

          post.edited_at = new Date()
          post.tags = tags

          # if not published before, set slug
          # once is published, cannot revert back
          if not post.is_published

            # from not published -> published (first time publish)
            post.is_published = is_published
            if post.is_published

              post.published_at = new Date()

              Puid = require 'puid'
              puid = new Puid true
              post.slug = "#{ slugify post.title }--#{ puid.generate() }"

              if post.is_response
                # increment response count
                Post.findOneAndUpdate { _id: post.response }, { $inc : { response_count: 1 }}
                .exec (err, post) ->

                  if not post.user.equals userId

                    notifData =
                      from: userId
                      to: post.user
                      notif_type: 'respond'
                      object:
                        post_id: post._id

                    newNotif = new Notif notifData
                    newNotif.save (err) ->
                      socketUser = post.user.toString()
                      notifData.from = { _id: userId, name: userName }
                      req.io.to(socketUser).emit 'notif', notifData
          else
            puidBefore = (post.slug.split '--')[1]
            post.slug = "#{ slugify post.title }--#{ puidBefore }"

          if req.body.isCoverChanged
            post.is_cover_full = false
            if post.is_cover
              post.cover = { width: req.body.cover.width, height: req.body.cover.height }
              if post.cover.width >= 1200 and post.cover.height >= 600
                post.is_cover_full = true

          post.markModified 'content'
          # console.log post

          post.save (err) ->
            if err
            then next err
            else
              if req.body.isCoverChanged
                if post.is_cover
                  callback = (ress) ->
                    console.log
                  upload req.body.cover.data, callback, { public_id: "post/#{post._id}-cover" }
                  # buffer = (base64Image req.body.cover.data).data
                  # if buffer
                  #   jimp.read buffer, (err, img) ->
                  #     if err then console.log err
                  #     img.write "#{CONFIG.imgDir}post/#{post._id}-jumbo-cover.jpg", (err2) ->
                  #       console.log err2
                  #     img.cover 640, 360
                  #       .write "#{CONFIG.imgDir}post/#{post._id}-big-cover.jpg"
                  #     img.cover 140, 120
                  #       .write "#{CONFIG.imgDir}post/#{post._id}-cover.jpg"
                  #     img.cover 240, 150
                  #       .write "#{CONFIG.imgDir}post/#{post._id}-medium-cover.jpg"
                    # gm buffer
                    #   .write "#{CONFIG.imgDir}post/#{post._id}-jumbo-cover.jpg", (err) ->
                    #     console.log
                    # gm buffer
                    #   .resize '640', '360', '^'
                    #   .gravity 'Center'
                    #   .crop '640', '360'
                    #   .write "#{CONFIG.imgDir}post/#{post._id}-big-cover.jpg", (err) ->
                    #     console.log
                    # gm buffer
                    #   .resize '140', '120', '^'
                    #   .gravity 'Center'
                    #   .crop '140', '120'
                    #   .write "#{CONFIG.imgDir}post/#{post._id}-cover.jpg", (err) ->
                    #     console.log
                    # gm buffer
                    #   .resize '240', '150', '^'
                    #   .gravity 'Center'
                    #   .crop '240', '150'
                    #   .write "#{CONFIG.imgDir}post/#{post._id}-medium-cover.jpg", (err) ->
                    #     console.log

              if postData.img
                for img in postData.img
                  if not /^http/.test img.data
                    callback = (ress) ->
                      console.log
                    upload img.data, callback, { public_id: "post/#{post._id}-#{img.id}" }
                    # buffer = (base64Image img.data).data
                    # if buffer
                    #   jimp.read buffer, (err, img) ->
                    #     if err then console.log err
                    #     img.write "#{CONFIG.imgDir}post/#{post._id}-#{img.id}.jpg"
                      # gm buffer
                      #   .write "#{CONFIG.imgDir}post/#{post._id}-#{img.id}.jpg", (err) ->
                      #     console.log

              urlBack = "/p/#{post._id}"
              if post.is_published
                urlBack = "/p/#{post.slug}"
              res.json {
                urlBack: urlBack
                articleId: post._id
              }
        else res.json { error: true, message: 'too short' }
