getCaret = require '../helper/getCaret.coffee'
setCaret = require '../helper/setCaret.coffee'

{ $, $$ } = require '../helper/selector.coffee'

{ p, h2, h3, blockquote } = require '../helper/elementList.coffee'

$editable = $ '.js-editable'
#
# makeImageControl = ($tt, el) ->
#   bodyRect = document.body.getBoundingClientRect()
#   linkRect = el.getBoundingClientRect()
#   leftPos = linkRect.left - bodyRect.left
#   topPos = linkRect.top - bodyRect.top
#   widthToCenter = linkRect.width / 2
#   height = linkRect.height
#
#   $tt.style.display = 'block'
#   $tt.style.top = "#{topPos}px"
#   $tt.style.left = "#{leftPos + widthToCenter}px"
#   $tt.style.marginLeft = "-#{$tt.offsetWidth / 2}px"
#
# removeImageControl = ($tt) ->
#   $tt.style.display = 'none'

# $editable.addEventListener 'blur', (e) ->
#   for $imgSelected in ($$ '.is-img.is-selected')
#     $imgSelected.classList.remove 'is-selected'
#   removeImageControl ($ '.js-tooltip-image')
#
# $editable.addEventListener 'click', (e) ->
#   if e.target.nodeName isnt 'IMG'
#     for $imgSelected in ($$ '.is-img.is-selected')
#       $imgSelected.classList.remove 'is-selected'
#     removeImageControl ($ '.js-tooltip-image')
#   else
#     for $imgSelected in ($$ '.is-img.is-selected')
#       $imgSelected.classList.remove 'is-selected'
#     @classList.add 'is-selected'
#     makeImageControl ($ '.js-tooltip-image'), this

# drop event. some kind of copy paste
$editable.addEventListener 'drop', (e) ->
  setTimeout () ->
    $allSpan = $$ '.js-editable span'
    for $span in $allSpan
      $span.outerHTML = $span.innerHTML
  , 100

# scroll to caret
$editable.addEventListener 'keyup', (e) ->
  if e.keyCode is 13
    selection = window.getSelection()
    scTop = selection.anchorNode.offsetTop or selection.anchorNode.parentNode.offsetTop
    if scTop
      window.scrollTo 0, scTop + 100
# scroll to caret
# $editable.addEventListener 'click', (e) ->
#   selection = window.getSelection()
#   scTop = selection.anchorNode.offsetTop or selection.anchorNode.parentNode.offsetTop
#   if scTop
#     window.scrollTo 0, scTop + 100


# prevent image drag
$editable.addEventListener 'dragstart', (e) ->
  if e.target?.classList?.contains 'is-img'
    e.preventDefault()
    return

