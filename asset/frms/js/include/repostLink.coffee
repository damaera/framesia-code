request = require 'superagent'

{ $, $$ } = require '../helper/selector.coffee'

module.exports = () ->

  $repost = $ '.js-article-repost-link'
  if $repost
    $repost.onclick = (e) ->
      articleId = @getAttribute 'data-article-id'
      self = this
      request
        .post "/p/repost-article-link"
        .send { article_id: articleId, _csrf: CSRF }
        .set 'Accept', 'application/json'
        .end (err, res) ->
          resData = JSON.parse res.text
          if resData.err is false
            self.classList.remove 'i-button--green'
            self.firstChild.innerHTML = 'Reposted'
