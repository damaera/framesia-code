request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'


love = require './love.coffee'
repost = require './repost.coffee'

feedTemplate = require '../../../../src/views/blocks/post.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$homeFeed = $ '.js-home-feed'
$homeSpinner = $ '.js-home-spinner'
$loadMoreHomeFeed = $ '.js-load-more-home-feed'

loadFeed = () ->

  $loadMoreHomeFeed.classList.add 'is-hidden'

  if $homeFeed.classList.contains 'is-empty'
    url = '/p/home-feed'
    firstReq = true
  else
    lastDate = $homeFeed.lastChild.getAttribute 'data-published-at'
    url = "/p/home-feed?last=#{lastDate}"

  $homeSpinner.classList.remove 'is-hidden'

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
      $homeFeed.innerHTML += feedHtml
      $homeFeed.classList.remove 'is-empty'

      $loadMoreHomeFeed.classList.remove 'is-hidden'

      if feedHtml is ''
        if firstReq is true
          feedHtml = "<div class='i-block-empty'> #{__('No articles')}</div>"
        $loadMoreHomeFeed.classList.add 'is-hidden'

      $homeSpinner.classList.add 'is-hidden'

      # add event listener
      love.article()
      repost()

if $homeFeed
  loadFeed()
  $loadMoreHomeFeed.onclick = (e) ->
    loadFeed()
