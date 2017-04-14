{ $ } = require '../helper/selector.coffee'

$switch1 = $ '.js-switch1'
$switch2 = $ '.js-switch2'

# in collection form (new / edit)
$switch1?.onchange = (e) ->
  if $switch1.checked
  then $switch2.classList.remove 'is-hidden'
  else
    $switch2.classList.add 'is-hidden'
    ($switch2.querySelector 'input').checked = false

($ '.js-delete-col')?.onclick = (e) ->
  ($ '.js-form-delete-col').classList.toggle 'is-hidden'
