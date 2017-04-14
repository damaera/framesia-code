{ $ } = require '../helper/selector.coffee'

request =  require 'superagent'
swal = require 'sweetalert'
horsey = require 'horsey'

imgUrl = "http://localhost:80/fr-img/"

$addCollection = $ '.js-add-to-collection'

if $addCollection
  $addCollection.onclick = (e) ->

    articleId = @getAttribute 'data-article-id'
    collectionId = ''
    collections = []

    swal
      title: "Add to collection"
      type: 'input'
      text: """
        search collection
      """
      closeOnConfirm: false
      showCancelButton: true
      showConfirmButton: true
      showLoaderOnConfirm: true
      customClass: 'js-modal-collection'
    , (confirm) ->

      if !confirm
      then swal.close()
      else
        # if collectionId is ''
        #   col
        postData =
          articleId: articleId
          collectionId: collectionId
          _csrf: CSRF

        request
        .post '/c/add-article'
        .set 'Accept', 'application/json'
        .send postData
        .end (end, res) ->
          resData = JSON.parse res.text
          if resData.error
            swal
              title: 'Error'
              type: 'error'
              text: resData.message or= 'Not success'
          else
            swal
              title: 'Success'
              type: 'success'
              text: "Your article has been added to <a href='/c/#{resData.collection.username}'><b class='text-green'>#{resData.collection.name}</b></a>"

    $inputCol = ($ '.js-modal-collection').querySelector 'input'
    cols2 = []
    autocompleteCollection = horsey $inputCol, {
      render: (li, suggestion) ->
        li.innerHTML = """
          <span class='i-user__ava'>
            <img src='#{imgUrl}col/#{suggestion._id}-50.jpg'>
          </span>
          <span>
            #{suggestion.text} &middot; (#{suggestion.value}) &middot; <b>#{suggestion.follower_count}</b>
          </span>
        """
      suggestions: (value, done) ->
        request
        .get "/s/collections?q=#{value}"
        .set 'Accept', 'application/json'
        .end (end, res) ->
          cols = JSON.parse res.text
          cols2 = []

          for col in cols
            col.value = "#{col.username}"
            col.text = col.name
            delete col.username
            delete col.name
            cols2.push col
          done cols2
    }

    # get collection id
    $inputCol.addEventListener 'horsey-selected', (e) ->
      inputValue = $inputCol.value
      for col in cols2
        if col.value is inputValue
          collectionId = col._id
