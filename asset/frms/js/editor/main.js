(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $, $inputCover, loadImage, renderImg, resizeCropImg, swal;

$ = require('../helper/selector.coffee').$;

$inputCover = $('.js-input-cover');

swal = require('sweetalert');

loadImage = require('blueimp-load-image-npm');

renderImg = function(img) {
  var $cover, $imgCover, $shadow, $title, height, imgUrl, width;
  $imgCover = $('.js-img-cover');
  $title = $('.js-article-title');
  $shadow = $('.js-cover-shadow');
  $cover = $imgCover.parentNode;
  width = img.width, height = img.height;
  $imgCover.src = img.toDataURL('image/jpeg', 0.7);
  $imgCover.style.width = width + "px";
  $imgCover.style.height = height + "px";
  $title.classList.remove('is-with-cover');
  $shadow.classList.add('is-hidden');
  $cover.removeAttribute('src');
  $cover.removeAttribute('style');
  $cover.classList.remove('is-cover-full');
  $cover.classList.remove('is-cover-not-full');
  $imgCover.classList.remove('is-hidden');
  $imgCover.setAttribute('data-width', width);
  $imgCover.setAttribute('data-height', height);
  if (width >= 1200) {
    if (width / height < 2.2) {
      $cover.classList.add('is-cover-full');
      $title.classList.add('is-with-cover');
      $shadow.classList.remove('is-hidden');
      imgUrl = $imgCover.getAttribute('src');
      $imgCover.classList.add('is-hidden');
      $cover.style.backgroundImage = "url('" + imgUrl + "')";
      $cover.style.backgroundSize = "cover";
    } else {
      $cover.classList.add('is-cover-not-full');
    }
  } else {
    $cover.classList.add('is-cover-not-full');
  }
  ($('.js-del-cover')).classList.remove('is-hidden');
  ($('.js-cover')).classList.remove('is-not-cover');
  return $inputCover.value = '';
};

resizeCropImg = function(img) {
  var height, options, width;
  if (img.toDataURL == null) {
    swal({
      type: 'error',
      title: 'error',
      allowOutsideClick: true
    });
    return false;
  }
  options = {};
  options.canvas = true;
  width = img.width, height = img.height;
  if (width >= 1920) {
    options.maxWidth = 1920;
  } else if (width >= 1440) {
    options.maxWidth = 1440;
  } else if (width >= 1200) {
    options.maxWidth = 1200;
  } else if (width >= 960) {
    options.maxWidth = 960;
  } else if (width >= 640) {
    options.maxWidth = 640;
  }
  return loadImage(img.toDataURL(), renderImg, options);
};

module.exports = function() {
  return loadImage($inputCover.files[0], resizeCropImg, {
    canvas: true
  });
};


},{"../helper/selector.coffee":16,"blueimp-load-image-npm":20,"sweetalert":30}],2:[function(require,module,exports){
var $, $$, $editable, biRegex, blockRegex, em, p, ref, ref1, setCaret, strong, text, toggleCenter;

ref = require('../helper/elementList.coffee'), p = ref.p, text = ref.text, strong = ref.strong, em = ref.em;

ref1 = require('../helper/selector.coffee'), $ = ref1.$, $$ = ref1.$$;

setCaret = require('../helper/setCaret.coffee');

$editable = document.querySelector('.js-editable');

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;

blockRegex = /^(H1|H2|H3|P|BLOCKQUOTE|TEXTAREA|PRE)$/;

toggleCenter = function($el) {
  if (biRegex.test($el.nodeName)) {
    $el = $el.parentNode;
    if (biRegex.test($el.nodeName)) {
      $el = $el.parentNode;
      if (biRegex.test($el.nodeName)) {
        $el = $el.parentNode;
        if (biRegex.test($el.nodeName)) {
          $el = $el.parentNode;
        }
      }
    }
  }
  if (blockRegex.test($el.nodeName)) {
    return $el.classList.toggle('is-center');
  } else {
    return console.log;
  }
};

module.exports = function() {
  var $beginParent, $child, $endParent, i, isList, len, ref2, results, selection;
  selection = window.getSelection();
  $beginParent = selection.anchorNode.parentNode;
  $endParent = selection.focusNode.parentNode;
  if ($beginParent === $endParent) {
    return toggleCenter($beginParent);
  } else {
    isList = false;
    ref2 = $editable.childNodes;
    results = [];
    for (i = 0, len = ref2.length; i < len; i++) {
      $child = ref2[i];
      if (selection.containsNode($child, true)) {
        if ($child.innerHTML) {
          results.push(toggleCenter($child));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
};


},{"../helper/elementList.coffee":14,"../helper/selector.coffee":16,"../helper/setCaret.coffee":17}],3:[function(require,module,exports){
var $, $editable, biRegex, blockquote1, blockquote2, code, getCaret, h2, h3, hangingPunc, p, ref, selectBlock, setCaret, setSelection;

getCaret = require('../helper/getCaret.coffee');

setCaret = require('../helper/setCaret.coffee');

setSelection = require('../helper/setSelection.coffee');

hangingPunc = require('../normalize/hangingPunc.coffee');

ref = require('../helper/elementList.coffee'), p = ref.p, h2 = ref.h2, h3 = ref.h3, blockquote1 = ref.blockquote1, blockquote2 = ref.blockquote2, code = ref.code;

$ = require('../helper/selector.coffee').$;

$editable = $('.js-editable');

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;

selectBlock = function($newEl) {
  var $newElBegin, $newElLast;
  $newElBegin = $newEl;
  if (biRegex.test($newElBegin.firstChild.nodeName)) {
    $newElBegin = $newElBegin.firstChild;
    if (biRegex.test($newElBegin.firstChild.nodeName)) {
      $newElBegin = $newElBegin.firstChild;
      if (biRegex.test($newElBegin.firstChild.nodeName)) {
        $newElBegin = $newElBegin.firstChild;
        if (biRegex.test($newElBegin.firstChild.nodeName)) {
          $newElBegin = $newElBegin.firstChild;
        }
      }
    }
  }
  $newElLast = $newEl;
  if (biRegex.test($newElLast.lastChild.nodeName)) {
    $newElLast = $newElLast.lastChild;
    if (biRegex.test($newElLast.lastChild.nodeName)) {
      $newElLast = $newElLast.lastChild;
      if (biRegex.test($newElLast.lastChild.nodeName)) {
        $newElLast = $newElLast.lastChild;
        if (biRegex.test($newElLast.lastChild.nodeName)) {
          $newElLast = $newElLast.lastChild;
        }
      }
    }
  }
  try {
    hangingPunc();
    return setSelection($newElBegin.firstChild, 0, $newElLast.lastChild, $newElLast.lastChild.textContent.length);
  } catch (undefined) {}
};

module.exports = function(type) {
  var $beginEl, $endEl, $newEl, beginOffset, eType, endOffset, hElement, ref1, ref2, selection;
  if (type == null) {
    type = 1;
  }
  selection = window.getSelection();
  $beginEl = selection.anchorNode;
  $endEl = selection.focusNode;
  beginOffset = selection.anchorOffset;
  endOffset = selection.focusOffset;
  hElement = h2();
  eType = "H2";
  if (type === 1) {
    hElement = h2();
    eType = "H2";
  } else if (type === 2) {
    hElement = h3();
    eType = "H3";
  } else if (type === 3) {
    hElement = blockquote1();
    eType = "BLOCKQUOTE";
  } else if (type === 4) {
    hElement = blockquote2();
    eType = "BLOCKQUOTE";
  } else if (type === 5) {
    hElement = code();
    eType = "PRE";
  } else if (type === 0) {
    hElement = p();
    eType = "P";
  } else {
    return;
  }
  if ((ref1 = $beginEl.parentNode.firstChild.classList) != null ? ref1.contains('is-drop-cap') : void 0) {
    return;
  }
  if ($beginEl.textContent.length === 0) {
    if ($beginEl.nodeName === eType) {
      $newEl = p();
    } else {
      $newEl = hElement;
    }
    $newEl.innerHTML = '<br>';
    $beginEl.parentNode.replaceChild($newEl, $beginEl);
    return setCaret($newEl.lastChild, 0);
  } else if ($beginEl.parentNode.nodeName === eType) {
    $newEl = p();
    if ($beginEl.parentNode.classList.contains('is-second')) {
      if (type === 3) {
        $newEl = blockquote1();
      }
    } else if (!$beginEl.parentNode.classList.contains('is-second')) {
      if (type === 4) {
        $newEl = blockquote2();
      }
    }
    if ($beginEl.parentNode.classList.contains('is-center')) {
      $newEl.classList.add('is-center');
    }
    $newEl.innerHTML = $beginEl.parentNode.innerHTML;
    $editable.replaceChild($newEl, $beginEl.parentNode);
    return selectBlock($newEl);
  } else if (biRegex.test($beginEl.parentNode.nodeName)) {
    $newEl = hElement;
    $beginEl = $beginEl.parentNode;
    if (biRegex.test($beginEl.parentNode.nodeName)) {
      $beginEl = $beginEl.parentNode;
      if (biRegex.test($beginEl.parentNode.nodeName)) {
        $beginEl = $beginEl.parentNode;
      }
    }
    if ((ref2 = $beginEl.parentNode.firstChild.classList) != null ? ref2.contains('is-drop-cap') : void 0) {
      return;
    }
    if ($beginEl.parentNode.nodeName === eType) {
      $newEl = p();
    }
    if ($beginEl.parentNode.classList.contains('is-center')) {
      $newEl.classList.add('is-center');
    }
    $newEl.innerHTML = $beginEl.parentNode.innerHTML;
    $editable.replaceChild($newEl, $beginEl.parentNode);
    return selectBlock($newEl);
  } else if (/^(P|BLOCKQUOTE|H2|H3|PRE)$/.test($beginEl.parentNode.nodeName)) {
    $newEl = hElement;
    $newEl.innerHTML = $beginEl.parentNode.innerHTML;
    if ($beginEl.nodeName !== '#text') {
      $newEl.innerHTML = $beginEl.innerHTML;
      $editable.replaceChild($newEl, $beginEl);
    } else {
      if ($beginEl.parentNode.classList.contains('is-center')) {
        $newEl.classList.add('is-center');
      }
      $editable.replaceChild($newEl, $beginEl.parentNode);
    }
    return selectBlock($newEl);
  }
};


},{"../helper/elementList.coffee":14,"../helper/getCaret.coffee":15,"../helper/selector.coffee":16,"../helper/setCaret.coffee":17,"../helper/setSelection.coffee":18,"../normalize/hangingPunc.coffee":34}],4:[function(require,module,exports){
var $, $$, $editable, boldItalic, ref, setSelection;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

setSelection = require('../helper/setSelection.coffee');

$editable = $('.js-editable');

boldItalic = function(tag, selection) {
  var data;
  if (tag === 'bold') {
    return document.execCommand('bold');
  } else if (tag === 'italic') {
    return document.execCommand('italic');
  } else if (tag === 'code') {
    data = selection.toString();
    if (data.length > 0) {
      if (selection.anchorNode.parentNode.nodeName === 'CODE') {
        return document.execCommand('insertHTML', false, "" + data);
      } else {
        return document.execCommand('insertHTML', false, "<code>" + (data.trim()) + "</code>  ");
      }
    }
  } else {

  }
};

module.exports = function(tag) {
  var $beginParent, $child, $endParent, anchorNode, anchorOffset, beginCaret, elRegex, endCaret, focusNode, focusOffset, i, isHeading, len, ref1, selection;
  selection = window.getSelection();
  document.execCommand('StyleWithCSS', false, false);
  elRegex = /^(B|I|STRONG|EM|P|A|BLOCKQUOTE|UL|OL|FIGURE|PRE)$/;
  anchorNode = selection.anchorNode, focusNode = selection.focusNode, anchorOffset = selection.anchorOffset, focusOffset = selection.focusOffset;
  $beginParent = anchorNode.parentNode;
  $endParent = focusNode.parentNode;
  beginCaret = anchorOffset;
  endCaret = focusOffset;
  isHeading = false;
  ref1 = $editable.childNodes;
  for (i = 0, len = ref1.length; i < len; i++) {
    $child = ref1[i];
    if (selection.containsNode($child, true)) {
      if ($child.innerHTML) {
        if (!elRegex.test($child.nodeName)) {
          isHeading = true;
        }
      }
    }
  }
  if (isHeading !== true) {
    return boldItalic(tag, selection);
  } else {

  }
};


},{"../helper/selector.coffee":16,"../helper/setSelection.coffee":18}],5:[function(require,module,exports){
var $, $$, $editable, $tt, makeTooltip, ref, removeTooltip, setSelection, swal;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

setSelection = require('../helper/setSelection.coffee');

$editable = $('.js-editable');

swal = require('sweetalert');

$tt = $('.js-tooltip-link');

makeTooltip = function($tt, el) {
  var bodyRect, height, leftPos, linkRect, topPos, widthToCenter;
  bodyRect = document.body.getBoundingClientRect();
  linkRect = el.getBoundingClientRect();
  leftPos = linkRect.left - bodyRect.left;
  topPos = linkRect.top - bodyRect.top;
  widthToCenter = linkRect.width / 2;
  height = linkRect.height;
  $tt.innerHTML = "" + el.href;
  $tt.style.display = 'block';
  $tt.style.top = (topPos + height) + "px";
  $tt.style.left = (leftPos + widthToCenter) + "px";
  return $tt.style.marginLeft = "-" + ($tt.offsetWidth / 2) + "px";
};

removeTooltip = function($tt) {
  return $tt.style.display = 'none';
};

module.exports = function() {
  var $beginParent, $endParent, anchorNode, anchorOffset, beginCaret, biRegex, elRegex, endCaret, focusNode, focusOffset, selection;
  selection = window.getSelection();
  document.execCommand('StyleWithCSS', false, false);
  biRegex = /^(B|I|STRONG|EM|SPAN)$/;
  elRegex = /^(P|BLOCKQUOTE|FIGCAPTION|LI|UL|OL)$/;
  anchorNode = selection.anchorNode, focusNode = selection.focusNode, anchorOffset = selection.anchorOffset, focusOffset = selection.focusOffset;
  $beginParent = anchorNode.parentNode;
  $endParent = focusNode.parentNode;
  beginCaret = anchorOffset;
  endCaret = focusOffset;
  if (biRegex.test($beginParent.nodeName)) {
    $beginParent = $beginParent.parentNode;
    if (biRegex.test($beginParent.nodeName)) {
      $beginParent = $beginParent.parentNode;
      if (biRegex.test($beginParent.nodeName)) {
        $beginParent = $beginParent.parentNode;
      }
    }
  }
  if (biRegex.test($endParent.nodeName)) {
    $endParent = $endParent.parentNode;
    if (biRegex.test($endParent.nodeName)) {
      $endParent = $endParent.parentNode;
      if (biRegex.test($endParent.nodeName)) {
        $endParent = $endParent.parentNode;
      }
    }
  }
  if ($beginParent.nodeName === 'A') {
    return document.execCommand('unlink');
  } else if ($beginParent === $endParent) {
    if (elRegex.test($beginParent.nodeName)) {
      return swal({
        title: "Insert link",
        text: "Link must valid",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "ex: framesia.com",
        allowOutsideClick: true
      }, function(inputValue) {
        var $link, i, len, ref1;
        setSelection(anchorNode, beginCaret, focusNode, endCaret);
        if (inputValue === false) {
          return false;
        } else if (inputValue === '') {
          return false;
        } else {
          if (!/^https?/.test(inputValue)) {
            inputValue = "//" + inputValue;
          }
          document.execCommand('createLink', false, inputValue);
          swal.close();
          ref1 = $$('.js-editable a');
          for (i = 0, len = ref1.length; i < len; i++) {
            $link = ref1[i];
            $link.addEventListener('mouseover', function(e) {
              return makeTooltip($tt, this);
            });
            $link.addEventListener('mouseleave', function(e) {
              return removeTooltip($tt);
            });
          }
          return false;
        }
      });
    }
  }
};


},{"../helper/selector.coffee":16,"../helper/setSelection.coffee":18,"sweetalert":30}],6:[function(require,module,exports){
var $, $$, $editable, biRegex, cap, ref, setCaret;

cap = require('../helper/elementList.coffee').cap;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

setCaret = require('../helper/setCaret.coffee');

$editable = $('.js-editable');

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;

module.exports = function() {
  var $beginParent, $cap, $endParent, $firstChild, capText, firstText, ref1, selection;
  selection = window.getSelection();
  $beginParent = selection.anchorNode.parentNode;
  $endParent = selection.focusNode.parentNode;
  if (biRegex.test($beginParent.nodeName)) {
    $beginParent = $beginParent.parentNode;
    if (biRegex.test($beginParent.nodeName)) {
      $beginParent = $beginParent.parentNode;
      if (biRegex.test($beginParent.nodeName)) {
        $beginParent = $beginParent.parentNode;
        if (biRegex.test($beginParent.nodeName)) {
          $beginParent = $beginParent.parentNode;
        }
      }
    }
  }
  if ($beginParent.nodeName === 'P') {
    if ((ref1 = $beginParent.firstChild.classList) != null ? ref1.contains('is-drop-cap') : void 0) {
      capText = $beginParent.firstChild.textContent;
      $beginParent.removeChild($beginParent.firstChild);
      $firstChild = $beginParent.firstChild;
      if (biRegex.test($firstChild.nodeName)) {
        $firstChild = $firstChild.firstChild;
        if (biRegex.test($firstChild.nodeName)) {
          $firstChild = $firstChild.firstChild;
          if (biRegex.test($firstChild.nodeName)) {
            $firstChild = $firstChild.firstChild;
            if (biRegex.test($firstChild.nodeName)) {
              $firstChild = $firstChild.firstChild;
            }
          }
        }
      }
      firstText = $firstChild.textContent;
      return $firstChild.nodeValue = capText + firstText;
    } else if (/^[A-Za-z0-9]/.test($beginParent.textContent)) {
      $firstChild = $beginParent.firstChild;
      if (biRegex.test($firstChild.nodeName)) {
        $firstChild = $firstChild.firstChild;
        if (biRegex.test($firstChild.nodeName)) {
          $firstChild = $firstChild.firstChild;
          if (biRegex.test($firstChild.nodeName)) {
            $firstChild = $firstChild.firstChild;
            if (biRegex.test($firstChild.nodeName)) {
              $firstChild = $firstChild.firstChild;
            }
          }
        }
      }
      $cap = cap();
      $cap.innerHTML = $beginParent.textContent[0].toUpperCase();
      firstText = $firstChild.textContent;
      $firstChild.nodeValue = firstText.slice(1, +firstText.length + 1 || 9e9);
      return $beginParent.insertBefore($cap, $beginParent.firstChild);
    }
  }
};


},{"../helper/elementList.coffee":14,"../helper/selector.coffee":16,"../helper/setCaret.coffee":17}],7:[function(require,module,exports){
var $, $$, $editable, $tt, $ttLink, alignImage, makeImageControl, makeTooltip, ref, removeTooltip;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

$editable = $('.js-editable');

$tt = $('.js-tooltip-image');

$ttLink = $('.js-tooltip-link');

makeTooltip = function(e) {
  var bodyRect, el, height, leftPos, linkRect, topPos, widthToCenter;
  $ttLink = $('.js-tooltip-link');
  el = e.target;
  bodyRect = document.body.getBoundingClientRect();
  linkRect = el.getBoundingClientRect();
  leftPos = linkRect.left - bodyRect.left;
  topPos = linkRect.top - bodyRect.top;
  widthToCenter = linkRect.width / 2;
  height = linkRect.height;
  $ttLink.innerHTML = "" + el.href;
  if (el.getAttribute('data-href')) {
    $ttLink.innerHTML = "" + (el.getAttribute('data-href'));
  }
  $ttLink.style.display = 'block';
  $ttLink.style.top = (topPos + height) + "px";
  $ttLink.style.left = (leftPos + widthToCenter) + "px";
  return $ttLink.style.marginLeft = "-" + ($ttLink.offsetWidth / 2) + "px";
};

removeTooltip = function() {
  $ttLink = $('.js-tooltip-link');
  return $ttLink.style.display = 'none';
};

makeImageControl = function($tt, el) {
  var bodyRect, height, leftPos, linkRect, topPos, widthToCenter;
  bodyRect = document.body.getBoundingClientRect();
  linkRect = el.getBoundingClientRect();
  leftPos = linkRect.left - bodyRect.left;
  topPos = linkRect.top - bodyRect.top;
  widthToCenter = linkRect.width / 2;
  height = linkRect.height;
  $tt.style.display = 'block';
  $tt.style.top = topPos + "px";
  $tt.style.left = (leftPos + widthToCenter) + "px";
  return $tt.style.marginLeft = "-" + ($tt.offsetWidth / 2) + "px";
};

alignImage = function(type) {
  var $imgSelected;
  $imgSelected = $('.is-img.is-selected');
  $imgSelected.removeAttribute('width');
  $imgSelected.removeAttribute('height');
  if (!$imgSelected.parentNode.classList.contains('b-figure--multi')) {
    $imgSelected.parentNode.classList.remove('b-figure--left');
    $imgSelected.parentNode.classList.remove('b-figure--center');
    $imgSelected.parentNode.classList.remove('b-figure--full');
    $imgSelected.parentNode.classList.remove('b-figure--right');
    $imgSelected.parentNode.classList.add("b-figure--" + type);
  }
  return $tt.style.display = 'none';
};

($('.js-img-left')).addEventListener('click', function(e) {
  return alignImage('left');
});

($('.js-img-center')).addEventListener('click', function(e) {
  return alignImage('center');
});

($('.js-img-right')).addEventListener('click', function(e) {
  return alignImage('right');
});

($('.js-img-link')).addEventListener('click', function(e) {
  var $imgSelected;
  $imgSelected = $('.is-img.is-selected');
  if ($imgSelected.classList.contains('is-link')) {
    $imgSelected.removeEventListener('mouseover', makeTooltip);
    $imgSelected.removeEventListener('mouseleave', removeTooltip);
    $imgSelected.removeAttribute('data-href');
    $imgSelected.classList.remove('is-link');
    return $tt.style.display = 'none';
  } else {
    return swal({
      title: "Masukkan Link",
      text: "Linknya harus yang valid ya :D",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "misalnya damaera.com",
      allowOutsideClick: true
    }, function(inputValue) {
      $tt.style.display = 'none';
      if (inputValue === false) {
        return false;
      } else if (inputValue === '') {
        return false;
      } else {
        if (!/^https?$/.test(inputValue)) {
          inputValue = "http://" + inputValue;
        }
        if (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(inputValue)) {
          $imgSelected.classList.add('is-link');
          $imgSelected.setAttribute('data-href', inputValue);
          swal.close();
          $imgSelected.addEventListener('mouseover', makeTooltip);
          return $imgSelected.addEventListener('mouseleave', removeTooltip);
        } else {
          swal.showInputError("Bukan Link yang valid!");
          return false;
        }
      }
    });
  }
});

($('.js-img-full')).addEventListener('click', function(e) {
  return alignImage('full');
});

($('.js-img-del')).addEventListener('click', function(e) {
  var $figure, $imgSelected;
  $imgSelected = $('.is-img.is-selected');
  $figure = $imgSelected.parentNode;
  $figure.removeChild($imgSelected);
  if ($figure.firstChild.nodeName !== 'IMG') {
    $editable.removeChild($figure);
  } else if ($figure.childNodes.length > 2) {
    reposition($figure);
  } else {
    reposition($figure);
    $figure.width = 'auto';
    $figure.height = 'auto';
    $figure.classList.remove('b-figure--multi');
    $figure.classList.add('b-figure--center');
  }
  return $tt.style.display = 'none';
});


},{"../helper/selector.coffee":16}],8:[function(require,module,exports){
var $, $$, $editable, biRegex, blockRegex, hr, p, ref, ref1, setCaret;

ref = require('../helper/elementList.coffee'), hr = ref.hr, p = ref.p;

ref1 = require('../helper/selector.coffee'), $ = ref1.$, $$ = ref1.$$;

setCaret = require('../helper/setCaret.coffee');

$editable = $('.js-editable');

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;

blockRegex = /^(H1|H2|H3|P|BLOCKQUOTE|LI|UL|OL)$/;

module.exports = function() {
  var $beginParent, $endParent, $newHr, $newP, selection;
  selection = window.getSelection();
  $beginParent = selection.anchorNode.parentNode;
  $endParent = selection.focusNode.parentNode;
  if (biRegex.test($beginParent.nodeName)) {
    $beginParent = $beginParent.parentNode;
    if (biRegex.test($beginParent.nodeName)) {
      $beginParent = $beginParent.parentNode;
      if (biRegex.test($beginParent.nodeName)) {
        $beginParent = $beginParent.parentNode;
        if (biRegex.test($beginParent.nodeName)) {
          $beginParent = $beginParent.parentNode;
        }
      }
    }
  }
  if ($beginParent.nodeName === 'LI') {
    $beginParent = $beginParent.parentNode;
  }
  $newHr = hr();
  $newP = p();
  $newP.innerHTML = '<br>';
  if ($beginParent.nextSibling != null) {
    if ($beginParent.nextSibling.nodeName === 'HR') {
      $editable.removeChild($beginParent.nextSibling);
    } else {
      if ($editable.contains($beginParent)) {
        $editable.insertBefore($newHr, $beginParent.nextSibling);
      }
    }
  } else {
    $editable.appendChild($newHr);
    $editable.appendChild($newP);
  }
  return setCaret(selection.anchorNode, selection.anchorOffset);
};


},{"../helper/elementList.coffee":14,"../helper/selector.coffee":16,"../helper/setCaret.coffee":17}],9:[function(require,module,exports){
var $, $$, $editable, $inputImg, biRegex, figure, loadImage, makeImageControl, p, ref, ref1, removeImageControl, setSelection;

ref = require('../helper/elementList.coffee'), figure = ref.figure, p = ref.p;

ref1 = require('../helper/selector.coffee'), $ = ref1.$, $$ = ref1.$$;

setSelection = require('../helper/setSelection.coffee');

loadImage = require('blueimp-load-image-npm');

$editable = $('.js-editable');

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;

$inputImg = $('.js-input-img');

makeImageControl = function($tt, el) {
  var bodyRect, height, leftPos, linkRect, topPos, widthToCenter;
  bodyRect = document.body.getBoundingClientRect();
  linkRect = el.getBoundingClientRect();
  leftPos = linkRect.left - bodyRect.left;
  topPos = linkRect.top - bodyRect.top;
  widthToCenter = linkRect.width / 2;
  height = linkRect.height;
  $tt.style.display = 'block';
  $tt.style.top = topPos + "px";
  $tt.style.left = (leftPos + widthToCenter) + "px";
  return $tt.style.marginLeft = "-" + ($tt.offsetWidth / 2) + "px";
};

removeImageControl = function($tt) {
  return $tt.style.display = 'none';
};

module.exports = function() {
  var $beginEl, $beginParent, $endEl, $endParent, resizeImg, selection;
  $editable.addEventListener('click', function(e) {
    var $imgSelected, i, len, ref2;
    if (e.target.nodeName !== 'IMG') {
      ref2 = $$('.is-img.is-selected');
      for (i = 0, len = ref2.length; i < len; i++) {
        $imgSelected = ref2[i];
        $imgSelected.classList.remove('is-selected');
      }
      return removeImageControl($('.js-tooltip-image'));
    }
  });
  $editable.addEventListener('keyup', function(e) {
    return removeImageControl($('.js-tooltip-image'));
  });
  selection = window.getSelection();
  $beginEl = selection.anchorNode;
  $beginParent = $beginEl.parentNode;
  $endEl = selection.focusNode;
  $endParent = selection.focusNode.parentNode;
  if (biRegex.test($beginParent.nodeName)) {
    $beginEl = $beginParent;
    $beginParent = $beginParent.parentNode;
    if (biRegex.test($beginParent.nodeName)) {
      $beginEl = $beginParent;
      $beginParent = $beginParent.parentNode;
      if (biRegex.test($beginParent.nodeName)) {
        $beginEl = $beginParent;
        $beginParent = $beginParent.parentNode;
        if (biRegex.test($beginParent.nodeName)) {
          $beginEl = $beginParent;
          $beginParent = $beginParent.parentNode;
        }
      }
    }
  }
  if ($beginParent.nodeName === 'LI') {
    $beginParent = $beginParent.parentNode;
  }
  resizeImg = function(img) {
    var $img, $newFigure, $newP, i, len, ref2;
    if (img.toDataURL == null) {
      swal({
        type: 'error',
        title: 'error'
      });
      return false;
    }
    $newFigure = '';
    if (img.width >= 960) {
      $newFigure = figure('full', img);
    } else if (img.width >= 640) {
      $newFigure = figure('center', img);
    } else {
      $newFigure = figure('left', img);
    }
    ref2 = $newFigure.childNodes;
    for (i = 0, len = ref2.length; i < len; i++) {
      $img = ref2[i];
      if ($img.nodeName === 'IMG') {
        $img.addEventListener('click', function(e) {
          var $imgSelected, j, len1, ref3;
          ref3 = $$('.is-img.is-selected');
          for (j = 0, len1 = ref3.length; j < len1; j++) {
            $imgSelected = ref3[j];
            $imgSelected.classList.remove('is-selected');
          }
          this.classList.add('is-selected');
          return makeImageControl($('.js-tooltip-image'), this);
        });
      }
    }
    $newP = p();
    $newP.innerHTML = '<br>';
    if ($beginParent === $editable) {
      if ($beginEl === $editable.lastChild) {
        $editable.replaceChild($newFigure, $beginEl);
        $editable.appendChild($newP);
      } else {
        $editable.replaceChild($newFigure, $beginEl);
      }
    } else {
      $editable.insertBefore($newFigure, $beginParent);
    }
    setSelection($newFigure.lastChild, 0, $newFigure.lastChild.lastChild, $newFigure.lastChild.textContent.length);
    return ($('.js-input-img')).value = '';
  };
  return loadImage($inputImg.files[0], resizeImg, {
    canvas: true,
    maxWidth: 960
  });
};


},{"../helper/elementList.coffee":14,"../helper/selector.coffee":16,"../helper/setSelection.coffee":18,"blueimp-load-image-npm":20}],10:[function(require,module,exports){
var $, $$, $editable, biRegex, blockRegex, p, ref, ref1, setCaret, table;

ref = require('../helper/elementList.coffee'), table = ref.table, p = ref.p;

ref1 = require('../helper/selector.coffee'), $ = ref1.$, $$ = ref1.$$;

setCaret = require('../helper/setCaret.coffee');

$editable = $('.js-editable');

biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;

blockRegex = /^(H1|H2|H3|P|BLOCKQUOTE|LI|UL|OL)$/;

module.exports = function() {
  var $beginParent, $endParent, $newP, $newTable, selection;
  selection = window.getSelection();
  $beginParent = selection.anchorNode.parentNode;
  $endParent = selection.focusNode.parentNode;
  if (biRegex.test($beginParent.nodeName)) {
    $beginParent = $beginParent.parentNode;
    if (biRegex.test($beginParent.nodeName)) {
      $beginParent = $beginParent.parentNode;
      if (biRegex.test($beginParent.nodeName)) {
        $beginParent = $beginParent.parentNode;
        if (biRegex.test($beginParent.nodeName)) {
          $beginParent = $beginParent.parentNode;
        }
      }
    }
  }
  if ($beginParent.nodeName === 'LI') {
    $beginParent = $beginParent.parentNode;
  }
  $newTable = table(2, 2);
  console.log($newTable);
  $newP = p();
  $newP.innerHTML = '<br>';
  $editable.appendChild($newTable);
  return $editable.appendChild($newP);
};


},{"../helper/elementList.coffee":14,"../helper/selector.coffee":16,"../helper/setCaret.coffee":17}],11:[function(require,module,exports){
var p, setCaret;

p = require('../helper/elementList.coffee').p;

setCaret = require('../helper/setCaret.coffee');

module.exports = function() {
  var $beginParent, anchorNode, embedText, selection, setEmbed;
  selection = window.getSelection();
  anchorNode = selection.anchorNode;
  $beginParent = selection.anchorNode.parentNode;
  embedText = $beginParent.textContent;
  setEmbed = function(html) {
    var $p, tmp;
    tmp = document.createElement('P');
    tmp.innerHTML = html;
    $p = p();
    $p.innerHTML = '<br>';
    if (embedText === '') {
      $beginParent.parentNode.replaceChild($p, $beginParent);
      $p.parentNode.insertBefore(tmp.firstChild, $p);
      return setCaret($p, 0);
    } else {
      $beginParent.innerHTML = '<br>';
      $beginParent.parentNode.insertBefore(tmp.firstChild, $beginParent);
      return setCaret($beginParent, 0);
    }
  };
  if ($beginParent.nodeName === 'P') {
    if (/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/.test(embedText)) {
      return setEmbed("<div class=\"embed\" data-href=\"" + embedText + "\"><a\n  href=\"" + embedText + "\"\n  class=\"b-graf--embed embedly-card\"\n  data-card-controls=0\n  data-card-chrome=0\n  data-card-width=\"100%\"\n/></div>");
    }
  }
};


},{"../helper/elementList.coffee":14,"../helper/setCaret.coffee":17}],12:[function(require,module,exports){
var li, ol, ref, setCaret, ul;

ref = require('../helper/elementList.coffee'), ul = ref.ul, ol = ref.ol, li = ref.li;

setCaret = require('../helper/setCaret.coffee');

module.exports = function(type) {
  var $newEl, $thisElParent, innerText, selection;
  selection = window.getSelection();
  $thisElParent = selection.anchorNode.parentNode;
  if ($thisElParent.nodeName === 'P') {
    if (/^(\-&nbsp;|\+&nbsp;|\*&nbsp;)$/.test($thisElParent.innerHTML)) {
      $newEl = ul();
      $newEl.innerHTML = "<li><br></li>";
      $thisElParent.parentNode.replaceChild($newEl, $thisElParent);
    } else if (/^(1\.&nbsp;)$/.test($thisElParent.innerHTML)) {
      $newEl = ol();
      $newEl.innerHTML = "<li><br></li>";
      $thisElParent.parentNode.replaceChild($newEl, $thisElParent);
    } else if (/^(\- |\+ |\* )/.test($thisElParent.textContent)) {
      $newEl = ul();
      innerText = $thisElParent.innerHTML.slice(2);
      $newEl.innerHTML = "<li>" + innerText + "</li>";
      $thisElParent.parentNode.replaceChild($newEl, $thisElParent);
    } else if (/^(1\. )/.test($thisElParent.textContent)) {
      $newEl = ol();
      innerText = $thisElParent.innerHTML.slice(2);
      $newEl.innerHTML = "<li>" + innerText + "</li>";
      $thisElParent.parentNode.replaceChild($newEl, $thisElParent);
    } else {
      return;
    }
    return setCaret($newEl.firstChild.firstChild, 0);
  } else {

  }
};


},{"../helper/elementList.coffee":14,"../helper/setCaret.coffee":17}],13:[function(require,module,exports){
var $, $$, $editable, $imgCover, $title, $titleParent, blockquote1, blockquote2, cap, code, figure, h2, h3, hr, li, loadImage, ol, p, purifyHtml, purifyImage, ref, ref1, shortid, toDom, toJson, ul;

ref = require('./helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

ref1 = require('./helper/elementList.coffee'), p = ref1.p, h2 = ref1.h2, h3 = ref1.h3, blockquote1 = ref1.blockquote1, blockquote2 = ref1.blockquote2, ul = ref1.ul, ol = ref1.ol, li = ref1.li, code = ref1.code, cap = ref1.cap, hr = ref1.hr, figure = ref1.figure;

$editable = $('.js-editable');

$title = $('.js-title-input');

$imgCover = $('.js-img-cover');

$titleParent = $title.parentNode;

loadImage = require('blueimp-load-image-npm');

shortid = require('shortid');

purifyHtml = function(html) {
  return html.replace(/</g, '&lt;').replace(/&lt;(br)(.*?)>/g, '<br>').replace(/&lt;span (.*?)>[A-Z]/g, '').replace(/&lt;\/span>/g, '').replace(/&lt;(b|strong)>/g, '<strong>').replace(/&lt;\/(b|strong)>/g, '</strong>').replace(/&lt;(i|em)>/g, '<em>').replace(/&lt;\/(i|em)>/g, '</em>').replace(/&lt;code>/g, '<code>').replace(/&lt;\/code>/g, '</code>').replace(/&lt;a href=/g, '<a href=').replace(/&lt;\/a>/g, '</a>');
};

purifyImage = function(data) {
  return /data:image\/(jpeg|png);base64,\/(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})/;
};

toDom = function(json) {
  var $cap, $el, $li, i, item, j, k, len, len1, len2, list, ref2, ref3, ref4, tmpDom;
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
    $imgCover.style.width = json.cover.width + "px";
    $imgCover.style.height = json.cover.height + "px";
  } else {
    $imgCover.removeAttribute('src');
    $imgCover.removeAttribute('style');
    $imgCover.parentNode.classList.add('is-not-cover');
    ($('.js-del-cover')).classList.add('is-hidden');
  }
  ref2 = json.data;
  for (i = 0, len = ref2.length; i < len; i++) {
    item = ref2[i];
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
      ref3 = item.list;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        list = ref3[j];
        $li = li();
        $li.innerHTML = list;
        $el.appendChild($li);
      }
    } else if (item.type === 'OL') {
      $el = ol();
      ref4 = item.list;
      for (k = 0, len2 = ref4.length; k < len2; k++) {
        list = ref4[k];
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
  var $child, $grandChild, $img, data, domJson, i, imgCount, imgHeight, imgId, imgWidth, imgs, j, k, l, len, len1, len2, len3, len4, link, m, maxImgId, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
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
    ref2 = $$('img.is-saved');
    for (i = 0, len = ref2.length; i < len; i++) {
      $img = ref2[i];
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
  ref3 = $editable.childNodes;
  for (j = 0, len1 = ref3.length; j < len1; j++) {
    $child = ref3[j];
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
        if ((ref4 = $child.firstChild) != null ? (ref5 = ref4.classList) != null ? ref5.contains('is-drop-cap') : void 0 : void 0) {
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
        ref6 = $child.childNodes;
        for (k = 0, len2 = ref6.length; k < len2; k++) {
          $grandChild = ref6[k];
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
        ref7 = $child.childNodes;
        for (l = 0, len3 = ref7.length; l < len3; l++) {
          $grandChild = ref7[l];
          if ($grandChild.nodeName === 'LI') {
            data.list.push(purifyHtml($grandChild.innerHTML));
          }
        }
      } else if ($child.nodeName === 'OL') {
        data.type = 'OL';
        data.list = [];
        ref8 = $child.childNodes;
        for (m = 0, len4 = ref8.length; m < len4; m++) {
          $grandChild = ref8[m];
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


},{"./helper/elementList.coffee":14,"./helper/selector.coffee":16,"blueimp-load-image-npm":20,"shortid":39}],14:[function(require,module,exports){
var shortid;

shortid = require('shortid');

module.exports = {
  p: function() {
    var $p;
    $p = document.createElement('P');
    $p.classList.add('b-graf');
    $p.setAttribute('data-id', shortid.generate());
    return $p;
  },
  h2: function() {
    var $h2;
    $h2 = document.createElement('H2');
    $h2.classList.add('b-graf');
    $h2.classList.add('b-graf--h2');
    $h2.setAttribute('data-id', shortid.generate());
    return $h2;
  },
  h3: function() {
    var $h3;
    $h3 = document.createElement('H3');
    $h3.classList.add('b-graf');
    $h3.classList.add('b-graf--h3');
    $h3.setAttribute('data-id', shortid.generate());
    return $h3;
  },
  ul: function() {
    var $ul;
    $ul = document.createElement('UL');
    $ul.classList.add('b-graf');
    $ul.classList.add('b-graf--ulist');
    $ul.setAttribute('data-id', shortid.generate());
    return $ul;
  },
  ol: function() {
    var $ol;
    $ol = document.createElement('OL');
    $ol.classList.add('b-graf');
    $ol.classList.add('b-graf--olist');
    $ol.setAttribute('data-id', shortid.generate());
    return $ol;
  },
  li: function() {
    var $li;
    $li = document.createElement('LI');
    return $li;
  },
  blockquote1: function() {
    var $blockquote;
    $blockquote = document.createElement('BLOCKQUOTE');
    $blockquote.classList.add('b-graf');
    $blockquote.classList.add('b-graf--quote1');
    $blockquote.setAttribute('data-id', shortid.generate());
    return $blockquote;
  },
  blockquote2: function() {
    var $blockquote;
    $blockquote = document.createElement('BLOCKQUOTE');
    $blockquote.classList.add('b-graf');
    $blockquote.classList.add('b-graf--quote2');
    $blockquote.classList.add('is-second');
    $blockquote.setAttribute('data-id', shortid.generate());
    return $blockquote;
  },
  code: function() {
    var $code;
    $code = document.createElement('PRE');
    $code.classList.add('b-graf');
    $code.classList.add('b-graf--code');
    $code.setAttribute('data-id', shortid.generate());
    return $code;
  },
  cap: function() {
    var $cap;
    $cap = document.createElement('SPAN');
    $cap.classList.add('b-graf');
    $cap.classList.add('b-graf--drop-cap');
    $cap.classList.add('is-drop-cap');
    $cap.contentEditable = false;
    return $cap;
  },
  hr: function() {
    var $hr;
    $hr = document.createElement('HR');
    $hr.classList.add('b-graf');
    $hr.classList.add('b-graf--divider');
    $hr.contentEditable = false;
    return $hr;
  },
  text: function(text) {
    var $textNode;
    $textNode = document.createTextNode(text);
    return $textNode;
  },
  table: function(row, col) {
    var $col, $row, $table, c, i, j, r, ref, ref1;
    $table = document.createElement('TABLE');
    $table.classList.add('b-graf');
    $table.classList.add('b-graf--table');
    for (r = i = 0, ref = row - 1; 0 <= ref ? i <= ref : i >= ref; r = 0 <= ref ? ++i : --i) {
      $row = $table.insertRow(r);
      for (c = j = 0, ref1 = col - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; c = 0 <= ref1 ? ++j : --j) {
        $col = $row.insertCell(c);
        $col.innerHTML = '<br />';
      }
    }
    return $table;
  },
  figure: function(type, img, caption) {
    var $caption, $figure, $img, altText, figureClass, placeholderText;
    if (type == null) {
      type = 'center';
    }
    if (caption == null) {
      caption = "deskripsi gambar (opsional)";
    }
    figureClass = type;
    placeholderText = caption;
    altText = caption;
    if (caption === 'deskripsi gambar (opsional)') {
      altText = '';
    }
    $figure = document.createElement('FIGURE');
    $caption = document.createElement('FIGCAPTION');
    $figure.classList.add('b-figure');
    $figure.classList.add("b-figure--" + figureClass);
    $caption.classList.add('b-figure__figcaption');
    $caption.classList.add('is-figcaption');
    $caption.innerHTML = placeholderText;
    $caption.contentEditable = true;
    $figure.setAttribute('data-id', shortid.generate());
    $img = document.createElement('IMG');
    $img.classList.add('b-figure__img');
    $img.classList.add('is-img');
    if (img.nodeName === 'CANVAS') {
      $img.src = img.toDataURL('image/jpeg', .7);
    } else {
      $img.src = img.data;
    }
    $img.setAttribute('alt', altText);
    $img.setAttribute('data-width', img.width);
    $img.setAttribute('data-height', img.height);
    if (img.link) {
      $img.setAttribute('data-href', img.href);
      $img.classList.add('is-link');
    }
    $figure.appendChild($img);
    $figure.appendChild($caption);
    $figure.contentEditable = false;
    return $figure;
  }
};


},{"shortid":39}],15:[function(require,module,exports){
module.exports = function() {
  var selection;
  selection = window.getSelection();
  return selection.anchorOffset;
};


},{}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
module.exports = function(el, position) {
  var range, selection;
  selection = window.getSelection();
  range = document.createRange();
  range.setStart(el, position);
  range.collapse(true);
  selection.removeAllRanges();
  return selection.addRange(range);
};


},{}],18:[function(require,module,exports){
module.exports = function(el1, position1, el2, position2) {
  var range, selection;
  selection = window.getSelection();
  range = document.createRange();
  range.setStart(el1, position1);
  range.setEnd(el2, position2);
  selection.removeAllRanges();
  return selection.addRange(range);
};


},{}],19:[function(require,module,exports){
var $, $$, $btn, $editable, $inputLink, $title, $titleParent, $toolbar, $tt, $ttil, addCover, addListener, alignCenter, articleInit, autoLink, blockElement, boldItalic, charTransform, command, createLink, dropCap, hangingPunc, i, imageControl, insertHr, insertImage, insertTable, isTitleFocus, len, makeEmbed, makeImageControl, makeList, makeTooltip, normalizedEditable, oldValue, onPaste, onUndo, ref, ref1, ref2, removeImageControl, removeTooltip, setCaret, setSelection, setUndo, swal, timer, toDom, toJson, toolbarListener;

swal = require('sweetalert');

setSelection = require('./helper/setSelection.coffee');

setCaret = require('./helper/setCaret.coffee');

blockElement = require('./command/blockElement.coffee');

boldItalic = require('./command/boldItalic.coffee');

makeList = require('./command/makeList.coffee');

alignCenter = require('./command/alignCenter.coffee');

createLink = require('./command/createLink.coffee');

insertHr = require('./command/insertHr.coffee');

makeEmbed = require('./command/makeEmbed.coffee');

insertImage = require('./command/insertImage.coffee');

imageControl = require('./command/imageControl.coffee');

insertTable = require('./command/insertTable.coffee');

dropCap = require('./command/dropCap.coffee');

addCover = require('./command/addCover.coffee');

normalizedEditable = require('./normalize/normalizeEditable.coffee');

toolbarListener = require('./normalize/toolbarListener.coffee');

onPaste = require('./normalize/onPaste.coffee');

onUndo = require('./normalize/onUndo.coffee');

charTransform = require('./normalize/charTransform.coffee');

hangingPunc = require('./normalize/hangingPunc.coffee');

autoLink = require('./normalize/autoLink.coffee');

ref = require('./domParse.coffee'), toJson = ref.toJson, toDom = ref.toDom;

ref1 = require('./helper/selector.coffee'), $ = ref1.$, $$ = ref1.$$;

$editable = $('.js-editable');

$toolbar = $('.js-toolbar');

articleInit = JSON.stringify(toJson());

localStorage.setItem('article-init', articleInit);

timer = '';

oldValue = JSON.stringify(toJson());

document.addEventListener('keyup', function(e) {
  var data1;
  data1 = toJson();
  clearTimeout(timer);
  return timer = setTimeout(function() {
    var newValue;
    if (e.ctrlKey || e.metaKey) {
      return;
    }
    newValue = JSON.stringify(toJson());
    if (newValue !== oldValue) {
      onUndo.stack.execute(new onUndo.editCommand($editable, oldValue, newValue));
      return oldValue = newValue;
    }
  }, 250);
});

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
    if (e.keyCode === 90) {
      e.preventDefault();
      try {
        onUndo.stack.canUndo();
        onUndo.stack.undo();
        return addListener();
      } catch (undefined) {}
    } else if (e.keyCode === 89) {
      e.preventDefault();
      try {
        onUndo.stack.canRedo();
        onUndo.stack.redo();
        return addListener();
      } catch (undefined) {}
    }
  }
});

setUndo = function() {
  var newValue;
  newValue = JSON.stringify(toJson());
  return onUndo.stack.execute(new onUndo.editCommand($editable, oldValue, newValue, oldValue = newValue));
};

document.addEventListener('keydown', function(e) {
  if (e.which === 9) {
    return e.preventDefault();
  } else if (e.ctrlKey || e.metaKey) {
    if (/^(66|73|85|49|50|51|52|53|69|75|79|83)$/.test(e.which)) {
      e.preventDefault();
    }
    if (e.keyCode === 66) {
      return ($('.js-bold')).click();
    } else if (e.keyCode === 73) {
      return ($('.js-italic')).click();
    } else if (e.keyCode === 69) {
      return ($('.js-center')).click();
    } else if (e.keyCode === 75) {
      return ($('.js-link')).click();
    } else if (e.keyCode === 83) {
      return ($('.js-save')).click();
    } else if (e.keyCode === 191) {
      return ($('.js-help')).click();
    }
  }
});

makeImageControl = function($tt, el) {
  var bodyRect, height, inkRect, leftPos, topPos, widthToCenter;
  bodyRect = document.body.getBoundingClientRect();
  inkRect = el.getBoundingClientRect();
  leftPos = linkRect.left - bodyRect.left;
  topPos = linkRect.top - bodyRect.top;
  widthToCenter = linkRect.width / 2;
  height = linkRect.height;
  $tt.style.display = 'block';
  $tt.style.top = topPos + "px";
  $tt.style.left = (leftPos + widthToCenter) + "px";
  return $tt.style.marginLeft = "-" + ($tt.offsetWidth / 2) + "px";
};

makeTooltip = function($tt, el) {
  var bodyRect, height, leftPos, linkRect, topPos, widthToCenter;
  bodyRect = document.body.getBoundingClientRect();
  linkRect = el.getBoundingClientRect();
  leftPos = linkRect.left - bodyRect.left;
  topPos = linkRect.top - bodyRect.top;
  widthToCenter = linkRect.width / 2;
  height = linkRect.height;
  if (el.href) {
    $tt.innerHTML = "" + el.href;
  } else if (el.getAttribute('data-href')) {
    $tt.innerHTML = "" + (el.getAttribute('data-href'));
  } else {
    return;
  }
  $tt.style.display = 'block';
  $tt.style.top = (topPos + height) + "px";
  $tt.style.left = (leftPos + widthToCenter) + "px";
  return $tt.style.marginLeft = "-" + ($tt.offsetWidth / 2) + "px";
};

removeTooltip = function($tt) {
  return $tt.style.display = 'none';
};

$tt = $('.js-tooltip-link');

removeImageControl = function($tt) {
  return $tt.style.display = 'none';
};

$editable.addEventListener('click', function(e) {
  var $imgSelected, i, len, ref2;
  console.log(window.getSelection());
  if (e.target.nodeName !== 'IMG') {
    ref2 = $$('.is-img.is-selected');
    for (i = 0, len = ref2.length; i < len; i++) {
      $imgSelected = ref2[i];
      $imgSelected.classList.remove('is-selected');
    }
    return removeImageControl($('.js-tooltip-image'));
  }
});

$editable.addEventListener('keyup', function(e) {
  return removeImageControl($('.js-tooltip-image'));
});

addListener = function() {
  var $img, $link, i, j, k, len, len1, len2, ref2, ref3, ref4, results;
  ref2 = $$('.js-editable img.is-link');
  for (i = 0, len = ref2.length; i < len; i++) {
    $link = ref2[i];
    $link.addEventListener('mouseover', function(e) {
      return makeTooltip($tt, this);
    });
    $link.addEventListener('mouseleave', function(e) {
      return removeTooltip($tt);
    });
  }
  ref3 = $$('.js-editable a');
  for (j = 0, len1 = ref3.length; j < len1; j++) {
    $link = ref3[j];
    $link.addEventListener('mouseover', function(e) {
      return makeTooltip($tt, this);
    });
    $link.addEventListener('mouseleave', function(e) {
      return removeTooltip($tt);
    });
  }
  ref4 = $$('.is-img');
  results = [];
  for (k = 0, len2 = ref4.length; k < len2; k++) {
    $img = ref4[k];
    results.push($img.addEventListener('click', function(e) {
      var $imgSelected, l, len3, ref5;
      ref5 = $$('.is-img.is-selected');
      for (l = 0, len3 = ref5.length; l < len3; l++) {
        $imgSelected = ref5[l];
        $imgSelected.classList.remove('is-selected');
      }
      this.classList.add('is-selected');
      return makeImageControl($('.js-tooltip-image'), this);
    }));
  }
  return results;
};

$inputLink = $('.js-input-link');

$ttil = $('.js-tooltip-input-link');

$inputLink.addEventListener('blur', function(e) {
  e.preventDefault();
  $inputLink.value = '';
  return $ttil.style.display = 'none';
});

$inputLink.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    return setTimeout(addListener(), 1000);
  }
});

addListener();

ref2 = $$('.js-tooltip-image button');
for (i = 0, len = ref2.length; i < len; i++) {
  $btn = ref2[i];
  $btn.addEventListener('click', function(e) {
    return setUndo();
  });
}

command = function(e, cb) {
  var $beginParent, $endParent, anchorNode, data1, focusNode, ref3, selection;
  e.preventDefault();
  selection = window.getSelection();
  ref3 = window.getSelection(), anchorNode = ref3.anchorNode, focusNode = ref3.focusNode;
  if (anchorNode === null || focusNode === null) {
    return cb(false);
  } else {
    $beginParent = anchorNode.parentNode;
    $endParent = focusNode.parentNode;
    if ($editable.contains($beginParent)) {
      cb(true);
      addListener();
      setUndo();
      return data1 = toJson();
    } else {
      return cb(false);
    }
  }
};

($('.js-toolbar-block')).onchange = function(e) {
  var type;
  type = e.target.value * 1;
  return command(e, function(res) {
    if (res) {
      return blockElement(type);
    } else {

    }
  });
};

($('.js-inline-code')).onclick = function(e) {
  return command(e, function(res) {
    if (res) {
      return boldItalic('code');
    } else {

    }
  });
};

($('.js-bold')).onclick = function(e) {
  return command(e, function(res) {
    if (res) {
      return boldItalic('bold');
    } else {

    }
  });
};

($('.js-italic')).onclick = function(e) {
  return command(e, function(res) {
    if (res) {
      return boldItalic('italic');
    } else {

    }
  });
};

$title = $('textarea');

$titleParent = $title.parentNode;

isTitleFocus = false;

$title.onfocus = function(e) {
  if ($titleParent.classList.contains('is-center')) {
    ($('.js-center')).classList.add('is-active');
  } else {
    ($('.js-center')).classList.remove('is-active');
  }
  return isTitleFocus = true;
};

$editable.addEventListener('click', function(e) {
  return isTitleFocus = false;
});

$editable.addEventListener('keyup', function(e) {
  return isTitleFocus = false;
});

($('.js-center')).onclick = function(e) {
  if (isTitleFocus) {
    isTitleFocus = false;
    if ($titleParent.classList.contains('is-center')) {
      $titleParent.classList.remove('is-center');
    } else {
      ($('.js-center')).classList.add('is-active');
      $titleParent.classList.add('is-center');
    }
  }
  return command(e, function(res) {
    if (res) {
      return alignCenter();
    } else {

    }
  });
};

($('.js-drop-cap')).onclick = function(e) {
  return command(e, function(res) {
    if (res) {
      return dropCap();
    } else {

    }
  });
};

($('.js-link')).onclick = function(e) {
  return command(e, function(res) {
    if (res) {
      return createLink();
    } else {

    }
  });
};

($('.js-hr')).onclick = function(e) {
  return command(e, function(res) {
    if (res) {
      return insertHr();
    } else {

    }
  });
};

($('.js-img')).onclick = function(e) {
  return command(e, function(res) {
    if (res) {
      return ($('.js-input-img')).click();
    } else {

    }
  });
};

($('.js-help')).onclick = function(e) {
  return swal({
    title: 'Help',
    text: '<h3>Shortcut</h3>\n<table>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">B</span></td>\n    <td>Bold</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">I</span></td>\n    <td>Italic</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">K</span></td>\n    <td>Link</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">E</span></td>\n    <td>Align center</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">1</span></td>\n    <td>Big heading</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">2</span></td>\n    <td>Small heading</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">3</span></td>\n    <td>Big quote</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">4</span></td>\n    <td>Small quote</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">5</span></td>\n    <td>Code block</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">Z</span></td>\n    <td>Undo</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">Y</span></td>\n    <td>Redo</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">S</span></td>\n    <td>Save article</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">O</span></td>\n    <td>Open saved article</td>\n  </tr>\n  <tr>\n    <td><span>Cmd</span> + <span class="btn">?</span></td>\n    <td>Help</td>\n  </tr>\n</table>',
    html: true,
    allowOutsideClick: true
  });
};

($('.js-input-img')).onchange = function(e) {
  insertImage();
  setTimeout(setUndo(), 500);
  return ($('.js-input-img')).value = '';
};

($('.js-add-cover')).onclick = function(e) {
  window.coverChanged = true;
  return ($('.js-input-cover')).click();
};

($('.js-del-cover')).onclick = function(e) {
  var $cover, $imgCover, $shadow;
  window.coverChanged = true;
  $imgCover = $('.js-img-cover');
  $cover = $imgCover.parentNode;
  $title = $('.js-article-title');
  $shadow = $('.js-cover-shadow');
  $title.classList.remove('is-with-cover');
  $shadow.classList.add('is-hidden');
  $cover.removeAttribute('src');
  $cover.removeAttribute('style');
  $cover.classList.remove('is-cover-full');
  $cover.classList.remove('is-cover-not-full');
  $imgCover.removeAttribute('src');
  $imgCover.removeAttribute('style');
  $imgCover.classList.remove('is-hidden');
  this.classList.add('is-hidden');
  ($('.js-cover')).classList.add('is-not-cover');
  return setUndo();
};

($('.js-input-cover')).onchange = function(e) {
  addCover();
  return setTimeout(setUndo(), 500);
};

$editable.addEventListener('change', function(e) {
  return console.log(e);
});

$editable.addEventListener('keyup', function(e) {
  if (e.ctrlKey || e.metaKey) {

  } else if (e.keyCode === 17) {

  } else {
    charTransform();
    makeList();
    return hangingPunc();
  }
});

$editable.addEventListener('keydown', function(e) {
  if (e.which === 13) {
    return makeEmbed();
  } else if (e.keyCode === 32) {
    return autoLink(e);
  }
});

$editable.addEventListener('click', function(e) {
  var $figcaption, j, len1, ref3, results;
  ref3 = $$('.is-figcaption');
  results = [];
  for (j = 0, len1 = ref3.length; j < len1; j++) {
    $figcaption = ref3[j];
    if ($figcaption.textContent === 'description (optional)') {
      results.push($figcaption.innerHTML = '<br>');
    } else {
      results.push(void 0);
    }
  }
  return results;
});

($('.js-open')).onclick = function(e) {
  var articleData;
  articleData = JSON.parse(localStorage.getItem('article'));
  if (articleData) {
    toDom(articleData);
    addListener();
    return setUndo();
  }
};

($('.js-save')).onclick = function(e) {
  var articleData;
  articleData = JSON.stringify(toJson());
  return localStorage.setItem('article', articleData);
};


},{"./command/addCover.coffee":1,"./command/alignCenter.coffee":2,"./command/blockElement.coffee":3,"./command/boldItalic.coffee":4,"./command/createLink.coffee":5,"./command/dropCap.coffee":6,"./command/imageControl.coffee":7,"./command/insertHr.coffee":8,"./command/insertImage.coffee":9,"./command/insertTable.coffee":10,"./command/makeEmbed.coffee":11,"./command/makeList.coffee":12,"./domParse.coffee":13,"./helper/selector.coffee":16,"./helper/setCaret.coffee":17,"./helper/setSelection.coffee":18,"./normalize/autoLink.coffee":32,"./normalize/charTransform.coffee":33,"./normalize/hangingPunc.coffee":34,"./normalize/normalizeEditable.coffee":35,"./normalize/onPaste.coffee":36,"./normalize/onUndo.coffee":37,"./normalize/toolbarListener.coffee":38,"sweetalert":30}],20:[function(require,module,exports){
'use strict';

var loadImage = require('./load-image');
// var injectExifMap = require('./load-image-exif-map');
// var injectIos = require('./load-image-ios');
// var injectOrientation = require('./load-image-orientation');
//
// injectExifMap(loadImage);
// injectIos(loadImage);
// injectOrientation(loadImage);

module.exports = loadImage;

},{"./load-image":21}],21:[function(require,module,exports){
/*
 * JavaScript Load Image 1.10.0
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true */
/*global define, window, document, URL, webkitURL, Blob, File, FileReader */

'use strict';

// Loads an image for a given File object.
// Invokes the callback with an img or optional canvas
// element (if supported by the browser) as parameter:
var loadImage = function (file, callback, options) {
        var img = document.createElement('img'),
            url,
            oUrl;
        img.onerror = callback;
        img.onload = function () {
            if (oUrl && !(options && options.noRevoke)) {
                loadImage.revokeObjectURL(oUrl);
            }
            if (callback) {
                callback(loadImage.scale(img, options));
            }
        };
        if (loadImage.isInstanceOf('Blob', file) ||
                // Files are also Blob instances, but some browsers
                // (Firefox 3.6) support the File API but not Blobs:
                loadImage.isInstanceOf('File', file)) {
            url = oUrl = loadImage.createObjectURL(file);
            // Store the file type for resize processing:
            img._type = file.type;
        } else if (typeof file === 'string') {
            url = file;
            if (options && options.crossOrigin) {
                img.crossOrigin = options.crossOrigin;
            }
        } else {
            return false;
        }
        if (url) {
            img.src = url;
            return img;
        }
        return loadImage.readFile(file, function (e) {
            var target = e.target;
            if (target && target.result) {
                img.src = target.result;
            } else {
                if (callback) {
                    callback(e);
                }
            }
        });
    },
    // The check for URL.revokeObjectURL fixes an issue with Opera 12,
    // which provides URL.createObjectURL but doesn't properly implement it:
    urlAPI = (window.createObjectURL && window) ||
        (window.URL && URL.revokeObjectURL && URL) ||
        (window.webkitURL && webkitURL);

loadImage.isInstanceOf = function (type, obj) {
    // Cross-frame instanceof check
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
};

// Transform image coordinates, allows to override e.g.
// the canvas orientation based on the orientation option,
// gets canvas, options passed as arguments:
loadImage.transformCoordinates = function () {
    return;
};

// Returns transformed options, allows to override e.g.
// maxWidth, maxHeight and crop options based on the aspectRatio.
// gets img, options passed as arguments:
loadImage.getTransformedOptions = function (img, options) {
    var aspectRatio = options.aspectRatio,
        newOptions,
        i,
        width,
        height;
    if (!aspectRatio) {
        return options;
    }
    newOptions = {};
    for (i in options) {
        if (options.hasOwnProperty(i)) {
            newOptions[i] = options[i];
        }
    }
    newOptions.crop = true;
    width = img.naturalWidth || img.width;
    height = img.naturalHeight || img.height;
    if (width / height > aspectRatio) {
        newOptions.maxWidth = height * aspectRatio;
        newOptions.maxHeight = height;
    } else {
        newOptions.maxWidth = width;
        newOptions.maxHeight = width / aspectRatio;
    }
    return newOptions;
};

// Canvas render method, allows to override the
// rendering e.g. to work around issues on iOS:
loadImage.renderImageToCanvas = function (
    canvas,
    img,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    destX,
    destY,
    destWidth,
    destHeight
) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,destHeight);
    ctx.lineTo(destWidth,destHeight);
    ctx.lineTo(destWidth,0);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        destWidth,
        destHeight
    );
    return canvas;
};

// This method is used to determine if the target image
// should be a canvas element:
loadImage.hasCanvasOption = function (options) {
    return options.canvas || options.crop || options.aspectRatio;
};

// Scales and/or crops the given image (img or canvas HTML element)
// using the given options.
// Returns a canvas object if the browser supports canvas
// and the hasCanvasOption method returns true or a canvas
// object is passed as image, else the scaled image:
loadImage.scale = function (img, options) {
    options = options || {};
    var canvas = document.createElement('canvas'),
        useCanvas = img.getContext ||
            (loadImage.hasCanvasOption(options) && canvas.getContext),
        width = img.naturalWidth || img.width,
        height = img.naturalHeight || img.height,
        destWidth = width,
        destHeight = height,
        maxWidth,
        maxHeight,
        minWidth,
        minHeight,
        sourceWidth,
        sourceHeight,
        sourceX,
        sourceY,
        tmp,
        scaleUp = function () {
            var scale = Math.max(
                (minWidth || destWidth) / destWidth,
                (minHeight || destHeight) / destHeight
            );
            if (scale > 1) {
                destWidth = destWidth * scale;
                destHeight = destHeight * scale;
            }
        },
        scaleDown = function () {
            var scale = Math.min(
                (maxWidth || destWidth) / destWidth,
                (maxHeight || destHeight) / destHeight
            );
            if (scale < 1) {
                destWidth = destWidth * scale;
                destHeight = destHeight * scale;
            }
        };
    if (useCanvas) {
        options = loadImage.getTransformedOptions(img, options);
        sourceX = options.left || 0;
        sourceY = options.top || 0;
        if (options.sourceWidth) {
            sourceWidth = options.sourceWidth;
            if (options.right !== undefined && options.left === undefined) {
                sourceX = width - sourceWidth - options.right;
            }
        } else {
            sourceWidth = width - sourceX - (options.right || 0);
        }
        if (options.sourceHeight) {
            sourceHeight = options.sourceHeight;
            if (options.bottom !== undefined && options.top === undefined) {
                sourceY = height - sourceHeight - options.bottom;
            }
        } else {
            sourceHeight = height - sourceY - (options.bottom || 0);
        }
        destWidth = sourceWidth;
        destHeight = sourceHeight;
    }
    maxWidth = options.maxWidth;
    maxHeight = options.maxHeight;
    minWidth = options.minWidth;
    minHeight = options.minHeight;
    if (useCanvas && maxWidth && maxHeight && options.crop) {
        destWidth = maxWidth;
        destHeight = maxHeight;
        tmp = sourceWidth / sourceHeight - maxWidth / maxHeight;
        if (tmp < 0) {
            sourceHeight = maxHeight * sourceWidth / maxWidth;
            if (options.top === undefined && options.bottom === undefined) {
                sourceY = (height - sourceHeight) / 2;
            }
        } else if (tmp > 0) {
            sourceWidth = maxWidth * sourceHeight / maxHeight;
            if (options.left === undefined && options.right === undefined) {
                sourceX = (width - sourceWidth) / 2;
            }
        }
    } else {
        if (options.contain || options.cover) {
            minWidth = maxWidth = maxWidth || minWidth;
            minHeight = maxHeight = maxHeight || minHeight;
        }
        if (options.cover) {
            scaleDown();
            scaleUp();
        } else {
            scaleUp();
            scaleDown();
        }
    }
    if (useCanvas) {
        canvas.width = destWidth;
        canvas.height = destHeight;
        loadImage.transformCoordinates(
            canvas,
            options
        );
        return loadImage.renderImageToCanvas(
            canvas,
            img,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            destWidth,
            destHeight
        );
    }
    img.width = destWidth;
    img.height = destHeight;
    return img;
};

loadImage.createObjectURL = function (file) {
    return urlAPI ? urlAPI.createObjectURL(file) : false;
};

loadImage.revokeObjectURL = function (url) {
    return urlAPI ? urlAPI.revokeObjectURL(url) : false;
};

// Loads a given File object via FileReader interface,
// invokes the callback with the event object (load or error).
// The result can be read via event.target.result:
loadImage.readFile = function (file, callback, method) {
    if (window.FileReader) {
        var fileReader = new FileReader();
        fileReader.onload = fileReader.onerror = callback;
        method = method || 'readAsDataURL';
        if (fileReader[method]) {
            fileReader[method](file);
            return fileReader;
        }
    }
    return false;
};

module.exports = loadImage;

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var defaultParams = {
  title: '',
  text: '',
  type: null,
  allowOutsideClick: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnConfirm: true,
  closeOnCancel: true,
  confirmButtonText: 'OK',
  confirmButtonColor: '#8CD4F5',
  cancelButtonText: 'Cancel',
  imageUrl: null,
  imageSize: null,
  timer: null,
  customClass: '',
  html: false,
  animation: true,
  allowEscapeKey: true,
  inputType: 'text',
  inputPlaceholder: '',
  inputValue: '',
  showLoaderOnConfirm: false
};

exports['default'] = defaultParams;
module.exports = exports['default'];
},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _colorLuminance = require('./utils');

var _getModal = require('./handle-swal-dom');

var _hasClass$isDescendant = require('./handle-dom');

/*
 * User clicked on "Confirm"/"OK" or "Cancel"
 */
var handleButton = function handleButton(event, params, modal) {
  var e = event || window.event;
  var target = e.target || e.srcElement;

  var targetedConfirm = target.className.indexOf('confirm') !== -1;
  var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
  var modalIsVisible = _hasClass$isDescendant.hasClass(modal, 'visible');
  var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

  // Since the user can change the background-color of the confirm button programmatically,
  // we must calculate what the color should be on hover/active
  var normalColor, hoverColor, activeColor;
  if (targetedConfirm && params.confirmButtonColor) {
    normalColor = params.confirmButtonColor;
    hoverColor = _colorLuminance.colorLuminance(normalColor, -0.04);
    activeColor = _colorLuminance.colorLuminance(normalColor, -0.14);
  }

  function shouldSetConfirmButtonColor(color) {
    if (targetedConfirm && params.confirmButtonColor) {
      target.style.backgroundColor = color;
    }
  }

  switch (e.type) {
    case 'mouseover':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'mouseout':
      shouldSetConfirmButtonColor(normalColor);
      break;

    case 'mousedown':
      shouldSetConfirmButtonColor(activeColor);
      break;

    case 'mouseup':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'focus':
      var $confirmButton = modal.querySelector('button.confirm');
      var $cancelButton = modal.querySelector('button.cancel');

      if (targetedConfirm) {
        $cancelButton.style.boxShadow = 'none';
      } else {
        $confirmButton.style.boxShadow = 'none';
      }
      break;

    case 'click':
      var clickedOnModal = modal === target;
      var clickedOnModalChild = _hasClass$isDescendant.isDescendant(modal, target);

      // Ignore click outside if allowOutsideClick is false
      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
        break;
      }

      if (targetedConfirm && doneFunctionExists && modalIsVisible) {
        handleConfirm(modal, params);
      } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
        handleCancel(modal, params);
      } else if (_hasClass$isDescendant.isDescendant(modal, target) && target.tagName === 'BUTTON') {
        sweetAlert.close();
      }
      break;
  }
};