# undo key
$editable.addEventListener 'keydown', (e) ->
  selection = window.getSelection()
  $thisEl = selection.anchorNode

  biRegex = /^(B|I|EM|STRONG|A|SPAN)$/
  if biRegex.test $thisEl.parentNode.nodeName
    $thisEl = $thisEl.parentNode
    if biRegex.test $thisEl.parentNode.nodeName
      $thisEl = $thisEl.parentNode
      if biRegex.test $thisEl.parentNode.nodeName
        $thisEl = $thisEl.parentNode
        if biRegex.test $thisEl.parentNode.nodeName
          $thisEl = $thisEl.parentNode

  $blankP = p()
  $blankP.innerHTML = '<br>'
  if $thisEl.parentNode.nodeName is 'FIGCAPTION' or $thisEl.nodeName is 'FIGCAPTION'
    # prevent figcaption enter
    if e.which is 13 then e.preventDefault()
    # prevent figcaption delete at last char
    else if selection.anchorOffset is $thisEl.textContent.length and e.which is 46
      e.preventDefault()
    # prevent figcaption backspace at 0
    else if selection.anchorOffset is 0 and e.which is 8
      e.preventDefault()
  else if $thisEl.nodeName is 'LI'
    # backspace : replace li with new p. if last item
    if e.which is 8 and not $thisEl.nextSibling?
      e.preventDefault()

      if $thisEl.parentNode.nextSibling?
      then $editable.insertBefore $blankP, $thisEl.parentNode.nextSibling
      else $editable.appendChild $blankP

      $thisEl.parentNode.removeChild $thisEl
      setCaret $blankP, 0
  else if $thisEl.parentNode.classList.contains 'is-placeholder'
    # remove placeholder when type
    # $editable.replaceChild $blankP, $thisEl.parentNode
    # setCaret $blankP, 0
    # e.preventDefault()
    $thisEl.parentNode.classList.remove 'is-placeholder'
    $thisEl.parentNode.classList.remove 'b-graf--placeholder'
    $thisEl.parentNode.innerHTML = '<br>'

  else
    # new p when press enter
    if e.which is 13 and not e.shiftKey
      if selection.anchorOffset is $thisEl.parentNode.lastChild.textContent.length and $thisEl.parentNode.nodeName isnt 'LI'
        e.preventDefault()
        if $thisEl.parentNode.nextSibling?
        then $editable.insertBefore $blankP, $thisEl.parentNode.nextSibling
        else $editable.appendChild $blankP
        setCaret $blankP, 0
    # new p when press space
    # if e.which is 32
    #   if $thisEl.parentNode.classList?.contains 'is-small-caps'
    #     console.log 'ok'

# Small Caps

# $editable.addEventListener 'keypress', (e) ->
#   selection = window.getSelection()
#   $thisEl = selection.anchorNode
#   # when keyboard press space
#   if e.which < 65 or e.which > 90
#     upperCapRegex = /([A-Z]{2,})/g
#     # prevent nested span
#     if $thisEl.parentNode.classList?.contains 'is-small-caps'
#       $upperText = $thisEl.splitText selection.anchorOffset
#       $upperText
#       # $newText = document.createTextNode "\u00A0"
#       # $thisEl.parentNode.appendChild $newText

#     else if upperCapRegex.test $thisEl.textContent
#       e.preventDefault()
#       matchText = ($thisEl.textContent.match upperCapRegex)[0]

#       $newSpan = document.createElement 'SPAN'
#       idx = $thisEl.textContent.indexOf matchText
#       $afterText = $thisEl.splitText idx + matchText.length
#       $upperText = $thisEl.splitText idx

#       $newSpan = document.createElement 'SPAN'
#       $newSpan.classList.add 'is-small-caps'

#       $newSpan.innerHTML = matchText
#       $thisEl.parentNode.replaceChild $newSpan, $upperText

#       if e.which is 32
#       then $newText = document.createTextNode "\u00A0"
#       else $newText = document.createTextNode "#{String.fromCharCode e.which}"

#       if $newSpan.nextSibling?.nodeValue is ''
#         $newSpan.parentNode.appendChild $newText
#       else
#         $newSpan.parentNode.insertBefore $newText, $newSpan.nextSibling

#       setCaret $newText, 1


