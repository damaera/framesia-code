request =  require 'superagent'

{ $, $$ } = require '../helper/selector.coffee'

($ '.js-article-comment')?.onclick = (e) ->
  if document.body.classList.contains 'is-show'
    ($ '.js-comment').classList.remove 'is-show'
    document.body.classList.remove 'is-show'
  else
    ($ '.js-comment').classList.add 'is-show'
    document.body.classList.add 'is-show'

($ '.js-comment-close')?.onclick = (e) ->
  ($ '.js-article-comment').click()

($ '.js-comment-input')?.onkeydown = (e) ->
  limitText = 200 - @value.length
  ($ '.js-comment-limit').textContent = limitText
  if e.keyCode is 8 or e.keyCode is 46
    return true
  else if limitText <= 0
    return false
  else
    return true

($ '.js-comment-submit')?.onclick = (e) ->
  $commentInput = ($ '.js-comment-input')
  $commentSubmit = ($ '.js-comment-submit')

  inputValue = $commentInput.value
  articleId = $commentInput.getAttribute 'data-article-id'

  $commentInput.disabled = true
  $commentSubmit.disabled = true
  request
    .post '/c'
    .send { content: inputValue, article_id: articleId, _csrf: CSRF }
    .set 'Accept', 'application/json'
    .end (err, res) ->
      $commentSubmit.disabled = false

      $commentInput.disabled = false
      $commentInput.value = ''
      ($ '.js-load-more-comment-feed2').click()


# for $reply, i in ($$ '.js-comment-reply')
#   $reply.onclick = (e) ->
#     username = @getAttribute 'data-username'
#     commentId = @getAttribute 'data-comment-id'
#     self = this
#     $input = ($ '.js-comment-input')
#     $input.value = "@#{username} "
#     $input.focus()

# for $reply in ($$ '.js-reply-submit')
#   $reply.onclick = (e) ->
#     $replySubmit = e.target
#     $replyInput = $replySubmit.previousSibling
#
#     inputValue = $replyInput.value
#     commentId = $replyInput.getAttribute 'data-comment-id'
#
#     $replyInput.disabled = true
#     $replySubmit.disabled = true
#     request
#       .post '/c/reply'
#       .send { content: inputValue, comment_id: commentId }
#       .set 'Accept', 'application/json'
#       .end (err, res) ->
#         $replySubmit.disabled = false
#
#         $replyInput.disabled = false
#         $replyInput.value = ''
