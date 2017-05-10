{ $ } = require '../helper/selector.coffee'

$inputCover = $ '.js-input-cover'

swal = require 'sweetalert'

loadImage = require 'blueimp-load-image-npm'

renderImg = (img) ->
  $imgCover = ($ '.js-img-cover')
  $title = ($ '.js-article-title')
  $shadow = ($ '.js-cover-shadow')
  $cover = $imgCover.parentNode
  { width, height } = img
  $imgCover.src = img.toDataURL 'image/jpeg', 0.7
  $imgCover.style.width = "#{width}px"
  $imgCover.style.height = "#{height}px"

  $title.classList.remove 'is-with-cover'
  $shadow.classList.add 'is-hidden'

  $cover.removeAttribute 'src'
  $cover.removeAttribute 'style'
  $cover.classList.remove 'is-cover-full'
  $cover.classList.remove 'is-cover-not-full'

  $imgCover.classList.remove 'is-hidden'

  $imgCover.setAttribute 'data-width', width
  $imgCover.setAttribute 'data-height', height

  if width >= 1200
    if width / height < 2.2
      # $imgCover.style.marginTop = "#{(height - 600) / -2}px"
      $cover.classList.add 'is-cover-full'
      $title.classList.add 'is-with-cover'
      $shadow.classList.remove 'is-hidden'

      imgUrl = $imgCover.getAttribute 'src'
      $imgCover.classList.add 'is-hidden'
      $cover.style.backgroundImage = "url('#{imgUrl}')"
      $cover.style.backgroundSize = "cover"
    else
      $cover.classList.add 'is-cover-not-full'
  else
    $cover.classList.add 'is-cover-not-full'

  ($ '.js-del-cover').classList.remove 'is-hidden'
  ($ '.js-cover').classList.remove 'is-not-cover'
  $inputCover.value = ''

resizeCropImg = (img) ->
  if !img.toDataURL?
    swal
      type: 'error'
      title: 'error'
      allowOutsideClick: true
    return false
  options = {}
  options.canvas = true
  { width, height } = img
  if width >= 1920
    options.maxWidth = 1920
  else if width >= 1440
    options.maxWidth = 1440
  else if width >= 1200
    options.maxWidth = 1200
  else if width >= 960
    options.maxWidth = 960
  else if width >= 640
    options.maxWidth = 640

  loadImage img.toDataURL(), renderImg, options

module.exports = () ->
  loadImage $inputCover.files[0], resizeCropImg, canvas: true
