hangingPunc = require './hangingPunc.coffee'

{ $, $$ } = require '../helper/selector.coffee'

$editable = $ '.js-editable'
$toolbar = $ '.js-toolbar'
$titleInput = $ '.js-title-input'

$img = $$ '.is-img'

$titleInput.addEventListener 'focus', (e) ->
  for $toolbarItem in ($$ '.js-toolbar button')
    $toolbarItem.classList.add 'is-disabled'
  ($ '.js-center').classList.remove 'is-disabled'
  ($ '.js-help').classList.remove 'is-disabled'

$editable.addEventListener 'blur', () ->
  { anchorNode } = window.getSelection()
  if $editable.contains anchorNode
    for $toolbarItem in ($$ '.js-toolbar button')
      $toolbarItem.classList.add 'is-disabled'
      $toolbarItem.classList.remove 'is-active'
    ($ '.js-help').classList.remove 'is-disabled'

addListenerMulti = (el, s, fn) ->
  evts = s.split ' '
  for ev in evts
    el.addEventListener(ev, fn, false);

$editable.addEventListener 'blur', () ->
  for $toolbarItem in ($$ '.js-toolbar button')
    $toolbarItem.classList.remove 'is-active'
    $toolbarItem.classList.add 'is-disabled'

$editable.addEventListener 'focus', () ->
  for $toolbarItem in ($$ '.js-toolbar button')
    $toolbarItem.classList.remove 'is-disabled'

for $disbtn in ($$ '.is-disabled')
  $disbtn.addEventListener 'click', (e) ->
    e.preventDefault();

$toolbar.addEventListener 'click', (e) ->
  hangingPunc()
  toolbarChange(e)

addListenerMulti $editable, 'keyup click', (e) ->
  toolbarChange(e)


