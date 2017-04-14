request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'


love = require './love.coffee'
repost = require './repost.coffee'

feedTemplate = require '../../../../src/views/blocks/post.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$collectionFeed = $ '.js-collection-feed'
$collectionSpinner = $ '.js-collection-spinner'
$loadMoreCollectionFeed = $ '.js-load-more-collection-feed'

collectionName = $collectionFeed?.getAttribute 'data-collection-name'

loadFeed = () ->
  $loadMoreCollectionFeed.classList.add 'is-hidden'

  if $collectionFeed.classList.contains 'is-empty'
    url = "/c/#{collectionName}/feed-articles"
    firstReq = true
  else
    lastDate = $collectionFeed.lastChild.getAttribute 'data-published-at'
    url = "/c/#{collectionName}/feed-articles?last=#{lastDate}"

  $collectionSpinner.classList.remove 'is-hidden'

  request
    .get url
    .end (err, res) ->

      posts = JSON.parse res.text

      local =
        post: posts
        __: __
        __n: __n
        ASSET_URL: assetUrl
        IMG_URL: imgUrl

      feedHtml = feedTemplate local

      $loadMoreCollectionFeed.classList.remove 'is-hidden'

      if feedHtml is ''
        if firstReq is true
          feedHtml = "<div class='i-block-empty'> #{__('No articles')}</div>"
        $loadMoreCollectionFeed.classList.add 'is-hidden'

      $collectionFeed.innerHTML += feedHtml
      $collectionFeed.classList.remove 'is-empty'

      $collectionSpinner.classList.add 'is-hidden'

      # add event listener
      love.article()
      repost()

if $collectionFeed
  loadFeed()
  $loadMoreCollectionFeed.onclick = (e) ->
    loadFeed()
