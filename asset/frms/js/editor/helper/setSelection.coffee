module.exports = (el1, position1, el2, position2) ->
  selection = window.getSelection()
  range = document.createRange()
  range.setStart el1, position1
  range.setEnd el2, position2
  selection.removeAllRanges()
  selection.addRange range
