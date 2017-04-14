module.exports = (el, position) ->
  selection = window.getSelection()
  range = document.createRange()
  range.setStart el, position
  range.collapse true
  selection.removeAllRanges()
  selection.addRange range