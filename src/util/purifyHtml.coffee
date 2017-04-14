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
    .replace /&lt;a(.*?)href="((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)"(.*?)>/g, '<a href="$2">'
    .replace /&lt;\/a(.*?)>/g, '</a>'

module.exports = purifyHtml
