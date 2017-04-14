{ $ } = require '../helper/selector.coffee'

$jsArticle = $ '.js-article'

request = require 'superagent'


if $jsArticle
  # console.log 'is article'
  timeout = null
  delay = 300

  beginTime = new Date

  seenInPercent = 0
  readInPercent = 0

  readingTime = ($jsArticle.getAttribute 'data-reading-time') * 1
  articleId = $jsArticle.getAttribute 'data-article-id'

  if articleId
    socket.emit 'view-article', { articleId : articleId }

    counter = 0
    firstScroll = 0
    checkPercent = () ->
      { top, height } = $jsArticle.getBoundingClientRect()

      currentDate = new Date

      if firstScroll is 0
        beginTime = new Date

      firstScroll++

      seenInPercent = ( window.innerHeight - top ) / $jsArticle.offsetHeight * 100

      readInPercent = ( currentDate - beginTime ) / readingTime * 100

      if seenInPercent > 40 and readInPercent > 40
        if counter is 0
          socket.emit 'read-article', { articleId : articleId }
        counter++

    checkPercent()

    window.addEventListener 'scroll', (e) ->
      clearTimeout timeout
      timeout = setTimeout () ->
        checkPercent()
      , delay
