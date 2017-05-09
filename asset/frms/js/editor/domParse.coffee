{ $, $$ } = require './helper/selector.coffee'


{ p, h2, h3, blockquote1, blockquote2, ul, ol, li, code, cap, hr, figure } = require './helper/elementList.coffee'

$editable = $ '.js-editable'
$title = $ '.js-title-input'
$imgCover = $ '.js-img-cover'

$titleParent = $title.parentNode

loadImage = require 'blueimp-load-image-npm'

# syncLoop = (o) ->
#   i = -1
#   length = o.length
#   iterator = ->
#     i++
#     if i is length
#       o.callback()
#       return
#     o.functionToLoop iterator, i
#   iterator()

shortid = require 'shortid'

purifyHtml = (html) ->
  html
    .replace /</g, '&lt;'
    .replace /&lt;(br)(.*?)>/g, '<br>'
    # .replace /&lt;span class="is\-small\-caps">([A-Z]+)&lt;\/span>/g, '<span class="is-small-caps">$1</span>'
    .replace /&lt;span (.*?)>[A-Z]/g, ''
    .replace /&lt;\/span>/g, ''
    .replace /&lt;(b|strong)>/g, '<strong>'
    .replace /&lt;\/(b|strong)>/g, '</strong>'
    .replace /&lt;(i|em)>/g, '<em>'
    .replace /&lt;\/(i|em)>/g, '</em>'
    .replace /&lt;code>/g, '<code>'
    .replace /&lt;\/code>/g, '</code>'
    .replace /&lt;a href=/g, '<a href='
    .replace /&lt;\/a>/g, '</a>'

purifyImage = (data) ->
  /data:image\/(jpeg|png);base64,\/(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})/

toDom = (json) ->
  tmpDom = document.createElement 'DIV'
  $title.value = json.title

  if json.isTitleCenter
  then $title.classList.add 'is-center'
  else $title.classList.remove 'is-center'

  if json.isCover
    $imgCover.src = json.img[0].data
    ($ '.js-del-cover').classList.remove 'is-hidden'
    $imgCover.parentNode.classList.remove 'is-not-cover'
    $imgCover.style.width = "#{json.cover.width}px"
    $imgCover.style.height = "#{json.cover.height}px"
  else
    $imgCover.removeAttribute 'src'
    $imgCover.removeAttribute 'style'
    $imgCover.parentNode.classList.add 'is-not-cover'
    ($ '.js-del-cover').classList.add 'is-hidden'
    

  for item in json.data
    if item.type is 'P'
      $el = p()
      $el.innerHTML = item.content

      if item.isDropCap
        $cap = cap()
        $cap.innerHTML = item.dropCapChar[0]
        $el.insertBefore $cap, $el.firstChild
    else if item.type is 'H2'
      $el = h2()
      $el.innerHTML = item.content
    else if item.type is 'H3'
      $el = h3()
      $el.innerHTML = item.content
    else if item.type is 'QUOTE1'
      $el = blockquote1()
      $el.innerHTML = item.content
    else if item.type is 'QUOTE2'
      $el = blockquote2()
      $el.innerHTML = item.content
    else if item.type is 'PRE'
      $el = code()
      $el.innerHTML = item.content
    else if item.type is 'HR'
      $el = hr()
      $el.innerHTML = item.content
    else if item.type is 'FIGURE'
      # if item.caption is ''
      item.img.data = json.img[item.img.id].data
      $el = figure item.figureAlign, item.img, item.caption
    # else if item.type is 'IFRAME'
    else if item.type is 'UL'
      $el = ul()
      for list in item.list
        $li = li()
        $li.innerHTML = list
        $el.appendChild $li
    else if item.type is 'OL'
      $el = ol()
      for list in item.list
        $li = li()
        $li.innerHTML = list
        $el.appendChild $li

    if item.center
    then $el.classList.add 'is-center'

    if item.indent is 1
    then $el.classList.add 'is-indent1'
    else if item.indent is 2
    then $el.classList.add 'is-indent2'

    tmpDom.appendChild $el
  # return
  $editable.innerHTML = tmpDom.innerHTML

