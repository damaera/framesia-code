getCaret = require '../helper/getCaret.coffee'
setCaret = require '../helper/setCaret.coffee'

{ $, $$ } = require '../helper/selector.coffee'

{ p, h2, h3, blockquote1, blockquote2, code, ul, ol, hr } = require '../helper/elementList.coffee'

$editable = $ '.js-editable'

hangingPunc = require './hangingPunc.coffee'
charTransform = require './charTransform.coffee'


purify = (text) ->
  text or= ''
  transformed = text
    .replace /</g, '&lt;'
    # .replace /\s{2,}/g, '&nbsp;'
    # .replace /\.\.\./g, '&#8202;&hellip;&#8202;'
    # .replace /\-\-/g, '&#8202;&mdash;&#8202;'
    # .replace /1\/2/g, '&#8202;&#8202;&frac12;'
    # .replace /1\/4/g, '&#8202;&#8202;&frac14;'
    # .replace /3\/4/g, '&#8202;&#8202;&frac34;'
    # .replace /(\d|½|¼|¾)"/g, '$1&Prime;'
    # .replace /(\d|½|¼|¾)'/g, '$1&prime;'
    # .replace /(\d+)-(\d+)/g, '$1&ndash;$2'
    # .replace /([0-9])"/g, '$1&Prime;'
    # .replace /([0-9])'/g, '$1&prime;'
    .replace /"(\w)/g, '&ldquo;$1'
    .replace /(\S)"/g, '$1&rdquo;'
    .replace /'(\w)/g, '&lsquo;$1'
    .replace /(\S)'/g, '$1&rsquo;'
    # .replace /([A-Z]{2,})/g, '<span class="is-small-caps">$1</span>'

  transformed

$editable.addEventListener 'paste', (e) ->

  e.preventDefault()

  selection = window.getSelection()
  { anchorNode } = selection
  $beginParent = anchorNode.parentNode

  biRegex = /^(B|I|STRONG|EM|A)$/

  if biRegex.test $beginParent.nodeName
    $beginParent = $beginParent.parentNode
    if biRegex.test $beginParent.nodeName
      $beginParent = $beginParent.parentNode
      if biRegex.test $beginParent.nodeName
        $beginParent = $beginParent.parentNode

  html = e.clipboardData.getData "text/html"
  isHTML = true
  $newEl = ''

  if html is ''
    plainText = e.clipboardData.getData 'text/plain'
    html = plainText
    isHTML = false
    $newEl = purify html

  $div = document.createElement 'DIV'
  $div.innerHTML = html


  if isHTML
    for $child in $div.childNodes
      if /^(H1|H2|H3|H4|H5|H6)$/.test $child.nodeName
        if /^(H1|H2)$/.test $child.nodeName
          $h = h2()
        else if /^(H3|H4)$/.test $child.nodeName
          $h = h3()
        else $h = blockquote1()

        if /^("|“)$/.test $child.textContent[0]
        then $h.classList.add 'is-indent2'
        else $h.classList.remove 'is-indent2'

        if /^('|‘)$/.test $child.textContent[0]
        then $h.classList.add 'is-indent1'
        else $h.classList.remove 'is-indent1'

        transformed = purify $child.textContent

        $h.innerHTML = transformed

        tmp = document.createElement 'DIV'
        tmp.appendChild $h

        $newEl += tmp.innerHTML
      else if /^(P|BLOCKQUOTE|PRE|UL|OL)$/.test $child.nodeName
        if $child.nodeName is 'P'
          $el = p()
        else if $child.nodeName is 'BLOCKQUOTE'
          $el = blockquote2()
        else if $child.nodeName is 'PRE'
          $el = code()
        else if $child.nodeName is 'UL'
          $el = ul()
        else if $child.nodeName is 'OL'
          $el = ol()

        if /^("|“)$/.test $child.textContent[0]
        then $el.classList.add 'is-indent2'
        else $el.classList.remove 'is-indent2'

        if /^('|‘)$/.test $child.textContent[0]
        then $el.classList.add 'is-indent1'
        else $el.classList.remove 'is-indent1'

        tmp = document.createElement 'DIV'
        for $elChild in $child.childNodes
          transformed = purify $elChild.textContent
          if /^(B|STRONG|EM|I|A|LI)$/.test $elChild.nodeName
            tag = $elChild.nodeName.toLowerCase()
            if $elChild.nodeName is 'A'
              $el.innerHTML += "<#{tag} href=#{$elChild.href}>#{transformed}</#{tag}>"
            else
              $el.innerHTML += "<#{tag}>#{transformed}</#{tag}>"
          else if $elChild.nodeName is 'BR'
            $el.innerHTML += "<br>"
          else
            $el.innerHTML += "#{transformed}"
        tmp.appendChild $el
        $newEl += tmp.innerHTML
      else if $child.nodeName is 'HR'
        $el = hr()
        tmp = document.createElement 'DIV'
        tmp.appendChild $el
        $newEl += tmp.innerHTML
      else if not /^(#text|#comment)$/.test $child.nodeName

        tmp = document.createElement 'DIV'
        transformed = purify $child.textContent

        if /^(B|STRONG|EM|I|A|LI)$/.test $child.nodeName
          tag = $child.nodeName.toLowerCase()
          if $child.nodeName is 'A'
            tmp.innerHTML += "<#{tag} href=#{$child.href}>#{transformed}</#{tag}>"
          else
            tmp.innerHTML += "<#{tag}>#{transformed}</#{tag}>"
        else
          tmp.innerHTML += "#{transformed}"

        $newEl += tmp.innerHTML


  selection.deleteFromDocument()


  if isHTML
    $p = p()
    $p.innerHTML = '<br>'
    if $editable.textContent is ''
      $editable.appendChild $p
    else if $beginParent is $editable.lastChild
      $editable.appendChild $p
    else if $beginParent.parentNode is $editable and $beginParent.nextSibling?
      $editable.insertBefore $p, $beginParent.nextSibling
    # empty paragraf
    else if $beginParent is $editable
      $beginParent = anchorNode
      $editable.insertBefore $p, anchorNode.nextSibling

    setCaret $p, 0

  document.execCommand "insertHTML", false, $newEl
