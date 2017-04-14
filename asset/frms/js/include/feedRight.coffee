request =  require 'superagent'

{ $, $$ } = require '../helper/selector.coffee'

{ __, __n } = require '../helper/langCatalog.coffee'

{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

feedTemplate = require '../../../../src/views/blocks/tag.jade'
feedTemplate2 = require '../../../../src/views/blocks/post3.jade'
feedTemplate3 = require '../../../../src/views/blocks/col-list.jade'
feedTemplate4 = require '../../../../src/views/blocks/user-list.jade'

$topicFeed = $ '.js-topic-feed'
$topicSpinner = $ '.js-topic-spinner'

$trendaFeed = $ '.js-trenda-feed'
$trendaSpinner = $ '.js-trenda-spinner'

$colrightFeed = $ '.js-colright-feed'
# $colrightSpinner = $ '.js-colright-spinner'

$userFeed = $ '.js-user-feed'
$userSpinner = $ '.js-user-spinner'

loadFeed = () ->

  url = '/t/topics'
  isQuery = $topicFeed.getAttribute 'data-query'

  if isQuery
    url = "/s/topics?q=#{isQuery}"

  request
    .get url
    .set 'Accept', 'application/json'
    .end (err, res) ->

      tags = JSON.parse res.text

      local =
        tags: tags

      feedHtml = feedTemplate local

      $topicFeed.innerHTML = feedHtml
      $topicFeed.classList.remove 'is-empty'

      $topicSpinner.classList.add 'is-hidden'


if $topicFeed
  loadFeed()

loadFeed2 = () ->

  isUser = $trendaFeed.getAttribute 'data-username'

  if isUser
    url = "/u/#{isUser}/feed-loved-articles"
  else
    url = '/t/articles'

  request
    .get url
    .set 'Accept', 'application/json'
    .end (err, res) ->

      posts = JSON.parse res.text

      local =
        post: posts

      feedHtml = feedTemplate2 local

      if feedHtml is ''
        feedHtml = "<div class='i-block-empty'> #{__('No articles')}</div>"

      $trendaFeed.innerHTML = feedHtml
      $trendaFeed.classList.remove 'is-empty'

      $trendaSpinner.classList.add 'is-hidden'


if $trendaFeed
  loadFeed2()

loadFeed3 = ($colrightFeed) ->

  username = $colrightFeed.getAttribute 'data-username'
  isColContributed = $colrightFeed.getAttribute 'data-col-contr'
  isColFollow = $colrightFeed.getAttribute 'data-col-follow'
  isQuery = $colrightFeed.getAttribute 'data-query'


  if isColContributed
    url = "/u/#{username}/feed-collections"
  else if isColFollow
    url = "/u/#{username}/feed-following-collections"
  else if isQuery
    url = "/s/collections?q=#{isQuery}&all=true"

  request
    .get url
    .set 'Accept', 'application/json'
    .end (err, res) ->

      posts = JSON.parse res.text

      if isQuery
        posts.collections = posts

      local = posts
      local.IMG_URL = imgUrl

      feedHtml = feedTemplate3 local

      if feedHtml is ''
        feedHtml = "<div class='i-block-empty'> #{__('No collections')}</div>"

      $colrightFeed.innerHTML = feedHtml
      $colrightFeed.classList.remove 'is-empty'

      $colrightFeed.parentNode.querySelector('.spinner').classList.add 'is-hidden'


if $colrightFeed
  for colrightFeed in ( $$ '.js-colright-feed' )
    loadFeed3 colrightFeed


loadFeed4 = () ->

  isQuery = $userFeed.getAttribute 'data-query'

  if isQuery
    url = "/s/users?q=#{isQuery}"

  request
    .get url
    .set 'Accept', 'application/json'
    .end (err, res) ->

      users = JSON.parse res.text

      local =
        users: users
        IMG_URL: imgUrl

      feedHtml = feedTemplate4 local

      $userFeed.innerHTML = feedHtml
      $userFeed.classList.remove 'is-empty'

      $userSpinner.classList.add 'is-hidden'


if $userFeed
  loadFeed4()