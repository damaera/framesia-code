Post = require '../../models/post'

module.exports = (req, res, next) ->
  if not req.user
    res.json { err: true, message: 'Unauthorized' }
  else

    { article_id } = req.body

    userId = req.user._id

    Post.findOne { is_repost_link: true, repost_link: article_id, user: userId }
    .exec (err, post) ->
      if err
        res.json { err: true, message: 'Server Error' }
      else if post
        res.json { err: true, message: 'Reposted!' }
        # # decrement repost count
        # Post.findOneAndUpdate { _id: article_id }, { $inc : { repost_link_count: -1 }}
        #   .exec (err, post) ->
        #     console.log

        # post.remove (err) ->
        #   if err
        #   then res.json { err: true, message: 'Server Error' }
        #   else res.json { err: false, message: 'Unrepost success!', repost: false }
      else

        postData =
          repost_link: article_id
          is_repost_link: true
          user: userId
          is_published: true
          published_at: new Date
          created_at: new Date

        newPost = new Post postData

        # increment repost count
        Post.findOneAndUpdate { _id: article_id }, { $inc : { repost_link_count: 1 }}
          .exec (err, post) ->
            console.log 

        newPost.save (err) ->
          if err
          then res.json { err: true, message: 'Server Error' }
          else res.json { err: false, message: 'Repost success!', repost: true }
