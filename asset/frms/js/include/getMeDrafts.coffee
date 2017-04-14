request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'

article = require './article.coffee'
csrf = require './csrf.coffee'

feedTemplate = require '../../../../src/views/blocks/post-item.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$draftFeed = $ '.js-draft-feed'
$draftSpinner = $ '.js-draft-spinner'
$loadMoreDraftFeed = $ '.js-load-more-draft-feed'

draftFeed = () ->
  $loadMoreDraftFeed.classList.add 'is-hidden'

  if $draftFeed.classList.contains 'is-empty'
    url = '/me/feed-drafts'
    firstReq = true
  else
    lastEdited = $draftFeed.lastChild.getAttribute 'data-edited-at'
    url = "/me/feed-drafts?last=#{lastEdited}"

  $draftSpinner.classList.remove 'is-hidden'

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

      $loadMoreDraftFeed.classList.remove 'is-hidden'

      if feedHtml is ''
        if firstReq is true
          feedHtml = "<div class='i-block-empty'> #{__('No articles')}</div>"
        $loadMoreDraftFeed.classList.add 'is-hidden'

      $draftFeed.innerHTML += feedHtml
      $draftFeed.classList.remove 'is-empty'

      $draftSpinner.classList.add 'is-hidden'

      # add event listener
      csrf()
      article.delete()
      article.publish()


if $draftFeed
  draftFeed()
  $loadMoreDraftFeed.onclick = (e) ->
    draftFeed()
