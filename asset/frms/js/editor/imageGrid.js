(function() {
  var $, $$, _ref;

  _ref = require('./helper/selector.coffee'), $ = _ref.$, $$ = _ref.$$;

  module.exports = function() {
    var $$img, $figure, $img, baseRatio, i, ih, img, imgRow, iw, row, tmpRatio, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _ref3, _results;
    baseRatio = 960 / 240;
    _ref1 = $$('.js-image-grid');
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      $figure = _ref1[_i];
      row = 0;
      tmpRatio = 0;
      imgRow = [];
      imgRow[row] = [];
      $$img = [];
      i = 0;
      _ref2 = $figure.childNodes;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        $img = _ref2[_j];
        if ($img.nodeName === 'IMG') {
          iw = $img.getAttribute('data-width');
          ih = $img.getAttribute('data-height');
          tmpRatio += iw / ih;
          imgRow[row].push({
            data: $img.src,
            w: iw,
            h: ih
          });
          if (tmpRatio >= baseRatio) {
            _ref3 = imgRow[row];
            for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
              img = _ref3[_k];
              img.w = img.w / img.h / tmpRatio * 960;
              img.h = img.h / tmpRatio / 240;
              $$img.push(img);
            }
            row++;
            imgRow[row] = [];
            tmpRatio = 0;
          }
          i++;
        }
      }
      _results.push(console.log($$img));
    }
    return _results;
  };

}).call(this);