/*
 *  User clicked on "Confirm"/"OK"
 */
var handleConfirm = function handleConfirm(modal, params) {
  var callbackValue = true;

  if (_hasClass$isDescendant.hasClass(modal, 'show-input')) {
    callbackValue = modal.querySelector('input').value;

    if (!callbackValue) {
      callbackValue = '';
    }
  }

  params.doneFunction(callbackValue);

  if (params.closeOnConfirm) {
    sweetAlert.close();
  }
  // Disable cancel and confirm button if the parameter is true
  if (params.showLoaderOnConfirm) {
    sweetAlert.disableButtons();
  }
};

/*
 *  User clicked on "Cancel"
 */
var handleCancel = function handleCancel(modal, params) {
  // Check if callback function expects a parameter (to track cancel actions)
  var functionAsStr = String(params.doneFunction).replace(/\s/g, '');
  var functionHandlesCancel = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

  if (functionHandlesCancel) {
    params.doneFunction(false);
  }

  if (params.closeOnCancel) {
    sweetAlert.close();
  }
};

exports['default'] = {
  handleButton: handleButton,
  handleConfirm: handleConfirm,
  handleCancel: handleCancel
};
module.exports = exports['default'];
},{"./handle-dom":24,"./handle-swal-dom":26,"./utils":29}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

