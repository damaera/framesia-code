{ $ } = require '../helper/selector.coffee'

$header = $ '.b-header'

lastScrollTop = 0
prevDirection = 'down'

if ($ '.b-toolbar')
  $header.classList.add 'is-fixed'

if ($ '.b-welcome')
  if (window.scrollY < 40)
    $('.b-header').classList.add 'no-bg'
  else
    $('.b-header').classList.remove 'no-bg'

window.addEventListener 'scroll', (e) ->
  if !($ '.b-toolbar')
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

    # no bg in header
    if $('.b-welcome') or $('.is-cover-full')
      if (window.scrollY < 400)
        $('.b-header').classList.add 'no-bg'
      else
        $('.b-header').classList.remove 'no-bg'