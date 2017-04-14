Post = require '../../models/post'
Love = require '../../models/love'
Collection = require '../../models/collection'

_ = require 'lodash'

module.exports = (req, res, next) ->
  if not req.user
    res.redirect "/c/#{col.username}"
  else
    { collectionName } = req.params
    { last } =  req.query

    userId = req.user._id

    populateQuery1 =
      path: 'articles_request'
      select: '_id title slug subtitle user'
      populate:
        path: 'user'
        select: '_id name username'
        model: 'User'
    populateQuery2 =
      path: 'featured_articles'
      select: '_id title slug subtitle user'
      populate:
        path: 'user'
        select: '_id name username'
        model: 'User'
    populateQuery3 =
      path: 'main_featured_article'
      select: '_id title slug subtitle user'
      populate:
        path: 'user'
        select: '_id name username'
        model: 'User'

    Collection.findOne {
      username: collectionName
    }
    .select 'username articles_request is_anyone_can_request admin featured_articles main_featured_article'
    .populate populateQuery1
    .populate populateQuery2
    .populate populateQuery3
    .lean()
    .exec (err, col) ->
      if not col
        res.redirect "/c/#{col.username}"
      else
        is_admin = false
        _.map col.admin, (admin) ->
          if admin.equals userId
            is_admin = true

        if is_admin

          findData =
            collections: col._id
          Post.find findData
          .select 'slug title subtitle user'
          .populate 'user', 'username name'
          .lean()
          .exec (err, posts) ->

            posts2 = []
            _.map posts, (post) ->
              post.is_featured = false
              _.map col.featured_articles, (fa) ->
                if post._id.equals fa._id
                  post.is_featured = true

              posts2.push post

            console.log posts2
            res.render 'collection-article', { posts: posts2, collection: col, isAdmin: is_admin }
        else
          findData =
            user: userId
            collections: col._id
          Post.find findData
          .select 'slug title subtitle'
          .lean()
          .exec (err, posts) ->
            res.render 'collection-article', { posts: posts, collection: col, isAdmin: is_admin }
