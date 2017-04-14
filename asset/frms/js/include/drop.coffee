{ $ } = require '../helper/selector.coffee'

document.onclick = (e) ->
  if ( e.target.parentNode?.classList?.contains 'js-down-article' ) or ( e.target.classList?.contains 'js-down-article' ) then return false
  else if ( e.target.parentNode?.classList?.contains 'js-down-user' ) or ( e.target.classList?.contains 'js-down-user' ) then return false
  else if ( e.target.parentNode?.classList?.contains 'js-down-editor' ) or ( e.target.classList?.contains 'js-down-editor' ) then return false
  else if ( e.target.parentNode?.classList?.contains 'js-down-notif' ) or ( e.target.classList?.contains 'js-down-notif' ) then return false
  else
    ($ '.js-drop-user')?.classList.add 'is-hidden'
    ($ '.js-drop-editor')?.classList.add 'is-hidden'
    ($ '.js-drop-article')?.classList.add 'is-hidden'
    ($ '.js-drop-notif')?.classList.add 'is-hidden'

($ '.js-down-editor')?.onclick = (e) ->
  ($ '.js-drop-user')?.classList?.add 'is-hidden'
  ($ '.js-drop-notif')?.classList.add 'is-hidden'

  ($ '.js-drop-editor').classList.toggle 'is-hidden'

($ '.js-down-user')?.onclick = (e) ->
  ($ '.js-drop-editor')?.classList.add 'is-hidden'
  ($ '.js-drop-article')?.classList.add 'is-hidden'
  ($ '.js-drop-notif')?.classList.add 'is-hidden'

  ($ '.js-drop-user').classList.toggle 'is-hidden'

($ '.js-down-article')?.onclick = (e) ->
  ($ '.js-drop-user')?.classList?.add 'is-hidden'
  ($ '.js-drop-notif')?.classList.add 'is-hidden'

  ($ '.js-drop-article').classList.toggle 'is-hidden'

($ '.js-down-notif')?.onclick = (e) ->
  ($ '.js-drop-user')?.classList?.add 'is-hidden'
  ($ '.js-drop-editor')?.classList.add 'is-hidden'
  ($ '.js-drop-article')?.classList.add 'is-hidden'

  ($ '.js-drop-notif').classList.toggle 'is-hidden'
