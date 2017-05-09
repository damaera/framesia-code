(function() {
  var $, $$, $editable, $imgCover, $title, $titleParent, blockquote1, blockquote2, cap, code, figure, h2, h3, hr, li, loadImage, ol, p, purifyHtml, purifyImage, shortid, toDom, toJson, ul, _ref, _ref1;

  _ref = require('./helper/selector.coffee'), $ = _ref.$, $$ = _ref.$$;

  _ref1 = require('./helper/elementList.coffee'), p = _ref1.p, h2 = _ref1.h2, h3 = _ref1.h3, blockquote1 = _ref1.blockquote1, blockquote2 = _ref1.blockquote2, ul = _ref1.ul, ol = _ref1.ol, li = _ref1.li, code = _ref1.code, cap = _ref1.cap, hr = _ref1.hr, figure = _ref1.figure;

  $editable = $('.js-editable');

  $title = $('.js-title-input');

  $imgCover = $('.js-img-cover');

  $titleParent = $title.parentNode;

  loadImage = require('blueimp-load-image-npm');

  shortid = require('shortid');

  purifyHtml = function(html) {
    return html.replace(/</g, '&lt;').replace(/&lt;(br)(.*?)>/g, '<br>').replace(/&lt;span (.*?)>[A-Z]/g, '').replace(/&lt;\/span>/g, '').replace(/&lt;(b|strong)>/g, '<strong>').replace(/&lt;\/(b|strong)>/g, '</strong>').replace(/&lt;(i|em)>/g, '<em>').replace(/&lt;\/(i|em)>/g, '</em>').replace(/&lt;a href=/g, '<a href=').replace(/&lt;\/a>/g, '</a>');
  };

  purifyImage = function(data) {
    return /data:image\/(jpeg|png);base64,\/(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})/;
  };

  toDom = function(json) {
    var $cap, $el, $li, item, list, tmpDom, _i, _j, _k, _len, _len1, _len2, _ref2, _ref3, _ref4;
    tmpDom = document.createElement('DIV');
    $title.value = json.title;
    if (json.isTitleCenter) {
      $title.classList.add('is-center');
    } else {
      $title.classList.remove('is-center');
    }
    if (json.isCover) {
      $imgCover.src = json.img[0].data;
      ($('.js-del-cover')).classList.remove('is-hidden');
      $imgCover.parentNode.classList.remove('is-not-cover');
      $imgCover.style.width = "" + json.cover.width + "px";
      $imgCover.style.height = "" + json.cover.height + "px";
    } else {
      $imgCover.removeAttribute('src');
      $imgCover.removeAttribute('style');
      $imgCover.parentNode.classList.add('is-not-cover');
      ($('.js-del-cover')).classList.add('is-hidden');
    }
    _ref2 = json.data;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      item = _ref2[_i];
      if (item.type === 'P') {
        $el = p();
        $el.innerHTML = item.content;
        if (item.isDropCap) {
          $cap = cap();
          $cap.innerHTML = item.dropCapChar[0];
          $el.insertBefore($cap, $el.firstChild);
        }
      } else if (item.type === 'H2') {
        $el = h2();
        $el.innerHTML = item.content;
      } else if (item.type === 'H3') {
        $el = h3();
        $el.innerHTML = item.content;
      } else if (item.type === 'QUOTE1') {
        $el = blockquote1();
        $el.innerHTML = item.content;
      } else if (item.type === 'QUOTE2') {
        $el = blockquote2();
        $el.innerHTML = item.content;
      } else if (item.type === 'PRE') {
        $el = code();
        $el.innerHTML = item.content;
      } else if (item.type === 'HR') {
        $el = hr();
        $el.innerHTML = item.content;
      } else if (item.type === 'FIGURE') {
        item.img.data = json.img[item.img.id].data;
        $el = figure(item.figureAlign, item.img, item.caption);
      } else if (item.type === 'UL') {
        $el = ul();
        _ref3 = item.list;
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          list = _ref3[_j];
          $li = li();
          $li.innerHTML = list;
          $el.appendChild($li);
        }
      } else if (item.type === 'OL') {
        $el = ol();
        _ref4 = item.list;
        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
          list = _ref4[_k];
          $li = li();
          $li.innerHTML = list;
          $el.appendChild($li);
        }
      }
      if (item.center) {
        $el.classList.add('is-center');
      }
      if (item.indent === 1) {
        $el.classList.add('is-indent1');
      } else if (item.indent === 2) {
        $el.classList.add('is-indent2');
      }
      tmpDom.appendChild($el);
    }
    return $editable.innerHTML = tmpDom.innerHTML;
  };

  window.coverChanged = false;

  toJson = function() {
    var $child, $grandChild, $img, data, domJson, imgCount, imgHeight, imgId, imgWidth, imgs, link, maxImgId, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
    domJson = {
      isCoverChanged: false,
      isTitleCenter: false,
      title: $title.value,
      isCover: false,
      cover: {},
      data: [],
      img: []
    };
    domJson.isCoverChanged = window.coverChanged;
    imgs = [];
    imgCount = -1;
    if ($('img.is-saved')) {
      maxImgId = -1;
      _ref2 = $$('img.is-saved');
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        $img = _ref2[_i];
        imgId = ($img.getAttribute('image-id')) * 1;
        if (imgId > maxImgId) {
          maxImgId = imgId;
        }
      }
      imgCount = maxImgId;
    }
    if ($titleParent.classList.contains('is-center')) {
      domJson.isTitleCenter = true;
    }
    if (window.coverChanged === true) {
      if ($imgCover.src !== '') {
        domJson.isCover = true;
        domJson.cover = {
          width: $imgCover.getAttribute('data-width'),
          height: $imgCover.getAttribute('data-height'),
          data: $imgCover.src
        };
      }
    }
    _ref3 = $editable.childNodes;
    for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
      $child = _ref3[_j];
      if ($child.nodeName !== '#text' && $child.nodeName !== '#comment') {
        if ($child.classList.contains('is-placeholder')) {
          continue;
        }
        data = {};
        if ($child.classList.contains('is-center')) {
          data.center = true;
        }
        if ($child.hasAttribute('data-id')) {
          data.id = $child.getAttribute('data-id');
        } else {
          data.id = shortid.generate();
        }
        if ($child.classList.contains('is-indent2')) {
          data.indent = 2;
        } else if ($child.classList.contains('is-indent1')) {
          data.indent = 1;
        }
        if ($child.nodeName === 'H2') {
          data.type = 'H2';
          data.content = purifyHtml($child.innerHTML);
        } else if ($child.nodeName === 'H3') {
          data.type = 'H3';
          data.content = purifyHtml($child.innerHTML);
        } else if ($child.nodeName === 'P') {
          data.type = 'P';
          if ((_ref4 = $child.firstChild) != null ? (_ref5 = _ref4.classList) != null ? _ref5.contains('is-drop-cap') : void 0 : void 0) {
            data.isDropCap = true;
            data.dropCapChar = $child.firstChild.textContent[0];
          }
          data.content = purifyHtml($child.innerHTML);
        } else if ($child.nodeName === 'BLOCKQUOTE') {
          if ($child.classList.contains('is-second')) {
            data.type = 'QUOTE2';
          } else {
            data.type = 'QUOTE1';
          }
          data.content = purifyHtml($child.innerHTML);
        } else if ($child.nodeName === 'PRE') {
          data.type = 'PRE';
          data.content = purifyHtml($child.innerHTML);
        } else if ($child.nodeName === 'HR') {
          data.type = 'HR';
        } else if ($child.nodeName === 'FIGURE') {
          data.type = 'FIGURE';
          data.figureAlign = 'center';
          if ($child.classList.contains('b-figure--center')) {
            data.figureAlign = 'center';
          } else if ($child.classList.contains('b-figure--left')) {
            data.figureAlign = 'left';
          } else if ($child.classList.contains('b-figure--right')) {
            data.figureAlign = 'right';
          } else if ($child.classList.contains('b-figure--full')) {
            data.figureAlign = 'full';
          }
          data.img = {};
          _ref6 = $child.childNodes;
          for (_k = 0, _len2 = _ref6.length; _k < _len2; _k++) {
            $grandChild = _ref6[_k];
            if ($grandChild.nodeName === 'IMG') {
              if ($grandChild.classList.contains('is-saved')) {
                imgId = $grandChild.getAttribute('image-id');
              } else {
                imgCount++;
                imgId = imgCount;
              }
              if ($grandChild.offsetWidth > 0 && $grandChild.offsetHeight > 0) {
                imgWidth = $grandChild.offsetWidth;
                imgHeight = $grandChild.offsetHeight;
              } else {
                imgWidth = $grandChild.getAttribute('width');
                imgHeight = $grandChild.getAttribute('height');
              }
              imgs.push({
                id: imgId * 1,
                data: $grandChild.getAttribute('src')
              });
              data.img = {
                id: imgId * 1,
                width: imgWidth * 1,
                height: imgHeight * 1
              };
              if ($grandChild.getAttribute('data-href')) {
                link = true;
                data.img.href = $grandChild.getAttribute('data-href');
              } else {
                link = false;
              }
              data.img.link = link;
            } else if ($grandChild.nodeName === 'FIGCAPTION') {
              data.caption = purifyHtml($grandChild.innerHTML);
            }
          }
        } else if ($child.nodeName === 'UL') {
          data.type = 'UL';
          data.list = [];
          _ref7 = $child.childNodes;
          for (_l = 0, _len3 = _ref7.length; _l < _len3; _l++) {
            $grandChild = _ref7[_l];
            if ($grandChild.nodeName === 'LI') {
              data.list.push(purifyHtml($grandChild.innerHTML));
            }
          }
        } else if ($child.nodeName === 'OL') {
          data.type = 'OL';
          data.list = [];
          _ref8 = $child.childNodes;
          for (_m = 0, _len4 = _ref8.length; _m < _len4; _m++) {
            $grandChild = _ref8[_m];
            if ($grandChild.nodeName === 'LI') {
              data.list.push(purifyHtml($grandChild.innerHTML));
            }
          }
        } else if ($child.nodeName === 'DIV') {
          if ($child.classList.contains('embed')) {
            data.type = 'EMBED';
            data.url = $child.getAttribute('data-href');
          }
        }
        domJson.data.push(data);
        domJson.img = imgs;
      }
    }
    return domJson;
  };

  module.exports = {
    toJson: toJson,
    toDom: toDom
  };

}).call(this);
