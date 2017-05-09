(function() {
  var $, $$;

  $ = function(el) {
    return document.querySelector(el);
  };

  $$ = function(el) {
    return document.querySelectorAll(el);
  };

  module.exports = {
    $: $,
    $$: $$
  };

}).call(this);
