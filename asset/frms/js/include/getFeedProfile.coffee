request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'


love = require './love.coffee'
repost = require './repost.coffee'

feedTemplate = require '../../../../src/views/blocks/post.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$profileFeed = $ '.js-profile-feed'
$profileSpinner = $ '.js-profile-spinner'
$loadMoreProfileFeed = $ '.js-load-more-profile-feed'

userId = $profileFeed?.getAttribute 'data-article-id'

loadFeed = () ->
  $loadMoreProfileFeed.classList.add 'is-hidden'

  if $profileFeed.classList.contains 'is-empty'
    url = "/p/profile-feed/#{userId}"
    firstReq = true
  else
    lastDate = $profileFeed.lastChild.getAttribute 'data-published-at'
    url = "/p/profile-feed/#{userId}?last=#{lastDate}"

  $profileSpinner.classList.remove 'is-hidden'

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

      $loadMoreProfileFeed.classList.remove 'is-hidden'

      if feedHtml is ''
        console.log feedHtml
        if firstReq is true
          feedHtml = "<div class='i-block-empty'> #{__('No articles')}</div>"
        $loadMoreProfileFeed.classList.add 'is-hidden'

      $profileFeed.innerHTML += feedHtml
      $profileFeed.classList.remove 'is-empty'

      $profileSpinner.classList.add 'is-hidden'

      # add event listener
      love.article()
      repost()

if $profileFeed
  loadFeed()
  $loadMoreProfileFeed.onclick = (e) ->
    loadFeed()
