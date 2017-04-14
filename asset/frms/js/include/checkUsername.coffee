{ $ } = require '../helper/selector.coffee'

$jsUsernameUser = $ '.js-username-user'
$jsUsernameCol = $ '.js-username-col'

$jsUsernameExist = $ '.js-username-exist'

request = require 'superagent'


if $jsUsernameUser
  usernameInit = $jsUsernameUser.value
  $jsUsernameUser.onkeyup = (e) ->
    val = @value
    if val isnt usernameInit and /[a-zA-Z0-9-]{3,16}/.test val
      request
        .get "/u/#{@value}?check=true"
        .end (err, res) ->
          exist = JSON.parse res.text
          if exist
            $jsUsernameExist.classList.remove 'is-hidden'
          else
            $jsUsernameExist.classList.add 'is-hidden'

if $jsUsernameCol
  usernameInit = $jsUsernameCol.value
  $jsUsernameCol.onkeyup = (e) ->
    val = @value
    if val isnt usernameInit and /[a-zA-Z0-9-]{3,30}/.test val
      request
        .get "/c/#{@value}?check=true"
        .end (err, res) ->
          exist = JSON.parse res.text
          if exist
            $jsUsernameExist.classList.remove 'is-hidden'
          else
            $jsUsernameExist.classList.add 'is-hidden'

