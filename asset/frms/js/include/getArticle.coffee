request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'

$articleButton = $ '.js-article-button'
if $articleButton
  articleId = $articleButton.getAttribute 'data-article-id'
  request
    .get "/p/#{articleId}/my-activity"
    .set 'Accept', 'application/json'
    .end (err, res) ->
      resData = JSON.parse res.text
      if resData.loved
        ($ '.js-article-love').classList.add 'is-loving'
      if resData.commented
        ($ '.js-article-comment').classList.add 'is-comment'
      if resData.responded
        ($ '.js-article-response').classList.add 'is-response'
      if resData.reposted
        ($ '.js-article-repost').classList.add 'is-repost'
