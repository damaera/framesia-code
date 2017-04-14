request =  require 'superagent'

{ $, $$ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'


feedTemplate = require '../../../../src/views/blocks/notif.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$notifFeed = $ '.js-notif-feed'
$notifSpinner = $ '.js-notif-spinner'

$menotifFeed = $ '.js-menotif-feed'
$menotifSpinner = $ '.js-menotif-spinner'

url = "/me/feed-notif"

loadFeed = (first) ->

  request
    .get url
    .end (err, res) ->

      data = JSON.parse res.text

      local =
        notifs: data.notifs
        __: __
        __n: __n
        ASSET_URL: assetUrl
        IMG_URL: imgUrl

      feedHtml = feedTemplate local

      if feedHtml is ''
        feedHtml = "<div class='i-block-empty'> #{__('No notif')}</div>"

      $notifFeed.classList.remove 'is-empty'
      $notifSpinner.classList.add 'is-hidden'
      $notifFeed.innerHTML = feedHtml

      if data.notifs[0]?.is_read is false
        ($ '.js-down-notif')?.classList.add 'is-notif'
      else
        ($ '.js-down-notif')?.classList.remove 'is-notif'


if $notifFeed
  i = 0
  j = 0

  loadFeed()

  ($ '.js-down-notif')?.addEventListener 'click', (e) ->
    if @classList.contains 'is-notif'
      i = 0
      j = 0
    if i is 0
      loadFeed()
      i++

  ($ '.js-drop-notif')?.addEventListener 'mouseover', (e) ->
    if j is 0
      j++
      $firstItem = @querySelector '.b-notif__item'
      $$allItem =  @querySelectorAll '.b-notif__item'
      notifId = $firstItem.getAttribute 'data-notif-id'
      isRead = $firstItem.classList.contains 'is-read'

      if not isRead
        request
        .post "/me/read-notif"
        .send { _csrf: CSRF }
        .end (err, res) ->
          j = 0
          ($ '.js-down-notif').classList.remove 'is-notif'
          for $item in $$allItem
            $item.classList.add 'is-read'




$loadMoreMenotifFeed = $ '.js-load-more-menotif-feed'

loadFeed2 = () ->
  $loadMoreMenotifFeed.classList.add 'is-hidden'

  if $menotifFeed.classList.contains 'is-empty'
    url = url
    firstReq = true
  else
    last = $menotifFeed.lastChild.getAttribute 'data-notif-id'
    url = "/me/feed-notif?last=#{last}"

  $menotifSpinner.classList.remove 'is-hidden'

  request
  .get url
  .end (err, res) ->

    data = JSON.parse res.text

    local =
      notifs: data.notifs
      __: __
      __n: __n
      ASSET_URL: assetUrl
      IMG_URL: imgUrl

    feedHtml = feedTemplate local

    $loadMoreMenotifFeed.classList.remove 'is-hidden'

    if feedHtml is ''
      if firstReq is true
        feedHtml = "<div class='i-block-empty'> #{__('No articles')}</div>"
      $loadMoreMenotifFeed.classList.add 'is-hidden'

    $menotifFeed.classList.remove 'is-empty'
    $menotifSpinner.classList.add 'is-hidden'
    $menotifFeed.innerHTML += feedHtml

if $menotifFeed
  loadFeed2()
  $loadMoreMenotifFeed.onclick = (e) ->
    loadFeed2()
