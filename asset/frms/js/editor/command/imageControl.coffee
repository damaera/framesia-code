{ $, $$ } = require '../helper/selector.coffee'

$editable = $ '.js-editable'

$tt = $ '.js-tooltip-image'

$ttLink = $ '.js-tooltip-link'

makeTooltip = (e) ->
  $ttLink = $ '.js-tooltip-link'
  el = e.target
  bodyRect = document.body.getBoundingClientRect()
  linkRect = el.getBoundingClientRect()
  leftPos = linkRect.left - bodyRect.left
  topPos = linkRect.top - bodyRect.top
  widthToCenter = linkRect.width/2
  height = linkRect.height

  $ttLink.innerHTML = "#{el.href}"
  if el.getAttribute 'data-href'
    $ttLink.innerHTML = "#{el.getAttribute 'data-href'}"
  $ttLink.style.display = 'block'
  $ttLink.style.top = "#{topPos + height}px"
  $ttLink.style.left = "#{leftPos + widthToCenter}px"
  $ttLink.style.marginLeft = "-#{$ttLink.offsetWidth / 2}px"

removeTooltip = () ->
  $ttLink = $ '.js-tooltip-link'
  $ttLink.style.display = 'none'

makeImageControl = ($tt, el) ->
  bodyRect = document.body.getBoundingClientRect()
  linkRect = el.getBoundingClientRect()
  leftPos = linkRect.left - bodyRect.left
  topPos = linkRect.top - bodyRect.top
  widthToCenter = linkRect.width / 2
  height = linkRect.height

  $tt.style.display = 'block'
  $tt.style.top = "#{topPos}px"
  $tt.style.left = "#{leftPos + widthToCenter}px"
  $tt.style.marginLeft = "-#{$tt.offsetWidth / 2}px"

# reposition = ($f) ->
#   row = 0
#   tmpRatio = 0
#   i = 0
#
#   imgRow = []
#   imgRow[row] = []
#
#   baseRatio = 960 / 360
#   imgsLn = $f.childNodes.length-1
#
#   $cloneFigure = $f.cloneNode true
#   $f.innerHTML = ''
#
#   for $img in $cloneFigure.childNodes
#     if $img.nodeName is 'FIGCAPTION'
#       $f.appendChild $img
#     else if $img.nodeName is 'IMG'
#       iw = $img.getAttribute 'data-width'
#       ih = $img.getAttribute 'data-height'
#       id = $img.src
#
#       ratio = iw / ih
#       tmpRatio += ratio
#
#       imgRow[row].push
#         data: id
#         ratio: ratio
#         w: iw
#         h: ih
#
#       if tmpRatio >= baseRatio or imgsLn-1 is i
#         j = 0
#         imgRowLn = imgRow[row].length
#         for img in imgRow[row]
#           iw = img.w
#           ih = img.h
#           fw = img.ratio / tmpRatio * 960 - 10 * (imgRowLn - 1) + 5
#           fh = fw / img.ratio
#           j++
#
#           $newImg = document.createElement 'IMG'
#           $newImg.classList.add 'b-graf__img'
#           $newImg.classList.add 'is-img'
#           if j is imgRowLn then $newImg.classList.add 'is-last'
#           $newImg.src = img.data
#           $newImg.setAttribute 'data-width', iw
#           $newImg.setAttribute 'data-height', ih
#           $newImg.width = fw
#           $newImg.height = fh
#           $newImg.addEventListener 'click', (e) ->
#             for $imgSelected in ($$ '.is-img.is-selected')
#               $imgSelected.classList.remove 'is-selected'
#             this.classList.add 'is-selected'
#             makeImageControl ($ '.js-tooltip-image'), this
#           $f.appendChild $newImg
#         row++
#         imgRow[row] = []
#         tmpRatio = 0
#       i++

alignImage = (type) ->
  $imgSelected = ($ '.is-img.is-selected')
  $imgSelected.removeAttribute 'width'
  $imgSelected.removeAttribute 'height'
  if not $imgSelected.parentNode.classList.contains 'b-figure--multi'
    $imgSelected.parentNode.classList.remove 'b-figure--left'
    $imgSelected.parentNode.classList.remove 'b-figure--center'
    $imgSelected.parentNode.classList.remove 'b-figure--full'
    $imgSelected.parentNode.classList.remove 'b-figure--right'
    $imgSelected.parentNode.classList.add "b-figure--#{type}"
  $tt.style.display = 'none'

($ '.js-img-left').addEventListener 'click', (e) ->
  alignImage 'left'

($ '.js-img-center').addEventListener 'click', (e) ->
  alignImage 'center'

($ '.js-img-right').addEventListener 'click', (e) ->
  alignImage 'right'

($ '.js-img-link').addEventListener 'click', (e) ->
  $imgSelected = ($ '.is-img.is-selected')
  if $imgSelected.classList.contains 'is-link'
    $imgSelected.removeEventListener 'mouseover', makeTooltip
    $imgSelected.removeEventListener 'mouseleave', removeTooltip
    $imgSelected.removeAttribute 'data-href'
    $imgSelected.classList.remove 'is-link'
    $tt.style.display = 'none'
  else
    swal
      title: "Masukkan Link"
      text: "Linknya harus yang valid ya :D"
      type: "input"
      showCancelButton: true
      closeOnConfirm: false
      animation: "slide-from-top"
      inputPlaceholder: "misalnya damaera.com"
      allowOutsideClick: true
    , (inputValue) ->
      $tt.style.display = 'none'
      if inputValue is false then return false
      else if inputValue is '' then return false
      else
        if not /^https?$/.test inputValue
          inputValue = "http://#{inputValue}"
        if /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test inputValue
          $imgSelected.classList.add 'is-link'
          $imgSelected.setAttribute 'data-href', inputValue
          swal.close()

          $imgSelected.addEventListener 'mouseover', makeTooltip
          $imgSelected.addEventListener 'mouseleave', removeTooltip

        else
          swal.showInputError "Bukan Link yang valid!"
          return false

($ '.js-img-full').addEventListener 'click', (e) ->
  alignImage 'full'

($ '.js-img-del').addEventListener 'click', (e) ->
  $imgSelected = ($ '.is-img.is-selected')
  $figure = $imgSelected.parentNode
  $figure.removeChild $imgSelected
  if $figure.firstChild.nodeName isnt 'IMG'
    $editable.removeChild $figure
  else if $figure.childNodes.length > 2
    reposition $figure
  else
    reposition $figure
    $figure.width = 'auto'
    $figure.height = 'auto'
    $figure.classList.remove 'b-figure--multi'
    $figure.classList.add 'b-figure--center'
  $tt.style.display = 'none'
