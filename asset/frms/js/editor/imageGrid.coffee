{ $, $$ } = require './helper/selector.coffee'

module.exports = () ->
  baseRatio = 960 / 240
  for $figure in ($$ '.js-image-grid')
    row = 0
    tmpRatio = 0
    imgRow = []
    imgRow[row] = []
    $$img = []
    i = 0
    for $img in $figure.childNodes
      if $img.nodeName is 'IMG'
        iw = $img.getAttribute 'data-width'
        ih = $img.getAttribute 'data-height'
        tmpRatio += iw / ih
        imgRow[row].push {
          data: $img.src
          w: iw
          h: ih
        }
        if tmpRatio >= baseRatio
          for img in imgRow[row]
            img.w = img.w / img.h / tmpRatio * 960
            img.h = img.h / tmpRatio / 240
            $$img.push img
          row++
          imgRow[row] = []
          tmpRatio = 0
        i++
    console.log $$img
