{ hr, p } = require '../helper/elementList.coffee'

{ $, $$ } = require '../helper/selector.coffee'

setCaret = require '../helper/setCaret.coffee'

$editable = $ '.js-editable'

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/
blockRegex = /^(H1|H2|H3|P|BLOCKQUOTE|LI|UL|OL)$/

module.exports = () ->
  selection = window.getSelection()
  $beginParent = selection.anchorNode.parentNode
  $endParent = selection.focusNode.parentNode

  if biRegex.test $beginParent.nodeName
    $beginParent = $beginParent.parentNode
    if biRegex.test $beginParent.nodeName
      $beginParent = $beginParent.parentNode
      if biRegex.test $beginParent.nodeName
        $beginParent = $beginParent.parentNode
        if biRegex.test $beginParent.nodeName
          $beginParent = $beginParent.parentNode

  if $beginParent.nodeName is 'LI'
    $beginParent = $beginParent.parentNode

  $newHr = hr()
  $newP = p()
  $newP.innerHTML = '<br>'
  if $beginParent.nextSibling?
    if $beginParent.nextSibling.nodeName is 'HR'
      $editable.removeChild $beginParent.nextSibling
    else
      if $editable.contains $beginParent
        $editable.insertBefore $newHr, $beginParent.nextSibling
  else
    $editable.appendChild $newHr
    $editable.appendChild $newP
  setCaret selection.anchorNode, selection.anchorOffset
