{ $, $$ } = require '../helper/selector.coffee'

module.exports = () ->
  for $form in ($$ 'form')
    formMethod = $form.getAttribute 'method'
    if formMethod?.toLowerCase() is 'post'
      if ($form.firstChild.getAttribute 'name') isnt '_csrf'
        inputCSRF = "<input type='hidden' name='_csrf' value='#{CSRF}'>"
        $form.innerHTML = inputCSRF + $form.innerHTML