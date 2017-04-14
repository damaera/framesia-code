{ $, $$ } = require '../helper/selector.coffee'

$jsArticle = $ '.js-article, .js-draft'

$closeToc = $ '.js-close-toc'
$toc = $ '.js-toc'

$header = $ '.b-header'

if $jsArticle
  articleId = $jsArticle.getAttribute 'data-article-id'
  console.log articleId

  if articleId

    window.addEventListener 'scroll', (e) ->
      isHeaderFixed = $header.classList.contains 'is-fixed'
      if isHeaderFixed
        $toc.classList.add 'is-with-header'
      else
        $toc.classList.remove 'is-with-header'

    $$allHeading = $$ 'h2, h3'

    i = 0

    for $heading in $$allHeading
      nodeName = $heading.nodeName
      if nodeName is 'H2' or nodeName is 'H3'
        i++
        text = $heading.textContent
        slug = text.toString().toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '') + "--#{i}"
        $heading.setAttribute 'id', slug

        if nodeName is 'H3'
          $toc.innerHTML += """
          <div>
            <a href='##{slug}'>#{text}</a>
          </div>
          """
        else
          $toc.innerHTML += """
          <b><div>
            <a href='##{slug}'>#{text}</a>
          </div></b>
          """