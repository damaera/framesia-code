{ $, $$ } = require '../helper/selector.coffee'

setSelection = require '../helper/setSelection.coffee'

$editable = $ '.js-editable'

swal = require 'sweetalert'

$tt = $ '.js-tooltip-link'

makeTooltip = ($tt, el) ->
  bodyRect = document.body.getBoundingClientRect()
  linkRect = el.getBoundingClientRect()
  leftPos = linkRect.left - bodyRect.left
  topPos = linkRect.top - bodyRect.top
  widthToCenter = linkRect.width/2
  height = linkRect.height

  $tt.innerHTML = "#{el.href}"
  $tt.style.display = 'block'
  $tt.style.top = "#{topPos + height}px"
  $tt.style.left = "#{leftPos + widthToCenter}px"
  $tt.style.marginLeft = "-#{$tt.offsetWidth / 2}px"

removeTooltip = ($tt) ->
  $tt.style.display = 'none'

module.exports = () ->
  selection = window.getSelection()
  document.execCommand 'StyleWithCSS', false, false

  biRegex = /^(B|I|STRONG|EM|SPAN)$/
  elRegex = /^(P|BLOCKQUOTE|FIGCAPTION|LI|UL|OL)$/

  { anchorNode, focusNode, anchorOffset, focusOffset } = selection

  $beginParent = anchorNode.parentNode
  $endParent = focusNode.parentNode

  beginCaret = anchorOffset
  endCaret = focusOffset
  # get word by find nearest space
  for i in [anchorOffset..0] by -1
    beginCaret = i+1
    break if anchorNode.textContent[i] is ' '

  if focusNode.textContent[focusOffset-1] is ' '
  then endCaret = focusOffset-1
  else
    for i in [focusOffset..focusNode.textContent.length]
      endCaret = i
      break if focusNode.textContent[i] is ' '

  if beginCaret is 1
  then beginCaret--

  if endCaret is focusNode.textContent.length
  then endCaret--

  # just setSelection
  setSelection anchorNode, beginCaret, focusNode, endCaret+1

  # find nesting
  if biRegex.test $beginParent.nodeName
    $beginParent = $beginParent.parentNode
    if biRegex.test $beginParent.nodeName
      $beginParent = $beginParent.parentNode
      if biRegex.test $beginParent.nodeName
        $beginParent = $beginParent.parentNode
  # find nesting
  if biRegex.test $endParent.nodeName
    $endParent = $endParent.parentNode
    if biRegex.test $endParent.nodeName
      $endParent = $endParent.parentNode
      if biRegex.test $endParent.nodeName
        $endParent = $endParent.parentNode

  if $beginParent.nodeName is 'A'
    document.execCommand 'unlink'
  else if $beginParent is $endParent
    if elRegex.test $beginParent.nodeName
      swal
        title: "Insert link"
        text: "Link must valid"
        type: "input"
        showCancelButton: true
        closeOnConfirm: false
        animation: "slide-from-top"
        inputPlaceholder: "ex: framesia.com"
        allowOutsideClick: true
      , (inputValue) ->
        setSelection anchorNode, beginCaret, focusNode, endCaret+1
        if inputValue is false then return false
        else if inputValue is '' then return false
        else
          if not /^https?/.test inputValue
            inputValue = "//#{inputValue}"
          # if /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test inputValue
          
          document.execCommand 'createLink', false, inputValue
          swal.close()
          for $link in ($$ '.js-editable a')
            $link.addEventListener 'mouseover', (e) ->
              makeTooltip $tt, this
            $link.addEventListener 'mouseleave', (e) ->
              removeTooltip $tt
          return false
