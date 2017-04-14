Post = require '../../models/post'
Notif = require '../../models/notif'

module.exports = (req, res, next) ->
  if not req.user
    res.json { err: true, message: 'Unauthorized' }
  else

    { article_id } = req.body

    userId = req.user._id

    Post.findOne { is_repost: true, repost: article_id, user: userId }
    .exec (err, post) ->
      if err
        res.json { err: true, message: 'Server Error' }
      else if post
        # decrement repost count
        Post.findOneAndUpdate { _id: article_id }, { $inc : { repost_count: -1 }}
          .exec (err, post) ->
            console.log

        Notif
        .findOne {
          from: userId
          notif_type: 'repost'
          'object.post_id': article_id
        }
        .remove()
        .exec()

        post.remove (err) ->
          if err
          then res.json { err: true, message: 'Server Error' }
          else res.json { err: false, message: 'Unrepost success!', repost: false }
      else
        postData =
          repost: article_id
          is_repost: true
          user: userId
          is_published: true
          published_at: new Date
          created_at: new Date
        newPost = new Post postData

        # increment repost count
        Post.findOneAndUpdate { _id: article_id }, { $inc : { repost_count: 1 }}
          .exec (err, post) ->

            if not post.user.equals userId
              # body...
              notifData =
                from: userId
                to: post.user
                notif_type: 'repost'
                created_at: new Date
                object:
                  post_id: post._id


              newNotif = new Notif notifData
              newNotif.save (err) ->
                socketUser = post.user.toString()
                req.io.to(socketUser).emit 'notif', true

        newPost.save (err) ->
          if err
          then res.json { err: true, message: 'Server Error' }
          else res.json { err: false, message: 'Repost success!', repost: true }
