request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'

article = require './article.coffee'
csrf = require './csrf.coffee'

feedTemplate = require '../../../../src/views/blocks/post-item.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$articleFeed = $ '.js-article2-feed'
$articleSpinner = $ '.js-article2-spinner'
$loadMoreArticleFeed = $ '.js-load-more-article2-feed'

articleFeed = () ->
  isDraft = $articleFeed.getAttribute 'data-draft'

  $loadMoreArticleFeed.classList.add 'is-hidden'

  if isDraft
    url = '/me/feed-drafts'
  else
    url = '/me/feed-articles'

  if $articleFeed.classList.contains 'is-empty'
    firstReq = true
  else
    lastEdited = $articleFeed.lastChild.getAttribute 'data-edited-at'
    url += "?last=#{lastEdited}"

  $articleSpinner.classList.remove 'is-hidden'

  request
    .get url
    .set 'Accept', 'application/json'
    .end (err, res) ->

      posts = JSON.parse res.text

      local =
        post: posts
        __: __
        __n: __n
        ASSET_URL: assetUrl
        IMG_URL: imgUrl

      feedHtml = feedTemplate local

      $loadMoreArticleFeed.classList.remove 'is-hidden'

      if feedHtml is ''
        if firstReq is true
          feedHtml = "<div class='i-block-empty'> #{__('No articles')}</div>"
        $loadMoreArticleFeed.classList.add 'is-hidden'

      $articleFeed.innerHTML += feedHtml
      $articleFeed.classList.remove 'is-empty'

      $articleSpinner.classList.add 'is-hidden'

      # add event listener
      csrf()

      article.delete()
      article.publish()


if $articleFeed
  articleFeed()
  $loadMoreArticleFeed.onclick = (e) ->
    articleFeed()