$editable.addEventListener 'keyup', (e) ->
  # remove all span, replacing with html inside it
  $allSpan = $$ '.js-editable span'
  for $span in $allSpan
    if $span.classList?.contains 'is-drop-cap'
      console.log
    else if $span.classList?.contains 'is-small-caps'
      console.log
    else
      $span.outerHTML = $span.innerHTML

  $allFont = $$ '.js-editable font'
  for $font in $allFont
    $font.outerHTML = $font.innerHTML

  $allStyled = ($$ '.js-editable *[style]')
  for $styled in $allStyled
    $styled.removeAttribute 'style'

  selection = window.getSelection()
  $thisEl = selection.anchorNode

  if e.ctrlKey or e.metaKey
    return
  # when keyboard press enter
  else if e.which is 13
    if e.shiftKey
      return

    # replace default content editable div with p
    if /^(DIV|P|BLOCKQUOTE|PRE)$/.test $thisEl.nodeName
      $newP = p()
      $newP.innerHTML = '<br>'
      $editable.replaceChild $newP, $thisEl
      setCaret $newP, 0

    else if $thisEl.parentNode.nodeName is 'DIV'
      $newP = p()
      $newP.innerHTML = '<br>'
      $editable.replaceChild $newP, $thisEl.parentNode
      setCaret $newP, 0

    # replace default content editable div with p
    else if $thisEl.parentNode.nodeName is 'LI'
      if $thisEl.parentNode.parentNode.lastChild is $thisEl.parentNode
        if $thisEl.parentNode.innerHTML is '<br>'
          $thisEl.parentNode.parentNode.removeChild $thisEl.parentNode
          $newP = p()
          $newP.innerHTML = '<br>'
          $editable.appendChild $newP
          setCaret $newP, 0

    # press enter at first character in some element
    # next element must be p
    else if /^(H2|H3|BLOCKQUOTE|PRE)$/.test $thisEl.parentNode.nodeName
      $prevEl = $thisEl.parentNode.previousSibling
      if $prevEl.textContent is ''
        $newP = p()
        $newP.innerHTML = '<br>'
        $editable.replaceChild $newP, $prevEl
  # else enter key
  else
    if  /^(H2|H3|BLOCKQUOTE|P|PRE)$/.test $thisEl.nodeName
      return
    else if $thisEl.parentNode.nodeName is 'DIV' and $thisEl isnt $editable
      $newP = p()
      $newP.innerHTML = '<br>'
      $editable.replaceChild $newP, $thisEl
      setCaret $newP, 0
      return

  # prevent content editable empty
  # must be wrapped in p element
  placeholder =
    paragraph: 'content&hellip;'
  $newP = """
  <p class='b-graf b-graf--placeholder is-placeholder'>#{placeholder.paragraph}<br></p>
  """

  if $editable.textContent is ''
    $editable.innerHTML = $newP
    setCaret $editable.firstChild, 0
  else if $editable.firstChild?.classList?.contains 'is-placeholder'
    # if e.which is 46
    #   $editable.innerHTML = $newP
    #   setCaret $editable.firstChild, 0
    # else if $editable.textContent isnt placeholder
    #   rgx = new RegExp "(.*)#{placeholder}$"
    #   if rgx.test $editable.textContent
    #     [ strAll, strBefore ] = rgx.exec $editable.textContent
    #     $editable.innerHTML = "<p class='b-graf'>#{strBefore}<br></p>"
    #     setCaret $editable.firstChild, strBefore.length-1
    #   else
    #     $editable.innerHTML = $newP
    #     setCaret $editable.firstChild, $editable.textContent.length-1
  # else if $editable.lastChild?.classList?.contains 'is-placeholder'
  #   $editable.removeChild $editable.lastChild
  #   setCaret $editable.firstChild, 0

  else if $editable.firstChild.nodeName is '#text' and $editable.childNodes.length is 1
    $editable.innerHTML = $newP
    setCaret $editable.firstChild, 0
  else if $editable.firstChild.innerHTML is ''
    $editable.firstChild.innerHTML = $newP
    setCaret $editable.firstChild, 0
  else if $editable.firstChild.innerHTML is '<p></p>'
    $editable.firstChild.innerHTML = '<br>'
    setCaret $editable.firstChild, 0
  else if $editable.firstChild.nodeName is 'DIV'
    $editable.firstChild.innerHTML = $newP
    setCaret $editable.firstChild, 0

  if $editable.childNodes[$editable.childNodes.length-3]?.nodeName is '#text'
    $editable.removeChild $editable.childNodes[$editable.childNodes.length-3]
  if $editable.childNodes[$editable.childNodes.length-2]?.nodeName is '#text'
    $editable.removeChild $editable.childNodes[$editable.childNodes.length-2]
  if $editable.childNodes[$editable.childNodes.length-1]?.nodeName is '#text'
    $editable.removeChild $editable.childNodes[$editable.childNodes.length-1]
