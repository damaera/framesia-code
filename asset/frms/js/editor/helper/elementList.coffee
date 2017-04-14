module.exports =
  p: () ->
    $p = document.createElement 'P'
    $p.classList.add 'b-graf'
    $p
  h2: () ->
    $h2 = document.createElement 'H2'
    $h2.classList.add 'b-graf'
    $h2.classList.add 'b-graf--h2'
    $h2
  h3: () ->
    $h3 = document.createElement 'H3'
    $h3.classList.add 'b-graf'
    $h3.classList.add 'b-graf--h3'
    $h3
  ul: () ->
    $ul = document.createElement 'UL'
    $ul.classList.add 'b-graf'
    $ul.classList.add 'b-graf--ulist'
    $ul
  ol: () ->
    $ol = document.createElement 'OL'
    $ol.classList.add 'b-graf'
    $ol.classList.add 'b-graf--olist'
    $ol
  li: () ->
    $li = document.createElement 'LI'
    $li
  blockquote1: () ->
    $blockquote = document.createElement 'BLOCKQUOTE'
    $blockquote.classList.add 'b-graf'
    $blockquote.classList.add 'b-graf--quote1'
    $blockquote
  blockquote2: () ->
    $blockquote = document.createElement 'BLOCKQUOTE'
    $blockquote.classList.add 'b-graf'
    $blockquote.classList.add 'b-graf--quote2'
    $blockquote.classList.add 'is-second'
    $blockquote

  code: () ->
    $code = document.createElement 'PRE'
    $code.classList.add 'b-graf'
    $code.classList.add 'b-graf--code'
    $code

  cap: () ->
    $cap = document.createElement 'SPAN'
    $cap.classList.add 'b-graf'
    $cap.classList.add 'b-graf--drop-cap'
    $cap.classList.add 'is-drop-cap'
    $cap.contentEditable = false
    $cap

  hr: () ->
    $hr = document.createElement 'HR'
    $hr.classList.add 'b-graf'
    $hr.classList.add 'b-graf--divider'
    $hr.contentEditable = false
    $hr


  text: (text) ->
    $textNode = document.createTextNode text
    $textNode

  figure: (type = 'center', img, caption = "deskripsi gambar (opsional)") ->
    figureClass = type
    placeholderText = caption
    altText = caption
    if caption is 'deskripsi gambar (opsional)'
      altText = ''

    $figure = document.createElement 'FIGURE'
    $caption = document.createElement 'FIGCAPTION'
    $figure.classList.add 'b-figure'
    $figure.classList.add "b-figure--#{figureClass}"
    $caption.classList.add 'b-figure__figcaption'
    $caption.classList.add 'is-figcaption'
    $caption.innerHTML = placeholderText
    $caption.contentEditable = true

    # if type is 'multi'
    #   row = 0
    #   tmpRatio = 0
    #   i = 0
    #
    #   imgRow = []
    #   fImg = []
    #   imgRow[row] = []
    #
    #   # 960 / 360
    #   baseRatio = 2.67
    #   imgsLn = imgs.length
    #   for img in imgs
    #     iw = img.width
    #     ih = img.height
    #
    #     ratio = iw / ih
    #     tmpRatio += ratio
    #
    #     imgRow[row].push
    #       data: img.data
    #       ratio: ratio
    #       w: iw
    #       h: ih
    #
    #     if tmpRatio >= baseRatio or imgsLn-1 is i
    #       j = 0
    #       imgRowLn = imgRow[row].length
    #       for img in imgRow[row]
    #         iw = img.w
    #         ih = img.h
    #         # fw = img.ratio / tmpRatio * 960 - 10 * (imgRowLn - 1) + 5
    #         fw = img.ratio / tmpRatio * 960
    #         fh = fw / img.ratio
    #         j++
    #
    #         $img = document.createElement 'IMG'
    #         $img.classList.add 'b-figure__img'
    #         $img.classList.add 'is-img'
    #         # if j is imgRowLn then $img.classList.add 'is-last'
    #         $img.src = img.data
    #         $img.setAttribute 'alt', altText
    #         $img.setAttribute 'data-width', iw
    #         $img.setAttribute 'data-height', ih
    #         $img.width = fw
    #         $img.height = fh
    #         $figure.appendChild $img
    #       row++
    #       imgRow[row] = []
    #       tmpRatio = 0
    #     i++

    # else
    $img = document.createElement 'IMG'
    $img.classList.add 'b-figure__img'
    $img.classList.add 'is-img'
    # $img.src = imgs[0].data
    if img.nodeName is 'CANVAS'
    then $img.src = img.toDataURL 'image/jpeg', .7
    else $img.src = img.data
    $img.setAttribute 'alt', altText
    $img.setAttribute 'data-width', img.width
    $img.setAttribute 'data-height', img.height
    if img.link
      $img.setAttribute 'data-href', img.href
      $img.classList.add 'is-link'
    # $img.setAttribute 'data-width', imgs[0].width
    # $img.setAttribute 'data-height', imgs[0].height
    $figure.appendChild $img

    $figure.appendChild $caption
    $figure.contentEditable = false
    $figure

  iframe: (link) ->
