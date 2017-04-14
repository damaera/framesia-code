# https://github.com/bevacqua/horsey
# https://github.com/bevacqua/insignia


{ $ } = require '../helper/selector.coffee'

maxTags = 3
insignia = require 'insignia'
horsey = require 'horsey'

request = require 'superagent'

$tags = $ '.tags-wrap'
if $tags
  dataTags = $tags.getAttribute 'data-tags'
  if dataTags
    $tags.value = (JSON.parse dataTags).join ','

  tagOptions =
    delimiter: ','
    parse: (value) ->
      value
    validate: (value, tags) ->
      if tags.length < maxTags
        isDuplicate = false
        for tag in tags
          if tag.toLowerCase() is value.toLowerCase()
            isDuplicate = true
        if not isDuplicate
          return true

  tagging = insignia $tags, tagOptions

  $tags.addEventListener 'keypress', (e) ->
    if e.keyCode is 13
      e.preventDefault()
      tagging.convert()



  autoCompleteOptions =
    suggestions: (value, done) ->
      if value
        request
        .get "/s/topics?q=#{value}"
        .end (end, res) ->
          tags = JSON.parse res.text
          tags2 = []

          # uniqueness
          unique = true
          for tag in tags
            tagLower = tag._id.toLowerCase()
            for tag2 in tags2
              if tag2 is tagLower
                unique = false

            if unique is true
              tags2.push tagLower

          done tags2

  horsey $tags, autoCompleteOptions

  $tags.addEventListener 'horsey-selected', (e) ->
    tagging.convert()

  $collectionTag = $ '.js-collection-tag'
  if $collectionTag
    $tags.addEventListener 'insignia-converted', (e) ->
      $collectionTag.value = tagging.value()

module.exports = tagging
