request =  require 'superagent'

{ $ } = require '../helper/selector.coffee'

$follow = ($ '.js-follow')
if $follow
  request
    .get "/f/#{$follow.getAttribute 'data-follow-type'}/#{$follow.getAttribute 'data-follow-id'}"
    .end (err, res) ->
      resData = JSON.parse res.text
      if resData.following
        $follow.classList.add 'is-following'
        $follow.innerHTML = 'Following'
      else
        $follow.classList.remove 'is-following'
        $follow.innerHTML = 'Follow'

  $follow.onmouseover = (e) ->
    if $follow.classList.contains 'is-following'
      $follow.innerHTML = 'Unfollow'
  $follow.onmouseleave = (e) ->
    if $follow.classList.contains 'is-following'
      $follow.innerHTML = 'Following'

  $follow.onclick = (e) ->
    # e.preventDefault()
    followId = @getAttribute 'data-follow-id'
    followType = @getAttribute 'data-follow-type'
    @setAttribute 'disabled', true
    @classList.add 'is-disabled'
    request
      .post '/f'
      .send { followId: followId, followType: followType, _csrf: CSRF }
      .end (err, res) ->
        $follow.removeAttribute 'disabled'
        $follow.classList.remove 'is-disabled'
        resData = JSON.parse res.text
        if resData.following
          $follow.classList.add 'is-following'
          $follow.innerHTML = 'Following'
        else
          $follow.classList.remove 'is-following'
          $follow.innerHTML = 'Follow'
