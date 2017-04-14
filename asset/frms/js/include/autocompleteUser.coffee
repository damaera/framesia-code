# https://github.com/bevacqua/horsey
# https://github.com/bevacqua/insignia


{ $ } = require '../helper/selector.coffee'

horsey = require 'horsey'
request = require 'superagent'

$autoUser = $ '.js-auto-user'

{ imgUrl, assetUrl } = require '../../../../src/configClient.coffee'

if $autoUser
  autoCompleteOptions =
    anchor: '@'

    render: (li, suggestion) ->
      li.innerHTML = """
        <span class='i-user__ava'>
          <img src='#{imgUrl}ava/#{suggestion._id}-50.jpg'>
        </span>
        <span>
          #{suggestion.text} &middot; (#{suggestion.value})
        </span>
      """

    filter: (q, suggestion) ->
      suggestion

    suggestions: (value, done) ->
      value = value.replace /@/g, ''
      valArr = value.split ' '
      valLn1 = valArr.length - 1
      uname = valArr[valLn1]
      request
      .get "/s/users?q=#{uname}"
      .set 'Accept', 'application/json'
      .end (end, res) ->
        users = JSON.parse res.text
        users2 = []

        for user in users
          user.value = "@#{user.username}"
          user.text = user.name
          delete user.username
          delete user.name
          users2.push user

        done users2

  horsey $autoUser, autoCompleteOptions
