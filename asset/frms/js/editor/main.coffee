# ONLY GOD KNOWS

swal = require 'sweetalert'

setSelection = require './helper/setSelection.coffee'
setCaret = require './helper/setCaret.coffee'

blockElement = require './command/blockElement.coffee'
boldItalic = require './command/boldItalic.coffee'
makeList = require './command/makeList.coffee'
alignCenter = require './command/alignCenter.coffee'
createLink = require './command/createLink.coffee'
insertHr = require './command/insertHr.coffee'
makeEmbed = require './command/makeEmbed.coffee'
insertImage = require './command/insertImage.coffee'
imageControl = require './command/imageControl.coffee'
insertCode = require './command/insertCode.coffee'
dropCap = require './command/dropCap.coffee'
addCover = require './command/addCover.coffee'

normalizedEditable = require './normalize/normalizeEditable.coffee'
toolbarListener = require './normalize/toolbarListener.coffee'
onPaste = require './normalize/onPaste.coffee'
onUndo = require './normalize/onUndo.coffee'
charTransform = require './normalize/charTransform.coffee'
hangingPunc = require './normalize/hangingPunc.coffee'
autoLink = require './normalize/autoLink.coffee'

{ toJson, toDom } = require './domParse.coffee'
{ $, $$ } = require './helper/selector.coffee'

$editable = $ '.js-editable'
$toolbar = $ '.js-toolbar'

articleInit = JSON.stringify toJson()
localStorage.setItem 'article-init', articleInit

timer = ''
oldValue = JSON.stringify toJson()

# { getDelta, init } = require './ot.coffee'
# init()

document.addEventListener 'keyup', (e) ->
  data1 = toJson()

  # console.log data1

  # getDelta data1, e.key

  clearTimeout timer
  timer = setTimeout () ->
    if e.ctrlKey or e.metaKey
      return
    newValue = JSON.stringify toJson()
    if newValue isnt oldValue
      onUndo.stack.execute new onUndo.editCommand $editable, oldValue, newValue
      oldValue = newValue
  , 250

# undo key
document.addEventListener 'keydown', (e) ->
  if e.ctrlKey or e.metaKey
    # if e.keyCode isnt 17

    if e.keyCode is 90
      e.preventDefault()
      try
        onUndo.stack.canUndo()
        onUndo.stack.undo()
        addListener()
    else if e.keyCode is 89
      e.preventDefault()
      try
        onUndo.stack.canRedo()
        onUndo.stack.redo()
        addListener()

# set undo function
setUndo = () ->
  newValue = JSON.stringify toJson()
  onUndo.stack.execute new onUndo.editCommand $editable, oldValue, newValue,
  oldValue = newValue

document.addEventListener 'keydown', (e) ->
  # prevent tab
  if e.which is 9
    e.preventDefault()
  else if e.ctrlKey or e.metaKey
    # prevent default bold 66, italic 73 and underline 85
    # prevent default tab change ctrl + 1-4
    if /^(66|73|85|49|50|51|52|53|69|75|79|83)$/.test e.which
      e.preventDefault()

    # ctrl B
    if e.keyCode is 66 then ($ '.js-bold').click()
    # ctrl I
    else if e.keyCode is 73 then ($ '.js-italic').click()
    # ctrl 1
    else if e.keyCode is 49 then ($ '.js-heading1').click()
    # ctrl 2
    else if e.keyCode is 50 then ($ '.js-heading2').click()
    # ctrl 3
    else if e.keyCode is 51 then ($ '.js-quote1').click()
    # ctrl 4
    else if e.keyCode is 52 then ($ '.js-quote2').click()
    # ctrl 5
    else if e.keyCode is 53 then ($ '.js-code').click()
    # ctrl E centering
    else if e.keyCode is 69 then ($ '.js-center').click()
    # ctrl K make link
    else if e.keyCode is 75 then ($ '.js-link').click()
    # ctrl O open saved
    # else if e.keyCode is 79 then ($ '.js-open').click()
    # ctrl S save document
    else if e.keyCode is 83 then ($ '.js-save').click()
    # ctrl S save document
    else if e.keyCode is 191 then ($ '.js-help').click()


makeImageControl = ($tt, el) ->
  bodyRect = document.body.getBoundingClientRect()
  inkRect = el.getBoundingClientRect()
  leftPos = linkRect.left - bodyRect.left
  topPos = linkRect.top - bodyRect.top
  widthToCenter = linkRect.width / 2
  height = linkRect.height

  $tt.style.display = 'block'
  $tt.style.top = "#{topPos}px"
  $tt.style.left = "#{leftPos + widthToCenter}px"
  $tt.style.marginLeft = "-#{$tt.offsetWidth / 2}px"

