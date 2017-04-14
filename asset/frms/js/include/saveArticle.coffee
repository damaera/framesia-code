{ $ } = require '../helper/selector.coffee'

request =  require 'superagent'
swal = require 'sweetalert'
jsondiffpatch = require 'jsondiffpatch'

tag = require './tag.coffee'

($ '.js-save-server')?.onclick = (e) ->
  saveArticle false

($ '.js-save-publish')?.onclick = (e) ->
  saveArticle true

saveArticle = (isPublished) ->
  ($ '.js-save').click()

  type = 'new'

  articleInit = JSON.parse localStorage.getItem 'article-init'

  if articleInit.data.length is 0
    # ($ '.js-save-input').value = articleData
    articleData = localStorage.getItem 'article'
    postData =
      _csrf: CSRF
      tags: JSON.stringify tag.tags()
      data: articleData
      is_published: isPublished
      is_response: false
    if ($ '.js-respond')
      postData.is_response = true
      postData.response = ($ '.js-respond').getAttribute 'data-article-id'
  else
    type = 'edit'
    articleData = JSON.parse localStorage.getItem 'article'

    diffpatcher = jsondiffpatch.create
      objectHash: (obj) -> obj.type
      textDiff:
        minLength: 60000000
    delta =
      data: diffpatcher.diff articleInit.data, articleData.data
      img: articleData.img

    postData =
      _csrf: CSRF
      tags: JSON.stringify tag.tags()
      data: JSON.stringify delta
      id: (window.location.pathname.split '/')[2]
      is_published: isPublished
      title: articleData.title
      isTitleCenter: articleData.isTitleCenter
      isCoverChanged: articleData.isCoverChanged

    if articleData.isCoverChanged
      postData.isCover = articleData.isCover
      postData.cover = articleData.cover



  swal
    title: "Save?"
    text: """
      Send this article? total #{(postData.data.length / 1024 ).toFixed 2} KB
      <div class='percent'>
        <div class='percent-loader' width='0'>
        </div>
        <div class='percent-text'>
        </div>
      </div>
    """
    closeOnConfirm: false
    showCancelButton: true
    showConfirmButton: true
    showLoaderOnConfirm: true
  , (confirm) ->
    if !confirm
    then swal.close()
    else
      if type is 'new'
      then url = '/p/new-article'
      else if type is 'edit'
      then url = '/p/edit-article'
      else return false

      if postData.title is ''
      then swal 'Error', 'Untitled', 'error'
      else if ($ '.js-title-input').value.length < 3
      then swal 'Error', 'Title too short!', 'error'
      else if ($ '.js-editable').textContent.length < 20
      then swal 'Error', 'Article too short!', 'error'
      else
        request
          .post url
          .send postData
          .set 'Accept', 'application/json'
          .on 'progress', (e) ->
            if e.percent
              percent = 0
              a = 0
              if e.percent is 100 and a is 0
              then percent = 0
              else
                percent = Math.floor e.percent
                a = 1
              ($ '.percent-text').innerHTML = "#{percent}%"
              ($ '.percent-loader').width = "#{percent}%"
          .end (err, res) ->
            resData = JSON.parse res.text
            # window.location = resData.urlBack

            contEdit = "href='/p/#{resData.articleId}/edit'"

            if /^\/p\/[0-9a-f]+\/edit\/?$/.test window.location.pathname
              contEdit = "onclick='window.location.reload()'"

            swal
              title: 'Success'
              text: """
                <a class="text-green" #{contEdit} style="cursor:pointer;">Continue editing</a> or go to <a class="text-green" href='#{resData.urlBack}'>your article</a> or go to <a  class="text-green" href='/'>Home</a>
              """
              type: 'success'
              # showConfirmButton: true
              allowOutsideClick: false
