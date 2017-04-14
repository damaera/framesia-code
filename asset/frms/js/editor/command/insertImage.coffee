{ figure, p } = require '../helper/elementList.coffee'

{ $, $$ } = require '../helper/selector.coffee'

setSelection = require '../helper/setSelection.coffee'

loadImage = require 'blueimp-load-image-npm'

$editable = $ '.js-editable'

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/

$inputImg = $ '.js-input-img'

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

removeImageControl = ($tt) ->
  $tt.style.display = 'none'

module.exports = () ->
  $editable.addEventListener 'click', (e) ->
    if e.target.nodeName isnt 'IMG'
      for $imgSelected in ($$ '.is-img.is-selected')
        $imgSelected.classList.remove 'is-selected'
      removeImageControl ($ '.js-tooltip-image')

  $editable.addEventListener 'keyup', (e) ->
    removeImageControl ($ '.js-tooltip-image')

  selection = window.getSelection()
  $beginEl = selection.anchorNode
  $beginParent = $beginEl.parentNode
  $endEl = selection.focusNode
  $endParent = selection.focusNode.parentNode

  if biRegex.test $beginParent.nodeName
    $beginEl = $beginParent
    $beginParent = $beginParent.parentNode
    if biRegex.test $beginParent.nodeName
      $beginEl = $beginParent
      $beginParent = $beginParent.parentNode
      if biRegex.test $beginParent.nodeName
        $beginEl = $beginParent
        $beginParent = $beginParent.parentNode
        if biRegex.test $beginParent.nodeName
          $beginEl = $beginParent
          $beginParent = $beginParent.parentNode

  if $beginParent.nodeName is 'LI'
    $beginParent = $beginParent.parentNode

  resizeImg = (img) ->
    if !img.toDataURL?
      swal
        type: 'error'
        title: 'error'
      return false

    $newFigure = ''
    # if img.length is 0
    #   return
    # else if img.length > 1
    #   $newFigure = figure 'multi', img # multi
    if img.width >= 960
      $newFigure = figure 'full', img # full
    else if img.width >= 640
      $newFigure = figure 'center', img # center
    else
      $newFigure = figure 'left', img # left

    for $img in $newFigure.childNodes
      if $img.nodeName is 'IMG'
        $img.addEventListener 'click', (e) ->
          for $imgSelected in ($$ '.is-img.is-selected')
            $imgSelected.classList.remove 'is-selected'
          @classList.add 'is-selected'
          makeImageControl ($ '.js-tooltip-image'), this

    $newP = p()
    $newP.innerHTML = '<br>'

    if $beginParent is $editable
      if $beginEl is $editable.lastChild
        $editable.replaceChild $newFigure, $beginEl
        $editable.appendChild $newP
      else
        $editable.replaceChild $newFigure, $beginEl
    else
      $editable.insertBefore $newFigure, $beginParent

    setSelection $newFigure.lastChild, 0, $newFigure.lastChild.lastChild, $newFigure.lastChild.textContent.length
    ($ '.js-input-img').value = ''

  loadImage $inputImg.files[0], resizeImg, { canvas: true, maxWidth: 960 }
