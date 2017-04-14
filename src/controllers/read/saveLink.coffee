express = require 'express'
router = express.Router()

Post = require '../../models/post'

read = require 'node-readability'
request = require 'request'
extractor = require 'unfluff'

arslugify = require 'arslugify'

urlParser = require 'url'

_ = require 'lodash'

module.exports = (req, res, next) ->

  { url } = req.body

  if url
    if not /^http/.test url
      url = "http://#{url}"

    Post
    .findOne { url: url }
    .exec (err, postItem) ->
      if err
      then res.json { err: true, message: 'Server Error' }
      else
        if postItem
          res.redirect "/p/#{slug}"
        else
          read url, (err, article, meta) ->
            if err
              next new Error 'Invalid article'
            else
              { hostname, pathname } = urlParser.parse url
              url = "#{hostname}#{pathname}"

              unfluffdata = extractor article.html

              Puid = require 'puid'
              puid = new Puid true

              slug = "#{arslugify (url.replace /(\/|\-|\_|\.)/g, ' ')}--#{puid.generate()}"

              { description, publisher, tags } = unfluffdata
              { title } = article

              tags2 = []

              # remove tags long
              for tag in tags
                if tag.length <= 25
                  tags2.push tag

              postData =
                title: title
                subtitle: description
                tags: tags2[0..2]
                source: publisher
                hostname: hostname
                slug: slug
                url: url
                is_published: true
                is_link: true

              newPost = new Post postData
              newPost.save (err) ->
                if err
                  console.log err
                  next new Error 'Internal error'
                else
                  res.redirect "/p/#{slug}"