{ $, $$ } = require '../helper/selector.coffee'

$$removeMainFeatured = $$ '.js-remove-main-featured'
$inputRemoveMainFeatured = $ '.js-input-remove-main-featured'
$formRemoveMainFeatured = $ '.js-form-remove-main-featured'
for $removeMainFeatured in $$removeMainFeatured
  $removeMainFeatured.onclick = (e) ->
    articleId = @getAttribute 'data-article-id'
    $inputRemoveMainFeatured.value = articleId
    $formRemoveMainFeatured.submit()

$$removeFeatured = $$ '.js-remove-featured'
$inputRemoveFeatured = $ '.js-input-remove-featured'
$formRemoveFeatured = $ '.js-form-remove-featured'
for $removeFeatured in $$removeFeatured
  $removeFeatured.onclick = (e) ->
    articleId = @getAttribute 'data-article-id'
    $inputRemoveFeatured.value = articleId
    $formRemoveFeatured.submit()

$$mainFeatured = $$ '.js-main-featured'
$inputMainFeatured = $ '.js-input-main-featured'
$formMainFeatured = $ '.js-form-main-featured'
for $mainFeatured in $$mainFeatured
  $mainFeatured.onclick = (e) ->
    articleId = @getAttribute 'data-article-id'
    $inputMainFeatured.value = articleId
    $formMainFeatured.submit()

$$makeFeatured = $$ '.js-make-featured'
$inputMakeFeatured = $ '.js-input-make-featured'
$formMakeFeatured = $ '.js-form-make-featured'
for $makeFeatured in $$makeFeatured
  $makeFeatured.onclick = (e) ->
    articleId = @getAttribute 'data-article-id'
    $inputMakeFeatured.value = articleId
    $formMakeFeatured.submit()

$$removeArticle = $$ '.js-remove-article'
$inputRemoveArticle = $ '.js-input-remove-article'
$formRemoveArticle = $ '.js-form-remove-article'
for $removeArticle in $$removeArticle
  $removeArticle.onclick = (e) ->
    articleId = @getAttribute 'data-article-id'
    $inputRemoveArticle.value = articleId
    $formRemoveArticle.submit()

$$acceptArticle = $$ '.js-accept-article'
$inputAcceptArticle = $ '.js-input-accept-article'
$formAcceptArticle = $ '.js-form-accept-article'
for $acceptArticle in $$acceptArticle
  $acceptArticle.onclick = (e) ->
    articleId = @getAttribute 'data-article-id'
    $inputAcceptArticle.value = articleId
    $formAcceptArticle.submit()

$$rejectArticle = $$ '.js-reject-article'
$inputRejectArticle = $ '.js-input-reject-article'
$formRejectArticle = $ '.js-form-reject-article'
for $rejectArticle in $$rejectArticle
  $rejectArticle.onclick = (e) ->
    articleId = @getAttribute 'data-article-id'
    $inputRejectArticle.value = articleId
    $formRejectArticle.submit()
