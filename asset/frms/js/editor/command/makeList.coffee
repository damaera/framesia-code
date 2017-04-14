{ ul, ol, li } = require '../helper/elementList.coffee'

setCaret = require '../helper/setCaret.coffee'

module.exports = (type) ->
  selection = window.getSelection()
  # console.log selection

  $thisElParent = selection.anchorNode.parentNode
  if $thisElParent.nodeName is 'P'
    if /^(\-&nbsp;|\+&nbsp;|\*&nbsp;)$/.test $thisElParent.innerHTML
      $newEl = ul()
      $newEl.innerHTML = "<li><br></li>"
      $thisElParent.parentNode.replaceChild $newEl, $thisElParent
    else if /^(1\.&nbsp;)$/.test $thisElParent.innerHTML
      $newEl = ol()
      $newEl.innerHTML = "<li><br></li>"
      $thisElParent.parentNode.replaceChild $newEl, $thisElParent
    else if /^(\- |\+ |\* )/.test $thisElParent.textContent
      $newEl = ul()
      innerText = $thisElParent.innerHTML[2..]
      $newEl.innerHTML = "<li>#{innerText}</li>"
      $thisElParent.parentNode.replaceChild $newEl, $thisElParent
    else if /^(1\. )/.test $thisElParent.textContent
      $newEl = ol()
      innerText = $thisElParent.innerHTML[2..]
      $newEl.innerHTML = "<li>#{innerText}</li>"
      $thisElParent.parentNode.replaceChild $newEl, $thisElParent
    else return
    setCaret $newEl.firstChild.firstChild, 0
  else return
