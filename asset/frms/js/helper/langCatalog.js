(function() {
  var $, langCatalog;

  $ = require('./selector.coffee').$;

  langCatalog = LANG_CATALOG;

  module.exports = {
    __: function(str) {
      return langCatalog[str] || '';
    },
    __n: function(str1, str2, str3) {
      if (str3 === 1) {
        return (langCatalog[str1].one.replace(/%s|%d/g, str3)) || '';
      } else {
        return (langCatalog[str1].other.replace(/%s|%d/g, str3)) || '';
      }
    }
  };

}).call(this);
