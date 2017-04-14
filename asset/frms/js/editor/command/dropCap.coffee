{ cap } = require '../helper/elementList.coffee'

{ $, $$ } = require '../helper/selector.coffee'

setCaret = require '../helper/setCaret.coffee'

$editable = $ '.js-editable'

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/

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

  if $beginParent.nodeName is 'P'

    if $beginParent.firstChild.classList?.contains 'is-drop-cap'
      capText = $beginParent.firstChild.textContent

      $beginParent.removeChild $beginParent.firstChild

      $firstChild = $beginParent.firstChild
      if biRegex.test $firstChild.nodeName
        $firstChild = $firstChild.firstChild
        if biRegex.test $firstChild.nodeName
          $firstChild = $firstChild.firstChild
          if biRegex.test $firstChild.nodeName
            $firstChild = $firstChild.firstChild
            if biRegex.test $firstChild.nodeName
              $firstChild = $firstChild.firstChild

      firstText = $firstChild.textContent
      $firstChild.nodeValue = capText + firstText

    else if /^[A-Za-z0-9]/.test $beginParent.textContent
      $firstChild = $beginParent.firstChild
      if biRegex.test $firstChild.nodeName
        $firstChild = $firstChild.firstChild
        if biRegex.test $firstChild.nodeName
          $firstChild = $firstChild.firstChild
          if biRegex.test $firstChild.nodeName
            $firstChild = $firstChild.firstChild
            if biRegex.test $firstChild.nodeName
              $firstChild = $firstChild.firstChild
      $cap = cap()
      $cap.innerHTML = $beginParent.textContent[0].toUpperCase()

      firstText = $firstChild.textContent
      $firstChild.nodeValue = firstText[1..firstText.length]

      $beginParent.insertBefore $cap, $beginParent.firstChild
