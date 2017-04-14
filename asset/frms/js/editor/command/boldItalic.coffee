{ $, $$ } = require '../helper/selector.coffee'

setSelection = require '../helper/setSelection.coffee'

$editable = $ '.js-editable'

boldItalic = (tag) ->
  if tag is 'bold'
    document.execCommand 'bold'
  else if tag is 'italic'
    document.execCommand 'italic'
  else return

module.exports = (tag) ->
  selection = window.getSelection()
  document.execCommand 'StyleWithCSS', false, false

  elRegex = /^(B|I|STRONG|EM|P|A|BLOCKQUOTE|UL|OL|FIGURE|PRE)$/

  { anchorNode, focusNode, anchorOffset, focusOffset } = selection
  $beginParent = anchorNode.parentNode
  $endParent = focusNode.parentNode

  beginCaret = anchorOffset
  endCaret = focusOffset
  # get word by find nearest space
  for i in [anchorOffset..0] by -1
    beginCaret = i+1
    break if /^( |\-|&)$/.test anchorNode.textContent[i]

  if  /^( |\-|&)$/.test focusNode.textContent[focusOffset-1]
  then endCaret = focusOffset-1
  else
    for i in [focusOffset..focusNode.textContent.length]
      endCaret = i
      break if /^( |\-|&)$/.test focusNode.textContent[i]

  if beginCaret is 1
  then beginCaret--

  if endCaret is focusNode.textContent.length
  then endCaret--

  # just setSelection
  setSelection anchorNode, beginCaret, focusNode, endCaret+1

  isHeading = false
  for $child in $editable.childNodes
    # console.log elRegex.test $child.nodeName
    if selection.containsNode $child, true
      if $child.innerHTML
        if not elRegex.test $child.nodeName
          isHeading = true
  if isHeading isnt true
    boldItalic tag
  else
    console.log 'heading gak bisa di bold / italic'
