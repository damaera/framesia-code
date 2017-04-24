Post = require '../../models/post'
Comment = require '../../models/comment'
Block = require '../../models/block'

read = require 'node-readability'
request = require 'request'
extractor = require 'unfluff'

module.exports = (req, res, next) ->
  populateQuery =
    path: 'response'
    select: '_id title subtitle slug user love_count edited_at'
    populate:
      path: 'user'
      select: '_id name username description updated_at'
      model: 'User'

  { slug } = req.params
  { comment } = req.query

  Post.findOne {
    slug: slug
    is_published: true
  }
  .populate 'user', '_id name username description edited_at'
  .populate 'collections', '_id name username edited_at'
  .populate populateQuery
  .lean()
  .exec (err, post) ->
    if err
      res.json { error: 'true' }
    else if post
      Block.findOne {
        block_id: post._id
        block_type: 'Post'
      }
      .select ''
      .lean()
      .exec (err, block) ->
        if block
          next new Error 'Article blocked'
        else
          if not post.is_link
            Post.find {
              is_response: true
              response: post._id
              is_published: true
            }
            .select 'title user subtitle slug love_count published_at edited_at'
            .populate 'user', '_id name username updated_at'
            .sort '-love_count'
            .limit 2
            .lean()
            .exec (err, responses) ->
              if comment
                if req.user
                  Comment.find {
                    post: post._id
                    _id: comment
                  }
                  .populate 'user', '_id name username updated_at'
                  .lean()
                  .exec (err, comments) ->
                    res.render 'article', { user: post.user, article: post, comments: comments, is_comment_cb: true, responses: responses }
                else
                  res.redirect "/p/#{slug}"
              else
                res.render 'article', { user: post.user, article: post, is_comment_cb: false, responses: responses }
          else
            { url, hostname } = post
            read "http://#{url}", (err, article, meta) ->
              if err
                next new Error 'Invalid article'
              else
                unfluffdata = extractor article.html
                normalizedContent = article.content
                  .replace /<img(.*?)src="(.*?)">/g, '<@@img src="/read?img=$2">'
                  .replace /<a(.*?)href="(.*?)">/g, '<@@a href="$2">'
                  .replace /<\s*(\w+).*?>/g, '<$1>'
                  .replace /<@@img/g, '<img class="b-figure__img"'
                  .replace /<@@a /g, '<a '
                  .replace /<figure>/g, '<figure class="b-figure--full">'
                  .replace /<(h1|h2)>/g, '<h2 class="b-graf b-graf--h2">'
                  .replace /<(h3|h4|h5|h6)>/g, '<h3 class="b-graf b-graf--h3">'
                  .replace /<hr>/g, '<hr class="b-graf b-graf--divider">'
                  .replace /<pre>/g, '<pre class="b-graf b-graf--code">'
                  .replace /<p>/g, '<p class="b-graf">'
                  .replace /<blockquote>/g, '<blockquote class="b-graf b-graf--quote1">'
                  .replace /">("|“)/g, ' is-indent2">$1'
                  .replace /">('|‘)/g, ' is-indent1">$1'
                  .replace /<(ol|ul)>/g, '<$1 class="b-graf b-graf--$1ist">'
                  .replace /<li>/g, '<li class="b-graf--li">'
                  .replace /<script[^>]*>([\s\S]+?)<\/script>/gi, ''
                  .replace /<noscript[^>]*>([\s\S]+?)<\/noscript>/gi, ''
                  .replace /<style[^>]*>([\s\S]+?)<\/style>/gi, ''
                  .replace /<link(.*?)\/?>/g, ''

                isLinkReposted = false
                readerData =
                  is_reposted: false
                  linkId: post._id
                  content: normalizedContent
                  description: unfluffdata.description
                  keywords: unfluffdata.keywords
                  tags: (unfluffdata.tags)[0..2]
                  image: unfluffdata.image
                  title: article.title
                  source: unfluffdata.publisher
                  hostname: hostname
                  url: "http://#{url}"

                if req.user
                  Post
                  .findOne { repost_link: post._id, user: req.user._id }
                  .exec (err, repostLinkItem) ->
                    if repostLinkItem
                      readerData.is_reposted = true
                    res.render 'reader', readerData
                else
                  res.render 'reader', readerData
    else
      next new Error 'Article not found'
