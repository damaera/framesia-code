
{ $, $$ } = require '../helper/selector.coffee'

if ($ '.js-comment2')
  for $comment in ($$ '.js-comment2')
    $comment.onclick = (e) ->
      console.log e.target.getAttribute 'data-id'