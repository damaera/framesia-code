setCaret = require '../helper/setCaret.coffee'

{ $ } = require '../helper/selector.coffee'

$editable = $ '.js-editable'
$toolbar = $ '.js-toolbar'

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

module.exports = (e) ->
  selection = window.getSelection()
  $thisEl = selection.anchorNode
  # when keyboard press space
  if e.which is 32
    linkRegex = /https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g
    # prevent nested span
    if $thisEl.parentNode is 'A'
      $link = $thisEl.splitText selection.anchorOffset
      $link

    else if linkRegex.test $thisEl.textContent
      e.preventDefault()
      matchText = ($thisEl.textContent.match linkRegex)[0]

      $newLink = document.createElement 'A'
      idx = $thisEl.textContent.indexOf matchText
      $afterText = $thisEl.splitText idx + matchText.length
      $link = $thisEl.splitText idx

      $newLink.innerHTML = matchText
      $newLink.href = matchText
      $thisEl.parentNode.replaceChild $newLink, $link

      $newText = document.createTextNode "\u00A0"

      if $newLink.nextSibling?.nodeValue is ''
        $newLink.parentNode.appendChild $newText
      else
        $newLink.parentNode.insertBefore $newText, $newLink.nextSibling

      $newLink.addEventListener 'mouseover', (e) ->
        makeTooltip $tt, this
      $newLink.addEventListener 'mouseleave', (e) ->
        removeTooltip $tt
      setCaret $newText, 1
