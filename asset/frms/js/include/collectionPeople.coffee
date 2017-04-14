{ $ } = require '../helper/selector.coffee'

request = require 'superagent'

$makeAdmin = $ '.js-make-admin'
$inputMakeAdmin = $ '.js-input-make-admin'
$formMakeAdmin = $ '.js-form-make-admin'
$makeAdmin?.onclick = (e) ->
  userId = @getAttribute 'data-user-id'
  $inputMakeAdmin.value = userId
  $formMakeAdmin.submit()

$removeAdmin = $ '.js-remove-admin'
$inputRemoveAdmin = $ '.js-input-remove-admin'
$formRemoveAdmin = $ '.js-form-remove-admin'
$removeAdmin?.onclick = (e) ->
  userId = @getAttribute 'data-user-id'
  $inputRemoveAdmin.value = userId
  $formRemoveAdmin.submit()

$removeMember = $ '.js-remove-member'
$inputRemoveMember = $ '.js-input-remove-member'
$formRemoveMember = $ '.js-form-remove-member'
$removeMember?.onclick = (e) ->
  userId = @getAttribute 'data-user-id'
  $inputRemoveMember.value = userId
  $formRemoveMember.submit()

$acceptRequest = $ '.js-accept-request'
$inputAcceptRequest = $ '.js-input-accept-request'
$formAcceptRequest = $ '.js-form-accept-request'
$acceptRequest?.onclick = (e) ->
  userId = @getAttribute 'data-user-id'
  $inputAcceptRequest.value = userId
  $formAcceptRequest.submit()

$removeRequest = $ '.js-remove-request'
$inputRemoveRequest = $ '.js-input-remove-request'
$formRemoveRequest = $ '.js-form-remove-request'
$removeRequest?.onclick = (e) ->
  userId = @getAttribute 'data-user-id'
  $inputRemoveRequest.value = userId
  $formRemoveRequest.submit()

$quitCollection = $ '.js-quit-collection'
$formQuitCollection = $ '.js-form-quit-collection'
$quitCollection?.onclick = (e) ->
  $formQuitCollection.submit()

$requestJoin = $ '.js-request-join'
if $requestJoin
  collectionId = $requestJoin.getAttribute 'data-collection-id'
  request
    .get "/c/request-join/#{collectionId}"
    .set 'Accept', 'application/json'
    .end (err, res) ->
      resData = JSON.parse res.text
      if resData.requested
        $follow.innerHTML = 'Requested'

  $requestJoin.onclick = (e) ->
    @setAttribute 'disabled', true
    request
      .post "/c/request-join/#{collectionId}"
      .send { _csrf: CSRF }
      .set 'Accept', 'application/json'
      .end (err, res) ->
        $requestJoin.removeAttribute 'disabled'
        resData = JSON.parse res.text
        if !resData.error
          $requestJoin.innerHTML = 'Requested'
