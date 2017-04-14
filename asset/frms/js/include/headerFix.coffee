{ $ } = require '../helper/selector.coffee'

$header = $ '.b-header'

lastScrollTop = 0
prevDirection = 'down'

window.addEventListener 'scroll', (e) ->
  st = window.pageYOffset or document.documentElement.scrollTop
  if st > lastScrollTop
    direction = 'down'
  else
    direction = 'up'


  if prevDirection isnt direction
    if direction is 'down'
      $header.classList.remove 'is-fixed'
      if st > 100
        $header.style.top = '-60px'
    else
      $header.classList.add 'is-fixed'
      $header.style.top = '0'

  lastScrollTop = st
  prevDirection = direction
