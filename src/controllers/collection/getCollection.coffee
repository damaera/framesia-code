Collection = require '../../models/collection'
Post = require '../../models/post'

_ = require 'lodash'

module.exports = (req, res, next) ->
  { collectionName } = req.params
  { check } = req.query

  colNameRegex = new RegExp "^#{collectionName}$", 'i'

  populateQuery1 =
    path: 'featured_articles'
    select: '_id title slug subtitle user is_cover edited_at'
    populate:
      path: 'user'
      select: '_id name username updated_at'
      model: 'User'
  populateQuery2 =
    path: 'main_featured_article'
    select: '_id title slug subtitle user is_cover edited_at'
    populate:
      path: 'user'
      select: '_id name username updated_at'
      model: 'User'

  Collection.findOne { username: colNameRegex }
  .populate populateQuery1
  .populate populateQuery2
  .lean()
  .exec (err, col) ->
    if check
      if col
        res.json true
      else
        res.json false
    else
      if not col
        next new Error 'Collection not found'
      else if not req.user
        res.render 'collection', { collection: col }
      else
        userId = req.user._id

        contributedUser = col.admin
        _.map col.admin, (userAdmin) ->
          if userAdmin.equals userId
            col.is_admin = true
        _.map col.member, (userMember) ->

          contributedUser.push userMember

          if userMember.equals userId
            col.is_member = true

        col.contributed_user = contributedUser

        if col.is_admin
          res.render 'collection', { collection: col }
        else
          Post.findOne {
            user: userId
            collections: col._id
          }
          .select ''
          .lean()
          .exec (err, post) ->
            col.is_had_posted = false
            if post
              col.is_had_posted = true

            res.render 'collection', { collection: col }
