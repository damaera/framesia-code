Post = require '../../models/post'
Notif = require '../../models/notif'

# slugify = require '../../util/slugify'
slugify = require 'arslugify'

module.exports = (req, res, next) ->
  if not req.user
    res.json { error: 'Unauthorized' }
  else
    articleId = req.body.id

    userId = req.user._id
    userName = req.user.name

    Post.findOne {
      _id: articleId
      user: req.user._id
    }
    .exec (err, post) ->
      if post.is_published
      then res.json { error: 'Published' }
      else
        post.is_published = true
        post.published_at = new Date
        post.edited_at = new Date

        Puid = require 'puid'
        puid = new Puid true
        post.slug = "#{ slugify post.title }--#{ puid.generate() }"

        post.save (err) ->
          if err
          then next err
          else
            if post.is_response
              Post.findOneAndUpdate { _id: post.response }, { $inc : { response_count: 1 }}
              .exec (err, post) ->
                if not post.user.equals userId
                  # body...
                  notifData =
                    from: userId
                    to: post.user
                    notif_type: 'respond'
                    object:
                      post_id: post._id


                  newNotif = new Notif notifData
                  newNotif.save (err) ->
                    socketUser = post.user.toString()
                    req.io.to(socketUser).emit 'notif', true
            urlBack = "/p/#{post.slug}"
            res.redirect urlBack
