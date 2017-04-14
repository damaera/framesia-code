sm = require 'sitemap'
_ = require 'lodash'

Post = require '../models/post'
Love = require '../models/love'


sitemap = sm.createSitemap
  hostname: 'https://framesia.com',
  cacheTime: 600000
  urls: [
    { url: '/',  changefreq: 'daily', priority: 0.7 }
  ]

module.exports = (req, res, next) ->

  now = new Date()
  sinceTime = new Date(now.setDate(now.getDate()-1))

  dataMatch =
    love_type: 'Post'
    # user: { $in: userIds }
    created_at: { $gt: sinceTime }

  Love.aggregate [
    {
      $match: dataMatch
    }
    {
      $group:
        _id: '$to'
        count: { '$sum': 1 }
    }
    { $sort: { count: -1 }}
    { $limit: 20 }
  ], (err, loves) ->

    articleIds = _.map loves, '_id'

    Post.find {
      _id: { $in: articleIds }
      is_published: true
    }
    .select 'title subtitle slug user'
    .populate 'user', 'name username'
    .lean()
    .exec (err, posts) ->

      for post in posts
        sitemap.urls.push({ url: "/p/#{post.slug}", changefreq: 'daily', priority: 0.5 });

      Post
      .find { is_published: true }
      .select 'slug'
      .limit 100
      .lean()
      .exec (err2, posts2) ->

        for post in posts2
          sitemap.urls.push({ url: "/p/#{post.slug}", changefreq: 'daily', priority: 0.2 });

        sitemap.toXML (err, xml) ->
          console.log xml
          res.header 'Content-Type', 'application/xml'
          res.send xml