makeTooltip = ($tt, el) ->
  bodyRect = document.body.getBoundingClientRect()
  linkRect = el.getBoundingClientRect()
  leftPos = linkRect.left - bodyRect.left
  topPos = linkRect.top - bodyRect.top
  widthToCenter = linkRect.width/2
  height = linkRect.height

  if el.href
  then $tt.innerHTML = "#{el.href}"
  else if el.getAttribute 'data-href'
  then $tt.innerHTML = "#{el.getAttribute 'data-href'}"
  else return

  $tt.style.display = 'block'
  $tt.style.top = "#{topPos + height}px"
  $tt.style.left = "#{leftPos + widthToCenter}px"
  $tt.style.marginLeft = "-#{$tt.offsetWidth / 2}px"

removeTooltip = ($tt) ->
  $tt.style.display = 'none'

# command function, return cb true or false
$tt = $ '.js-tooltip-link'
removeImageControl = ($tt) ->
  $tt.style.display = 'none'

$editable.addEventListener 'click', (e) ->
  console.log window.getSelection()
  if e.target.nodeName isnt 'IMG'
    for $imgSelected in ($$ '.is-img.is-selected')
      $imgSelected.classList.remove 'is-selected'
    removeImageControl ($ '.js-tooltip-image')

$editable.addEventListener 'keyup', (e) ->
  removeImageControl ($ '.js-tooltip-image')

addListener = () ->
  for $link in ($$ '.js-editable img.is-link')
    $link.addEventListener 'mouseover', (e) ->
      makeTooltip $tt, this
    $link.addEventListener 'mouseleave', (e) ->
      removeTooltip $tt

  for $link in ($$ '.js-editable a')
    $link.addEventListener 'mouseover', (e) ->
      makeTooltip $tt, this
    $link.addEventListener 'mouseleave', (e) ->
      removeTooltip $tt

  for $img in ($$ '.is-img')
    $img.addEventListener 'click', (e) ->
      # $editable.blur()
      for $imgSelected in ($$ '.is-img.is-selected')
        $imgSelected.classList.remove 'is-selected'
      @classList.add 'is-selected'
      makeImageControl ($ '.js-tooltip-image'), this


  # $editable.addEventListener 'click', (e) ->
  #   if e.target.nodeName isnt 'IMG'
  #     for $imgSelected in ($$ '.is-img.is-selected')
  #       $imgSelected.classList.remove 'is-selected'
  #     removeImageControl ($ '.js-tooltip-image')
  # $editable.addEventListener 'keyup', (e) ->
  #   removeImageControl ($ '.js-tooltip-image')
  # $editable.addEventListener 'blur', (e) ->
  #   removeImageControl ($ '.js-tooltip-image')

# removeListener = () ->
#   for $link in ($$ '.js-editable a')
#     $link.removeEventListener 'mouseover'
#     $link.removeEventListener 'mouseleave'
#   for $img in ($$ '.is-img')
#     $img.removeEventListener 'click'

$inputLink = $ '.js-input-link'
$ttil = $ '.js-tooltip-input-link'

$inputLink.addEventListener 'blur', (e) ->
  e.preventDefault()
  $inputLink.value = ''
  $ttil.style.display = 'none'

$inputLink.addEventListener 'keyup', (e) ->
  if e.keyCode is 13
    setTimeout addListener(), 1000

addListener()

for $btn in ($$ '.js-tooltip-image button')
  $btn.addEventListener 'click', (e) ->
    setUndo()

command = (e, cb) ->
  # removeListener()
  e.preventDefault()
  selection = window.getSelection()
  { anchorNode, focusNode } = window.getSelection()
  # console.log selection
  if anchorNode is null or focusNode is null
  then cb false
  else
    $beginParent = anchorNode.parentNode
    $endParent = focusNode.parentNode
    if $editable.contains $beginParent
      cb true
      addListener()
      setUndo()
      data1 = toJson()
      # getDelta data1, 'a'
    else
      cb false

($ '.js-heading1').onclick = (e) ->
  command e, (res) ->
    if res
    then blockElement 1
    else return

($ '.js-heading2').onclick = (e) ->
  command e, (res) ->
    if res
    then blockElement 2
    else return

($ '.js-quote1').onclick = (e) ->
  command e, (res) ->
    if res
      blockElement 4
      alignCenter()
      boldItalic 'italic'
    else return

($ '.js-quote2').onclick = (e) ->
  command e, (res) ->
    if res
    then blockElement 3
    else return

($ '.js-code').onclick = (e) ->
  command e, (res) ->
    if res
    then blockElement 5
    else return

($ '.js-bold').onclick = (e) ->
  command e, (res) ->
    if res
    then boldItalic 'bold'
    else return

($ '.js-italic').onclick = (e) ->
  command e, (res) ->
    if res
    then boldItalic 'italic'
    else return

$title = ($ 'textarea')
$titleParent = $title.parentNode
isTitleFocus = false
$title.onfocus = (e) ->
  if $titleParent.classList.contains 'is-center'
  then ($ '.js-center').classList.add 'is-active'
  else ($ '.js-center').classList.remove 'is-active'
  isTitleFocus = true