var addClass = function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

var removeClass = function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

var escapeHtml = function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var _show = function _show(elem) {
  elem.style.opacity = '';
  elem.style.display = 'block';
};

var show = function show(elems) {
  if (elems && !elems.length) {
    return _show(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _show(elems[i]);
  }
};

var _hide = function _hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var hide = function hide(elems) {
  if (elems && !elems.length) {
    return _hide(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _hide(elems[i]);
  }
};

var isDescendant = function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

var getTopMargin = function getTopMargin(elem) {
  elem.style.left = '-9999px';
  elem.style.display = 'block';

  var height = elem.clientHeight,
      padding;
  if (typeof getComputedStyle !== 'undefined') {
    // IE 8
    padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
  } else {
    padding = parseInt(elem.currentStyle.padding);
  }

  elem.style.left = '';
  elem.style.display = 'none';
  return '-' + parseInt((height + padding) / 2) + 'px';
};

var fadeIn = function fadeIn(elem, interval) {
  if (+elem.style.opacity < 1) {
    interval = interval || 16;
    elem.style.opacity = 0;
    elem.style.display = 'block';
    var last = +new Date();
    var tick = (function (_tick) {
      function tick() {
        return _tick.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick.toString();
      };

      return tick;
    })(function () {
      elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
      last = +new Date();

      if (+elem.style.opacity < 1) {
        setTimeout(tick, interval);
      }
    });
    tick();
  }
  elem.style.display = 'block'; //fallback IE8
};

var fadeOut = function fadeOut(elem, interval) {
  interval = interval || 16;
  elem.style.opacity = 1;
  var last = +new Date();
  var tick = (function (_tick2) {
    function tick() {
      return _tick2.apply(this, arguments);
    }

    tick.toString = function () {
      return _tick2.toString();
    };

    return tick;
  })(function () {
    elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
    last = +new Date();

    if (+elem.style.opacity > 0) {
      setTimeout(tick, interval);
    } else {
      elem.style.display = 'none';
    }
  });
  tick();
};

var fireClick = function fireClick(node) {
  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
  // Then fixed for today's Chrome browser.
  if (typeof MouseEvent === 'function') {
    // Up-to-date approach
    var mevt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });
    node.dispatchEvent(mevt);
  } else if (document.createEvent) {
    // Fallback
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick');
  } else if (typeof node.onclick === 'function') {
    node.onclick();
  }
};

