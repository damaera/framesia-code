request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'


love = require './love.coffee'
repost = require './repost.coffee'

feedTemplate = require '../../../../src/views/blocks/post2.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$lovedArticleFeed = $ '.js-loved-article-feed'
$lovedArticleSpinner = $ '.js-loved-article-spinner'
$loadMoreLovedArticleFeed = $ '.js-load-more-loved-article-feed'


loadLovedArticleFeed = () ->

  username = $lovedArticleFeed.getAttribute 'data-username'

  $loadMoreLovedArticleFeed.classList.add 'is-hidden'

  if username
  then url = "/u/#{username}/feed-loved-articles"
  else url = '/me/feed-loved-articles'

  if $lovedArticleFeed.classList.contains 'is-empty'
    firstReq = true
  else
    loveId = $lovedArticleFeed.lastChild.getAttribute 'data-love-id'
    url += "?last=#{loveId}"

  $lovedArticleSpinner.classList.remove 'is-hidden'

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
      $lovedArticleFeed.innerHTML += feedHtml
      $lovedArticleFeed.classList.remove 'is-empty'

      $loadMoreLovedArticleFeed.classList.remove 'is-hidden'

      if feedHtml is ''
        if firstReq is true
          feedHtml = "<div class='i-block-empty'> #{__('No articles')}</div>"
        $loadMoreLovedArticleFeed.classList.add 'is-hidden'

      $lovedArticleSpinner.classList.add 'is-hidden'

      # add event listener
      love.article()
      repost()

if $lovedArticleFeed
  loadLovedArticleFeed()
  $loadMoreLovedArticleFeed.onclick = (e) ->
    loadLovedArticleFeed()
