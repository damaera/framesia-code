{ $ } = require '../helper/selector.coffee'

$inputCover = $ '.js-input-cover'

swal = require 'sweetalert'

readURL = (input, cb) ->
  if input.files and input.files[0]
    file = input.files[0]
    if /^image\/(jpeg|png)$/.test file.type
      reader = new FileReader()
      reader.onload = (e) ->
        image = new Image()
        image.src = e.target.result
        image.onload = () ->
          dataImg =
            data: e.target.result
            height: @height
            width: @width
          cb dataImg
      reader.readAsDataURL file

module.exports = () ->
  bestRatio = 16/9
  readURL $inputCover, (img) ->
    if !img.data
      swal
        type: 'error'
        title: 'error'
        text: 'error'
        allowOutsideClick: true
    $inputCover.value = ''

    width = img.width
    height = img.height

    console.log width

    $imgCover = ($ '.js-img-cover')

    if width >= 1200 then maxWidth = 1200
    else if width >= 960 then maxWidth = 960
    else maxWidth = width

    height = height * maxWidth / width
    width = maxWidth
    if height > 540
      $imgCover.style.top = "-#{(height - 540) / 2}px"

    $imgCover.src = img.data
    $imgCover.style.width = "#{width}px"
    $imgCover.style.height = "#{height}px"
    ($ '.js-del-cover').classList.remove 'is-hidden'