var stopEventPropagation = function stopEventPropagation(e) {
  // In particular, make sure the space bar doesn't scroll the main window.
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
    e.preventDefault();
  } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
    window.event.cancelBubble = true;
  }
};

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.escapeHtml = escapeHtml;
exports._show = _show;
exports.show = show;
exports._hide = _hide;
exports.hide = hide;
exports.isDescendant = isDescendant;
exports.getTopMargin = getTopMargin;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.fireClick = fireClick;
exports.stopEventPropagation = stopEventPropagation;
},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _stopEventPropagation$fireClick = require('./handle-dom');

var _setFocusStyle = require('./handle-swal-dom');

var handleKeyDown = function handleKeyDown(event, params, modal) {
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;

  var $okButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  var $modalButtons = modal.querySelectorAll('button[tabindex]');

  if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
    // Don't do work on keys we don't care about.
    return;
  }

  var $targetElement = e.target || e.srcElement;

  var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
  for (var i = 0; i < $modalButtons.length; i++) {
    if ($targetElement === $modalButtons[i]) {
      btnIndex = i;
      break;
    }
  }

  if (keyCode === 9) {
    // TAB
    if (btnIndex === -1) {
      // No button focused. Jump to the confirm button.
      $targetElement = $okButton;
    } else {
      // Cycle to the next button
      if (btnIndex === $modalButtons.length - 1) {
        $targetElement = $modalButtons[0];
      } else {
        $targetElement = $modalButtons[btnIndex + 1];
      }
    }

    _stopEventPropagation$fireClick.stopEventPropagation(e);
    $targetElement.focus();

    if (params.confirmButtonColor) {
      _setFocusStyle.setFocusStyle($targetElement, params.confirmButtonColor);
    }
  } else {
    if (keyCode === 13) {
      if ($targetElement.tagName === 'INPUT') {
        $targetElement = $okButton;
        $okButton.focus();
      }

      if (btnIndex === -1) {
        // ENTER/SPACE clicked outside of a button.
        $targetElement = $okButton;
      } else {
        // Do nothing - let the browser handle it.
        $targetElement = undefined;
      }
    } else if (keyCode === 27 && params.allowEscapeKey === true) {
      $targetElement = $cancelButton;
      _stopEventPropagation$fireClick.fireClick($targetElement, e);
    } else {
      // Fallback - let the browser handle it.
      $targetElement = undefined;
    }
  }
};