$editable.addEventListener 'click', (e) ->
  isTitleFocus = false
$editable.addEventListener 'keyup', (e) ->
  isTitleFocus = false

($ '.js-center').onclick = (e) ->
  if isTitleFocus
    isTitleFocus = false
    if $titleParent.classList.contains 'is-center'
      $titleParent.classList.remove 'is-center'
    else
      ($ '.js-center').classList.add 'is-active'
      $titleParent.classList.add 'is-center'
  command e, (res) ->
    if res
    then alignCenter()
    else return

($ '.js-drop-cap').onclick = (e) ->
  command e, (res) ->
    if res
    then dropCap()
    else return

($ '.js-link').onclick = (e) ->
  command e, (res) ->
    if res
    then createLink()
    else return

($ '.js-hr').onclick = (e) ->
  command e, (res) ->
    if res
    then insertHr()
    else return

($ '.js-img').onclick = (e) ->
  command e, (res) ->
    if res
    then ($ '.js-input-img').click()
    else return

($ '.js-help').onclick = (e) ->
  swal
    title: 'Help'
    text: '''
<h3>Shortcut</h3>
<table>
  <tr>
    <td><span>Cmd</span> + <span class="btn">B</span></td>
    <td>Bold</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">I</span></td>
    <td>Italic</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">K</span></td>
    <td>Link</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">E</span></td>
    <td>Align center</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">1</span></td>
    <td>Big heading</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">2</span></td>
    <td>Small heading</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">3</span></td>
    <td>Big quote</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">4</span></td>
    <td>Small quote</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">5</span></td>
    <td>Code block</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">Z</span></td>
    <td>Undo</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">Y</span></td>
    <td>Redo</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">S</span></td>
    <td>Save article</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">O</span></td>
    <td>Open saved article</td>
  </tr>
  <tr>
    <td><span>Cmd</span> + <span class="btn">?</span></td>
    <td>Help</td>
  </tr>
</table>
'''
    html: true
    allowOutsideClick: true

# coverResponsive = () ->
#   $imgCoverFull = $ ('.is-cover-full img')
#   if $imgCoverFull
#     $container = $imgCoverFull.parentNode
#     imgUrl = $imgCoverFull.getAttribute 'src'
#     $imgCoverFull.classList.add 'is-hidden'
#     $container.style.backgroundImage = "url('#{imgUrl}')"
#     $container.style.backgroundSize = "cover"

($ '.js-input-img').onchange = (e) ->
  insertImage()
  setTimeout setUndo(), 500
  ($ '.js-input-img').value = ''

($ '.js-add-cover').onclick = (e) ->
  window.coverChanged = true
  ($ '.js-input-cover').click()

($ '.js-del-cover').onclick = (e) ->
  window.coverChanged = true
  $imgCover = $ '.js-img-cover'
  $cover = $imgCover.parentNode
  $title = ($ '.js-article-title')
  $shadow = ($ '.js-cover-shadow')

  $title.classList.remove 'is-with-cover'
  $shadow.classList.add 'is-hidden'

  $cover.removeAttribute 'src'
  $cover.removeAttribute 'style'
  $cover.classList.remove 'is-cover-full'
  $cover.classList.remove 'is-cover-not-full'

  $imgCover.removeAttribute 'src'
  $imgCover.removeAttribute 'style'
  $imgCover.classList.remove 'is-hidden'

  @classList.add 'is-hidden'
  ($ '.js-cover').classList.add 'is-not-cover'
  setUndo()


($ '.js-input-cover').onchange = (e) ->
  addCover()
  setTimeout setUndo(), 500
  # setTimeout coverResponsive(), 500

$editable.addEventListener 'change', (e) ->
  console.log e

$editable.addEventListener 'keyup', (e) ->
  if e.ctrlKey or e.metaKey
    return
  else if e.keyCode is 17
    return
  else
    charTransform()
    makeList()
    hangingPunc()

$editable.addEventListener 'keydown', (e) ->
  if e.which is 13
    makeEmbed()
  else if e.keyCode is 32
    autoLink(e)

$editable.addEventListener 'click', (e) ->
  for $figcaption in ($$ '.is-figcaption')
    if $figcaption.textContent is 'description (optional)'
      $figcaption.innerHTML = '<br>'

# $titleInput = $ '.js-title-input'
# $titleInput.addEventListener 'keydown', (e) ->
#   if e.which is 13
#     e.preventDefault()

($ '.js-open').onclick = (e) ->
  articleData = JSON.parse localStorage.getItem 'article'
  if articleData
    toDom articleData
    addListener()
    setUndo()

($ '.js-save').onclick = (e) ->
  articleData = JSON.stringify toJson()
  localStorage.setItem 'article', articleData
