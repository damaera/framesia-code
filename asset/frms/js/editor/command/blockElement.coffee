getCaret = require '../helper/getCaret.coffee'
setCaret = require '../helper/setCaret.coffee'

setSelection = require '../helper/setSelection.coffee'
hangingPunc = require '../normalize/hangingPunc.coffee'

{ p, h2, h3, blockquote1, blockquote2, code } = require '../helper/elementList.coffee'

{ $ } = require '../helper/selector.coffee'

$editable = $ '.js-editable'

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/

selectBlock = ($newEl) ->
  $newElBegin = $newEl
  if biRegex.test $newElBegin.firstChild.nodeName
    $newElBegin = $newElBegin.firstChild
    if biRegex.test $newElBegin.firstChild.nodeName
      $newElBegin = $newElBegin.firstChild
      if biRegex.test $newElBegin.firstChild.nodeName
        $newElBegin = $newElBegin.firstChild
        if biRegex.test $newElBegin.firstChild.nodeName
          $newElBegin = $newElBegin.firstChild

  $newElLast = $newEl
  if biRegex.test $newElLast.lastChild.nodeName
    $newElLast = $newElLast.lastChild
    if biRegex.test $newElLast.lastChild.nodeName
      $newElLast = $newElLast.lastChild
      if biRegex.test $newElLast.lastChild.nodeName
        $newElLast = $newElLast.lastChild
        if biRegex.test $newElLast.lastChild.nodeName
          $newElLast = $newElLast.lastChild
  # select all text in block
  try
    hangingPunc()
    setSelection $newElBegin.firstChild, 0, $newElLast.lastChild, $newElLast.lastChild.textContent.length


module.exports = (type = 1) ->
  # get element in caret
  selection = window.getSelection()
  $beginEl = selection.anchorNode
  $endEl = selection.focusNode
  beginOffset = selection.anchorOffset
  endOffset = selection.focusOffset

  hElement = h2()
  eType = "H2"
  if type is 1
    hElement = h2()
    eType = "H2"
  else if type is 2
    hElement = h3()
    eType = "H3"
  else if type is 3
    hElement = blockquote1()
    eType = "BLOCKQUOTE"
  else if type is 4
    hElement = blockquote2()
    eType = "BLOCKQUOTE"
  else if type is 5
    hElement = code()
    eType = "PRE"
  else return

  if $beginEl.parentNode.firstChild.classList?.contains 'is-drop-cap'
    return

  # if empty
  if $beginEl.textContent.length is 0

    if $beginEl.nodeName is eType
    then $newEl = p()
    else $newEl = hElement

    $newEl.innerHTML = '<br>'
    $beginEl.parentNode.replaceChild $newEl, $beginEl
    setCaret $newEl.lastChild, 0

  # if already Htype, convert to p element
  else if $beginEl.parentNode.nodeName is eType
    $newEl = p()
    # blockquote 1 to 2 and opposite
    if $beginEl.parentNode.classList.contains 'is-second'
      if type is 3 then $newEl = blockquote1()
    else if not $beginEl.parentNode.classList.contains 'is-second'
      if type is 4 then $newEl = blockquote2()
    # add center i prev el centered
    if $beginEl.parentNode.classList.contains 'is-center'
      $newEl.classList.add 'is-center'
    $newEl.innerHTML = $beginEl.parentNode.innerHTML

    # replace
    $editable.replaceChild $newEl, $beginEl.parentNode
    # select block
    selectBlock $newEl


  # B or I element, inside element P
  # prevent nesting weirdness
  else if biRegex.test $beginEl.parentNode.nodeName
    $newEl = hElement
    $beginEl = $beginEl.parentNode
    # nesting B I and A
    # find parent until P
    if biRegex.test $beginEl.parentNode.nodeName
      $beginEl = $beginEl.parentNode
      if biRegex.test $beginEl.parentNode.nodeName
        $beginEl = $beginEl.parentNode

    if $beginEl.parentNode.firstChild.classList?.contains 'is-drop-cap'
      return

    if $beginEl.parentNode.nodeName is eType
    then $newEl = p()

    if $beginEl.parentNode.classList.contains 'is-center'
    then $newEl.classList.add 'is-center'

    # replace element
    $newEl.innerHTML = $beginEl.parentNode.innerHTML
    $editable.replaceChild $newEl, $beginEl.parentNode

    selectBlock $newEl

  # convert to hElement
  else if /^(P|BLOCKQUOTE|H2|H3|PRE)$/.test $beginEl.parentNode.nodeName
    $newEl = hElement
    $newEl.innerHTML = $beginEl.parentNode.innerHTML
    # prevent bug after paste, delete to top
    if $beginEl.nodeName isnt '#text'
      $newEl.innerHTML = $beginEl.innerHTML
      $editable.replaceChild $newEl, $beginEl
    else
      if $beginEl.parentNode.classList.contains 'is-center'
        $newEl.classList.add 'is-center'
      $editable.replaceChild $newEl, $beginEl.parentNode
    selectBlock $newEl