exports['default'] = handleKeyDown;
module.exports = exports['default'];
},{"./handle-dom":24,"./handle-swal-dom":26}],26:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _hexToRgb = require('./utils');

var _removeClass$getTopMargin$fadeIn$show$addClass = require('./handle-dom');

var _defaultParams = require('./default-params');

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

/*
 * Add modal + overlay to DOM
 */

var _injectedHTML = require('./injected-html');

var _injectedHTML2 = _interopRequireWildcard(_injectedHTML);

var modalClass = '.sweet-alert';
var overlayClass = '.sweet-overlay';

var sweetAlertInitialize = function sweetAlertInitialize() {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = _injectedHTML2['default'];

  // Append elements to body
  while (sweetWrap.firstChild) {
    document.body.appendChild(sweetWrap.firstChild);
  }
};

/*
 * Get DOM element of modal
 */
var getModal = (function (_getModal) {
  function getModal() {
    return _getModal.apply(this, arguments);
  }

  getModal.toString = function () {
    return _getModal.toString();
  };

  return getModal;
})(function () {
  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    sweetAlertInitialize();
    $modal = getModal();
  }

  return $modal;
});

/*
 * Get DOM element of input (in modal)
 */
var getInput = function getInput() {
  var $modal = getModal();
  if ($modal) {
    return $modal.querySelector('input');
  }
};

/*
 * Get DOM element of overlay
 */
var getOverlay = function getOverlay() {
  return document.querySelector(overlayClass);
};

/*
 * Add box-shadow style to button (depending on its chosen bg-color)
 */
var setFocusStyle = function setFocusStyle($button, bgColor) {
  var rgbColor = _hexToRgb.hexToRgb(bgColor);
  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
};

/*
 * Animation when opening modal
 */
var openModal = function openModal(callback) {
  var $modal = getModal();
  _removeClass$getTopMargin$fadeIn$show$addClass.fadeIn(getOverlay(), 10);
  _removeClass$getTopMargin$fadeIn$show$addClass.show($modal);
  _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'showSweetAlert');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'hideSweetAlert');

  window.previousActiveElement = document.activeElement;
  var $okButton = $modal.querySelector('button.confirm');
  $okButton.focus();

  setTimeout(function () {
    _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'visible');
  }, 500);

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    var timerCallback = callback;
    $modal.timeout = setTimeout(function () {
      var doneFunctionExists = (timerCallback || null) && $modal.getAttribute('data-has-done-function') === 'true';
      if (doneFunctionExists) {
        timerCallback(null);
      } else {
        sweetAlert.close();
      }
    }, timer);
  }
};

/*
 * Reset the styling of the input
 * (for example if errors have been shown)
 */
var resetInput = function resetInput() {
  var $modal = getModal();
  var $input = getInput();

  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'show-input');
  $input.value = _defaultParams2['default'].inputValue;
  $input.setAttribute('type', _defaultParams2['default'].inputType);
  $input.setAttribute('placeholder', _defaultParams2['default'].inputPlaceholder);

  resetInputError();
};

var resetInputError = function resetInputError(event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorContainer, 'show');
};

/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function fixVerticalPosition() {
  var $modal = getModal();
  $modal.style.marginTop = _removeClass$getTopMargin$fadeIn$show$addClass.getTopMargin(getModal());
};

exports.sweetAlertInitialize = sweetAlertInitialize;
exports.getModal = getModal;
exports.getOverlay = getOverlay;
exports.getInput = getInput;
exports.setFocusStyle = setFocusStyle;
exports.openModal = openModal;
exports.resetInput = resetInput;
exports.resetInputError = resetInputError;
exports.fixVerticalPosition = fixVerticalPosition;
},{"./default-params":22,"./handle-dom":24,"./injected-html":27,"./utils":29}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var injectedHTML =

// Dark overlay
"<div class=\"sweet-overlay\" tabIndex=\"-1\"></div>" +

// Modal
"<div class=\"sweet-alert\">" +

// Error icon
"<div class=\"sa-icon sa-error\">\n      <span class=\"sa-x-mark\">\n        <span class=\"sa-line sa-left\"></span>\n        <span class=\"sa-line sa-right\"></span>\n      </span>\n    </div>" +

// Warning icon
"<div class=\"sa-icon sa-warning\">\n      <span class=\"sa-body\"></span>\n      <span class=\"sa-dot\"></span>\n    </div>" +

// Info icon
"<div class=\"sa-icon sa-info\"></div>" +

// Success icon
"<div class=\"sa-icon sa-success\">\n      <span class=\"sa-line sa-tip\"></span>\n      <span class=\"sa-line sa-long\"></span>\n\n      <div class=\"sa-placeholder\"></div>\n      <div class=\"sa-fix\"></div>\n    </div>" + "<div class=\"sa-icon sa-custom\"></div>" +

// Title, text and input
"<h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type=\"text\" tabIndex=\"3\" />\n      <div class=\"sa-input-error\"></div>\n    </fieldset>" +

// Input errors
"<div class=\"sa-error-container\">\n      <div class=\"icon\">!</div>\n      <p>Not valid!</p>\n    </div>" +

// Cancel and confirm buttons
"<div class=\"sa-button-container\">\n      <button class=\"cancel\" tabIndex=\"2\">Cancel</button>\n      <div class=\"sa-confirm-button-container\">\n        <button class=\"confirm\" tabIndex=\"1\">OK</button>" +

// Loading animation
"<div class=\"la-ball-fall\">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div>" +

// End of modal
"</div>";

exports["default"] = injectedHTML;
module.exports = exports["default"];
},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _isIE8 = require('./utils');

var _getModal$getInput$setFocusStyle = require('./handle-swal-dom');

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide = require('./handle-dom');

var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

/*
 * Set type, text and actions on modal
 */