window.coverChanged = false
toJson = () ->
  domJson =
    isCoverChanged: false
    isTitleCenter: false
    title: $title.value
    isCover: false
    cover: {}
    data: []
    img: []

  domJson.isCoverChanged = window.coverChanged

  imgs = []
  imgCount = -1
  if ($ 'img.is-saved')
    maxImgId = -1
    for $img in ($$ 'img.is-saved')
      imgId = ($img.getAttribute 'image-id') * 1
      if imgId > maxImgId
        maxImgId = imgId
    imgCount = maxImgId

  if $titleParent.classList.contains 'is-center'
    domJson.isTitleCenter = true

  if window.coverChanged is true
    if $imgCover.src isnt ''
      domJson.isCover = true
      domJson.cover =
        width: $imgCover.getAttribute 'data-width'
        height: $imgCover.getAttribute 'data-height'
        data: $imgCover.src

  # console.log domJson

  for $child in $editable.childNodes
    if $child.nodeName isnt '#text' and $child.nodeName isnt '#comment'
      if $child.classList.contains 'is-placeholder'
      then continue

      data = {}
      if $child.classList.contains 'is-center'
      then data.center = true

      if $child.hasAttribute 'data-id'
      then data.id = $child.getAttribute 'data-id'
      else data.id = shortid.generate()

      if $child.classList.contains 'is-indent2'
      then data.indent = 2
      else if $child.classList.contains 'is-indent1'
      then data.indent = 1
      # else data.indent = 0

      if $child.nodeName is 'H2'
        data.type = 'H2'
        data.content = purifyHtml $child.innerHTML
      else if $child.nodeName is 'H3'
        data.type = 'H3'
        data.content = purifyHtml $child.innerHTML
      else if $child.nodeName is 'P'
        data.type = 'P'
        if $child.firstChild?.classList?.contains 'is-drop-cap'
          data.isDropCap = true
          data.dropCapChar = $child.firstChild.textContent[0]
        data.content = purifyHtml $child.innerHTML
      else if $child.nodeName is 'BLOCKQUOTE'
        if $child.classList.contains 'is-second'
        then data.type = 'QUOTE2'
        else data.type = 'QUOTE1'
        data.content = purifyHtml $child.innerHTML
      else if $child.nodeName is 'PRE'
        data.type = 'PRE'
        data.content = purifyHtml $child.innerHTML
      else if $child.nodeName is 'HR'
        data.type = 'HR'
      else if $child.nodeName is 'FIGURE'
        data.type = 'FIGURE'
        data.figureAlign = 'center'

        if $child.classList.contains 'b-figure--center'
        then data.figureAlign = 'center'
        else if $child.classList.contains 'b-figure--left'
        then data.figureAlign = 'left'
        else if $child.classList.contains 'b-figure--right'
        then data.figureAlign = 'right'
        else if $child.classList.contains 'b-figure--full'
        then data.figureAlign = 'full'

        data.img = {}
        for $grandChild in $child.childNodes
          if $grandChild.nodeName is 'IMG'
            if $grandChild.classList.contains 'is-saved'
              imgId = $grandChild.getAttribute 'image-id'
            else
              imgCount++
              imgId = imgCount

            if $grandChild.offsetWidth > 0 and $grandChild.offsetHeight > 0
              imgWidth = $grandChild.offsetWidth
              imgHeight = $grandChild.offsetHeight
            else
              imgWidth = $grandChild.getAttribute 'width'
              imgHeight = $grandChild.getAttribute 'height'

            imgs.push { id: imgId * 1, data: $grandChild.getAttribute 'src' }
            data.img =
              id: imgId * 1
              width: imgWidth * 1
              height: imgHeight * 1

            if $grandChild.getAttribute 'data-href'
              link = true
              data.img.href = $grandChild.getAttribute 'data-href'

            else link = false
            data.img.link = link
            # data.img.push img
          else if $grandChild.nodeName is 'FIGCAPTION'
            data.caption = purifyHtml $grandChild.innerHTML

      else if $child.nodeName is 'UL'
        data.type = 'UL'
        data.list = []
        for $grandChild in  $child.childNodes
          if $grandChild.nodeName is 'LI'
            data.list.push purifyHtml $grandChild.innerHTML

      else if $child.nodeName is 'OL'
        data.type = 'OL'
        data.list = []
        for $grandChild in  $child.childNodes
          if $grandChild.nodeName is 'LI'
            data.list.push purifyHtml $grandChild.innerHTML

      else if $child.nodeName is 'DIV'
        if $child.classList.contains 'embed'
          data.type = 'EMBED'
          data.url = $child.getAttribute 'data-href'
        # data.type = 'IFRAME'
        # data.origin = $child.getAttribute 'data-origin'

      domJson.data.push data
      domJson.img = imgs
  # return
  # console.log domJson
  domJson


module.exports =
  toJson: toJson
  toDom: toDom
