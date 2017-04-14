sharedb = require 'sharedb/lib/client'

{ toJson, toDom } = require './domParse.coffee'


stringDiff = require 'fast-diff'

diff = (require 'jsondiffpatch').create()

socket = new WebSocket 'ws://localhost:8080'
connection = new sharedb.Connection socket
doc = connection.get 'examples', 'counter'

window.doc = doc

init = () ->
  doc.subscribe () ->
    # console.log doc.data
    if doc.data.data
      toDom doc.data.data

      localStorage.setItem 'article-init', JSON.stringify doc.data.data

  doc.on 'op', (op, source) ->
    console.log op[0]
    # if !source
      # toDom doc.data.data
    # console.log delta = diff.diff (JSON.parse localStorage.getItem 'article-init'), doc.data.data
    # console.log doc.data.data

getDelta = (data, key) ->
  data2 = JSON.stringify data
  # if '&nbsp;'.includes key
  #   return

  delta = diff.diff (JSON.parse localStorage.getItem 'article-init'), data

  if delta
    localStorage.setItem 'article-init', data2

    deltaData = delta.data

    console.log deltaData

    for k, v of deltaData
      obj = {}
      obj[k] = v

      # new content
      if Array.isArray v
        # console.log obj
        # delete, underscore, jsondiffpatch
        if k[0] is '_'
          k = (k.split '_')[1]

        command =
          p: ['data', 'data', k]

        if v.length is 1
        then command.li = v[0]
        else command.ld = v[0]

        # console.log command
        doc.submitOp command
      # change block
      # console.log v

      if v.type
        command =
          p: ['data', 'data', k, 'type']
          oi: v.type[1]
        doc.submitOp command

      if v.center
        command =
          p: ['data', 'data', k, 'center']

        if v.center.length is 1
        then command.oi = v.center[0]
        else command.od = v.center[0]

        doc.submitOp command

      # if v.indent
      #   command =
      #     p: ['data', 'data', k, 'indent']
      #     oi: v.indent[1]
      #   doc.submitOp command

      # string in content 
      if v.content
        if v.content.length && v.content.length isnt 2
          command =
            p: ['data', 'data', k, 'content']

          if v.content.length is 1
          then command.oi = v.content[0]
          else command.od = v.content[0]

          doc.submitOp command
        else
          strDiff = stringDiff v.content[0], v.content[1]
          offset = 0
          for itemDiff in strDiff
            type = itemDiff[0]
            val = itemDiff[1]
            if type is 0
              offset += val.length
            else
              command = {}
              # insert
              if type is 1
                command = 
                  p: ['data', 'data', k, 'content', offset]
                  si: val
                doc.submitOp command
                offset += val.length
              # delete
              else if type is -1
                command = 
                  p: ['data', 'data', k, 'content', offset]
                  sd: val
                doc.submitOp command

              # console.log {type: type, val: val, offset: offset}

      

module.exports =
  getDelta: getDelta
  init: init