var setParameters = function setParameters(params) {
  var modal = _getModal$getInput$setFocusStyle.getModal();

  var $title = modal.querySelector('h2');
  var $text = modal.querySelector('p');
  var $cancelBtn = modal.querySelector('button.cancel');
  var $confirmBtn = modal.querySelector('button.confirm');

  /*
   * Title
   */
  $title.innerHTML = params.html ? params.title : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.title).split('\n').join('<br>');

  /*
   * Text
   */
  $text.innerHTML = params.html ? params.text : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.text || '').split('\n').join('<br>');
  if (params.text) _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($text);

  /*
   * Custom class
   */
  if (params.customClass) {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  } else {
    // Find previously set classes and remove them
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.removeClass(modal, customClass);
    modal.setAttribute('data-custom-class', '');
  }

  /*
   * Icon
   */
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide(modal.querySelectorAll('.sa-icon'));

  if (params.type && !_isIE8.isIE8()) {
    var _ret = (function () {

      var validType = false;

      for (var i = 0; i < alertTypes.length; i++) {
        if (params.type === alertTypes[i]) {
          validType = true;
          break;
        }
      }

      if (!validType) {
        logStr('Unknown alert type: ' + params.type);
        return {
          v: false
        };
      }

      var typesWithIcons = ['success', 'error', 'warning', 'info'];
      var $icon = undefined;

      if (typesWithIcons.indexOf(params.type) !== -1) {
        $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($icon);
      }

      var $input = _getModal$getInput$setFocusStyle.getInput();

      // Animate icon
      switch (params.type) {

        case 'success':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animate');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-tip'), 'animateSuccessTip');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-long'), 'animateSuccessLong');
          break;

        case 'error':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animateErrorIcon');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-x-mark'), 'animateXMark');
          break;

        case 'warning':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'pulseWarning');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-body'), 'pulseWarningIns');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-dot'), 'pulseWarningIns');
          break;

        case 'input':
        case 'prompt':
          $input.setAttribute('type', params.inputType);
          $input.value = params.inputValue;
          $input.setAttribute('placeholder', params.inputPlaceholder);
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, 'show-input');
          setTimeout(function () {
            $input.focus();
            $input.addEventListener('keyup', swal.resetInputError);
          }, 400);
          break;
      }
    })();

    if (typeof _ret === 'object') {
      return _ret.v;
    }
  }

  /*
   * Custom image
   */
  if (params.imageUrl) {
    var $customIcon = modal.querySelector('.sa-icon.sa-custom');

    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($customIcon);

    var _imgWidth = 80;
    var _imgHeight = 80;

    if (params.imageSize) {
      var dimensions = params.imageSize.toString().split('x');
      var imgWidth = dimensions[0];
      var imgHeight = dimensions[1];

      if (!imgWidth || !imgHeight) {
        logStr('Parameter imageSize expects value with format WIDTHxHEIGHT, got ' + params.imageSize);
      } else {
        _imgWidth = imgWidth;
        _imgHeight = imgHeight;
      }
    }

    $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
  }

  /*
   * Show cancel button?
   */
  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
  if (params.showCancelButton) {
    $cancelBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($cancelBtn);
  }

  /*
   * Show confirm button?
   */
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($confirmBtn);
  }

  /*
   * Custom text on cancel/confirm buttons
   */
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.confirmButtonText);
  }

  /*
   * Custom color on confirm button
   */
  if (params.confirmButtonColor) {
    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Set the confirm button color to the loading ring
    $confirmBtn.style.borderLeftColor = params.confirmLoadingButtonColor;
    $confirmBtn.style.borderRightColor = params.confirmLoadingButtonColor;

    // Set box-shadow to default focused button
    _getModal$getInput$setFocusStyle.setFocusStyle($confirmBtn, params.confirmButtonColor);
  }

  /*
   * Allow outside click
   */
  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

  /*
   * Callback function
   */
  var hasDoneFunction = params.doneFunction ? true : false;
  modal.setAttribute('data-has-done-function', hasDoneFunction);

  /*
   * Animation
   */
  if (!params.animation) {
    modal.setAttribute('data-animation', 'none');
  } else if (typeof params.animation === 'string') {
    modal.setAttribute('data-animation', params.animation); // Custom animation
  } else {
    modal.setAttribute('data-animation', 'pop');
  }

  /*
   * Timer
   */
  modal.setAttribute('data-timer', params.timer);
};

exports['default'] = setParameters;
module.exports = exports['default'];
},{"./handle-dom":24,"./handle-swal-dom":26,"./utils":29}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * Allow user to pass their own params
 */
var extend = function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/*
 * Convert HEX codes to RGB values (#000000 -> rgb(0,0,0))
 */
var hexToRgb = function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
};

/*
 * Check if the user is using Internet Explorer 8 (for fallbacks)
 */
var isIE8 = function isIE8() {
  return window.attachEvent && !window.addEventListener;
};

/*
 * IE compatible logging for developers
 */
var logStr = function logStr(string) {
  if (window.console) {
    // IE...
    window.console.log('SweetAlert: ' + string);
  }
};

/*
 * Set hover, active and focus-states for buttons 
 * (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
 */
var colorLuminance = function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // Convert to decimal and change luminosity
  var rgb = '#';
  var c;
  var i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
};

exports.extend = extend;
exports.hexToRgb = hexToRgb;
exports.isIE8 = isIE8;
exports.logStr = logStr;
exports.colorLuminance = colorLuminance;
},{}],30:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

/*
 * jQuery-like functions for manipulating the DOM
 */

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation = require('./modules/handle-dom');

/*
 * Handy utilities
 */

var _extend$hexToRgb$isIE8$logStr$colorLuminance = require('./modules/utils');

/*
 *  Handle sweetAlert's DOM elements
 */

var _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition = require('./modules/handle-swal-dom');

// Handle button events and keyboard events

var _handleButton$handleConfirm$handleCancel = require('./modules/handle-click');

var _handleKeyDown = require('./modules/handle-key');

var _handleKeyDown2 = _interopRequireWildcard(_handleKeyDown);

// Default values

var _defaultParams = require('./modules/default-params');

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

var _setParameters = require('./modules/set-params');

var _setParameters2 = _interopRequireWildcard(_setParameters);

/*
 * Remember state in cases where opening and handling a modal will fiddle with it.
 * (We also use window.previousActiveElement as a global variable)
 */
var previousWindowKeyDown;
var lastFocusedButton;

/*
 * Global sweetAlert function
 * (this is what the user calls)
 */
var sweetAlert, swal;

exports['default'] = sweetAlert = swal = function () {
  var customizations = arguments[0];

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(document.body, 'stop-scrolling');
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.resetInput();

  /*
   * Use argument if defined or default value from params object otherwise.
   * Supports the case where a default value is boolean true and should be
   * overridden by a corresponding explicit argument which is boolean false.
   */
  function argumentOrDefault(key) {
    var args = customizations;
    return args[key] === undefined ? _defaultParams2['default'][key] : args[key];
  }

  if (customizations === undefined) {
    _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert expects at least 1 attribute!');
    return false;
  }

  var params = _extend$hexToRgb$isIE8$logStr$colorLuminance.extend({}, _defaultParams2['default']);

  switch (typeof customizations) {

    // Ex: swal("Hello", "Just testing", "info");
    case 'string':
      params.title = customizations;
      params.text = arguments[1] || '';
      params.type = arguments[2] || '';
      break;

    // Ex: swal({ title:"Hello", text: "Just testing", type: "info" });
    case 'object':
      if (customizations.title === undefined) {
        _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Missing "title" argument!');
        return false;
      }

      params.title = customizations.title;

      for (var customName in _defaultParams2['default']) {
        params[customName] = argumentOrDefault(customName);
      }

      // Show "Confirm" instead of "OK" if cancel button is visible
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : _defaultParams2['default'].confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Callback function when clicking on "OK"/"Cancel"
      params.doneFunction = arguments[1] || null;

      break;

    default:
      _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations);
      return false;

  }

  _setParameters2['default'](params);
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.fixVerticalPosition();
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.openModal(arguments[1]);

  // Modal interactions
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  /*
   * Make sure all modal buttons respond to all events
   */
  var $buttons = modal.querySelectorAll('button');
  var buttonEvents = ['onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onfocus'];
  var onButtonEvent = function onButtonEvent(e) {
    return _handleButton$handleConfirm$handleCancel.handleButton(e, params, modal);
  };

  for (var btnIndex = 0; btnIndex < $buttons.length; btnIndex++) {
    for (var evtIndex = 0; evtIndex < buttonEvents.length; evtIndex++) {
      var btnEvt = buttonEvents[evtIndex];
      $buttons[btnIndex][btnEvt] = onButtonEvent;
    }
  }

  // Clicking outside the modal dismisses it (if allowed by user)
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay().onclick = onButtonEvent;

  previousWindowKeyDown = window.onkeydown;

  var onKeyEvent = function onKeyEvent(e) {
    return _handleKeyDown2['default'](e, params, modal);
  };
  window.onkeydown = onKeyEvent;

  window.onfocus = function () {
    // When the user has focused away and focused back from the whole window.
    setTimeout(function () {
      // Put in a timeout to jump out of the event sequence.
      // Calling focus() in the event sequence confuses things.
      if (lastFocusedButton !== undefined) {
        lastFocusedButton.focus();
        lastFocusedButton = undefined;
      }
    }, 0);
  };

  // Show alert with enabled buttons always
  swal.enableButtons();
};

/*
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = swal.setDefaults = function (userParams) {
  if (!userParams) {
    throw new Error('userParams is required');
  }
  if (typeof userParams !== 'object') {
    throw new Error('userParams has to be a object');
  }

  _extend$hexToRgb$isIE8$logStr$colorLuminance.extend(_defaultParams2['default'], userParams);
};

/*
 * Animation when closing modal
 */
sweetAlert.close = swal.close = function () {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(_sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay(), 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(modal, 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'showSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(modal, 'hideSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'visible');

  /*
   * Reset icon animations
   */
  var $successIcon = modal.querySelector('.sa-icon.sa-success');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon, 'animate');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'animateErrorIcon');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon, 'pulseWarning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

  // Reset custom class (delay so that UI changes aren't visible)
  setTimeout(function () {
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, customClass);
  }, 300);

  // Make page scrollable again
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(document.body, 'stop-scrolling');

  // Reset the page to its previous state
  window.onkeydown = previousWindowKeyDown;
  if (window.previousActiveElement) {
    window.previousActiveElement.focus();
  }
  lastFocusedButton = undefined;
  clearTimeout(modal.timeout);

  return true;
};

/*
 * Validation of the input field is done by user
 * If something is wrong => call showInputError with errorMessage
 */
sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorIcon, 'show');

  var $errorContainer = modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorContainer, 'show');

  $errorContainer.querySelector('p').innerHTML = errorMessage;

  setTimeout(function () {
    sweetAlert.enableButtons();
  }, 1);

  modal.querySelector('input').focus();
};

/*
 * Reset input error DOM elements
 */
sweetAlert.resetInputError = swal.resetInputError = function (event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorContainer, 'show');
};

/*
 * Disable confirm and cancel buttons
 */
sweetAlert.disableButtons = swal.disableButtons = function (event) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = true;
  $cancelButton.disabled = true;
};

/*
 * Enable confirm and cancel buttons
 */
sweetAlert.enableButtons = swal.enableButtons = function (event) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = false;
  $cancelButton.disabled = false;
};

