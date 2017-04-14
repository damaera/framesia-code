request =  require 'superagent'

{ $, $$ } = require '../helper/selector.coffee'
{ __, __n } = require '../helper/langCatalog.coffee'


love = require './love.coffee'

feedTemplate = require '../../../../src/views/blocks/comment-list.jade'
{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

$commentFeed = $ '.js-comment-feed'
$commentSpinner = $ '.js-comment-spinner'
$commentSpinner2 = $ '.js-comment-spinner2'
$loadMoreCommentFeed = $ '.js-load-more-comment-feed'
$loadMoreCommentFeed2 = $ '.js-load-more-comment-feed2'

articleId = $commentFeed?.getAttribute 'data-article-id'

loadFeed = (before) ->

  if $commentFeed.classList.contains 'is-empty'
    url = "/c/a/#{articleId}"
    firstReq = true
  else
    lastId = $commentFeed.lastChild.getAttribute 'id'
    url = "/c/a/#{articleId}?last=#{lastId}"

  if before is true
    firstId = $commentFeed.firstChild.getAttribute 'id'
    url = "/c/a/#{articleId}?first=#{firstId}"

    $loadMoreCommentFeed2.classList.add 'is-hidden'
    $commentSpinner2.classList.remove 'is-hidden'
  else
    $loadMoreCommentFeed.classList.add 'is-hidden'
    $commentSpinner.classList.remove 'is-hidden'


  request
    .get url
    .end (err, res) ->

      data = JSON.parse res.text

      local =
        is_login: data.is_login
        comments: data.comments
        __: __
        __n: __n
        ASSET_URL: assetUrl
        IMG_URL: imgUrl

      feedHtml = feedTemplate local

      if before is true
        $loadMoreCommentFeed2.classList.remove 'is-hidden'
      else
        $loadMoreCommentFeed.classList.remove 'is-hidden'

      if feedHtml is ''
        if firstReq is true
          feedHtml = "<div class='i-block-empty'> #{__('No comment')}</div>"

        if before is true
          $loadMoreCommentFeed2.classList.add 'is-hidden'
        else
          $loadMoreCommentFeed.classList.add 'is-hidden'

      if before is true
        $commentFeed.innerHTML = feedHtml + $commentFeed.innerHTML
        $commentSpinner2.classList.add 'is-hidden'
      else
        $commentFeed.innerHTML += feedHtml
        $commentSpinner.classList.add 'is-hidden'

      $commentFeed.classList.remove 'is-empty'


      # add event listener
      love.comment()

      for $reply, i in ($$ '.js-comment-reply')
        $reply.onclick = (e) ->
          username = @getAttribute 'data-username'
          commentId = @getAttribute 'data-comment-id'
          self = this
          $input = ($ '.js-comment-input')
          $input.value = "@#{username} "
          $input.focus()

      for $delete, i in ($$ '.js-comment-delete')
        $delete.onclick = (e) ->
          commentId = @getAttribute 'data-comment-id'
          # @classList.add 'is-hidden'
          $commentFeed.removeChild(@parentNode.parentNode.parentNode)
          if $commentFeed.childNodes.length is 0
            $commentFeed.classList.add 'is-empty'
          request
          .post "/c/delete/#{commentId}"
          .send { _csrf: CSRF }
          .end (err, res) ->
            console.log

if $commentFeed
  loadFeed()
  $loadMoreCommentFeed.onclick = (e) ->
    loadFeed()
  $loadMoreCommentFeed2.onclick = (e) ->
    loadFeed true
