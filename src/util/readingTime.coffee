readingTime = require 'reading-time'

module.exports = (content, lang) ->

  console.log content, lang
  if lang is 'ja' or lang is 'zh'
    ret =
      time: 0
      words: 0

    charPerWord = 2
    if lang is 'zh'
      charPerWord = 1.5

    wordCount = content.match(/\w{2,}/g)?.length or 0
    content = content
      .replace /\w/g, ''
      .replace /\s+/g, ''

    charCount = content.length
    wordCount += charCount / charPerWord

    estimatedTime = wordCount / 200 * 60 * 1000

    ret.words = wordCount
    ret.time = estimatedTime

    ret

  else
    readingTime content
