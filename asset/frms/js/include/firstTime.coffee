{ $ } = require '../helper/selector.coffee'

loadImage = require 'blueimp-load-image-npm'

if ($ '.js-first-time-ava')
  $img = ($ '.js-first-time-ava')
  resizeCropImg = (img) ->
    $img.src = img.toDataURL 'image/jpeg', .9
    ($ '.js-first-time-ava-data').value = img.toDataURL 'image/jpeg', .9

  loadImage $img.src, resizeCropImg, { canvas: true, maxWidth: 200, maxHeight: 200, crop: true, crossOrigin: 'anonymous' }

  $img.onclick = (e) ->
    ($ '.js-first-time-ava-input').click()

  ($ '.js-first-time-ava-input').onchange = (e) ->
    loadImage e.target.files[0], resizeCropImg, { canvas: true, maxWidth: 200, maxHeight: 200, crop: true }