if (typeof window !== 'undefined') {
  // The 'handle-click' module requires
  // that 'sweetAlert' was set as global.
  window.sweetAlert = window.swal = sweetAlert;
} else {
  _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert is a frontend module!');
}
module.exports = exports['default'];
},{"./modules/default-params":22,"./modules/handle-click":23,"./modules/handle-dom":24,"./modules/handle-key":25,"./modules/handle-swal-dom":26,"./modules/set-params":28,"./modules/utils":29}],31:[function(require,module,exports){
/*
 * Undo.js - A undo/redo framework for JavaScript
 *
 * http://jzaefferer.github.com/undo
 *
 * Copyright (c) 2011 Jörn Zaefferer
 *
 * MIT licensed.
 */
(function() {

// based on Backbone.js' inherits
var ctor = function(){};
var inherits = function(parent, protoProps) {
	var child;

	if (protoProps && protoProps.hasOwnProperty('constructor')) {
		child = protoProps.constructor;
	} else {
		child = function(){ return parent.apply(this, arguments); };
	}

	ctor.prototype = parent.prototype;
	child.prototype = new ctor();

	if (protoProps) extend(child.prototype, protoProps);

	child.prototype.constructor = child;
	child.__super__ = parent.prototype;
	return child;
};

function extend(target, ref) {
	var name, value;
	for ( name in ref ) {
		value = ref[name];
		if (value !== undefined) {
			target[ name ] = value;
		}
	}
	return target;
};

var Undo = {
	version: '0.1.15'
};

Undo.Stack = function() {
	this.commands = [];
	this.stackPosition = -1;
	this.savePosition = -1;
};

extend(Undo.Stack.prototype, {
	execute: function(command) {
		this._clearRedo();
		command.execute();
		this.commands.push(command);
		this.stackPosition++;
		this.changed();
	},
	undo: function() {
		this.commands[this.stackPosition].undo();
		this.stackPosition--;
		this.changed();
	},
	canUndo: function() {
		return this.stackPosition >= 0;
	},
	redo: function() {
		this.stackPosition++;
		this.commands[this.stackPosition].redo();
		this.changed();
	},
	canRedo: function() {
		return this.stackPosition < this.commands.length - 1;
	},
	save: function() {
		this.savePosition = this.stackPosition;
		this.changed();
	},
	dirty: function() {
		return this.stackPosition != this.savePosition;
	},
	_clearRedo: function() {
		// TODO there's probably a more efficient way for this
		this.commands = this.commands.slice(0, this.stackPosition + 1);
	},
	changed: function() {
		// do nothing, override
	}
});

Undo.Command = function(name) {
	this.name = name;
}

var up = new Error("override me!");

extend(Undo.Command.prototype, {
	execute: function() {
		throw up;
	},
	undo: function() {
		throw up;
	},
	redo: function() {
		this.execute();
	}
});

Undo.Command.extend = function(protoProps) {
	var child = inherits(this, protoProps);
	child.extend = Undo.Command.extend;
	return child;
};

// AMD support
if (typeof define === "function" && define.amd) {
	// Define as an anonymous module
	define(Undo);
} else if(typeof module != "undefined" && module.exports){
	module.exports = Undo
}else {
	this.Undo = Undo;
}
}).call(this);

},{}],32:[function(require,module,exports){
var $, $editable, $toolbar, $tt, makeTooltip, removeTooltip, setCaret;

setCaret = require('../helper/setCaret.coffee');

$ = require('../helper/selector.coffee').$;

$editable = $('.js-editable');

$toolbar = $('.js-toolbar');

$tt = $('.js-tooltip-link');

makeTooltip = function($tt, el) {
  var bodyRect, height, leftPos, linkRect, topPos, widthToCenter;
  bodyRect = document.body.getBoundingClientRect();
  linkRect = el.getBoundingClientRect();
  leftPos = linkRect.left - bodyRect.left;
  topPos = linkRect.top - bodyRect.top;
  widthToCenter = linkRect.width / 2;
  height = linkRect.height;
  $tt.innerHTML = "" + el.href;
  $tt.style.display = 'block';
  $tt.style.top = (topPos + height) + "px";
  $tt.style.left = (leftPos + widthToCenter) + "px";
  return $tt.style.marginLeft = "-" + ($tt.offsetWidth / 2) + "px";
};

removeTooltip = function($tt) {
  return $tt.style.display = 'none';
};

module.exports = function(e) {
  var $afterText, $link, $newLink, $newText, $thisEl, idx, linkRegex, matchText, ref, selection;
  selection = window.getSelection();
  $thisEl = selection.anchorNode;
  if (e.which === 32) {
    linkRegex = /https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g;
    if ($thisEl.parentNode === 'A') {
      $link = $thisEl.splitText(selection.anchorOffset);
      return $link;
    } else if (linkRegex.test($thisEl.textContent)) {
      e.preventDefault();
      matchText = ($thisEl.textContent.match(linkRegex))[0];
      $newLink = document.createElement('A');
      idx = $thisEl.textContent.indexOf(matchText);
      $afterText = $thisEl.splitText(idx + matchText.length);
      $link = $thisEl.splitText(idx);
      $newLink.innerHTML = matchText;
      $newLink.href = matchText;
      $thisEl.parentNode.replaceChild($newLink, $link);
      $newText = document.createTextNode("\u00A0");
      if (((ref = $newLink.nextSibling) != null ? ref.nodeValue : void 0) === '') {
        $newLink.parentNode.appendChild($newText);
      } else {
        $newLink.parentNode.insertBefore($newText, $newLink.nextSibling);
      }
      $newLink.addEventListener('mouseover', function(e) {
        return makeTooltip($tt, this);
      });
      $newLink.addEventListener('mouseleave', function(e) {
        return removeTooltip($tt);
      });
      return setCaret($newText, 1);
    }
  }
};


},{"../helper/selector.coffee":16,"../helper/setCaret.coffee":17}],33:[function(require,module,exports){
var $, prevText, setCaret;

setCaret = require('../helper/setCaret.coffee');

$ = require('../helper/selector.coffee').$;

prevText = '';

module.exports = function() {
  var anchorNode, anchorOffset, biRegex, rpl, selection, textContent;
  selection = window.getSelection();
  anchorNode = selection.anchorNode, anchorOffset = selection.anchorOffset;
  textContent = anchorNode.textContent;
  biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;
  rpl = function(regex, newText, func) {
    var $text, i, j, len, len1, newSubs, newSups, normalText, ref, ref1, ref2, s, s1, subs, subsText, sups, supsText, text, tmp;
    if (biRegex.test(anchorNode.parentNode)) {
      anchorNode = anchorNode.parentNode;
      if (biRegex.test(anchorNode.parentNode)) {
        anchorNode = anchorNode.parentNode;
        if (biRegex.test(anchorNode.parentNode)) {
          anchorNode = anchorNode.parentNode;
          if (biRegex.test(anchorNode.parentNode)) {
            anchorNode = anchorNode.parentNode;
          }
        }
      }
    }
    if (((ref = anchorNode.parentNode) != null ? ref.nodeName : void 0) === 'PRE') {

    } else if (regex.test(textContent)) {
      tmp = document.createElement('DIV');
      if (newText === 'sups') {
        text = (textContent.match(regex))[0];
        normalText = '+-=()0123456789AaÆᴂɐɑɒBbcɕDdðEeƎəɛɜɜfGgɡɣhHɦIiɪɨᵻɩjJʝɟKklLʟᶅɭMmɱNnɴɲɳŋOoɔᴖᴗɵȢPpɸrRɹɻʁsʂʃTtƫUuᴜᴝʉɥɯɰʊvVʋʌwWxyzʐʑʒꝯᴥβγδθφχнნʕⵡ';
        supsText = '⁺⁻⁼⁽⁾⁰¹²³⁴⁵⁶⁷⁸⁹ᴬᵃᴭᵆᵄᵅᶛᴮᵇᶜᶝᴰᵈᶞᴱᵉᴲᵊᵋᶟᵌᶠᴳᵍᶢˠʰᴴʱᴵⁱᶦᶤᶧᶥʲᴶᶨᶡᴷᵏˡᴸᶫᶪᶩᴹᵐᶬᴺⁿᶰᶮᶯᵑᴼᵒᵓᵔᵕᶱᴽᴾᵖᶲʳᴿʴʵʶˢᶳᶴᵀᵗᶵᵁᵘᶸᵙᶶᶣᵚᶭᶷᵛⱽᶹᶺʷᵂˣʸᶻᶼᶽᶾꝰᵜᵝᵞᵟᶿᵠᵡᵸჼˤⵯ';
        if (prevText === text) {
          ref1 = text.split('^'), s1 = ref1[0], sups = ref1[1];
          newSups = '';
          for (i = 0, len = sups.length; i < len; i++) {
            s = sups[i];
            newSups += supsText[normalText.indexOf(s)];
          }
          tmp.innerHTML = textContent.replace(regex, s1 + newSups + '&#8202;&#8202;');
          $text = tmp.firstChild;
          anchorNode.parentNode.replaceChild($text, anchorNode);
          setCaret($text, anchorOffset);
        }
        return prevText = text;
      } else if (newText === 'subs') {
        text = (textContent.match(regex))[0];
        normalText = '+-=()0123456789aeəhijklmnoprstuvxβγρφχ';
        subsText = '₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₔₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ';
        if (prevText === text) {
          ref2 = text.split('~'), s1 = ref2[0], subs = ref2[1];
          newSubs = '';
          for (j = 0, len1 = subs.length; j < len1; j++) {
            s = subs[j];
            newSubs += subsText[normalText.indexOf(s)];
          }
          tmp.innerHTML = textContent.replace(regex, s1 + newSubs + '&#8202;&#8202;');
          $text = tmp.firstChild;
          anchorNode.parentNode.replaceChild($text, anchorNode);
          setCaret($text, anchorOffset);
        }
        return prevText = text;
      } else {
        textContent = textContent.replace(regex, newText);
        tmp.innerHTML = textContent;
        $text = tmp.firstChild;
        anchorNode.parentNode.replaceChild($text, anchorNode);
        return setCaret($text, anchorOffset);
      }
    }
  };
  rpl(/\.\.\./g, '&#8202;&hellip;&#8202;');
  rpl(/\-\-/g, '&#8202;&mdash;&#8202;');
  rpl(/1\/2/g, '&#8202;&#8202;&frac12;');
  rpl(/1\/4/g, '&#8202;&#8202;&frac14;');
  rpl(/3\/4/g, '&#8202;&#8202;&frac34;');
  rpl(/(\d|½|¼|¾)"/g, '$1&Prime;');
  rpl(/(\d|½|¼|¾)'/g, '$1&prime;');
  rpl(/(\d+)-(\d+)/g, '$1&ndash;$2');
  rpl(/(\w+)\^([0123456789AaÆᴂɐɑɒBbcɕDdðEeƎəɛɜɜfGgɡɣhHɦIiɪɨᵻɩjJʝɟKklLʟᶅɭMmɱNnɴɲɳŋOoɔᴖᴗɵȢPpɸrRɹɻʁsʂʃTtƫUuᴜᴝʉɥɯɰʊvVʋʌwWxyzʐʑʒꝯᴥβγδθφχнნʕⵡ+=()-]+)/g, 'sups');
  rpl(/(\w+)\~([0123456789aeəhijklmnoprstuvxβγρφχ+=()-]+)/g, 'subs');
  rpl(/"(\w)/g, '&ldquo;$1');
  rpl(/(\S)"/g, '$1&rdquo;');
  rpl(/'(\w)/g, '&lsquo;$1');
  rpl(/(\S)'/g, '$1&rsquo;');
  return rpl(/(\w)‘(\w)/g, '$1&rsquo;$2');
};


},{"../helper/selector.coffee":16,"../helper/setCaret.coffee":17}],34:[function(require,module,exports){
var $, $editable, $toolbar, setCaret;

setCaret = require('../helper/setCaret.coffee');

$ = require('../helper/selector.coffee').$;

$editable = $('.js-editable');

$toolbar = $('.js-toolbar');

module.exports = function() {
  var $beginParent, anchorNode, anchorOffset, biRegex, selection, textContent, textHtml;
  selection = window.getSelection();
  anchorNode = selection.anchorNode, anchorOffset = selection.anchorOffset;
  if (anchorNode === null) {
    return;
  }
  $beginParent = anchorNode.parentNode;
  textContent = anchorNode.textContent;
  textHtml = anchorNode.parentNode.innerHTML;
  biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;
  if (biRegex.test($beginParent.nodeName)) {
    $beginParent = $beginParent.parentNode;
    if (biRegex.test($beginParent.nodeName)) {
      $beginParent = $beginParent.parentNode;
      if (biRegex.test($beginParent.nodeName)) {
        $beginParent = $beginParent.parentNode;
        if (biRegex.test($beginParent.nodeName)) {
          $beginParent = $beginParent.parentNode;
        }
      }
    }
  }
  if (/^(P|BLOCKQUOTE|H2|H3)$/.test($beginParent.nodeName)) {
    if (/^("|“)$/.test($beginParent.textContent[0])) {
      $beginParent.classList.add('is-indent2');
    } else {
      $beginParent.classList.remove('is-indent2');
    }
    if (/^('|‘)$/.test($beginParent.textContent[0])) {
      return $beginParent.classList.add('is-indent1');
    } else {
      return $beginParent.classList.remove('is-indent1');
    }
  }
};


},{"../helper/selector.coffee":16,"../helper/setCaret.coffee":17}],35:[function(require,module,exports){
var $, $$, $editable, blockquote, getCaret, h2, h3, p, ref, ref1, setCaret, shortid;

getCaret = require('../helper/getCaret.coffee');

setCaret = require('../helper/setCaret.coffee');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

ref1 = require('../helper/elementList.coffee'), p = ref1.p, h2 = ref1.h2, h3 = ref1.h3, blockquote = ref1.blockquote;

$editable = $('.js-editable');

shortid = require('shortid');

$editable.addEventListener('drop', function(e) {
  return setTimeout(function() {
    var $allSpan, $span, i, len, results;
    $allSpan = $$('.js-editable span');
    results = [];
    for (i = 0, len = $allSpan.length; i < len; i++) {
      $span = $allSpan[i];
      results.push($span.outerHTML = $span.innerHTML);
    }
    return results;
  }, 100);
});

$editable.addEventListener('keyup', function(e) {
  var scTop, selection;
  if (e.keyCode === 13) {
    selection = window.getSelection();
    scTop = selection.anchorNode.offsetTop || selection.anchorNode.parentNode.offsetTop;
    if (scTop) {
      return window.scrollTo(0, scTop + 100);
    }
  }
});

$editable.addEventListener('dragstart', function(e) {
  var ref2, ref3;
  if ((ref2 = e.target) != null ? (ref3 = ref2.classList) != null ? ref3.contains('is-img') : void 0 : void 0) {
    e.preventDefault();
  }
});

$editable.addEventListener('keydown', function(e) {
  var $blankP, $thisEl, biRegex, selection;
  selection = window.getSelection();
  $thisEl = selection.anchorNode;
  biRegex = /^(B|I|EM|STRONG|A|SPAN)$/;
  if (biRegex.test($thisEl.parentNode.nodeName)) {
    $thisEl = $thisEl.parentNode;
    if (biRegex.test($thisEl.parentNode.nodeName)) {
      $thisEl = $thisEl.parentNode;
      if (biRegex.test($thisEl.parentNode.nodeName)) {
        $thisEl = $thisEl.parentNode;
        if (biRegex.test($thisEl.parentNode.nodeName)) {
          $thisEl = $thisEl.parentNode;
        }
      }
    }
  }
  $blankP = p();
  $blankP.innerHTML = '<br>';
  if ($thisEl.parentNode.nodeName === 'FIGCAPTION' || $thisEl.nodeName === 'FIGCAPTION') {
    if (e.which === 13) {
      return e.preventDefault();
    } else if (selection.anchorOffset === $thisEl.textContent.length && e.which === 46) {
      return e.preventDefault();
    } else if (selection.anchorOffset === 0 && e.which === 8) {
      return e.preventDefault();
    }
  } else if ($thisEl.nodeName === 'LI') {
    if (e.which === 8 && ($thisEl.nextSibling == null)) {
      e.preventDefault();
      if ($thisEl.parentNode.nextSibling != null) {
        $editable.insertBefore($blankP, $thisEl.parentNode.nextSibling);
      } else {
        $editable.appendChild($blankP);
      }
      $thisEl.parentNode.removeChild($thisEl);
      return setCaret($blankP, 0);
    }
  } else if ($thisEl.parentNode.classList.contains('is-placeholder')) {
    $thisEl.parentNode.classList.remove('is-placeholder');
    $thisEl.parentNode.classList.remove('b-graf--placeholder');
    $thisEl.parentNode.setAttribute('data-id', shortid.generate());
    return $thisEl.parentNode.innerHTML = '<br>';
  } else {
    if (e.which === 13 && !e.shiftKey) {
      if (selection.anchorOffset === $thisEl.parentNode.lastChild.textContent.length && $thisEl.parentNode.nodeName !== 'LI') {
        e.preventDefault();
        if ($thisEl.parentNode.nextSibling != null) {
          $editable.insertBefore($blankP, $thisEl.parentNode.nextSibling);
        } else {
          $editable.appendChild($blankP);
        }
        return setCaret($blankP, 0);
      }
    }
  }
});

$editable.addEventListener('keyup', function(e) {
  var $allFont, $allSpan, $allStyled, $font, $newP, $prevEl, $span, $styled, $thisEl, i, j, k, len, len1, len2, placeholder, ref2, ref3, ref4, ref5, ref6, ref7, ref8, selection;
  $allSpan = $$('.js-editable span');
  for (i = 0, len = $allSpan.length; i < len; i++) {
    $span = $allSpan[i];
    if ((ref2 = $span.classList) != null ? ref2.contains('is-drop-cap') : void 0) {
      console.log;
    } else if ((ref3 = $span.classList) != null ? ref3.contains('is-small-caps') : void 0) {
      console.log;
    } else {
      $span.outerHTML = $span.innerHTML;
    }
  }
  $allFont = $$('.js-editable font');
  for (j = 0, len1 = $allFont.length; j < len1; j++) {
    $font = $allFont[j];
    $font.outerHTML = $font.innerHTML;
  }
  $allStyled = $$('.js-editable *[style]');
  for (k = 0, len2 = $allStyled.length; k < len2; k++) {
    $styled = $allStyled[k];
    $styled.removeAttribute('style');
  }
  selection = window.getSelection();
  $thisEl = selection.anchorNode;
  if (e.ctrlKey || e.metaKey) {
    return;
  } else if (e.which === 13) {
    if (e.shiftKey) {
      return;
    }
    if (/^(DIV|P|BLOCKQUOTE|PRE)$/.test($thisEl.nodeName)) {
      $newP = p();
      $newP.innerHTML = '<br>';
      $editable.replaceChild($newP, $thisEl);
      setCaret($newP, 0);
    } else if ($thisEl.parentNode.nodeName === 'DIV') {
      $newP = p();
      $newP.innerHTML = '<br>';
      $editable.replaceChild($newP, $thisEl.parentNode);
      setCaret($newP, 0);
    } else if ($thisEl.parentNode.nodeName === 'LI') {
      if ($thisEl.parentNode.parentNode.lastChild === $thisEl.parentNode) {
        if ($thisEl.parentNode.innerHTML === '<br>') {
          $thisEl.parentNode.parentNode.removeChild($thisEl.parentNode);
          $newP = p();
          $newP.innerHTML = '<br>';
          $editable.appendChild($newP);
          setCaret($newP, 0);
        }
      }
    } else if (/^(H2|H3|BLOCKQUOTE|PRE)$/.test($thisEl.parentNode.nodeName)) {
      $prevEl = $thisEl.parentNode.previousSibling;
      if ($prevEl.textContent === '') {
        $newP = p();
        $newP.innerHTML = '<br>';
        $editable.replaceChild($newP, $prevEl);
      }
    }
  } else {
    if (/^(H2|H3|BLOCKQUOTE|P|PRE)$/.test($thisEl.nodeName)) {
      return;
    } else if ($thisEl.parentNode.nodeName === 'DIV' && $thisEl !== $editable) {
      $newP = p();
      $newP.innerHTML = '<br>';
      $editable.replaceChild($newP, $thisEl);
      setCaret($newP, 0);
      return;
    }
  }
  placeholder = {
    paragraph: 'content&hellip;'
  };
  $newP = "<p class='b-graf b-graf--placeholder is-placeholder'>" + placeholder.paragraph + "<br></p>";
  if ($editable.textContent === '') {
    $editable.innerHTML = $newP;
    setCaret($editable.firstChild, 0);
  } else if ((ref4 = $editable.firstChild) != null ? (ref5 = ref4.classList) != null ? ref5.contains('is-placeholder') : void 0 : void 0) {

  } else if ($editable.firstChild.nodeName === '#text' && $editable.childNodes.length === 1) {
    $editable.innerHTML = $newP;
    setCaret($editable.firstChild, 0);
  } else if ($editable.firstChild.innerHTML === '') {
    $editable.firstChild.innerHTML = $newP;
    setCaret($editable.firstChild, 0);
  } else if ($editable.firstChild.innerHTML === '<p></p>') {
    $editable.firstChild.innerHTML = '<br>';
    setCaret($editable.firstChild, 0);
  } else if ($editable.firstChild.nodeName === 'DIV') {
    $editable.firstChild.innerHTML = $newP;
    setCaret($editable.firstChild, 0);
  }
  if (((ref6 = $editable.childNodes[$editable.childNodes.length - 3]) != null ? ref6.nodeName : void 0) === '#text') {
    $editable.removeChild($editable.childNodes[$editable.childNodes.length - 3]);
  }
  if (((ref7 = $editable.childNodes[$editable.childNodes.length - 2]) != null ? ref7.nodeName : void 0) === '#text') {
    $editable.removeChild($editable.childNodes[$editable.childNodes.length - 2]);
  }
  if (((ref8 = $editable.childNodes[$editable.childNodes.length - 1]) != null ? ref8.nodeName : void 0) === '#text') {
    return $editable.removeChild($editable.childNodes[$editable.childNodes.length - 1]);
  }
});


},{"../helper/elementList.coffee":14,"../helper/getCaret.coffee":15,"../helper/selector.coffee":16,"../helper/setCaret.coffee":17,"shortid":39}],36:[function(require,module,exports){
var $, $$, $editable, blockquote1, blockquote2, charTransform, code, getCaret, h2, h3, hangingPunc, hr, ol, p, purify, ref, ref1, setCaret, ul;

getCaret = require('../helper/getCaret.coffee');

setCaret = require('../helper/setCaret.coffee');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

ref1 = require('../helper/elementList.coffee'), p = ref1.p, h2 = ref1.h2, h3 = ref1.h3, blockquote1 = ref1.blockquote1, blockquote2 = ref1.blockquote2, code = ref1.code, ul = ref1.ul, ol = ref1.ol, hr = ref1.hr;

$editable = $('.js-editable');

hangingPunc = require('./hangingPunc.coffee');

charTransform = require('./charTransform.coffee');

purify = function(text) {
  var transformed;
  text || (text = '');
  transformed = text.replace(/</g, '&lt;').replace(/"(\w)/g, '&ldquo;$1').replace(/(\S)"/g, '$1&rdquo;').replace(/'(\w)/g, '&lsquo;$1').replace(/(\S)'/g, '$1&rsquo;');
  return transformed;
};

$editable.addEventListener('paste', function(e) {
  var $beginParent, $child, $div, $el, $elChild, $h, $newEl, $p, anchorNode, biRegex, html, i, isHTML, j, len, len1, plainText, ref2, ref3, selection, tag, tmp, transformed;
  e.preventDefault();
  selection = window.getSelection();
  anchorNode = selection.anchorNode;
  $beginParent = anchorNode.parentNode;
  biRegex = /^(B|I|STRONG|EM|A)$/;
  if (biRegex.test($beginParent.nodeName)) {
    $beginParent = $beginParent.parentNode;
    if (biRegex.test($beginParent.nodeName)) {
      $beginParent = $beginParent.parentNode;
      if (biRegex.test($beginParent.nodeName)) {
        $beginParent = $beginParent.parentNode;
      }
    }
  }
  html = e.clipboardData.getData("text/html");
  isHTML = true;
  $newEl = '';
  if (html === '') {
    plainText = e.clipboardData.getData('text/plain');
    html = plainText;
    isHTML = false;
    $newEl = purify(html);
  }
  $div = document.createElement('DIV');
  $div.innerHTML = html;
  if (isHTML) {
    ref2 = $div.childNodes;
    for (i = 0, len = ref2.length; i < len; i++) {
      $child = ref2[i];
      if (/^(H1|H2|H3|H4|H5|H6)$/.test($child.nodeName)) {
        if (/^(H1|H2)$/.test($child.nodeName)) {
          $h = h2();
        } else if (/^(H3|H4)$/.test($child.nodeName)) {
          $h = h3();
        } else {
          $h = blockquote1();
        }
        if (/^("|“)$/.test($child.textContent[0])) {
          $h.classList.add('is-indent2');
        } else {
          $h.classList.remove('is-indent2');
        }
        if (/^('|‘)$/.test($child.textContent[0])) {
          $h.classList.add('is-indent1');
        } else {
          $h.classList.remove('is-indent1');
        }
        transformed = purify($child.textContent);
        $h.innerHTML = transformed;
        tmp = document.createElement('DIV');
        tmp.appendChild($h);
        $newEl += tmp.innerHTML;
      } else if (/^(P|BLOCKQUOTE|PRE|UL|OL)$/.test($child.nodeName)) {
        if ($child.nodeName === 'P') {
          $el = p();
        } else if ($child.nodeName === 'BLOCKQUOTE') {
          $el = blockquote2();
        } else if ($child.nodeName === 'PRE') {
          $el = code();
        } else if ($child.nodeName === 'UL') {
          $el = ul();
        } else if ($child.nodeName === 'OL') {
          $el = ol();
        }
        if (/^("|“)$/.test($child.textContent[0])) {
          $el.classList.add('is-indent2');
        } else {
          $el.classList.remove('is-indent2');
        }
        if (/^('|‘)$/.test($child.textContent[0])) {
          $el.classList.add('is-indent1');
        } else {
          $el.classList.remove('is-indent1');
        }
        tmp = document.createElement('DIV');
        ref3 = $child.childNodes;
        for (j = 0, len1 = ref3.length; j < len1; j++) {
          $elChild = ref3[j];
          transformed = purify($elChild.textContent);
          if (/^(B|STRONG|EM|I|A|LI)$/.test($elChild.nodeName)) {
            tag = $elChild.nodeName.toLowerCase();
            if ($elChild.nodeName === 'A') {
              $el.innerHTML += "<" + tag + " href=" + $elChild.href + ">" + transformed + "</" + tag + ">";
            } else {
              $el.innerHTML += "<" + tag + ">" + transformed + "</" + tag + ">";
            }
          } else if ($elChild.nodeName === 'BR') {
            $el.innerHTML += "<br>";
          } else {
            $el.innerHTML += "" + transformed;
          }
        }
        tmp.appendChild($el);
        $newEl += tmp.innerHTML;
      } else if ($child.nodeName === 'HR') {
        $el = hr();
        tmp = document.createElement('DIV');
        tmp.appendChild($el);
        $newEl += tmp.innerHTML;
      } else if (!/^(#text|#comment)$/.test($child.nodeName)) {
        tmp = document.createElement('DIV');
        transformed = purify($child.textContent);
        if (/^(B|STRONG|EM|I|A|LI)$/.test($child.nodeName)) {
          tag = $child.nodeName.toLowerCase();
          if ($child.nodeName === 'A') {
            tmp.innerHTML += "<" + tag + " href=" + $child.href + ">" + transformed + "</" + tag + ">";
          } else {
            tmp.innerHTML += "<" + tag + ">" + transformed + "</" + tag + ">";
          }
        } else {
          tmp.innerHTML += "" + transformed;
        }
        $newEl += tmp.innerHTML;
      }
    }
  }
  selection.deleteFromDocument();
  if (isHTML) {
    $p = p();
    $p.innerHTML = '<br>';
    if ($editable.textContent === '') {
      $editable.appendChild($p);
    } else if ($beginParent === $editable.lastChild) {
      $editable.appendChild($p);
    } else if ($beginParent.parentNode === $editable && ($beginParent.nextSibling != null)) {
      $editable.insertBefore($p, $beginParent.nextSibling);
    } else if ($beginParent === $editable) {
      $beginParent = anchorNode;
      $editable.insertBefore($p, anchorNode.nextSibling);
    }
    setCaret($p, 0);
  }
  return document.execCommand("insertHTML", false, $newEl);
});


},{"../helper/elementList.coffee":14,"../helper/getCaret.coffee":15,"../helper/selector.coffee":16,"../helper/setCaret.coffee":17,"./charTransform.coffee":33,"./hangingPunc.coffee":34}],37:[function(require,module,exports){
var Undo, editCommand, setCaret, setSelection, stack, toDom;

Undo = require('undo.js');

stack = new Undo.Stack();

setCaret = require('../helper/setCaret.coffee');

setSelection = require('../helper/setSelection.coffee');

toDom = require('../domParse.coffee').toDom;

editCommand = Undo.Command.extend({
  constructor: function(editable, oldValue, newValue) {
    this.editable = editable;
    this.oldValue = oldValue;
    return this.newValue = newValue;
  },
  execute: function() {},
  undo: function() {
    toDom(JSON.parse(this.oldValue));
    return this.editable.blur();
  },
  redo: function() {
    toDom(JSON.parse(this.newValue));
    return this.editable.blur();
  }
});

module.exports = {
  stack: stack,
  editCommand: editCommand
};


},{"../domParse.coffee":13,"../helper/setCaret.coffee":17,"../helper/setSelection.coffee":18,"undo.js":31}],38:[function(require,module,exports){
var $, $$, $disbtn, $editable, $img, $titleInput, $toolbar, addListenerMulti, hangingPunc, i, len, ref, ref1, toolbarChange;

hangingPunc = require('./hangingPunc.coffee');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

$editable = $('.js-editable');

$toolbar = $('.js-toolbar');

$titleInput = $('.js-title-input');

$img = $$('.is-img');

$titleInput.addEventListener('focus', function(e) {
  var $toolbarItem, i, len, ref1;
  ref1 = $$('.js-toolbar button');
  for (i = 0, len = ref1.length; i < len; i++) {
    $toolbarItem = ref1[i];
    $toolbarItem.classList.add('is-disabled');
  }
  ($('.js-center')).classList.remove('is-disabled');
  return ($('.js-help')).classList.remove('is-disabled');
});

$editable.addEventListener('blur', function() {
  var $toolbarItem, anchorNode, i, len, ref1;
  anchorNode = window.getSelection().anchorNode;
  if ($editable.contains(anchorNode)) {
    ref1 = $$('.js-toolbar button');
    for (i = 0, len = ref1.length; i < len; i++) {
      $toolbarItem = ref1[i];
      $toolbarItem.classList.add('is-disabled');
      $toolbarItem.classList.remove('is-active');
    }
    return ($('.js-help')).classList.remove('is-disabled');
  }
});

addListenerMulti = function(el, s, fn) {
  var ev, evts, i, len, results;
  evts = s.split(' ');
  results = [];
  for (i = 0, len = evts.length; i < len; i++) {
    ev = evts[i];
    results.push(el.addEventListener(ev, fn, false));
  }
  return results;
};

$editable.addEventListener('blur', function() {
  var $toolbarItem, i, len, ref1, results;
  ref1 = $$('.js-toolbar button');
  results = [];
  for (i = 0, len = ref1.length; i < len; i++) {
    $toolbarItem = ref1[i];
    $toolbarItem.classList.remove('is-active');
    results.push($toolbarItem.classList.add('is-disabled'));
  }
  return results;
});

$editable.addEventListener('focus', function() {
  var $toolbarItem, i, len, ref1, results;
  ref1 = $$('.js-toolbar button');
  results = [];
  for (i = 0, len = ref1.length; i < len; i++) {
    $toolbarItem = ref1[i];
    results.push($toolbarItem.classList.remove('is-disabled'));
  }
  return results;
});

ref1 = $$('.is-disabled');
for (i = 0, len = ref1.length; i < len; i++) {
  $disbtn = ref1[i];
  $disbtn.addEventListener('click', function(e) {
    return e.preventDefault();
  });
}

$toolbar.addEventListener('click', function(e) {
  hangingPunc();
  return toolbarChange(e);
});

addListenerMulti($editable, 'keyup click', function(e) {
  return toolbarChange(e);
});

toolbarChange = function(e) {
  var $beginParent, $btn, $elActive, $endParent, $target, anchorNode, biRegex, focusNode, j, k, len1, len2, range, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, selection, toggleElement, toggleInline;
  if (e.type === 'click') {
    $target = e.target;
    if ($target.classList.contains('is-img')) {
      ref2 = $$('.js-tooltip-image button');
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        $btn = ref2[j];
        $btn.classList.remove('is-active');
      }
      if ($target.parentNode.classList.contains('b-figure--left')) {
        ($('.js-img-left')).classList.add('is-active');
      } else if ($target.parentNode.classList.contains('b-figure--right')) {
        ($('.js-img-right')).classList.add('is-active');
      } else if ($target.parentNode.classList.contains('b-figure--center')) {
        ($('.js-img-center')).classList.add('is-active');
      } else if ($target.parentNode.classList.contains('b-figure--full')) {
        ($('.js-img-full')).classList.add('is-active');
      }
      if ($target.classList.contains('is-link')) {
        ($('.js-img-link')).classList.add('is-active');
      }
    }
  }
  selection = window.getSelection();
  range = document.createRange();
  anchorNode = selection.anchorNode, focusNode = selection.focusNode;
  if (anchorNode === null) {
    ref3 = $$('.is-active');
    for (k = 0, len2 = ref3.length; k < len2; k++) {
      $elActive = ref3[k];
      $elActive.classList.remove('is-active');
      $elActive.classList.add('is-disabled');
    }
    return;
  }
  $beginParent = anchorNode.parentNode;
  $endParent = focusNode.parentNode;
  biRegex = /^(B|I|STRONG|EM|A|SPAN)$/;
  toggleInline = function(regex, button) {
    if (regex.test($beginParent.nodeName || regex.test(anchorNode.nodeName))) {
      return ($(button)).classList.add('is-active');
    } else if (regex.test($beginParent.parentNode.nodeName)) {
      return ($(button)).classList.add('is-active');
    } else if (regex.test($beginParent.parentNode.parentNode.nodeName)) {
      return ($(button)).classList.add('is-active');
    } else {
      return ($(button)).classList.remove('is-active');
    }
  };
  toggleInline(/^(B|STRONG)$/, '.js-bold');
  toggleInline(/^(EM|I)$/, '.js-italic');
  toggleInline(/^(A)$/, '.js-link');
  if (biRegex.test($beginParent.nodeName)) {
    $beginParent = $beginParent.parentNode;
    if (biRegex.test($beginParent.nodeName)) {
      $beginParent = $beginParent.parentNode;
      if (biRegex.test($beginParent.nodeName)) {
        $beginParent = $beginParent.parentNode;
        if (biRegex.test($beginParent.nodeName)) {
          $beginParent = $beginParent.parentNode;
        }
      }
    }
  }
  if (biRegex.test($endParent.nodeName)) {
    $endParent = $endParent.parentNode;
    if (biRegex.test($endParent.nodeName)) {
      $endParent = $endParent.parentNode;
      if (biRegex.test($endParent.nodeName)) {
        $endParent = $endParent.parentNode;
        if (biRegex.test($endParent.nodeName)) {
          $endParent = $endParent.parentNode;
        }
      }
    }
  }
  toggleElement = function(el, button) {
    if ($beginParent.nodeName === el || anchorNode.nodeName === el) {
      return ($(button)).classList.add('is-active');
    } else {
      return ($(button)).classList.remove('is-active');
    }
  };
  toggleElement('CODE', '.js-inline-code');
  if ($beginParent.nodeName === 'H2') {
    ($('.js-toolbar-block')).value = 1;
  } else if ($beginParent.nodeName === 'H3') {
    ($('.js-toolbar-block')).value = 2;
  } else if ($beginParent.nodeName === 'PRE') {
    ($('.js-toolbar-block')).value = 5;
  } else if ($beginParent.nodeName === 'P') {
    ($('.js-toolbar-block')).value = 0;
  } else if ($beginParent.nodeName === 'BLOCKQUOTE') {
    ($('.js-toolbar-block')).value = 3;
  }
  if ($beginParent.classList.contains('is-center' || anchorNode.classList.contains('is-center'))) {
    ($('.js-center')).classList.add('is-active');
  } else {
    ($('.js-center')).classList.remove('is-active');
  }
  if ((ref4 = $beginParent.firstChild.classList) != null ? ref4.contains('is-drop-cap' || ((ref5 = anchorNode.firstChild) != null ? ref5.classList.contains('is-drop-cap') : void 0)) : void 0) {
    ($('.js-drop-cap')).classList.add('is-active');
  } else {
    ($('.js-drop-cap')).classList.remove('is-active');
  }
  if ($beginParent.nodeName === 'LI') {
    if (((ref6 = $beginParent.parentNode) != null ? (ref7 = ref6.nextSibling) != null ? ref7.nodeName : void 0 : void 0) === 'HR') {
      ($('.js-hr')).classList.add('is-active');
    } else {
      ($('.js-hr')).classList.remove('is-active');
    }
  } else {
    if (((ref8 = $beginParent.nextSibling) != null ? ref8.nodeName : void 0) === 'HR') {
      ($('.js-hr')).classList.add('is-active');
    } else {
      ($('.js-hr')).classList.remove('is-active');
    }
  }
  if ($beginParent.nodeName === 'LI') {
    ($('.js-toolbar-block')).classList.add('is-disabled');
  } else if ((ref9 = $beginParent.firstChild.classList) != null ? ref9.contains('is-drop-cap') : void 0) {
    ($('.js-toolbar-block')).classList.add('is-disabled');
  } else {
    ($('.js-toolbar-block')).classList.remove('is-disabled');
  }
  if ($beginParent.nodeName !== 'P') {
    ($('.js-drop-cap')).classList.add('is-disabled');
  } else if (/^[a-zA-Z0-9]/.test($beginParent.textContent[0])) {
    ($('.js-drop-cap')).classList.remove('is-disabled');
  } else {
    ($('.js-drop-cap')).classList.add('is-disabled');
  }
  if (/^(H2|H3)$/.test($beginParent.nodeName)) {
    ($('.js-link')).classList.add('is-disabled');
    ($('.js-bold')).classList.add('is-disabled');
    ($('.js-italic')).classList.add('is-disabled');
    ($('.js-inline-code')).classList.add('is-disabled');
  } else {
    ($('.js-link')).classList.remove('is-disabled');
    ($('.js-bold')).classList.remove('is-disabled');
    ($('.js-italic')).classList.remove('is-disabled');
    ($('.js-inline-code')).classList.remove('is-disabled');
  }
  if ($beginParent.nodeName === 'FIGCAPTION') {
    ($('.js-center')).classList.add('is-disabled');
    ($('.js-toolbar-block')).classList.add('is-disabled');
  }
  if ($beginParent.nodeName === 'PRE') {
    return ($('.js-link')).classList.add('is-disabled');
  }
};


},{"../helper/selector.coffee":16,"./hangingPunc.coffee":34}],39:[function(require,module,exports){
'use strict';
module.exports = require('./lib/index');

},{"./lib/index":44}],40:[function(require,module,exports){
'use strict';

var randomFromSeed = require('./random/random-from-seed');

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};

},{"./random/random-from-seed":47}],41:[function(require,module,exports){
'use strict';

var encode = require('./encode');
var alphabet = require('./alphabet');

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;

},{"./alphabet":40,"./encode":43}],42:[function(require,module,exports){
'use strict';
var alphabet = require('./alphabet');

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;

},{"./alphabet":40}],43:[function(require,module,exports){
'use strict';

var randomByte = require('./random/random-byte');

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;

},{"./random/random-byte":46}],44:[function(require,module,exports){
'use strict';

var alphabet = require('./alphabet');
var encode = require('./encode');
var decode = require('./decode');
var build = require('./build');
var isValid = require('./is-valid');

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = require('./util/cluster-worker-id') || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;

},{"./alphabet":40,"./build":41,"./decode":42,"./encode":43,"./is-valid":45,"./util/cluster-worker-id":48}],45:[function(require,module,exports){
'use strict';
var alphabet = require('./alphabet');

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;

},{"./alphabet":40}],46:[function(require,module,exports){
'use strict';

var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;

},{}],47:[function(require,module,exports){
'use strict';

// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};

},{}],48:[function(require,module,exports){
'use strict';

module.exports = 0;

},{}]},{},[19]);
