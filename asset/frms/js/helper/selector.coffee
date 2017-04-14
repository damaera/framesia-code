$ = (el) ->
  document.querySelector el

$$ = (el) ->
  document.querySelectorAll el

module.exports =
  $: $
  $$: $$
