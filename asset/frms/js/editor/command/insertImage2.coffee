{ figure, p } = require '../helper/elementList.coffee'

{ $, $$ } = require '../helper/selector.coffee'

setSelection = require '../helper/setSelection.coffee'

loadImage = require 'blueimp-load-image-npm'

$editable = $ '.js-editable'

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/

imgLength = 0
i = 0
readURL = (input, cb) ->
  dataImg = []
  i = 0
  if input.files and input.files[0]
    imgLength = input.files.length
    if imgLength >= 10
      return
    for file in input.files
      i++
      if /^image\//.test file.type
        reader = new FileReader()
        reader.onload = (e) ->
          image = new Image()
          image.src = e.target.result
          image.onload = () ->
            dataImg.push
              data: e.target.result
              height: @height
              width: @width
            cb dataImg, i
        reader.readAsDataURL file
      else imgLength--

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
  $enEl = selection.focusNode
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

  j = 0
  readURL $inputImg, (img) ->
    j++
    if j is imgLength
      $newFigure = ''
      if img.length is 0
        return
      else if img.length > 1
        $newFigure = figure 'multi', img # multi
      else if img[0].width >= 960
        $newFigure = figure 'full', img # full
      else if img[0].width >= 640
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
      #
      # else if $beginParent.nextSibling
      #   if $beginParent.nextSibling.nodeName is '#text' and $beginParent is $editable.childNodes[$editable.childNodes.length-2]
      #     $editable.appendChild $newFigure
      #     $editable.appendChild $newP
      #   else if $editable.contains $beginParent
      #     $editable.insertBefore $newFigure, $beginParent.nextSibling
      # else
      #   $editable.appendChild $newFigure
      #   $editable.appendChild $newP

      setSelection $newFigure.lastChild, 0, $newFigure.lastChild.lastChild, $newFigure.lastChild.textContent.length
      ($ '.js-input-img').value = ''
