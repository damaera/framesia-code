request = require 'superagent'

{ $, $$ } = require '../helper/selector.coffee'

module.exports =
  article : () ->
    for $love in ($$ '.js-article-love')
      $love.onclick = (e) ->
        articleId = @getAttribute 'data-article-id'
        loveCount = @firstChild.innerHTML * 1
        self = this
        request
          .post "/l"
          .send { to: articleId, love_type: 'Post', _csrf: CSRF }
          .set 'Accept', 'application/json'
          .end (err, res) ->
            resData = JSON.parse res.text
            if resData.err is false
              if resData.loving is true
                self.classList.add 'is-loving'
                self.firstChild.innerHTML = loveCount + 1
              else
                self.classList.remove 'is-loving'
                self.firstChild.innerHTML = loveCount - 1

  comment : () ->
    for $love in ($$ '.js-comment-love')
      $love.onclick = (e) ->
        commentId = @getAttribute 'data-comment-id'
        loveCount = @firstChild.innerHTML * 1
        self = this
        console.log 'o'
        request
          .post "/l"
          .send { to: commentId, love_type: 'Comment', _csrf: CSRF }
          .set 'Accept', 'application/json'
          .end (err, res) ->
            resData = JSON.parse res.text
            if resData.err is false
              if resData.loving is true
                self.classList.add 'is-loving'
                self.firstChild.innerHTML = loveCount + 1
              else
                self.classList.remove 'is-loving'
                self.firstChild.innerHTML = loveCount - 1

  # reply : () ->
  #   for $love in ($$ '.js-reply-love')
  #     $love.onclick = (e) ->
  #       replyId = @getAttribute 'data-reply-id'
  #       loveCount = @firstChild.innerHTML * 1
  #       self = this
  #       request
  #         .post "/l"
  #         .send { to: replyId, love_type: 'Reply' }
  #         .set 'Accept', 'application/json'
  #         .end (err, res) ->
  #           resData = JSON.parse res.text
  #           if resData.err is false
  #             if resData.loving is true
  #               self.classList.add 'is-loving'
  #               self.firstChild.innerHTML = loveCount + 1
  #             else
  #               self.classList.remove 'is-loving'
  #               self.firstChild.innerHTML = loveCount - 1
