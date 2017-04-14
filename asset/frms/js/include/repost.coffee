request = require 'superagent'

{ $, $$ } = require '../helper/selector.coffee'

module.exports = () ->
  for $repost in ($$ '.js-article-repost')
    $repost.onclick = (e) ->
      articleId = @getAttribute 'data-article-id'
      repostCount = @firstChild.innerHTML * 1
      self = this
      request
        .post "/p/repost-article"
        .send { article_id: articleId, _csrf: CSRF }
        .set 'Accept', 'application/json'
        .end (err, res) ->
          resData = JSON.parse res.text
          if resData.err is false
            if resData.repost is true
              self.classList.add 'is-repost'
              self.firstChild.innerHTML = repostCount + 1
            else
              self.classList.remove 'is-repost'
              self.firstChild.innerHTML = repostCount - 1
