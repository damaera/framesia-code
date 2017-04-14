{ $, $$ } = require '../helper/selector.coffee'

swal = require 'sweetalert'

module.exports =
  delete : () ->
    for $deleteArticle in ($$ '.js-delete-article')
      $deleteArticle.onclick = (e) ->
        swal
          title: "Confirmation"
          text: "Are you sure?"
          showCancelButton: true
          showConfirmButton: true
        , (confirm) ->
          if confirm
            $form = e.target.parentNode.querySelector '.js-delete-article-form'
            $form.submit()

  publish : () ->
    for $publishArticle in ($$ '.js-publish-article')
      $publishArticle.onclick = (e) ->
        swal
          title: "Confirmation"
          text: "Are you sure?"
          showCancelButton: true
          showConfirmButton: true
        , (confirm) ->
          if confirm
            $form = e.target.parentNode.querySelector '.js-publish-article-form'
            $form.submit()
