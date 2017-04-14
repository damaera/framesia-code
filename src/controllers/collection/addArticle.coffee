Collection = require '../../models/collection'
Post = require '../../models/post'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { articleId, collectionId } = req.body

  if not req.user
  then res.json {error: 'Unauthorized'}
  else
    Collection
    .findOne { _id: collectionId }
    .exec (err, col) ->
      if not col
      then res.json { error: true, message: 'collection not found' }
      else
        Post
        .findOne { _id: articleId, is_response: false, is_repost: false }
        .select 'user collections is_link'
        .exec (err, post) ->
          if not post
          then res.json { error: true, message: 'article not found or not valid' }
          else
            # limit
            if post.collections.length >= 3 and not post.is_link
            then res.json { error: true, message: 'Max collections per article is 3' }
            else
              userId = req.user._id

              isAdmin = false
              isMember = false
              isMyPost = false

              if post.is_link
                isMyPost = true
              else if post.user.equals userId
                isMyPost = true

              _.map col.admin, (admin) ->
                if admin.equals userId
                  isAdmin = true
              _.map col.member, (member) ->
                if member.equals userId
                  isMember = true

              if isMyPost
                # member and admin can directly publish
                if isAdmin or isMember
                  post
                  .update { $addToSet: { collections: collectionId }}
                  .exec (err) ->
                    res.json { error: false, collection: { username: col.username, name: col.name }}

                # is anyone can directly post
                else if col.is_anyone_can_post
                  post
                  .update { $addToSet: { collections: collectionId }}
                  .exec (err) ->
                    res.json { error: false, collection: { username: col.username, name: col.name }}

                # is anyone can request publish to this collection post
                else if col.is_anyone_can_request
                  col
                  .update { $addToSet: { articles_request: articleId }}
                  .exec (err) ->
                    res.json { error: false, collection: { username: col.username, name: col.name }}
                else
                  res.status(403).json { error: true, message: 'Unauthorized' }
              else
                # if not your article, but you re admin, you can invite to your collection
                if isAdmin
                  col
                  .update { $addToSet: { articles_invited: articleId }}
                  .exec (err) ->
                    res.json { error: false, collection: { username: col.username, name: col.name }}
                else
                  res.status(403).json { error: true, message: 'Unauthorized' }
