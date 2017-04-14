{ p, text, strong, em } = require '../helper/elementList.coffee'

{ $, $$ } = require '../helper/selector.coffee'

setCaret = require '../helper/setCaret.coffee'

$editable = document.querySelector '.js-editable'

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/
# text area = title
blockRegex = /^(H1|H2|H3|P|BLOCKQUOTE|TEXTAREA|PRE)$/

toggleCenter = ($el) ->
  if biRegex.test $el.nodeName
    $el = $el.parentNode
    if biRegex.test $el.nodeName
      $el = $el.parentNode
      if biRegex.test $el.nodeName
        $el = $el.parentNode
        if biRegex.test $el.nodeName
          $el = $el.parentNode

  if blockRegex.test $el.nodeName
    $el.classList.toggle 'is-center'
  else
    # console.log 'list, quote, lead tidak bisa di center'
    console.log

module.exports = () ->
  selection = window.getSelection()
  $beginParent = selection.anchorNode.parentNode
  $endParent = selection.focusNode.parentNode

  if $beginParent is $endParent
    toggleCenter $beginParent
  else
    isList = false
    for $child in $editable.childNodes
      if selection.containsNode $child, true
        if $child.innerHTML
          toggleCenter $child
