request = require 'superagent'

{ $ } = require '../helper/selector.coffee'

swal = require 'sweetalert'

$reportArticle = $ '.js-report-article'
$formReportArticle = $ '.js-form-report-article'
$inputReportArticle = $ '.js-input-report-article'
if $reportArticle
  $reportArticle.onclick = (e) ->
     swal
        title: "Why?"
        type: "input"
        inputPlaceholder: "Why you report this article? 10 - 200 char"
        showCancelButton: true
        showConfirmButton: true
      , (inputValue) ->
        if inputValue is false
          false
        else if inputValue.length > 200
          swal.showInputError "Too long"
          false
        else if inputValue.length < 5
          swal.showInputError "Too short"
          false
        else
          $inputReportArticle.value = inputValue
          $formReportArticle.submit()
          true