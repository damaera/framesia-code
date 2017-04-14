Undo = require 'undo.js'

stack = new Undo.Stack()

setCaret = require '../helper/setCaret.coffee'
setSelection = require '../helper/setSelection.coffee'

{ toDom } = require '../domParse.coffee'

editCommand = Undo.Command.extend {
  constructor: (editable, oldValue, newValue) ->
    @editable = editable
    @oldValue = oldValue
    @newValue = newValue
  execute: () ->
  undo: () ->
    toDom JSON.parse @oldValue
    @editable.blur()
  redo: () ->
    toDom JSON.parse @newValue
    @editable.blur()
}

module.exports = {
  stack: stack
  editCommand: editCommand
}
