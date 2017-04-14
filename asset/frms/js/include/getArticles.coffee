request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'


love = require './love.coffee'
repost = require './repost.coffee'

feedTemplate = require '../../../../src/views/blocks/post.jade'
feedTemplateCol = require '../../../../src/views/blocks/post4.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$homeFeed = $ '.js-article-feed'
$homeSpinner = $ '.js-article-spinner'
$loadMoreHomeFeed = $ '.js-load-more-article-feed'


loadFeed = () ->

  isHome = $homeFeed.getAttribute 'data-home'
  isStream = $homeFeed.getAttribute 'data-stream'
  isProfile = $homeFeed.getAttribute 'data-article-id'
  isCollection = $homeFeed.getAttribute 'data-collection-name'
  isQuery = $homeFeed.getAttribute 'data-query'

  $loadMoreHomeFeed.classList.add 'is-hidden'

  template = feedTemplate
  if isProfile
    url = "/p/profile-feed/#{isProfile}"
  else if isCollection
    url = "/c/#{isCollection}/feed-articles"
    # template = feedTemplateCol
  else if isQuery
    url = "/s/posts?q=#{isQuery}"
  else if isStream
    url = '/p/stream-feed'
  else if isHome
    url = '/p/home-feed'

  if $homeFeed.classList.contains 'is-empty'
    firstReq = true
  else
    if isQuery
      lastDate = $homeFeed.childNodes.length
      url += "&last=#{lastDate}"
    else
      lastDate = $homeFeed.lastChild.getAttribute 'data-published-at'
      url += "?last=#{lastDate}"

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

      feedHtml = template local
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
