setCaret = require '../helper/setCaret.coffee'

{ $ } = require '../helper/selector.coffee'

$editable = $ '.js-editable'
$toolbar = $ '.js-toolbar'

module.exports = () ->
  selection = window.getSelection()

  { anchorNode , anchorOffset } = selection

  if anchorNode is null then return

  $beginParent = anchorNode.parentNode

  textContent = anchorNode.textContent
  textHtml = anchorNode.parentNode.innerHTML

  biRegex = /^(B|I|STRONG|EM|A|SPAN)$/

  if biRegex.test $beginParent.nodeName
    $beginParent = $beginParent.parentNode
    if biRegex.test $beginParent.nodeName
      $beginParent = $beginParent.parentNode
      if biRegex.test $beginParent.nodeName
        $beginParent = $beginParent.parentNode
        if biRegex.test $beginParent.nodeName
          $beginParent = $beginParent.parentNode

  if /^(P|BLOCKQUOTE|H2|H3)$/.test $beginParent.nodeName
    if /^("|“)$/.test $beginParent.textContent[0]
    then $beginParent.classList.add 'is-indent2'
    else $beginParent.classList.remove 'is-indent2'

    if /^('|‘)$/.test $beginParent.textContent[0]
    then $beginParent.classList.add 'is-indent1'
    else $beginParent.classList.remove 'is-indent1'