toolbarChange = (e) ->
  if e.type is 'click'
    $target = e.target
    if $target.classList.contains 'is-img'
      for $btn in ($$ '.js-tooltip-image button')
        $btn.classList.remove 'is-active'
      if $target.parentNode.classList.contains 'b-figure--left'
        ($ '.js-img-left').classList.add 'is-active'
      else if $target.parentNode.classList.contains 'b-figure--right'
        ($ '.js-img-right').classList.add 'is-active'
      else if $target.parentNode.classList.contains 'b-figure--center'
        ($ '.js-img-center').classList.add 'is-active'
      else if $target.parentNode.classList.contains 'b-figure--full'
        ($ '.js-img-full').classList.add 'is-active'

      if $target.classList.contains 'is-link'
        ($ '.js-img-link').classList.add 'is-active'

  selection = window.getSelection()
  range = document.createRange()
  { anchorNode, focusNode } = selection

  if anchorNode is null
    for $elActive in ($$ '.is-active')
      $elActive.classList.remove 'is-active'
      $elActive.classList.add 'is-disabled'
    return

  $beginParent = anchorNode.parentNode
  $endParent = focusNode.parentNode

  # if $beginParent.nodeName is 'FIGURE'
  #   console.log 'return'

  biRegex = /^(B|I|STRONG|EM|A|SPAN)$/

  toggleInline = (regex, button) ->
    if regex.test $beginParent.nodeName or regex.test anchorNode.nodeName
      ($ button).classList.add 'is-active'
    else if regex.test $beginParent.parentNode.nodeName
      ($ button).classList.add 'is-active'
    else if regex.test $beginParent.parentNode.parentNode.nodeName
      ($ button).classList.add 'is-active'
    else
      ($ button).classList.remove 'is-active'

  toggleInline /^(B|STRONG)$/, '.js-bold'
  toggleInline /^(EM|I)$/, '.js-italic'
  toggleInline /^(A)$/, '.js-link'

  if biRegex.test $beginParent.nodeName
    $beginParent = $beginParent.parentNode
    if biRegex.test $beginParent.nodeName
      $beginParent = $beginParent.parentNode
      if biRegex.test $beginParent.nodeName
        $beginParent = $beginParent.parentNode
        if biRegex.test $beginParent.nodeName
          $beginParent = $beginParent.parentNode

  if biRegex.test $endParent.nodeName
    $endParent = $endParent.parentNode
    if biRegex.test $endParent.nodeName
      $endParent = $endParent.parentNode
      if biRegex.test $endParent.nodeName
        $endParent = $endParent.parentNode
        if biRegex.test $endParent.nodeName
          $endParent = $endParent.parentNode

  toggleElement = (el, button) ->
    if $beginParent.nodeName is el or anchorNode.nodeName is el
    then ($ button).classList.add 'is-active'
    else ($ button).classList.remove 'is-active'

  toggleElement 'H2', '.js-heading1'
  toggleElement 'H3', '.js-heading2'
  toggleElement 'PRE', '.js-code'

  # center
  if $beginParent.classList.contains 'is-center' or anchorNode.classList.contains 'is-center'
  then ($ '.js-center').classList.add 'is-active'
  else ($ '.js-center').classList.remove 'is-active'

  # dropCap
  if $beginParent.firstChild.classList?.contains 'is-drop-cap' or anchorNode.firstChild?.classList.contains 'is-drop-cap'
  then ($ '.js-drop-cap').classList.add 'is-active'
  else ($ '.js-drop-cap').classList.remove 'is-active'

  # quote1 and 2
  if $beginParent.nodeName is 'BLOCKQUOTE' or anchorNode.nodeName is 'BLOCKQUOTE'
    if $beginParent.classList.contains 'is-second'
      ($ '.js-quote1').classList.add 'is-active'
      ($ '.js-quote2').classList.remove 'is-active'
    else
      ($ '.js-quote2').classList.add 'is-active'
      ($ '.js-quote1').classList.remove 'is-active'
  else
    ($ '.js-quote1').classList.remove 'is-active'
    ($ '.js-quote2').classList.remove 'is-active'

  #hr
  if $beginParent.nodeName is 'LI'
    if $beginParent.parentNode?.nextSibling?.nodeName is 'HR'
      ($ '.js-hr').classList.add 'is-active'
    else
      ($ '.js-hr').classList.remove 'is-active'
  else
    if $beginParent.nextSibling?.nodeName is 'HR'
      ($ '.js-hr').classList.add 'is-active'
    else
      ($ '.js-hr').classList.remove 'is-active'


  # make disabled
  ##################
  if $beginParent.nodeName is 'LI'
    ($ '.js-heading1').classList.add 'is-disabled'
    ($ '.js-heading2').classList.add 'is-disabled'
    ($ '.js-quote1').classList.add 'is-disabled'
    ($ '.js-quote2').classList.add 'is-disabled'
    ($ '.js-code').classList.add 'is-disabled'
  else if $beginParent.firstChild.classList?.contains 'is-drop-cap'
    ($ '.js-heading1').classList.add 'is-disabled'
    ($ '.js-heading2').classList.add 'is-disabled'
    ($ '.js-quote1').classList.add 'is-disabled'
    ($ '.js-quote2').classList.add 'is-disabled'
    ($ '.js-code').classList.add 'is-disabled'
  else
    ($ '.js-heading1').classList.remove 'is-disabled'
    ($ '.js-heading2').classList.remove 'is-disabled'
    ($ '.js-quote1').classList.remove 'is-disabled'
    ($ '.js-quote2').classList.remove 'is-disabled'
    ($ '.js-code').classList.remove 'is-disabled'

  # dropcap only in p element, with first char is alphabetical, (a-z)
  if $beginParent.nodeName isnt 'P'
  then ($ '.js-drop-cap').classList.add 'is-disabled'
  else if /^[a-zA-Z0-9]/.test $beginParent.textContent[0]
  then ($ '.js-drop-cap').classList.remove 'is-disabled'
  else ($ '.js-drop-cap').classList.add 'is-disabled'

  # heading cant be bold and italic
  if /^(H2|H3)$/.test $beginParent.nodeName
    ($ '.js-link').classList.add 'is-disabled'
    ($ '.js-bold').classList.add 'is-disabled'
    ($ '.js-italic').classList.add 'is-disabled'
  else
    ($ '.js-link').classList.remove 'is-disabled'
    ($ '.js-bold').classList.remove 'is-disabled'
    ($ '.js-italic').classList.remove 'is-disabled'

  # figcaption cant converted to another element
  if $beginParent.nodeName is 'FIGCAPTION'
    ($ '.js-heading1').classList.add 'is-disabled'
    ($ '.js-heading2').classList.add 'is-disabled'
    ($ '.js-quote1').classList.add 'is-disabled'
    ($ '.js-quote2').classList.add 'is-disabled'
    ($ '.js-code').classList.add 'is-disabled'
    ($ '.js-center').classList.add 'is-disabled'

  if $beginParent.nodeName is 'PRE'
    ($ '.js-link').classList.add 'is-disabled'
