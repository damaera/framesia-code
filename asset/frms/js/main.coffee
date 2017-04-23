( documentReady = () ->
  swal = require 'sweetalert'
  request = require 'superagent'

  { $, $$ } = require './helper/selector.coffee' 

  pace = require './vendor/pace.js'
  pace.start()

  swal.setDefaults
    title: "Framesia"
    text: "Framesia"
    html: true
    showCancelButton: false
    showConfirmButton: false
    animation: "slide-from-top"
    allowOutsideClick: true
    closeOnConfirm: true

  love = require './include/love.coffee'
  repost = require './include/repost.coffee'
  repostLink = require './include/repostLink.coffee'
  article = require './include/article.coffee'
  csrf = require './include/csrf.coffee'

  repost()
  repostLink()

  love.article()
  love.comment()

  article.delete()
  article.publish()

  csrf()

  require './include/headerFix.coffee'

  require './include/drop.coffee'
  require './include/firstTime.coffee'
  require './include/tag.coffee'

  require './include/feedRight.coffee'

  require './include/notif.coffee'
  require './include/comment.coffee'

  require './include/follow.coffee'

  require './include/checkRead.coffee'
  require './include/checkUsername.coffee'

  require './include/saveArticle.coffee'
  require './include/getArticle.coffee'

  require './include/autocompleteUser.coffee'

  require './include/collection.coffee'
  require './include/collectionPeople.coffee'
  require './include/collectionArticle.coffee'
  require './include/addCollection.coffee'

  require './include/getComment.coffee'

  # require './include/getFeedHome.coffee'
  # require './include/getFeedProfile.coffee'

  require './include/getLovedArticles.coffee'

  require './include/getArticles2.coffee'
  require './include/getArticles.coffee'

  require './include/report.coffee'
  require './include/makeTableOfContent.coffee'

  require './include/comment2.coffee'

  $$loginButton = $$ '.js-login-button'
  for $loginButton in $$loginButton
    $loginButton.onclick = (e) ->
      swal
        title: "Sign in to Framesia"
        text: """
          <p>Welcome to Framesia</p>
          <a href='/a/facebook'>
            <button class='i-button i-button--green'>Sign in with Facebook</button>
          </a>
          <br>
          <a href='/a/google'>
            <button class='i-button i-button--red'>Sign in with Google</button>
          </a>
        """
        html: true
        showCancelButton: false
        showConfirmButton: false

  $$imgCoverFull = $$ ('.is-cover-full img')
  for $imgCoverFull in $$imgCoverFull
    $container = $imgCoverFull.parentNode
    imgUrl = $imgCoverFull.getAttribute 'src'
    $imgCoverFull.classList.add 'is-hidden'
    $container.style.backgroundImage = "url('#{imgUrl}')"
    $container.style.backgroundSize = "cover"

  $$imgCoverSlide = $$ ('.is-cover-slide img')
  for $imgCoverSlide in $$imgCoverSlide
    $container = $imgCoverSlide.parentNode
    imgUrl = $imgCoverSlide.getAttribute 'src'
    $imgCoverSlide.classList.add 'is-hidden'
    $container.style.backgroundImage = "url('#{imgUrl}')"
    $container.style.backgroundSize = "cover"


  if $('.b-article__cover.is-cover-not-full')
    $('.b-article__cover.is-cover-not-full').parentNode.style.background = '#fff'

  if ($ '.js-editable')
    for $figure in ($$ 'figure')
      $figure.editable = false
    for $figcaption in ($$ 'figcaption')
      $figcaption.editable = true
    require './editor/main.coffee'

  if not window.location.hash or ( window.location.hash isnt '#_=_' )
    return
  if window.history and window.history.replaceState
    return window.history.replaceState "", document.title, window.location.pathname
  scroll =
    top: document.body.scrollTop
    left: document.body.scrollLeft
  window.location.hash = ""
  document.body.scrollTop = scroll.top
  document.body.scrollLeft = scroll.left

)()
