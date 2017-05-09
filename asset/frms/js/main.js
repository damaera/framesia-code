(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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


},{"../helper/selector.coffee":17,"blueimp-load-image-npm":21,"sweetalert":31}],3:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/selector.coffee":17,"../helper/setCaret.coffee":18}],4:[function(require,module,exports){
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
  } catch (error) {}
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


},{"../helper/elementList.coffee":15,"../helper/getCaret.coffee":16,"../helper/selector.coffee":17,"../helper/setCaret.coffee":18,"../helper/setSelection.coffee":19,"../normalize/hangingPunc.coffee":35}],5:[function(require,module,exports){
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


},{"../helper/selector.coffee":17,"../helper/setSelection.coffee":19}],6:[function(require,module,exports){
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


},{"../helper/selector.coffee":17,"../helper/setSelection.coffee":19,"sweetalert":31}],7:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/selector.coffee":17,"../helper/setCaret.coffee":18}],8:[function(require,module,exports){
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


},{"../helper/selector.coffee":17}],9:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/selector.coffee":17,"../helper/setCaret.coffee":18}],10:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/selector.coffee":17,"../helper/setSelection.coffee":19,"blueimp-load-image-npm":21}],11:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/selector.coffee":17,"../helper/setCaret.coffee":18}],12:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/setCaret.coffee":18}],13:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/setCaret.coffee":18}],14:[function(require,module,exports){
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


},{"./helper/elementList.coffee":15,"./helper/selector.coffee":17,"blueimp-load-image-npm":21,"shortid":122}],15:[function(require,module,exports){
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


},{"shortid":122}],16:[function(require,module,exports){
module.exports = function() {
  var selection;
  selection = window.getSelection();
  return selection.anchorOffset;
};


},{}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
module.exports = function(el, position) {
  var range, selection;
  selection = window.getSelection();
  range = document.createRange();
  range.setStart(el, position);
  range.collapse(true);
  selection.removeAllRanges();
  return selection.addRange(range);
};


},{}],19:[function(require,module,exports){
module.exports = function(el1, position1, el2, position2) {
  var range, selection;
  selection = window.getSelection();
  range = document.createRange();
  range.setStart(el1, position1);
  range.setEnd(el2, position2);
  selection.removeAllRanges();
  return selection.addRange(range);
};


},{}],20:[function(require,module,exports){
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
      } catch (error) {}
    } else if (e.keyCode === 89) {
      e.preventDefault();
      try {
        onUndo.stack.canRedo();
        onUndo.stack.redo();
        return addListener();
      } catch (error) {}
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


},{"./command/addCover.coffee":2,"./command/alignCenter.coffee":3,"./command/blockElement.coffee":4,"./command/boldItalic.coffee":5,"./command/createLink.coffee":6,"./command/dropCap.coffee":7,"./command/imageControl.coffee":8,"./command/insertHr.coffee":9,"./command/insertImage.coffee":10,"./command/insertTable.coffee":11,"./command/makeEmbed.coffee":12,"./command/makeList.coffee":13,"./domParse.coffee":14,"./helper/selector.coffee":17,"./helper/setCaret.coffee":18,"./helper/setSelection.coffee":19,"./normalize/autoLink.coffee":33,"./normalize/charTransform.coffee":34,"./normalize/hangingPunc.coffee":35,"./normalize/normalizeEditable.coffee":36,"./normalize/onPaste.coffee":37,"./normalize/onUndo.coffee":38,"./normalize/toolbarListener.coffee":39,"sweetalert":31}],21:[function(require,module,exports){
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

},{"./load-image":22}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{"./handle-dom":25,"./handle-swal-dom":27,"./utils":30}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{"./handle-dom":25,"./handle-swal-dom":27}],27:[function(require,module,exports){
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
},{"./default-params":23,"./handle-dom":25,"./injected-html":28,"./utils":30}],28:[function(require,module,exports){
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
},{}],29:[function(require,module,exports){
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
},{"./handle-dom":25,"./handle-swal-dom":27,"./utils":30}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
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
},{"./modules/default-params":23,"./modules/handle-click":24,"./modules/handle-dom":25,"./modules/handle-key":26,"./modules/handle-swal-dom":27,"./modules/set-params":29,"./modules/utils":30}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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


},{"../helper/selector.coffee":17,"../helper/setCaret.coffee":18}],34:[function(require,module,exports){
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


},{"../helper/selector.coffee":17,"../helper/setCaret.coffee":18}],35:[function(require,module,exports){
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


},{"../helper/selector.coffee":17,"../helper/setCaret.coffee":18}],36:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/getCaret.coffee":16,"../helper/selector.coffee":17,"../helper/setCaret.coffee":18,"shortid":122}],37:[function(require,module,exports){
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


},{"../helper/elementList.coffee":15,"../helper/getCaret.coffee":16,"../helper/selector.coffee":17,"../helper/setCaret.coffee":18,"./charTransform.coffee":34,"./hangingPunc.coffee":35}],38:[function(require,module,exports){
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


},{"../domParse.coffee":14,"../helper/setCaret.coffee":18,"../helper/setSelection.coffee":19,"undo.js":32}],39:[function(require,module,exports){
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


},{"../helper/selector.coffee":17,"./hangingPunc.coffee":35}],40:[function(require,module,exports){
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


},{"./selector.coffee":41}],41:[function(require,module,exports){
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


},{}],42:[function(require,module,exports){
var $, $addCollection, horsey, imgUrl, request, swal;

$ = require('../helper/selector.coffee').$;

request = require('superagent');

swal = require('sweetalert');

horsey = require('horsey');

imgUrl = "https://res.cloudinary.com/frms/image/upload/";

$addCollection = $('.js-add-to-collection');

if ($addCollection) {
  $addCollection.onclick = function(e) {
    var $inputCol, articleId, autocompleteCollection, collectionId, collections, cols2;
    articleId = this.getAttribute('data-article-id');
    collectionId = '';
    collections = [];
    swal({
      title: "Add to collection",
      type: 'input',
      text: "search collection",
      closeOnConfirm: false,
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      customClass: 'js-modal-collection'
    }, function(confirm) {
      var postData;
      if (!confirm) {
        return swal.close();
      } else {
        postData = {
          articleId: articleId,
          collectionId: collectionId,
          _csrf: CSRF
        };
        return request.post('/c/add-article').set('Accept', 'application/json').send(postData).end(function(end, res) {
          var resData;
          resData = JSON.parse(res.text);
          if (resData.error) {
            return swal({
              title: 'Error',
              type: 'error',
              text: resData.message || (resData.message = 'Not success')
            });
          } else {
            return swal({
              title: 'Success',
              type: 'success',
              text: "Your article has been added to <a href='/c/" + resData.collection.username + "'><b class='text-green'>" + resData.collection.name + "</b></a>"
            });
          }
        });
      }
    });
    $inputCol = ($('.js-modal-collection')).querySelector('input');
    cols2 = [];
    autocompleteCollection = horsey($inputCol, {
      render: function(li, suggestion) {
        return li.innerHTML = "<span class='i-user__ava'>\n  <img src='" + imgUrl + "col/" + suggestion._id + "-50.jpg'>\n</span>\n<span>\n  " + suggestion.text + " &middot; (" + suggestion.value + ") &middot; <b>" + suggestion.follower_count + "</b>\n</span>";
      },
      suggestions: function(value, done) {
        return request.get("/s/collections?q=" + value).set('Accept', 'application/json').end(function(end, res) {
          var col, cols, i, len;
          cols = JSON.parse(res.text);
          cols2 = [];
          for (i = 0, len = cols.length; i < len; i++) {
            col = cols[i];
            col.value = "" + col.username;
            col.text = col.name;
            delete col.username;
            delete col.name;
            cols2.push(col);
          }
          return done(cols2);
        });
      }
    });
    return $inputCol.addEventListener('horsey-selected', function(e) {
      var col, i, inputValue, len, results;
      inputValue = $inputCol.value;
      results = [];
      for (i = 0, len = cols2.length; i < len; i++) {
        col = cols2[i];
        if (col.value === inputValue) {
          results.push(collectionId = col._id);
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  };
}


},{"../helper/selector.coffee":41,"horsey":87,"superagent":132,"sweetalert":144}],43:[function(require,module,exports){
var $, $$, ref, swal;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

swal = require('sweetalert');

module.exports = {
  "delete": function() {
    var $deleteArticle, i, len, ref1, results;
    ref1 = $$('.js-delete-article');
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      $deleteArticle = ref1[i];
      results.push($deleteArticle.onclick = function(e) {
        return swal({
          title: "Confirmation",
          text: "Are you sure?",
          showCancelButton: true,
          showConfirmButton: true
        }, function(confirm) {
          var $form;
          if (confirm) {
            $form = e.target.parentNode.querySelector('.js-delete-article-form');
            return $form.submit();
          }
        });
      });
    }
    return results;
  },
  publish: function() {
    var $publishArticle, i, len, ref1, results;
    ref1 = $$('.js-publish-article');
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      $publishArticle = ref1[i];
      results.push($publishArticle.onclick = function(e) {
        return swal({
          title: "Confirmation",
          text: "Are you sure?",
          showCancelButton: true,
          showConfirmButton: true
        }, function(confirm) {
          var $form;
          if (confirm) {
            $form = e.target.parentNode.querySelector('.js-publish-article-form');
            return $form.submit();
          }
        });
      });
    }
    return results;
  }
};


},{"../helper/selector.coffee":41,"sweetalert":144}],44:[function(require,module,exports){
var $, $autoUser, assetUrl, autoCompleteOptions, horsey, imgUrl, ref, request;

$ = require('../helper/selector.coffee').$;

horsey = require('horsey');

request = require('superagent');

$autoUser = $('.js-auto-user');

ref = require('../../../../src/configClient.coffee'), imgUrl = ref.imgUrl, assetUrl = ref.assetUrl;

if ($autoUser) {
  autoCompleteOptions = {
    anchor: '@',
    render: function(li, suggestion) {
      return li.innerHTML = "<span class='i-user__ava'>\n  <img src='" + imgUrl + "ava/" + suggestion._id + "-50.jpg'>\n</span>\n<span>\n  " + suggestion.text + " &middot; (" + suggestion.value + ")\n</span>";
    },
    filter: function(q, suggestion) {
      return suggestion;
    },
    suggestions: function(value, done) {
      var uname, valArr, valLn1;
      value = value.replace(/@/g, '');
      valArr = value.split(' ');
      valLn1 = valArr.length - 1;
      uname = valArr[valLn1];
      return request.get("/s/users?q=" + uname).set('Accept', 'application/json').end(function(end, res) {
        var i, len, user, users, users2;
        users = JSON.parse(res.text);
        users2 = [];
        for (i = 0, len = users.length; i < len; i++) {
          user = users[i];
          user.value = "@" + user.username;
          user.text = user.name;
          delete user.username;
          delete user.name;
          users2.push(user);
        }
        return done(users2);
      });
    }
  };
  horsey($autoUser, autoCompleteOptions);
}


},{"../../../../src/configClient.coffee":146,"../helper/selector.coffee":41,"horsey":87,"superagent":132}],45:[function(require,module,exports){
var $, $jsArticle, articleId, beginTime, checkPercent, counter, delay, firstScroll, readInPercent, readingTime, request, seenInPercent, timeout;

$ = require('../helper/selector.coffee').$;

$jsArticle = $('.js-article');

request = require('superagent');

if ($jsArticle) {
  timeout = null;
  delay = 300;
  beginTime = new Date;
  seenInPercent = 0;
  readInPercent = 0;
  readingTime = ($jsArticle.getAttribute('data-reading-time')) * 1;
  articleId = $jsArticle.getAttribute('data-article-id');
  if (articleId) {
    socket.emit('view-article', {
      articleId: articleId
    });
    counter = 0;
    firstScroll = 0;
    checkPercent = function() {
      var currentDate, height, ref, top;
      ref = $jsArticle.getBoundingClientRect(), top = ref.top, height = ref.height;
      currentDate = new Date;
      if (firstScroll === 0) {
        beginTime = new Date;
      }
      firstScroll++;
      seenInPercent = (window.innerHeight - top) / $jsArticle.offsetHeight * 100;
      readInPercent = (currentDate - beginTime) / readingTime * 100;
      if (seenInPercent > 40 && readInPercent > 40) {
        if (counter === 0) {
          socket.emit('read-article', {
            articleId: articleId
          });
        }
        return counter++;
      }
    };
    checkPercent();
    window.addEventListener('scroll', function(e) {
      clearTimeout(timeout);
      return timeout = setTimeout(function() {
        return checkPercent();
      }, delay);
    });
  }
}


},{"../helper/selector.coffee":41,"superagent":132}],46:[function(require,module,exports){
var $, $jsUsernameCol, $jsUsernameExist, $jsUsernameUser, request, usernameInit;

$ = require('../helper/selector.coffee').$;

$jsUsernameUser = $('.js-username-user');

$jsUsernameCol = $('.js-username-col');

$jsUsernameExist = $('.js-username-exist');

request = require('superagent');

if ($jsUsernameUser) {
  usernameInit = $jsUsernameUser.value;
  $jsUsernameUser.onkeyup = function(e) {
    var val;
    val = this.value;
    if (val !== usernameInit && /[a-zA-Z0-9-]{3,16}/.test(val)) {
      return request.get("/u/" + this.value + "?check=true").end(function(err, res) {
        var exist;
        exist = JSON.parse(res.text);
        if (exist) {
          return $jsUsernameExist.classList.remove('is-hidden');
        } else {
          return $jsUsernameExist.classList.add('is-hidden');
        }
      });
    }
  };
}

if ($jsUsernameCol) {
  usernameInit = $jsUsernameCol.value;
  $jsUsernameCol.onkeyup = function(e) {
    var val;
    val = this.value;
    if (val !== usernameInit && /[a-zA-Z0-9-]{3,30}/.test(val)) {
      return request.get("/c/" + this.value + "?check=true").end(function(err, res) {
        var exist;
        exist = JSON.parse(res.text);
        if (exist) {
          return $jsUsernameExist.classList.remove('is-hidden');
        } else {
          return $jsUsernameExist.classList.add('is-hidden');
        }
      });
    }
  };
}


},{"../helper/selector.coffee":41,"superagent":132}],47:[function(require,module,exports){
var $, $switch1, $switch2, ref;

$ = require('../helper/selector.coffee').$;

$switch1 = $('.js-switch1');

$switch2 = $('.js-switch2');

if ($switch1 != null) {
  $switch1.onchange = function(e) {
    if ($switch1.checked) {
      return $switch2.classList.remove('is-hidden');
    } else {
      $switch2.classList.add('is-hidden');
      return ($switch2.querySelector('input')).checked = false;
    }
  };
}

if ((ref = $('.js-delete-col')) != null) {
  ref.onclick = function(e) {
    return ($('.js-form-delete-col')).classList.toggle('is-hidden');
  };
}


},{"../helper/selector.coffee":41}],48:[function(require,module,exports){
var $, $$, $$acceptArticle, $$mainFeatured, $$makeFeatured, $$rejectArticle, $$removeArticle, $$removeFeatured, $$removeMainFeatured, $acceptArticle, $formAcceptArticle, $formMainFeatured, $formMakeFeatured, $formRejectArticle, $formRemoveArticle, $formRemoveFeatured, $formRemoveMainFeatured, $inputAcceptArticle, $inputMainFeatured, $inputMakeFeatured, $inputRejectArticle, $inputRemoveArticle, $inputRemoveFeatured, $inputRemoveMainFeatured, $mainFeatured, $makeFeatured, $rejectArticle, $removeArticle, $removeFeatured, $removeMainFeatured, i, j, k, l, len, len1, len2, len3, len4, len5, len6, m, n, o, ref;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

$$removeMainFeatured = $$('.js-remove-main-featured');

$inputRemoveMainFeatured = $('.js-input-remove-main-featured');

$formRemoveMainFeatured = $('.js-form-remove-main-featured');

for (i = 0, len = $$removeMainFeatured.length; i < len; i++) {
  $removeMainFeatured = $$removeMainFeatured[i];
  $removeMainFeatured.onclick = function(e) {
    var articleId;
    articleId = this.getAttribute('data-article-id');
    $inputRemoveMainFeatured.value = articleId;
    return $formRemoveMainFeatured.submit();
  };
}

$$removeFeatured = $$('.js-remove-featured');

$inputRemoveFeatured = $('.js-input-remove-featured');

$formRemoveFeatured = $('.js-form-remove-featured');

for (j = 0, len1 = $$removeFeatured.length; j < len1; j++) {
  $removeFeatured = $$removeFeatured[j];
  $removeFeatured.onclick = function(e) {
    var articleId;
    articleId = this.getAttribute('data-article-id');
    $inputRemoveFeatured.value = articleId;
    return $formRemoveFeatured.submit();
  };
}

$$mainFeatured = $$('.js-main-featured');

$inputMainFeatured = $('.js-input-main-featured');

$formMainFeatured = $('.js-form-main-featured');

for (k = 0, len2 = $$mainFeatured.length; k < len2; k++) {
  $mainFeatured = $$mainFeatured[k];
  $mainFeatured.onclick = function(e) {
    var articleId;
    articleId = this.getAttribute('data-article-id');
    $inputMainFeatured.value = articleId;
    return $formMainFeatured.submit();
  };
}

$$makeFeatured = $$('.js-make-featured');

$inputMakeFeatured = $('.js-input-make-featured');

$formMakeFeatured = $('.js-form-make-featured');

for (l = 0, len3 = $$makeFeatured.length; l < len3; l++) {
  $makeFeatured = $$makeFeatured[l];
  $makeFeatured.onclick = function(e) {
    var articleId;
    articleId = this.getAttribute('data-article-id');
    $inputMakeFeatured.value = articleId;
    return $formMakeFeatured.submit();
  };
}

$$removeArticle = $$('.js-remove-article');

$inputRemoveArticle = $('.js-input-remove-article');

$formRemoveArticle = $('.js-form-remove-article');

for (m = 0, len4 = $$removeArticle.length; m < len4; m++) {
  $removeArticle = $$removeArticle[m];
  $removeArticle.onclick = function(e) {
    var articleId;
    articleId = this.getAttribute('data-article-id');
    $inputRemoveArticle.value = articleId;
    return $formRemoveArticle.submit();
  };
}

$$acceptArticle = $$('.js-accept-article');

$inputAcceptArticle = $('.js-input-accept-article');

$formAcceptArticle = $('.js-form-accept-article');

for (n = 0, len5 = $$acceptArticle.length; n < len5; n++) {
  $acceptArticle = $$acceptArticle[n];
  $acceptArticle.onclick = function(e) {
    var articleId;
    articleId = this.getAttribute('data-article-id');
    $inputAcceptArticle.value = articleId;
    return $formAcceptArticle.submit();
  };
}

$$rejectArticle = $$('.js-reject-article');

$inputRejectArticle = $('.js-input-reject-article');

$formRejectArticle = $('.js-form-reject-article');

for (o = 0, len6 = $$rejectArticle.length; o < len6; o++) {
  $rejectArticle = $$rejectArticle[o];
  $rejectArticle.onclick = function(e) {
    var articleId;
    articleId = this.getAttribute('data-article-id');
    $inputRejectArticle.value = articleId;
    return $formRejectArticle.submit();
  };
}


},{"../helper/selector.coffee":41}],49:[function(require,module,exports){
var $, $acceptRequest, $formAcceptRequest, $formMakeAdmin, $formQuitCollection, $formRemoveAdmin, $formRemoveMember, $formRemoveRequest, $inputAcceptRequest, $inputMakeAdmin, $inputRemoveAdmin, $inputRemoveMember, $inputRemoveRequest, $makeAdmin, $quitCollection, $removeAdmin, $removeMember, $removeRequest, $requestJoin, collectionId, request;

$ = require('../helper/selector.coffee').$;

request = require('superagent');

$makeAdmin = $('.js-make-admin');

$inputMakeAdmin = $('.js-input-make-admin');

$formMakeAdmin = $('.js-form-make-admin');

if ($makeAdmin != null) {
  $makeAdmin.onclick = function(e) {
    var userId;
    userId = this.getAttribute('data-user-id');
    $inputMakeAdmin.value = userId;
    return $formMakeAdmin.submit();
  };
}

$removeAdmin = $('.js-remove-admin');

$inputRemoveAdmin = $('.js-input-remove-admin');

$formRemoveAdmin = $('.js-form-remove-admin');

if ($removeAdmin != null) {
  $removeAdmin.onclick = function(e) {
    var userId;
    userId = this.getAttribute('data-user-id');
    $inputRemoveAdmin.value = userId;
    return $formRemoveAdmin.submit();
  };
}

$removeMember = $('.js-remove-member');

$inputRemoveMember = $('.js-input-remove-member');

$formRemoveMember = $('.js-form-remove-member');

if ($removeMember != null) {
  $removeMember.onclick = function(e) {
    var userId;
    userId = this.getAttribute('data-user-id');
    $inputRemoveMember.value = userId;
    return $formRemoveMember.submit();
  };
}

$acceptRequest = $('.js-accept-request');

$inputAcceptRequest = $('.js-input-accept-request');

$formAcceptRequest = $('.js-form-accept-request');

if ($acceptRequest != null) {
  $acceptRequest.onclick = function(e) {
    var userId;
    userId = this.getAttribute('data-user-id');
    $inputAcceptRequest.value = userId;
    return $formAcceptRequest.submit();
  };
}

$removeRequest = $('.js-remove-request');

$inputRemoveRequest = $('.js-input-remove-request');

$formRemoveRequest = $('.js-form-remove-request');

if ($removeRequest != null) {
  $removeRequest.onclick = function(e) {
    var userId;
    userId = this.getAttribute('data-user-id');
    $inputRemoveRequest.value = userId;
    return $formRemoveRequest.submit();
  };
}

$quitCollection = $('.js-quit-collection');

$formQuitCollection = $('.js-form-quit-collection');

if ($quitCollection != null) {
  $quitCollection.onclick = function(e) {
    return $formQuitCollection.submit();
  };
}

$requestJoin = $('.js-request-join');

if ($requestJoin) {
  collectionId = $requestJoin.getAttribute('data-collection-id');
  request.get("/c/request-join/" + collectionId).set('Accept', 'application/json').end(function(err, res) {
    var resData;
    resData = JSON.parse(res.text);
    if (resData.requested) {
      return $follow.innerHTML = 'Requested';
    }
  });
  $requestJoin.onclick = function(e) {
    this.setAttribute('disabled', true);
    return request.post("/c/request-join/" + collectionId).send({
      _csrf: CSRF
    }).set('Accept', 'application/json').end(function(err, res) {
      var resData;
      $requestJoin.removeAttribute('disabled');
      resData = JSON.parse(res.text);
      if (!resData.error) {
        return $requestJoin.innerHTML = 'Requested';
      }
    });
  };
}


},{"../helper/selector.coffee":41,"superagent":132}],50:[function(require,module,exports){
var $, $$, ref, ref1, ref2, ref3, ref4, request;

request = require('superagent');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

if ((ref1 = $('.js-article-comment')) != null) {
  ref1.onclick = function(e) {
    if (document.body.classList.contains('is-show')) {
      ($('.js-comment')).classList.remove('is-show');
      return document.body.classList.remove('is-show');
    } else {
      ($('.js-comment')).classList.add('is-show');
      return document.body.classList.add('is-show');
    }
  };
}

if ((ref2 = $('.js-comment-close')) != null) {
  ref2.onclick = function(e) {
    return ($('.js-article-comment')).click();
  };
}

if ((ref3 = $('.js-comment-input')) != null) {
  ref3.onkeydown = function(e) {
    var limitText;
    limitText = 200 - this.value.length;
    ($('.js-comment-limit')).textContent = limitText;
    if (e.keyCode === 8 || e.keyCode === 46) {
      return true;
    } else if (limitText <= 0) {
      return false;
    } else {
      return true;
    }
  };
}

if ((ref4 = $('.js-comment-submit')) != null) {
  ref4.onclick = function(e) {
    var $commentInput, $commentSubmit, articleId, inputValue;
    $commentInput = $('.js-comment-input');
    $commentSubmit = $('.js-comment-submit');
    inputValue = $commentInput.value;
    articleId = $commentInput.getAttribute('data-article-id');
    $commentInput.disabled = true;
    $commentSubmit.disabled = true;
    return request.post('/c').send({
      content: inputValue,
      article_id: articleId,
      _csrf: CSRF
    }).set('Accept', 'application/json').end(function(err, res) {
      $commentSubmit.disabled = false;
      $commentInput.disabled = false;
      $commentInput.value = '';
      return ($('.js-load-more-comment-feed2')).click();
    });
  };
}


},{"../helper/selector.coffee":41,"superagent":132}],51:[function(require,module,exports){
var $, $$, $comment, i, len, ref, ref1;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

if ($('.js-comment2')) {
  ref1 = $$('.js-comment2');
  for (i = 0, len = ref1.length; i < len; i++) {
    $comment = ref1[i];
    $comment.onclick = function(e) {
      return console.log(e.target.getAttribute('data-id'));
    };
  }
}


},{"../helper/selector.coffee":41}],52:[function(require,module,exports){
var $, $$, ref;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

module.exports = function() {
  var $form, formMethod, i, inputCSRF, len, ref1, results;
  ref1 = $$('form');
  results = [];
  for (i = 0, len = ref1.length; i < len; i++) {
    $form = ref1[i];
    formMethod = $form.getAttribute('method');
    if ((formMethod != null ? formMethod.toLowerCase() : void 0) === 'post') {
      if (($form.firstChild.getAttribute('name')) !== '_csrf') {
        inputCSRF = "<input type='hidden' name='_csrf' value='" + CSRF + "'>";
        results.push($form.innerHTML = inputCSRF + $form.innerHTML);
      } else {
        results.push(void 0);
      }
    } else {
      results.push(void 0);
    }
  }
  return results;
};


},{"../helper/selector.coffee":41}],53:[function(require,module,exports){
var $, ref, ref1, ref2, ref3;

$ = require('../helper/selector.coffee').$;

document.onclick = function(e) {
  var ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
  if (((ref = e.target.parentNode) != null ? (ref1 = ref.classList) != null ? ref1.contains('js-down-article') : void 0 : void 0) || ((ref2 = e.target.classList) != null ? ref2.contains('js-down-article') : void 0)) {
    return false;
  } else if (((ref3 = e.target.parentNode) != null ? (ref4 = ref3.classList) != null ? ref4.contains('js-down-user') : void 0 : void 0) || ((ref5 = e.target.classList) != null ? ref5.contains('js-down-user') : void 0)) {
    return false;
  } else if (((ref6 = e.target.parentNode) != null ? (ref7 = ref6.classList) != null ? ref7.contains('js-down-editor') : void 0 : void 0) || ((ref8 = e.target.classList) != null ? ref8.contains('js-down-editor') : void 0)) {
    return false;
  } else if (((ref9 = e.target.parentNode) != null ? (ref10 = ref9.classList) != null ? ref10.contains('js-down-notif') : void 0 : void 0) || ((ref11 = e.target.classList) != null ? ref11.contains('js-down-notif') : void 0)) {
    return false;
  } else {
    if ((ref12 = $('.js-drop-user')) != null) {
      ref12.classList.add('is-hidden');
    }
    if ((ref13 = $('.js-drop-editor')) != null) {
      ref13.classList.add('is-hidden');
    }
    if ((ref14 = $('.js-drop-article')) != null) {
      ref14.classList.add('is-hidden');
    }
    return (ref15 = $('.js-drop-notif')) != null ? ref15.classList.add('is-hidden') : void 0;
  }
};

if ((ref = $('.js-down-editor')) != null) {
  ref.onclick = function(e) {
    var ref1, ref2, ref3;
    if ((ref1 = $('.js-drop-user')) != null) {
      if ((ref2 = ref1.classList) != null) {
        ref2.add('is-hidden');
      }
    }
    if ((ref3 = $('.js-drop-notif')) != null) {
      ref3.classList.add('is-hidden');
    }
    return ($('.js-drop-editor')).classList.toggle('is-hidden');
  };
}

if ((ref1 = $('.js-down-user')) != null) {
  ref1.onclick = function(e) {
    var ref2, ref3, ref4;
    if ((ref2 = $('.js-drop-editor')) != null) {
      ref2.classList.add('is-hidden');
    }
    if ((ref3 = $('.js-drop-article')) != null) {
      ref3.classList.add('is-hidden');
    }
    if ((ref4 = $('.js-drop-notif')) != null) {
      ref4.classList.add('is-hidden');
    }
    return ($('.js-drop-user')).classList.toggle('is-hidden');
  };
}

if ((ref2 = $('.js-down-article')) != null) {
  ref2.onclick = function(e) {
    var ref3, ref4, ref5;
    if ((ref3 = $('.js-drop-user')) != null) {
      if ((ref4 = ref3.classList) != null) {
        ref4.add('is-hidden');
      }
    }
    if ((ref5 = $('.js-drop-notif')) != null) {
      ref5.classList.add('is-hidden');
    }
    return ($('.js-drop-article')).classList.toggle('is-hidden');
  };
}

if ((ref3 = $('.js-down-notif')) != null) {
  ref3.onclick = function(e) {
    var ref4, ref5, ref6, ref7;
    if ((ref4 = $('.js-drop-user')) != null) {
      if ((ref5 = ref4.classList) != null) {
        ref5.add('is-hidden');
      }
    }
    if ((ref6 = $('.js-drop-editor')) != null) {
      ref6.classList.add('is-hidden');
    }
    if ((ref7 = $('.js-drop-article')) != null) {
      ref7.classList.add('is-hidden');
    }
    return ($('.js-drop-notif')).classList.toggle('is-hidden');
  };
}


},{"../helper/selector.coffee":41}],54:[function(require,module,exports){
var $, $$, $colrightFeed, $topicFeed, $topicSpinner, $trendaFeed, $trendaSpinner, $userFeed, $userSpinner, __, __n, assetUrl, colrightFeed, feedTemplate, feedTemplate2, feedTemplate3, feedTemplate4, i, imgUrl, len, loadFeed, loadFeed2, loadFeed3, loadFeed4, ref, ref1, ref2, ref3, request;

request = require('superagent');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

ref1 = require('../helper/langCatalog.coffee'), __ = ref1.__, __n = ref1.__n;

ref2 = require('../../../../src/configClient.coffee'), imgUrl = ref2.imgUrl, assetUrl = ref2.assetUrl;

feedTemplate = require('../../../../src/views/blocks/tag.jade');

feedTemplate2 = require('../../../../src/views/blocks/post3.jade');

feedTemplate3 = require('../../../../src/views/blocks/col-list.jade');

feedTemplate4 = require('../../../../src/views/blocks/user-list.jade');

$topicFeed = $('.js-topic-feed');

$topicSpinner = $('.js-topic-spinner');

$trendaFeed = $('.js-trenda-feed');

$trendaSpinner = $('.js-trenda-spinner');

$colrightFeed = $('.js-colright-feed');

$userFeed = $('.js-user-feed');

$userSpinner = $('.js-user-spinner');

loadFeed = function() {
  var isQuery, url;
  url = '/t/topics';
  isQuery = $topicFeed.getAttribute('data-query');
  if (isQuery) {
    url = "/s/topics?q=" + isQuery;
  }
  return request.get(url).set('Accept', 'application/json').end(function(err, res) {
    var feedHtml, local, tags;
    tags = JSON.parse(res.text);
    local = {
      tags: tags
    };
    feedHtml = feedTemplate(local);
    $topicFeed.innerHTML = feedHtml;
    $topicFeed.classList.remove('is-empty');
    return $topicSpinner.classList.add('is-hidden');
  });
};

if ($topicFeed) {
  loadFeed();
}

loadFeed2 = function() {
  var isUser, url;
  isUser = $trendaFeed.getAttribute('data-username');
  if (isUser) {
    url = "/u/" + isUser + "/feed-loved-articles";
  } else {
    url = '/t/articles';
  }
  return request.get(url).set('Accept', 'application/json').end(function(err, res) {
    var feedHtml, local, posts;
    posts = JSON.parse(res.text);
    local = {
      post: posts
    };
    feedHtml = feedTemplate2(local);
    if (feedHtml === '') {
      feedHtml = "<div class='i-block-empty'> " + (__('No articles')) + "</div>";
    }
    $trendaFeed.innerHTML = feedHtml;
    $trendaFeed.classList.remove('is-empty');
    return $trendaSpinner.classList.add('is-hidden');
  });
};

if ($trendaFeed) {
  loadFeed2();
}

loadFeed3 = function($colrightFeed) {
  var isColContributed, isColFollow, isQuery, url, username;
  username = $colrightFeed.getAttribute('data-username');
  isColContributed = $colrightFeed.getAttribute('data-col-contr');
  isColFollow = $colrightFeed.getAttribute('data-col-follow');
  isQuery = $colrightFeed.getAttribute('data-query');
  if (isColContributed) {
    url = "/u/" + username + "/feed-collections";
  } else if (isColFollow) {
    url = "/u/" + username + "/feed-following-collections";
  } else if (isQuery) {
    url = "/s/collections?q=" + isQuery + "&all=true";
  }
  return request.get(url).set('Accept', 'application/json').end(function(err, res) {
    var feedHtml, local, posts;
    posts = JSON.parse(res.text);
    if (isQuery) {
      posts.collections = posts;
    }
    local = posts;
    local.IMG_URL = imgUrl;
    feedHtml = feedTemplate3(local);
    if (feedHtml === '') {
      feedHtml = "<div class='i-block-empty'> " + (__('No collections')) + "</div>";
    }
    $colrightFeed.innerHTML = feedHtml;
    $colrightFeed.classList.remove('is-empty');
    return $colrightFeed.parentNode.querySelector('.spinner').classList.add('is-hidden');
  });
};

if ($colrightFeed) {
  ref3 = $$('.js-colright-feed');
  for (i = 0, len = ref3.length; i < len; i++) {
    colrightFeed = ref3[i];
    loadFeed3(colrightFeed);
  }
}

loadFeed4 = function() {
  var isQuery, url;
  isQuery = $userFeed.getAttribute('data-query');
  if (isQuery) {
    url = "/s/users?q=" + isQuery;
  }
  return request.get(url).set('Accept', 'application/json').end(function(err, res) {
    var feedHtml, local, users;
    users = JSON.parse(res.text);
    local = {
      users: users,
      IMG_URL: imgUrl
    };
    feedHtml = feedTemplate4(local);
    $userFeed.innerHTML = feedHtml;
    $userFeed.classList.remove('is-empty');
    return $userSpinner.classList.add('is-hidden');
  });
};

if ($userFeed) {
  loadFeed4();
}


},{"../../../../src/configClient.coffee":146,"../../../../src/views/blocks/col-list.jade":147,"../../../../src/views/blocks/post3.jade":153,"../../../../src/views/blocks/tag.jade":155,"../../../../src/views/blocks/user-list.jade":156,"../helper/langCatalog.coffee":40,"../helper/selector.coffee":41,"superagent":132}],55:[function(require,module,exports){
var $, $img, loadImage, resizeCropImg;

$ = require('../helper/selector.coffee').$;

loadImage = require('blueimp-load-image-npm');

if ($('.js-first-time-ava')) {
  $img = $('.js-first-time-ava');
  resizeCropImg = function(img) {
    $img.src = img.toDataURL('image/jpeg', .9);
    return ($('.js-first-time-ava-data')).value = img.toDataURL('image/jpeg', .9);
  };
  loadImage($img.src, resizeCropImg, {
    canvas: true,
    maxWidth: 200,
    maxHeight: 200,
    crop: true,
    crossOrigin: 'anonymous'
  });
  $img.onclick = function(e) {
    return ($('.js-first-time-ava-input')).click();
  };
  ($('.js-first-time-ava-input')).onchange = function(e) {
    return loadImage(e.target.files[0], resizeCropImg, {
      canvas: true,
      maxWidth: 200,
      maxHeight: 200,
      crop: true
    });
  };
}


},{"../helper/selector.coffee":41,"blueimp-load-image-npm":72}],56:[function(require,module,exports){
var $, $follow, request;

request = require('superagent');

$ = require('../helper/selector.coffee').$;

$follow = $('.js-follow');

if ($follow) {
  request.get("/f/" + ($follow.getAttribute('data-follow-type')) + "/" + ($follow.getAttribute('data-follow-id'))).end(function(err, res) {
    var resData;
    resData = JSON.parse(res.text);
    if (resData.following) {
      $follow.classList.add('is-following');
      return $follow.innerHTML = 'Following';
    } else {
      $follow.classList.remove('is-following');
      return $follow.innerHTML = 'Follow';
    }
  });
  $follow.onmouseover = function(e) {
    if ($follow.classList.contains('is-following')) {
      return $follow.innerHTML = 'Unfollow';
    }
  };
  $follow.onmouseleave = function(e) {
    if ($follow.classList.contains('is-following')) {
      return $follow.innerHTML = 'Following';
    }
  };
  $follow.onclick = function(e) {
    var followId, followType;
    followId = this.getAttribute('data-follow-id');
    followType = this.getAttribute('data-follow-type');
    this.setAttribute('disabled', true);
    this.classList.add('is-disabled');
    return request.post('/f').send({
      followId: followId,
      followType: followType,
      _csrf: CSRF
    }).end(function(err, res) {
      var resData;
      $follow.removeAttribute('disabled');
      $follow.classList.remove('is-disabled');
      resData = JSON.parse(res.text);
      if (resData.following) {
        $follow.classList.add('is-following');
        return $follow.innerHTML = 'Following';
      } else {
        $follow.classList.remove('is-following');
        return $follow.innerHTML = 'Follow';
      }
    });
  };
}


},{"../helper/selector.coffee":41,"superagent":132}],57:[function(require,module,exports){
var $, $articleButton, articleId, request;

request = require('superagent');

$ = require('../helper/selector.coffee').$;

$articleButton = $('.js-article-button');

if ($articleButton) {
  articleId = $articleButton.getAttribute('data-article-id');
  request.get("/p/" + articleId + "/my-activity").set('Accept', 'application/json').end(function(err, res) {
    var resData;
    resData = JSON.parse(res.text);
    if (resData.loved) {
      ($('.js-article-love')).classList.add('is-loving');
    }
    if (resData.commented) {
      ($('.js-article-comment')).classList.add('is-comment');
    }
    if (resData.responded) {
      ($('.js-article-response')).classList.add('is-response');
    }
    if (resData.reposted) {
      return ($('.js-article-repost')).classList.add('is-repost');
    }
  });
}


},{"../helper/selector.coffee":41,"superagent":132}],58:[function(require,module,exports){
var $, $homeFeed, $homeSpinner, $loadMoreHomeFeed, __, __n, assetUrl, feedTemplate, feedTemplateCol, imgUrl, loadFeed, love, ref, ref1, repost, request;

request = require('superagent');

$ = require('../helper/selector.coffee').$;

ref = require('../helper/langCatalog.coffee'), __ = ref.__, __n = ref.__n;

love = require('./love.coffee');

repost = require('./repost.coffee');

feedTemplate = require('../../../../src/views/blocks/post.jade');

feedTemplateCol = require('../../../../src/views/blocks/post4.jade');

ref1 = require('../../../../src/configClient.coffee'), imgUrl = ref1.imgUrl, assetUrl = ref1.assetUrl;

$homeFeed = $('.js-article-feed');

$homeSpinner = $('.js-article-spinner');

$loadMoreHomeFeed = $('.js-load-more-article-feed');

loadFeed = function() {
  var firstReq, isCollection, isHome, isProfile, isQuery, isStream, lastDate, template, url;
  isHome = $homeFeed.getAttribute('data-home');
  isStream = $homeFeed.getAttribute('data-stream');
  isProfile = $homeFeed.getAttribute('data-article-id');
  isCollection = $homeFeed.getAttribute('data-collection-name');
  isQuery = $homeFeed.getAttribute('data-query');
  $loadMoreHomeFeed.classList.add('is-hidden');
  template = feedTemplate;
  if (isProfile) {
    url = "/p/profile-feed/" + isProfile;
  } else if (isCollection) {
    url = "/c/" + isCollection + "/feed-articles";
  } else if (isQuery) {
    url = "/s/posts?q=" + isQuery;
  } else if (isStream) {
    url = '/p/stream-feed';
  } else if (isHome) {
    url = '/p/home-feed';
  }
  if ($homeFeed.classList.contains('is-empty')) {
    firstReq = true;
  } else {
    if (isQuery) {
      lastDate = $homeFeed.childNodes.length;
      url += "&last=" + lastDate;
    } else {
      lastDate = $homeFeed.lastChild.getAttribute('data-published-at');
      url += "?last=" + lastDate;
    }
  }
  $homeSpinner.classList.remove('is-hidden');
  return request.get(url).set('Accept', 'application/json').end(function(err, res) {
    var feedHtml, local, posts;
    posts = JSON.parse(res.text);
    local = {
      post: posts,
      __: __,
      __n: __n,
      ASSET_URL: assetUrl,
      IMG_URL: imgUrl
    };
    feedHtml = template(local);
    $homeFeed.innerHTML += feedHtml;
    $homeFeed.classList.remove('is-empty');
    $loadMoreHomeFeed.classList.remove('is-hidden');
    if (feedHtml === '') {
      if (firstReq === true) {
        feedHtml = "<div class='i-block-empty'> " + (__('No articles')) + "</div>";
      }
      $loadMoreHomeFeed.classList.add('is-hidden');
    }
    $homeSpinner.classList.add('is-hidden');
    love.article();
    return repost();
  });
};

if ($homeFeed) {
  loadFeed();
  $loadMoreHomeFeed.onclick = function(e) {
    return loadFeed();
  };
}


},{"../../../../src/configClient.coffee":146,"../../../../src/views/blocks/post.jade":151,"../../../../src/views/blocks/post4.jade":154,"../helper/langCatalog.coffee":40,"../helper/selector.coffee":41,"./love.coffee":63,"./repost.coffee":67,"superagent":132}],59:[function(require,module,exports){
var $, $articleFeed, $articleSpinner, $loadMoreArticleFeed, __, __n, article, articleFeed, assetUrl, csrf, feedTemplate, imgUrl, ref, ref1, request;

request = require('superagent');

$ = require('../helper/selector.coffee').$;

ref = require('../helper/langCatalog.coffee'), __ = ref.__, __n = ref.__n;

article = require('./article.coffee');

csrf = require('./csrf.coffee');

feedTemplate = require('../../../../src/views/blocks/post-item.jade');

ref1 = require('../../../../src/configClient.coffee'), imgUrl = ref1.imgUrl, assetUrl = ref1.assetUrl;

$articleFeed = $('.js-article2-feed');

$articleSpinner = $('.js-article2-spinner');

$loadMoreArticleFeed = $('.js-load-more-article2-feed');

articleFeed = function() {
  var firstReq, isDraft, lastEdited, url;
  isDraft = $articleFeed.getAttribute('data-draft');
  $loadMoreArticleFeed.classList.add('is-hidden');
  if (isDraft) {
    url = '/me/feed-drafts';
  } else {
    url = '/me/feed-articles';
  }
  if ($articleFeed.classList.contains('is-empty')) {
    firstReq = true;
  } else {
    lastEdited = $articleFeed.lastChild.getAttribute('data-edited-at');
    url += "?last=" + lastEdited;
  }
  $articleSpinner.classList.remove('is-hidden');
  return request.get(url).set('Accept', 'application/json').end(function(err, res) {
    var feedHtml, local, posts;
    posts = JSON.parse(res.text);
    local = {
      post: posts,
      __: __,
      __n: __n,
      ASSET_URL: assetUrl,
      IMG_URL: imgUrl
    };
    feedHtml = feedTemplate(local);
    $loadMoreArticleFeed.classList.remove('is-hidden');
    if (feedHtml === '') {
      if (firstReq === true) {
        feedHtml = "<div class='i-block-empty'> " + (__('No articles')) + "</div>";
      }
      $loadMoreArticleFeed.classList.add('is-hidden');
    }
    $articleFeed.innerHTML += feedHtml;
    $articleFeed.classList.remove('is-empty');
    $articleSpinner.classList.add('is-hidden');
    csrf();
    article["delete"]();
    return article.publish();
  });
};

if ($articleFeed) {
  articleFeed();
  $loadMoreArticleFeed.onclick = function(e) {
    return articleFeed();
  };
}


},{"../../../../src/configClient.coffee":146,"../../../../src/views/blocks/post-item.jade":150,"../helper/langCatalog.coffee":40,"../helper/selector.coffee":41,"./article.coffee":43,"./csrf.coffee":52,"superagent":132}],60:[function(require,module,exports){
var $, $$, $commentFeed, $commentSpinner, $commentSpinner2, $loadMoreCommentFeed, $loadMoreCommentFeed2, __, __n, articleId, assetUrl, feedTemplate, imgUrl, loadFeed, love, ref, ref1, ref2, request;

request = require('superagent');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

ref1 = require('../helper/langCatalog.coffee'), __ = ref1.__, __n = ref1.__n;

love = require('./love.coffee');

feedTemplate = require('../../../../src/views/blocks/comment-list.jade');

ref2 = require('../../../../src/configClient.coffee'), imgUrl = ref2.imgUrl, assetUrl = ref2.assetUrl;

$commentFeed = $('.js-comment-feed');

$commentSpinner = $('.js-comment-spinner');

$commentSpinner2 = $('.js-comment-spinner2');

$loadMoreCommentFeed = $('.js-load-more-comment-feed');

$loadMoreCommentFeed2 = $('.js-load-more-comment-feed2');

articleId = $commentFeed != null ? $commentFeed.getAttribute('data-article-id') : void 0;

loadFeed = function(before) {
  var firstId, firstReq, lastId, url;
  if ($commentFeed.classList.contains('is-empty')) {
    url = "/c/a/" + articleId;
    firstReq = true;
  } else {
    lastId = $commentFeed.lastChild.getAttribute('id');
    url = "/c/a/" + articleId + "?last=" + lastId;
  }
  if (before === true) {
    firstId = $commentFeed.firstChild.getAttribute('id');
    url = "/c/a/" + articleId + "?first=" + firstId;
    $loadMoreCommentFeed2.classList.add('is-hidden');
    $commentSpinner2.classList.remove('is-hidden');
  } else {
    $loadMoreCommentFeed.classList.add('is-hidden');
    $commentSpinner.classList.remove('is-hidden');
  }
  return request.get(url).end(function(err, res) {
    var $delete, $reply, data, feedHtml, i, j, k, len, len1, local, ref3, ref4, results;
    data = JSON.parse(res.text);
    local = {
      is_login: data.is_login,
      comments: data.comments,
      __: __,
      __n: __n,
      ASSET_URL: assetUrl,
      IMG_URL: imgUrl
    };
    feedHtml = feedTemplate(local);
    if (before === true) {
      $loadMoreCommentFeed2.classList.remove('is-hidden');
    } else {
      $loadMoreCommentFeed.classList.remove('is-hidden');
    }
    if (feedHtml === '') {
      if (firstReq === true) {
        feedHtml = "<div class='i-block-empty'> " + (__('No comment')) + "</div>";
      }
      if (before === true) {
        $loadMoreCommentFeed2.classList.add('is-hidden');
      } else {
        $loadMoreCommentFeed.classList.add('is-hidden');
      }
    }
    if (before === true) {
      $commentFeed.innerHTML = feedHtml + $commentFeed.innerHTML;
      $commentSpinner2.classList.add('is-hidden');
    } else {
      $commentFeed.innerHTML += feedHtml;
      $commentSpinner.classList.add('is-hidden');
    }
    $commentFeed.classList.remove('is-empty');
    love.comment();
    ref3 = $$('.js-comment-reply');
    for (i = j = 0, len = ref3.length; j < len; i = ++j) {
      $reply = ref3[i];
      $reply.onclick = function(e) {
        var $input, commentId, self, username;
        username = this.getAttribute('data-username');
        commentId = this.getAttribute('data-comment-id');
        self = this;
        $input = $('.js-comment-input');
        $input.value = "@" + username + " ";
        return $input.focus();
      };
    }
    ref4 = $$('.js-comment-delete');
    results = [];
    for (i = k = 0, len1 = ref4.length; k < len1; i = ++k) {
      $delete = ref4[i];
      results.push($delete.onclick = function(e) {
        var commentId;
        commentId = this.getAttribute('data-comment-id');
        $commentFeed.removeChild(this.parentNode.parentNode.parentNode);
        if ($commentFeed.childNodes.length === 0) {
          $commentFeed.classList.add('is-empty');
        }
        return request.post("/c/delete/" + commentId).send({
          _csrf: CSRF
        }).end(function(err, res) {
          return console.log;
        });
      });
    }
    return results;
  });
};

if ($commentFeed) {
  loadFeed();
  $loadMoreCommentFeed.onclick = function(e) {
    return loadFeed();
  };
  $loadMoreCommentFeed2.onclick = function(e) {
    return loadFeed(true);
  };
}


},{"../../../../src/configClient.coffee":146,"../../../../src/views/blocks/comment-list.jade":148,"../helper/langCatalog.coffee":40,"../helper/selector.coffee":41,"./love.coffee":63,"superagent":132}],61:[function(require,module,exports){
var $, $loadMoreLovedArticleFeed, $lovedArticleFeed, $lovedArticleSpinner, __, __n, assetUrl, feedTemplate, imgUrl, loadLovedArticleFeed, love, ref, ref1, repost, request;

request = require('superagent');

$ = require('../helper/selector.coffee').$;

ref = require('../helper/langCatalog.coffee'), __ = ref.__, __n = ref.__n;

love = require('./love.coffee');

repost = require('./repost.coffee');

feedTemplate = require('../../../../src/views/blocks/post2.jade');

ref1 = require('../../../../src/configClient.coffee'), imgUrl = ref1.imgUrl, assetUrl = ref1.assetUrl;

$lovedArticleFeed = $('.js-loved-article-feed');

$lovedArticleSpinner = $('.js-loved-article-spinner');

$loadMoreLovedArticleFeed = $('.js-load-more-loved-article-feed');

loadLovedArticleFeed = function() {
  var firstReq, loveId, url, username;
  username = $lovedArticleFeed.getAttribute('data-username');
  $loadMoreLovedArticleFeed.classList.add('is-hidden');
  if (username) {
    url = "/u/" + username + "/feed-loved-articles";
  } else {
    url = '/me/feed-loved-articles';
  }
  if ($lovedArticleFeed.classList.contains('is-empty')) {
    firstReq = true;
  } else {
    loveId = $lovedArticleFeed.lastChild.getAttribute('data-love-id');
    url += "?last=" + loveId;
  }
  $lovedArticleSpinner.classList.remove('is-hidden');
  return request.get(url).set('Accept', 'application/json').end(function(err, res) {
    var feedHtml, local, posts;
    posts = JSON.parse(res.text);
    local = {
      post: posts,
      __: __,
      __n: __n,
      ASSET_URL: assetUrl,
      IMG_URL: imgUrl
    };
    feedHtml = feedTemplate(local);
    $lovedArticleFeed.innerHTML += feedHtml;
    $lovedArticleFeed.classList.remove('is-empty');
    $loadMoreLovedArticleFeed.classList.remove('is-hidden');
    if (feedHtml === '') {
      if (firstReq === true) {
        feedHtml = "<div class='i-block-empty'> " + (__('No articles')) + "</div>";
      }
      $loadMoreLovedArticleFeed.classList.add('is-hidden');
    }
    $lovedArticleSpinner.classList.add('is-hidden');
    love.article();
    return repost();
  });
};

if ($lovedArticleFeed) {
  loadLovedArticleFeed();
  $loadMoreLovedArticleFeed.onclick = function(e) {
    return loadLovedArticleFeed();
  };
}


},{"../../../../src/configClient.coffee":146,"../../../../src/views/blocks/post2.jade":152,"../helper/langCatalog.coffee":40,"../helper/selector.coffee":41,"./love.coffee":63,"./repost.coffee":67,"superagent":132}],62:[function(require,module,exports){
var $, $header, lastScrollTop, prevDirection;

$ = require('../helper/selector.coffee').$;

$header = $('.b-header');

lastScrollTop = 0;

prevDirection = 'down';

if ($('.b-toolbar')) {
  $header.classList.add('is-fixed');
}

window.addEventListener('scroll', function(e) {
  var direction, st;
  if (!($('.b-toolbar'))) {
    st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      direction = 'down';
    } else {
      direction = 'up';
    }
    if (prevDirection !== direction) {
      if (direction === 'down') {
        $header.classList.remove('is-fixed');
        if (st > 100) {
          $header.style.top = '-60px';
        }
      } else {
        $header.classList.add('is-fixed');
        $header.style.top = '0';
      }
    }
    lastScrollTop = st;
    prevDirection = direction;
    if ($('.is-cover-full')) {
      if (window.scrollY < 400) {
        return $('.b-header').classList.add('no-bg');
      } else {
        return $('.b-header').classList.remove('no-bg');
      }
    }
  }
});


},{"../helper/selector.coffee":41}],63:[function(require,module,exports){
var $, $$, ref, request;

request = require('superagent');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

module.exports = {
  article: function() {
    var $love, i, len, ref1, results;
    ref1 = $$('.js-article-love');
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      $love = ref1[i];
      results.push($love.onclick = function(e) {
        var articleId, loveCount, self;
        articleId = this.getAttribute('data-article-id');
        loveCount = this.firstChild.innerHTML * 1;
        self = this;
        return request.post("/l").send({
          to: articleId,
          love_type: 'Post',
          _csrf: CSRF
        }).set('Accept', 'application/json').end(function(err, res) {
          var resData;
          resData = JSON.parse(res.text);
          if (resData.err === false) {
            if (resData.loving === true) {
              self.classList.add('is-loving');
              return self.firstChild.innerHTML = loveCount + 1;
            } else {
              self.classList.remove('is-loving');
              return self.firstChild.innerHTML = loveCount - 1;
            }
          }
        });
      });
    }
    return results;
  },
  comment: function() {
    var $love, i, len, ref1, results;
    ref1 = $$('.js-comment-love');
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      $love = ref1[i];
      results.push($love.onclick = function(e) {
        var commentId, loveCount, self;
        commentId = this.getAttribute('data-comment-id');
        loveCount = this.firstChild.innerHTML * 1;
        self = this;
        console.log('o');
        return request.post("/l").send({
          to: commentId,
          love_type: 'Comment',
          _csrf: CSRF
        }).set('Accept', 'application/json').end(function(err, res) {
          var resData;
          resData = JSON.parse(res.text);
          if (resData.err === false) {
            if (resData.loving === true) {
              self.classList.add('is-loving');
              return self.firstChild.innerHTML = loveCount + 1;
            } else {
              self.classList.remove('is-loving');
              return self.firstChild.innerHTML = loveCount - 1;
            }
          }
        });
      });
    }
    return results;
  }
};


},{"../helper/selector.coffee":41,"superagent":132}],64:[function(require,module,exports){
var $, $$, $$allHeading, $closeToc, $header, $heading, $jsArticle, $toc, articleId, i, j, len, nodeName, ref, slug, text;

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

$jsArticle = $('.js-article, .js-draft');

$closeToc = $('.js-close-toc');

$toc = $('.js-toc');

$header = $('.b-header');

if ($('.b-article__menu')) {
  ($('.b-article__menu')).classList.add('is-with-header');
}

if ($jsArticle) {
  articleId = $jsArticle.getAttribute('data-article-id');
  if (articleId) {
    window.addEventListener('scroll', function(e) {
      var isHeaderFixed;
      isHeaderFixed = $header.classList.contains('is-fixed');
      if (isHeaderFixed) {
        $toc.classList.add('is-with-header');
        if ($('.b-article__menu')) {
          return ($('.b-article__menu')).classList.add('is-with-header');
        }
      } else {
        $toc.classList.remove('is-with-header');
        if ($('.b-article__menu')) {
          return ($('.b-article__menu')).classList.remove('is-with-header');
        }
      }
    });
    $$allHeading = $$('h2, h3');
    i = 0;
    for (j = 0, len = $$allHeading.length; j < len; j++) {
      $heading = $$allHeading[j];
      nodeName = $heading.nodeName;
      if (nodeName === 'H2' || nodeName === 'H3') {
        i++;
        text = $heading.textContent;
        slug = text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '') + ("--" + i);
        $heading.setAttribute('id', slug);
        if (nodeName === 'H3') {
          $toc.innerHTML += "<div>\n  <a href='#" + slug + "'>" + text + "</a>\n</div>";
        } else {
          $toc.innerHTML += "<b><div>\n  <a href='#" + slug + "'>" + text + "</a>\n</div></b>";
        }
      }
    }
  }
}


},{"../helper/selector.coffee":41}],65:[function(require,module,exports){
var $, $$, $loadMoreMenotifFeed, $menotifFeed, $menotifSpinner, $notifFeed, $notifSpinner, __, __n, assetUrl, feedTemplate, i, imgUrl, j, loadFeed, loadFeed2, ref, ref1, ref2, ref3, ref4, request, url;

request = require('superagent');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

ref1 = require('../helper/langCatalog.coffee'), __ = ref1.__, __n = ref1.__n;

feedTemplate = require('../../../../src/views/blocks/notif.jade');

ref2 = require('../../../../src/configClient.coffee'), imgUrl = ref2.imgUrl, assetUrl = ref2.assetUrl;

$notifFeed = $('.js-notif-feed');

$notifSpinner = $('.js-notif-spinner');

$menotifFeed = $('.js-menotif-feed');

$menotifSpinner = $('.js-menotif-spinner');

url = "/me/feed-notif";

loadFeed = function(first) {
  return request.get(url).end(function(err, res) {
    var data, feedHtml, local, ref3, ref4, ref5;
    data = JSON.parse(res.text);
    local = {
      notifs: data.notifs,
      __: __,
      __n: __n,
      ASSET_URL: assetUrl,
      IMG_URL: imgUrl
    };
    feedHtml = feedTemplate(local);
    if (feedHtml === '') {
      feedHtml = "<div class='i-block-empty'> " + (__('No notif')) + "</div>";
    }
    $notifFeed.classList.remove('is-empty');
    $notifSpinner.classList.add('is-hidden');
    $notifFeed.innerHTML = feedHtml;
    if (((ref3 = data.notifs[0]) != null ? ref3.is_read : void 0) === false) {
      return (ref4 = $('.js-down-notif')) != null ? ref4.classList.add('is-notif') : void 0;
    } else {
      return (ref5 = $('.js-down-notif')) != null ? ref5.classList.remove('is-notif') : void 0;
    }
  });
};

if ($notifFeed) {
  i = 0;
  j = 0;
  loadFeed();
  if ((ref3 = $('.js-down-notif')) != null) {
    ref3.addEventListener('click', function(e) {
      if (this.classList.contains('is-notif')) {
        i = 0;
        j = 0;
      }
      if (i === 0) {
        loadFeed();
        return i++;
      }
    });
  }
  if ((ref4 = $('.js-drop-notif')) != null) {
    ref4.addEventListener('mouseover', function(e) {
      var $$allItem, $firstItem, isRead, notifId;
      if (j === 0) {
        j++;
        $firstItem = this.querySelector('.b-notif__item');
        $$allItem = this.querySelectorAll('.b-notif__item');
        notifId = $firstItem.getAttribute('data-notif-id');
        isRead = $firstItem.classList.contains('is-read');
        if (!isRead) {
          return request.post("/me/read-notif").send({
            _csrf: CSRF
          }).end(function(err, res) {
            var $item, k, len, results;
            j = 0;
            ($('.js-down-notif')).classList.remove('is-notif');
            results = [];
            for (k = 0, len = $$allItem.length; k < len; k++) {
              $item = $$allItem[k];
              results.push($item.classList.add('is-read'));
            }
            return results;
          });
        }
      }
    });
  }
}

$loadMoreMenotifFeed = $('.js-load-more-menotif-feed');

loadFeed2 = function() {
  var firstReq, last;
  $loadMoreMenotifFeed.classList.add('is-hidden');
  if ($menotifFeed.classList.contains('is-empty')) {
    url = url;
    firstReq = true;
  } else {
    last = $menotifFeed.lastChild.getAttribute('data-notif-id');
    url = "/me/feed-notif?last=" + last;
  }
  $menotifSpinner.classList.remove('is-hidden');
  return request.get(url).end(function(err, res) {
    var data, feedHtml, local;
    data = JSON.parse(res.text);
    local = {
      notifs: data.notifs,
      __: __,
      __n: __n,
      ASSET_URL: assetUrl,
      IMG_URL: imgUrl
    };
    feedHtml = feedTemplate(local);
    $loadMoreMenotifFeed.classList.remove('is-hidden');
    if (feedHtml === '') {
      if (firstReq === true) {
        feedHtml = "<div class='i-block-empty'> " + (__('No articles')) + "</div>";
      }
      $loadMoreMenotifFeed.classList.add('is-hidden');
    }
    $menotifFeed.classList.remove('is-empty');
    $menotifSpinner.classList.add('is-hidden');
    return $menotifFeed.innerHTML += feedHtml;
  });
};

if ($menotifFeed) {
  loadFeed2();
  $loadMoreMenotifFeed.onclick = function(e) {
    return loadFeed2();
  };
}


},{"../../../../src/configClient.coffee":146,"../../../../src/views/blocks/notif.jade":149,"../helper/langCatalog.coffee":40,"../helper/selector.coffee":41,"superagent":132}],66:[function(require,module,exports){
var $, $formReportArticle, $inputReportArticle, $reportArticle, request, swal;

request = require('superagent');

$ = require('../helper/selector.coffee').$;

swal = require('sweetalert');

$reportArticle = $('.js-report-article');

$formReportArticle = $('.js-form-report-article');

$inputReportArticle = $('.js-input-report-article');

if ($reportArticle) {
  $reportArticle.onclick = function(e) {
    return swal({
      title: "Why?",
      type: "input",
      inputPlaceholder: "Why you report this article? 10 - 200 char",
      showCancelButton: true,
      showConfirmButton: true
    }, function(inputValue) {
      if (inputValue === false) {
        return false;
      } else if (inputValue.length > 200) {
        swal.showInputError("Too long");
        return false;
      } else if (inputValue.length < 5) {
        swal.showInputError("Too short");
        return false;
      } else {
        $inputReportArticle.value = inputValue;
        $formReportArticle.submit();
        return true;
      }
    });
  };
}


},{"../helper/selector.coffee":41,"superagent":132,"sweetalert":144}],67:[function(require,module,exports){
var $, $$, ref, request;

request = require('superagent');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

module.exports = function() {
  var $repost, i, len, ref1, results;
  ref1 = $$('.js-article-repost');
  results = [];
  for (i = 0, len = ref1.length; i < len; i++) {
    $repost = ref1[i];
    results.push($repost.onclick = function(e) {
      var articleId, repostCount, self;
      articleId = this.getAttribute('data-article-id');
      repostCount = this.firstChild.innerHTML * 1;
      self = this;
      return request.post("/p/repost-article").send({
        article_id: articleId,
        _csrf: CSRF
      }).set('Accept', 'application/json').end(function(err, res) {
        var resData;
        resData = JSON.parse(res.text);
        if (resData.err === false) {
          if (resData.repost === true) {
            self.classList.add('is-repost');
            return self.firstChild.innerHTML = repostCount + 1;
          } else {
            self.classList.remove('is-repost');
            return self.firstChild.innerHTML = repostCount - 1;
          }
        }
      });
    });
  }
  return results;
};


},{"../helper/selector.coffee":41,"superagent":132}],68:[function(require,module,exports){
var $, $$, ref, request;

request = require('superagent');

ref = require('../helper/selector.coffee'), $ = ref.$, $$ = ref.$$;

module.exports = function() {
  var $repost;
  $repost = $('.js-article-repost-link');
  if ($repost) {
    return $repost.onclick = function(e) {
      var articleId, self;
      articleId = this.getAttribute('data-article-id');
      self = this;
      return request.post("/p/repost-article-link").send({
        article_id: articleId,
        _csrf: CSRF
      }).set('Accept', 'application/json').end(function(err, res) {
        var resData;
        resData = JSON.parse(res.text);
        if (resData.err === false) {
          self.classList.remove('i-button--green');
          return self.firstChild.innerHTML = 'Reposted';
        }
      });
    };
  }
};


},{"../helper/selector.coffee":41,"superagent":132}],69:[function(require,module,exports){
var $, jsondiffpatch, ref, ref1, request, saveArticle, swal, tag;

$ = require('../helper/selector.coffee').$;

request = require('superagent');

swal = require('sweetalert');

jsondiffpatch = require('jsondiffpatch');

tag = require('./tag.coffee');

if ((ref = $('.js-save-server')) != null) {
  ref.onclick = function(e) {
    return saveArticle(false);
  };
}

if ((ref1 = $('.js-save-publish')) != null) {
  ref1.onclick = function(e) {
    return saveArticle(true);
  };
}

saveArticle = function(isPublished) {
  var articleData, articleInit, delta, diffpatcher, postData, type;
  ($('.js-save')).click();
  type = 'new';
  articleInit = JSON.parse(localStorage.getItem('article-init'));
  if (articleInit.data.length === 0) {
    articleData = localStorage.getItem('article');
    postData = {
      _csrf: CSRF,
      tags: JSON.stringify(tag.tags()),
      data: articleData,
      is_published: isPublished,
      is_response: false
    };
    if ($('.js-respond')) {
      postData.is_response = true;
      postData.response = ($('.js-respond')).getAttribute('data-article-id');
    }
  } else {
    type = 'edit';
    articleData = JSON.parse(localStorage.getItem('article'));
    diffpatcher = jsondiffpatch.create({
      objectHash: function(obj) {
        return obj.type;
      },
      textDiff: {
        minLength: 60000000
      }
    });
    delta = {
      data: diffpatcher.diff(articleInit.data, articleData.data),
      img: articleData.img
    };
    postData = {
      _csrf: CSRF,
      tags: JSON.stringify(tag.tags()),
      data: JSON.stringify(delta),
      id: (window.location.pathname.split('/'))[2],
      is_published: isPublished,
      title: articleData.title,
      isTitleCenter: articleData.isTitleCenter,
      isCoverChanged: articleData.isCoverChanged
    };
    if (articleData.isCoverChanged) {
      postData.isCover = articleData.isCover;
      postData.cover = articleData.cover;
    }
  }
  return swal({
    title: "Save?",
    text: "Send this article? total " + ((postData.data.length / 1024).toFixed(2)) + " KB\n<div class='percent'>\n  <div class='percent-loader' width='0'>\n  </div>\n  <div class='percent-text'>\n  </div>\n</div>",
    closeOnConfirm: false,
    showCancelButton: true,
    showConfirmButton: true,
    showLoaderOnConfirm: true
  }, function(confirm) {
    var url;
    if (!confirm) {
      return swal.close();
    } else {
      if (type === 'new') {
        url = '/p/new-article';
      } else if (type === 'edit') {
        url = '/p/edit-article';
      } else {
        return false;
      }
      if (postData.title === '') {
        return swal('Error', 'Untitled', 'error');
      } else if (($('.js-title-input')).value.length < 3) {
        return swal('Error', 'Title too short!', 'error');
      } else if (($('.js-editable')).textContent.length < 20) {
        return swal('Error', 'Article too short!', 'error');
      } else {
        return request.post(url).send(postData).set('Accept', 'application/json').on('progress', function(e) {
          var a, percent;
          if (e.percent) {
            percent = 0;
            a = 0;
            if (e.percent === 100 && a === 0) {
              percent = 0;
            } else {
              percent = Math.floor(e.percent);
              a = 1;
            }
            ($('.percent-text')).innerHTML = percent + "%";
            return ($('.percent-loader')).width = percent + "%";
          }
        }).end(function(err, res) {
          var contEdit, resData;
          resData = JSON.parse(res.text);
          contEdit = "href='/p/" + resData.articleId + "/edit'";
          if (/^\/p\/[0-9a-f]+\/edit\/?$/.test(window.location.pathname)) {
            contEdit = "onclick='window.location.reload()'";
          }
          return swal({
            title: 'Success',
            text: "<a class=\"text-green\" " + contEdit + " style=\"cursor:pointer;\">Continue editing</a> or go to <a class=\"text-green\" href='" + resData.urlBack + "'>your article</a> or go to <a  class=\"text-green\" href='/'>Home</a>",
            type: 'success',
            allowOutsideClick: false
          });
        });
      }
    }
  });
};


},{"../helper/selector.coffee":41,"./tag.coffee":70,"jsondiffpatch":109,"superagent":132,"sweetalert":144}],70:[function(require,module,exports){
var $, $collectionTag, $tags, autoCompleteOptions, dataTags, horsey, insignia, maxTags, request, tagOptions, tagging;

$ = require('../helper/selector.coffee').$;

maxTags = 3;

insignia = require('insignia');

horsey = require('horsey');

request = require('superagent');

$tags = $('.tags-wrap');

if ($tags) {
  dataTags = $tags.getAttribute('data-tags');
  if (dataTags) {
    $tags.value = (JSON.parse(dataTags)).join(',');
  }
  tagOptions = {
    delimiter: ',',
    parse: function(value) {
      return value;
    },
    validate: function(value, tags) {
      var i, isDuplicate, len, tag;
      if (tags.length < maxTags) {
        isDuplicate = false;
        for (i = 0, len = tags.length; i < len; i++) {
          tag = tags[i];
          if (tag.toLowerCase() === value.toLowerCase()) {
            isDuplicate = true;
          }
        }
        if (!isDuplicate) {
          return true;
        }
      }
    }
  };
  tagging = insignia($tags, tagOptions);
  $tags.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      return tagging.convert();
    }
  });
  autoCompleteOptions = {
    suggestions: function(value, done) {
      if (value) {
        return request.get("/s/topics?q=" + value).end(function(end, res) {
          var i, j, len, len1, tag, tag2, tagLower, tags, tags2, unique;
          tags = JSON.parse(res.text);
          tags2 = [];
          unique = true;
          for (i = 0, len = tags.length; i < len; i++) {
            tag = tags[i];
            tagLower = tag._id.toLowerCase();
            for (j = 0, len1 = tags2.length; j < len1; j++) {
              tag2 = tags2[j];
              if (tag2 === tagLower) {
                unique = false;
              }
            }
            if (unique === true) {
              tags2.push(tagLower);
            }
          }
          return done(tags2);
        });
      }
    }
  };
  horsey($tags, autoCompleteOptions);
  $tags.addEventListener('horsey-selected', function(e) {
    return tagging.convert();
  });
  $collectionTag = $('.js-collection-tag');
  if ($collectionTag) {
    $tags.addEventListener('insignia-converted', function(e) {
      return $collectionTag.value = tagging.value();
    });
  }
}

module.exports = tagging;


},{"../helper/selector.coffee":41,"horsey":87,"insignia":90,"superagent":132}],71:[function(require,module,exports){
var documentReady;

(documentReady = function() {
  var $, $$, $$imgCoverFull, $$imgCoverSlide, $$loginButton, $container, $figcaption, $figure, $imgCoverFull, $imgCoverSlide, $loginButton, article, csrf, i, imgUrl, j, k, l, len, len1, len2, len3, len4, love, m, ref, ref1, ref2, repost, repostLink, request, scroll, swal;
  swal = require('sweetalert');
  request = require('superagent');
  ref = require('./helper/selector.coffee'), $ = ref.$, $$ = ref.$$;
  swal.setDefaults({
    title: "Framesia",
    text: "Framesia",
    html: true,
    showCancelButton: false,
    showConfirmButton: false,
    animation: "slide-from-top",
    allowOutsideClick: true,
    closeOnConfirm: true
  });
  love = require('./include/love.coffee');
  repost = require('./include/repost.coffee');
  repostLink = require('./include/repostLink.coffee');
  article = require('./include/article.coffee');
  csrf = require('./include/csrf.coffee');
  repost();
  repostLink();
  love.article();
  love.comment();
  article["delete"]();
  article.publish();
  csrf();
  require('./include/headerFix.coffee');
  require('./include/drop.coffee');
  require('./include/firstTime.coffee');
  require('./include/tag.coffee');
  require('./include/feedRight.coffee');
  require('./include/notif.coffee');
  require('./include/comment.coffee');
  require('./include/follow.coffee');
  require('./include/checkRead.coffee');
  require('./include/checkUsername.coffee');
  require('./include/saveArticle.coffee');
  require('./include/getArticle.coffee');
  require('./include/autocompleteUser.coffee');
  require('./include/collection.coffee');
  require('./include/collectionPeople.coffee');
  require('./include/collectionArticle.coffee');
  require('./include/addCollection.coffee');
  require('./include/getComment.coffee');
  require('./include/getLovedArticles.coffee');
  require('./include/getArticles2.coffee');
  require('./include/getArticles.coffee');
  require('./include/report.coffee');
  require('./include/makeTableOfContent.coffee');
  require('./include/comment2.coffee');
  $$loginButton = $$('.js-login-button');
  for (i = 0, len = $$loginButton.length; i < len; i++) {
    $loginButton = $$loginButton[i];
    $loginButton.onclick = function(e) {
      return swal({
        title: "Sign in to Framesia",
        text: "<p>Welcome to Framesia</p>\n<a href='/a/facebook'>\n  <button class='i-button i-button--green'>Sign in with Facebook</button>\n</a>\n<br>\n<a href='/a/google'>\n  <button class='i-button i-button--red'>Sign in with Google</button>\n</a>",
        html: true,
        showCancelButton: false,
        showConfirmButton: false
      });
    };
  }
  $$imgCoverFull = $$('.is-cover-full img');
  for (j = 0, len1 = $$imgCoverFull.length; j < len1; j++) {
    $imgCoverFull = $$imgCoverFull[j];
    $container = $imgCoverFull.parentNode;
    imgUrl = $imgCoverFull.getAttribute('src');
    $imgCoverFull.classList.add('is-hidden');
    $container.style.backgroundImage = "url('" + imgUrl + "')";
    $container.style.backgroundSize = "cover";
  }
  $$imgCoverSlide = $$('.is-cover-slide img');
  for (k = 0, len2 = $$imgCoverSlide.length; k < len2; k++) {
    $imgCoverSlide = $$imgCoverSlide[k];
    $container = $imgCoverSlide.parentNode;
    imgUrl = $imgCoverSlide.getAttribute('src');
    $imgCoverSlide.classList.add('is-hidden');
    $container.style.backgroundImage = "url('" + imgUrl + "')";
    $container.style.backgroundSize = "cover";
  }
  if ($('.b-article__cover.is-cover-not-full')) {
    $('.b-article__cover.is-cover-not-full').parentNode.style.background = '#fff';
  }
  if ($('.js-editable')) {
    ref1 = $$('figure');
    for (l = 0, len3 = ref1.length; l < len3; l++) {
      $figure = ref1[l];
      $figure.editable = false;
    }
    ref2 = $$('figcaption');
    for (m = 0, len4 = ref2.length; m < len4; m++) {
      $figcaption = ref2[m];
      $figcaption.editable = true;
    }
    require('./editor/main.coffee');
  }
  if (!window.location.hash || (window.location.hash !== '#_=_')) {
    return;
  }
  if (window.history && window.history.replaceState) {
    return window.history.replaceState("", document.title, window.location.pathname);
  }
  scroll = {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  };
  window.location.hash = "";
  document.body.scrollTop = scroll.top;
  return document.body.scrollLeft = scroll.left;
})();


},{"./editor/main.coffee":20,"./helper/selector.coffee":41,"./include/addCollection.coffee":42,"./include/article.coffee":43,"./include/autocompleteUser.coffee":44,"./include/checkRead.coffee":45,"./include/checkUsername.coffee":46,"./include/collection.coffee":47,"./include/collectionArticle.coffee":48,"./include/collectionPeople.coffee":49,"./include/comment.coffee":50,"./include/comment2.coffee":51,"./include/csrf.coffee":52,"./include/drop.coffee":53,"./include/feedRight.coffee":54,"./include/firstTime.coffee":55,"./include/follow.coffee":56,"./include/getArticle.coffee":57,"./include/getArticles.coffee":58,"./include/getArticles2.coffee":59,"./include/getComment.coffee":60,"./include/getLovedArticles.coffee":61,"./include/headerFix.coffee":62,"./include/love.coffee":63,"./include/makeTableOfContent.coffee":64,"./include/notif.coffee":65,"./include/report.coffee":66,"./include/repost.coffee":67,"./include/repostLink.coffee":68,"./include/saveArticle.coffee":69,"./include/tag.coffee":70,"superagent":132,"sweetalert":144}],72:[function(require,module,exports){
'use strict';

var loadImage = require('./load-image');
var injectExifMap = require('./load-image-exif-map');
var injectIos = require('./load-image-ios');
var injectOrientation = require('./load-image-orientation');

injectExifMap(loadImage);
injectIos(loadImage);
injectOrientation(loadImage);

module.exports = loadImage;

},{"./load-image":78,"./load-image-exif-map":73,"./load-image-ios":75,"./load-image-orientation":77}],73:[function(require,module,exports){
/*
 * JavaScript Load Image Exif Map 1.0.2
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Exif tags mapping based on
 * https://github.com/jseidelin/exif-js
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

'use strict';

var injectExif = require('./load-image-exif');

var inject = function(loadImage) {

	injectExif(loadImage);

    loadImage.ExifMap.prototype.tags = {
        // =================
        // TIFF tags (IFD0):
        // =================
        0x0100: 'ImageWidth',
        0x0101: 'ImageHeight',
        0x8769: 'ExifIFDPointer',
        0x8825: 'GPSInfoIFDPointer',
        0xA005: 'InteroperabilityIFDPointer',
        0x0102: 'BitsPerSample',
        0x0103: 'Compression',
        0x0106: 'PhotometricInterpretation',
        0x0112: 'Orientation',
        0x0115: 'SamplesPerPixel',
        0x011C: 'PlanarConfiguration',
        0x0212: 'YCbCrSubSampling',
        0x0213: 'YCbCrPositioning',
        0x011A: 'XResolution',
        0x011B: 'YResolution',
        0x0128: 'ResolutionUnit',
        0x0111: 'StripOffsets',
        0x0116: 'RowsPerStrip',
        0x0117: 'StripByteCounts',
        0x0201: 'JPEGInterchangeFormat',
        0x0202: 'JPEGInterchangeFormatLength',
        0x012D: 'TransferFunction',
        0x013E: 'WhitePoint',
        0x013F: 'PrimaryChromaticities',
        0x0211: 'YCbCrCoefficients',
        0x0214: 'ReferenceBlackWhite',
        0x0132: 'DateTime',
        0x010E: 'ImageDescription',
        0x010F: 'Make',
        0x0110: 'Model',
        0x0131: 'Software',
        0x013B: 'Artist',
        0x8298: 'Copyright',
        // ==================
        // Exif Sub IFD tags:
        // ==================
        0x9000: 'ExifVersion',                  // EXIF version
        0xA000: 'FlashpixVersion',              // Flashpix format version
        0xA001: 'ColorSpace',                   // Color space information tag
        0xA002: 'PixelXDimension',              // Valid width of meaningful image
        0xA003: 'PixelYDimension',              // Valid height of meaningful image
        0xA500: 'Gamma',
        0x9101: 'ComponentsConfiguration',      // Information about channels
        0x9102: 'CompressedBitsPerPixel',       // Compressed bits per pixel
        0x927C: 'MakerNote',                    // Any desired information written by the manufacturer
        0x9286: 'UserComment',                  // Comments by user
        0xA004: 'RelatedSoundFile',             // Name of related sound file
        0x9003: 'DateTimeOriginal',             // Date and time when the original image was generated
        0x9004: 'DateTimeDigitized',            // Date and time when the image was stored digitally
        0x9290: 'SubSecTime',                   // Fractions of seconds for DateTime
        0x9291: 'SubSecTimeOriginal',           // Fractions of seconds for DateTimeOriginal
        0x9292: 'SubSecTimeDigitized',          // Fractions of seconds for DateTimeDigitized
        0x829A: 'ExposureTime',                 // Exposure time (in seconds)
        0x829D: 'FNumber',
        0x8822: 'ExposureProgram',              // Exposure program
        0x8824: 'SpectralSensitivity',          // Spectral sensitivity
        0x8827: 'PhotographicSensitivity',      // EXIF 2.3, ISOSpeedRatings in EXIF 2.2
        0x8828: 'OECF',                         // Optoelectric conversion factor
        0x8830: 'SensitivityType',
        0x8831: 'StandardOutputSensitivity',
        0x8832: 'RecommendedExposureIndex',
        0x8833: 'ISOSpeed',
        0x8834: 'ISOSpeedLatitudeyyy',
        0x8835: 'ISOSpeedLatitudezzz',
        0x9201: 'ShutterSpeedValue',            // Shutter speed
        0x9202: 'ApertureValue',                // Lens aperture
        0x9203: 'BrightnessValue',              // Value of brightness
        0x9204: 'ExposureBias',                 // Exposure bias
        0x9205: 'MaxApertureValue',             // Smallest F number of lens
        0x9206: 'SubjectDistance',              // Distance to subject in meters
        0x9207: 'MeteringMode',                 // Metering mode
        0x9208: 'LightSource',                  // Kind of light source
        0x9209: 'Flash',                        // Flash status
        0x9214: 'SubjectArea',                  // Location and area of main subject
        0x920A: 'FocalLength',                  // Focal length of the lens in mm
        0xA20B: 'FlashEnergy',                  // Strobe energy in BCPS
        0xA20C: 'SpatialFrequencyResponse',
        0xA20E: 'FocalPlaneXResolution',        // Number of pixels in width direction per FPRUnit
        0xA20F: 'FocalPlaneYResolution',        // Number of pixels in height direction per FPRUnit
        0xA210: 'FocalPlaneResolutionUnit',     // Unit for measuring the focal plane resolution
        0xA214: 'SubjectLocation',              // Location of subject in image
        0xA215: 'ExposureIndex',                // Exposure index selected on camera
        0xA217: 'SensingMethod',                // Image sensor type
        0xA300: 'FileSource',                   // Image source (3 == DSC)
        0xA301: 'SceneType',                    // Scene type (1 == directly photographed)
        0xA302: 'CFAPattern',                   // Color filter array geometric pattern
        0xA401: 'CustomRendered',               // Special processing
        0xA402: 'ExposureMode',                 // Exposure mode
        0xA403: 'WhiteBalance',                 // 1 = auto white balance, 2 = manual
        0xA404: 'DigitalZoomRatio',             // Digital zoom ratio
        0xA405: 'FocalLengthIn35mmFilm',
        0xA406: 'SceneCaptureType',             // Type of scene
        0xA407: 'GainControl',                  // Degree of overall image gain adjustment
        0xA408: 'Contrast',                     // Direction of contrast processing applied by camera
        0xA409: 'Saturation',                   // Direction of saturation processing applied by camera
        0xA40A: 'Sharpness',                    // Direction of sharpness processing applied by camera
        0xA40B: 'DeviceSettingDescription',
        0xA40C: 'SubjectDistanceRange',         // Distance to subject
        0xA420: 'ImageUniqueID',                // Identifier assigned uniquely to each image
        0xA430: 'CameraOwnerName',
        0xA431: 'BodySerialNumber',
        0xA432: 'LensSpecification',
        0xA433: 'LensMake',
        0xA434: 'LensModel',
        0xA435: 'LensSerialNumber',
        // ==============
        // GPS Info tags:
        // ==============
        0x0000: 'GPSVersionID',
        0x0001: 'GPSLatitudeRef',
        0x0002: 'GPSLatitude',
        0x0003: 'GPSLongitudeRef',
        0x0004: 'GPSLongitude',
        0x0005: 'GPSAltitudeRef',
        0x0006: 'GPSAltitude',
        0x0007: 'GPSTimeStamp',
        0x0008: 'GPSSatellites',
        0x0009: 'GPSStatus',
        0x000A: 'GPSMeasureMode',
        0x000B: 'GPSDOP',
        0x000C: 'GPSSpeedRef',
        0x000D: 'GPSSpeed',
        0x000E: 'GPSTrackRef',
        0x000F: 'GPSTrack',
        0x0010: 'GPSImgDirectionRef',
        0x0011: 'GPSImgDirection',
        0x0012: 'GPSMapDatum',
        0x0013: 'GPSDestLatitudeRef',
        0x0014: 'GPSDestLatitude',
        0x0015: 'GPSDestLongitudeRef',
        0x0016: 'GPSDestLongitude',
        0x0017: 'GPSDestBearingRef',
        0x0018: 'GPSDestBearing',
        0x0019: 'GPSDestDistanceRef',
        0x001A: 'GPSDestDistance',
        0x001B: 'GPSProcessingMethod',
        0x001C: 'GPSAreaInformation',
        0x001D: 'GPSDateStamp',
        0x001E: 'GPSDifferential',
        0x001F: 'GPSHPositioningError'
    };

    loadImage.ExifMap.prototype.stringValues = {
        ExposureProgram: {
            0: 'Undefined',
            1: 'Manual',
            2: 'Normal program',
            3: 'Aperture priority',
            4: 'Shutter priority',
            5: 'Creative program',
            6: 'Action program',
            7: 'Portrait mode',
            8: 'Landscape mode'
        },
        MeteringMode: {
            0: 'Unknown',
            1: 'Average',
            2: 'CenterWeightedAverage',
            3: 'Spot',
            4: 'MultiSpot',
            5: 'Pattern',
            6: 'Partial',
            255: 'Other'
        },
        LightSource: {
            0: 'Unknown',
            1: 'Daylight',
            2: 'Fluorescent',
            3: 'Tungsten (incandescent light)',
            4: 'Flash',
            9: 'Fine weather',
            10: 'Cloudy weather',
            11: 'Shade',
            12: 'Daylight fluorescent (D 5700 - 7100K)',
            13: 'Day white fluorescent (N 4600 - 5400K)',
            14: 'Cool white fluorescent (W 3900 - 4500K)',
            15: 'White fluorescent (WW 3200 - 3700K)',
            17: 'Standard light A',
            18: 'Standard light B',
            19: 'Standard light C',
            20: 'D55',
            21: 'D65',
            22: 'D75',
            23: 'D50',
            24: 'ISO studio tungsten',
            255: 'Other'
        },
        Flash: {
            0x0000: 'Flash did not fire',
            0x0001: 'Flash fired',
            0x0005: 'Strobe return light not detected',
            0x0007: 'Strobe return light detected',
            0x0009: 'Flash fired, compulsory flash mode',
            0x000D: 'Flash fired, compulsory flash mode, return light not detected',
            0x000F: 'Flash fired, compulsory flash mode, return light detected',
            0x0010: 'Flash did not fire, compulsory flash mode',
            0x0018: 'Flash did not fire, auto mode',
            0x0019: 'Flash fired, auto mode',
            0x001D: 'Flash fired, auto mode, return light not detected',
            0x001F: 'Flash fired, auto mode, return light detected',
            0x0020: 'No flash function',
            0x0041: 'Flash fired, red-eye reduction mode',
            0x0045: 'Flash fired, red-eye reduction mode, return light not detected',
            0x0047: 'Flash fired, red-eye reduction mode, return light detected',
            0x0049: 'Flash fired, compulsory flash mode, red-eye reduction mode',
            0x004D: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
            0x004F: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
            0x0059: 'Flash fired, auto mode, red-eye reduction mode',
            0x005D: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
            0x005F: 'Flash fired, auto mode, return light detected, red-eye reduction mode'
        },
        SensingMethod: {
            1: 'Undefined',
            2: 'One-chip color area sensor',
            3: 'Two-chip color area sensor',
            4: 'Three-chip color area sensor',
            5: 'Color sequential area sensor',
            7: 'Trilinear sensor',
            8: 'Color sequential linear sensor'
        },
        SceneCaptureType: {
            0: 'Standard',
            1: 'Landscape',
            2: 'Portrait',
            3: 'Night scene'
        },
        SceneType: {
            1: 'Directly photographed'
        },
        CustomRendered: {
            0: 'Normal process',
            1: 'Custom process'
        },
        WhiteBalance: {
            0: 'Auto white balance',
            1: 'Manual white balance'
        },
        GainControl: {
            0: 'None',
            1: 'Low gain up',
            2: 'High gain up',
            3: 'Low gain down',
            4: 'High gain down'
        },
        Contrast: {
            0: 'Normal',
            1: 'Soft',
            2: 'Hard'
        },
        Saturation: {
            0: 'Normal',
            1: 'Low saturation',
            2: 'High saturation'
        },
        Sharpness: {
            0: 'Normal',
            1: 'Soft',
            2: 'Hard'
        },
        SubjectDistanceRange: {
            0: 'Unknown',
            1: 'Macro',
            2: 'Close view',
            3: 'Distant view'
        },
        FileSource: {
            3: 'DSC'
        },
        ComponentsConfiguration: {
            0: '',
            1: 'Y',
            2: 'Cb',
            3: 'Cr',
            4: 'R',
            5: 'G',
            6: 'B'
        },
        Orientation: {
            1: 'top-left',
            2: 'top-right',
            3: 'bottom-right',
            4: 'bottom-left',
            5: 'left-top',
            6: 'right-top',
            7: 'right-bottom',
            8: 'left-bottom'
        }
    };

    loadImage.ExifMap.prototype.getText = function (id) {
        var value = this.get(id);
        switch (id) {
        case 'LightSource':
        case 'Flash':
        case 'MeteringMode':
        case 'ExposureProgram':
        case 'SensingMethod':
        case 'SceneCaptureType':
        case 'SceneType':
        case 'CustomRendered':
        case 'WhiteBalance':
        case 'GainControl':
        case 'Contrast':
        case 'Saturation':
        case 'Sharpness':
        case 'SubjectDistanceRange':
        case 'FileSource':
        case 'Orientation':
            return this.stringValues[id][value];
        case 'ExifVersion':
        case 'FlashpixVersion':
            return String.fromCharCode(value[0], value[1], value[2], value[3]);
        case 'ComponentsConfiguration':
            return this.stringValues[id][value[0]] +
                this.stringValues[id][value[1]] +
                this.stringValues[id][value[2]] +
                this.stringValues[id][value[3]];
        case 'GPSVersionID':
            return value[0] + '.' + value[1]  + '.' + value[2]  + '.' + value[3];
        }
        return String(value);
    };

    (function (exifMapPrototype) {
        var tags = exifMapPrototype.tags,
            map = exifMapPrototype.map,
            prop;

        // Map the tag names to tags:
        for (prop in tags) {
            if (tags.hasOwnProperty(prop)) {
                map[tags[prop]] = prop;
            }
        }
    }(loadImage.ExifMap.prototype));

    loadImage.ExifMap.prototype.getAll = function () {
        var map = {},
            prop,
            id;
        for (prop in this) {
            if (this.hasOwnProperty(prop)) {
                id = this.tags[prop];
                if (id) {
                    map[id] = this.getText(id);
                }
            }
        }
        return map;
    };

};

module.exports = inject;

},{"./load-image-exif":74}],74:[function(require,module,exports){
/*
 * JavaScript Load Image Exif Parser 1.0.0
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true */

'use strict';

var injectMeta = require('./load-image-meta');

var inject = function(loadImage) {

	injectMeta(loadImage);

    loadImage.ExifMap = function () {
        return this;
    };

    loadImage.ExifMap.prototype.map = {
        'Orientation': 0x0112
    };

    loadImage.ExifMap.prototype.get = function (id) {
        return this[id] || this[this.map[id]];
    };

    loadImage.getExifThumbnail = function (dataView, offset, length) {
        var hexData,
            i,
            b;
        if (!length || offset + length > dataView.byteLength) {
            console.log('Invalid Exif data: Invalid thumbnail data.');
            return;
        }
        hexData = [];
        for (i = 0; i < length; i += 1) {
            b = dataView.getUint8(offset + i);
            hexData.push((b < 16 ? '0' : '') + b.toString(16));
        }
        return 'data:image/jpeg,%' + hexData.join('%');
    };

    loadImage.exifTagTypes = {
        // byte, 8-bit unsigned int:
        1: {
            getValue: function (dataView, dataOffset) {
                return dataView.getUint8(dataOffset);
            },
            size: 1
        },
        // ascii, 8-bit byte:
        2: {
            getValue: function (dataView, dataOffset) {
                return String.fromCharCode(dataView.getUint8(dataOffset));
            },
            size: 1,
            ascii: true
        },
        // short, 16 bit int:
        3: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getUint16(dataOffset, littleEndian);
            },
            size: 2
        },
        // long, 32 bit int:
        4: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getUint32(dataOffset, littleEndian);
            },
            size: 4
        },
        // rational = two long values, first is numerator, second is denominator:
        5: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getUint32(dataOffset, littleEndian) /
                    dataView.getUint32(dataOffset + 4, littleEndian);
            },
            size: 8
        },
        // slong, 32 bit signed int:
        9: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getInt32(dataOffset, littleEndian);
            },
            size: 4
        },
        // srational, two slongs, first is numerator, second is denominator:
        10: {
            getValue: function (dataView, dataOffset, littleEndian) {
                return dataView.getInt32(dataOffset, littleEndian) /
                    dataView.getInt32(dataOffset + 4, littleEndian);
            },
            size: 8
        }
    };
    // undefined, 8-bit byte, value depending on field:
    loadImage.exifTagTypes[7] = loadImage.exifTagTypes[1];

    loadImage.getExifValue = function (dataView, tiffOffset, offset, type, length, littleEndian) {
        var tagType = loadImage.exifTagTypes[type],
            tagSize,
            dataOffset,
            values,
            i,
            str,
            c;
        if (!tagType) {
            console.log('Invalid Exif data: Invalid tag type.');
            return;
        }
        tagSize = tagType.size * length;
        // Determine if the value is contained in the dataOffset bytes,
        // or if the value at the dataOffset is a pointer to the actual data:
        dataOffset = tagSize > 4 ?
                tiffOffset + dataView.getUint32(offset + 8, littleEndian) : (offset + 8);
        if (dataOffset + tagSize > dataView.byteLength) {
            console.log('Invalid Exif data: Invalid data offset.');
            return;
        }
        if (length === 1) {
            return tagType.getValue(dataView, dataOffset, littleEndian);
        }
        values = [];
        for (i = 0; i < length; i += 1) {
            values[i] = tagType.getValue(dataView, dataOffset + i * tagType.size, littleEndian);
        }
        if (tagType.ascii) {
            str = '';
            // Concatenate the chars:
            for (i = 0; i < values.length; i += 1) {
                c = values[i];
                // Ignore the terminating NULL byte(s):
                if (c === '\u0000') {
                    break;
                }
                str += c;
            }
            return str;
        }
        return values;
    };

    loadImage.parseExifTag = function (dataView, tiffOffset, offset, littleEndian, data) {
        var tag = dataView.getUint16(offset, littleEndian);
        data.exif[tag] = loadImage.getExifValue(
            dataView,
            tiffOffset,
            offset,
            dataView.getUint16(offset + 2, littleEndian), // tag type
            dataView.getUint32(offset + 4, littleEndian), // tag length
            littleEndian
        );
    };

    loadImage.parseExifTags = function (dataView, tiffOffset, dirOffset, littleEndian, data) {
        var tagsNumber,
            dirEndOffset,
            i;
        if (dirOffset + 6 > dataView.byteLength) {
            console.log('Invalid Exif data: Invalid directory offset.');
            return;
        }
        tagsNumber = dataView.getUint16(dirOffset, littleEndian);
        dirEndOffset = dirOffset + 2 + 12 * tagsNumber;
        if (dirEndOffset + 4 > dataView.byteLength) {
            console.log('Invalid Exif data: Invalid directory size.');
            return;
        }
        for (i = 0; i < tagsNumber; i += 1) {
            this.parseExifTag(
                dataView,
                tiffOffset,
                dirOffset + 2 + 12 * i, // tag offset
                littleEndian,
                data
            );
        }
        // Return the offset to the next directory:
        return dataView.getUint32(dirEndOffset, littleEndian);
    };

    loadImage.parseExifData = function (dataView, offset, length, data, options) {
        if (options.disableExif) {
            return;
        }
        var tiffOffset = offset + 10,
            littleEndian,
            dirOffset,
            thumbnailData;
        // Check for the ASCII code for "Exif" (0x45786966):
        if (dataView.getUint32(offset + 4) !== 0x45786966) {
            // No Exif data, might be XMP data instead
            return;
        }
        if (tiffOffset + 8 > dataView.byteLength) {
            console.log('Invalid Exif data: Invalid segment size.');
            return;
        }
        // Check for the two null bytes:
        if (dataView.getUint16(offset + 8) !== 0x0000) {
            console.log('Invalid Exif data: Missing byte alignment offset.');
            return;
        }
        // Check the byte alignment:
        switch (dataView.getUint16(tiffOffset)) {
        case 0x4949:
            littleEndian = true;
            break;
        case 0x4D4D:
            littleEndian = false;
            break;
        default:
            console.log('Invalid Exif data: Invalid byte alignment marker.');
            return;
        }
        // Check for the TIFF tag marker (0x002A):
        if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {
            console.log('Invalid Exif data: Missing TIFF marker.');
            return;
        }
        // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
        dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
        // Create the exif object to store the tags:
        data.exif = new loadImage.ExifMap();
        // Parse the tags of the main image directory and retrieve the
        // offset to the next directory, usually the thumbnail directory:
        dirOffset = loadImage.parseExifTags(
            dataView,
            tiffOffset,
            tiffOffset + dirOffset,
            littleEndian,
            data
        );
        if (dirOffset && !options.disableExifThumbnail) {
            thumbnailData = {exif: {}};
            dirOffset = loadImage.parseExifTags(
                dataView,
                tiffOffset,
                tiffOffset + dirOffset,
                littleEndian,
                thumbnailData
            );
            // Check for JPEG Thumbnail offset:
            if (thumbnailData.exif[0x0201]) {
                data.exif.Thumbnail = loadImage.getExifThumbnail(
                    dataView,
                    tiffOffset + thumbnailData.exif[0x0201],
                    thumbnailData.exif[0x0202] // Thumbnail data length
                );
            }
        }
        // Check for Exif Sub IFD Pointer:
        if (data.exif[0x8769] && !options.disableExifSub) {
            loadImage.parseExifTags(
                dataView,
                tiffOffset,
                tiffOffset + data.exif[0x8769], // directory offset
                littleEndian,
                data
            );
        }
        // Check for GPS Info IFD Pointer:
        if (data.exif[0x8825] && !options.disableExifGps) {
            loadImage.parseExifTags(
                dataView,
                tiffOffset,
                tiffOffset + data.exif[0x8825], // directory offset
                littleEndian,
                data
            );
        }
    };

    // Registers the Exif parser for the APP1 JPEG meta data segment:
    loadImage.metaDataParsers.jpeg[0xffe1].push(loadImage.parseExifData);

    // Adds the following properties to the parseMetaData callback data:
    // * exif: The exif tags, parsed by the parseExifData method

    // Adds the following options to the parseMetaData method:
    // * disableExif: Disables Exif parsing.
    // * disableExifThumbnail: Disables parsing of the Exif Thumbnail.
    // * disableExifSub: Disables parsing of the Exif Sub IFD.
    // * disableExifGps: Disables parsing of the Exif GPS Info IFD.

};

module.exports = inject;

},{"./load-image-meta":76}],75:[function(require,module,exports){
/*
 * JavaScript Load Image iOS scaling fixes 1.0.3
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * iOS image scaling fixes based on
 * https://github.com/stomita/ios-imagefile-megapixel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, bitwise: true */

'use strict';

var inject = function(loadImage) {

    // Only apply fixes on the iOS platform:
    if (!window.navigator || !window.navigator.platform ||
             !(/iP(hone|od|ad)/).test(window.navigator.platform)) {
        return;
    }

    var originalRenderMethod = loadImage.renderImageToCanvas;

    // Detects subsampling in JPEG images:
    loadImage.detectSubsampling = function (img) {
        var canvas,
            context;
        if (img.width * img.height > 1024 * 1024) { // only consider mexapixel images
            canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            context = canvas.getContext('2d');
            context.drawImage(img, -img.width + 1, 0);
            // subsampled image becomes half smaller in rendering size.
            // check alpha channel value to confirm image is covering edge pixel or not.
            // if alpha value is 0 image is not covering, hence subsampled.
            return context.getImageData(0, 0, 1, 1).data[3] === 0;
        }
        return false;
    };

    // Detects vertical squash in JPEG images:
    loadImage.detectVerticalSquash = function (img, subsampled) {
        var naturalHeight = img.naturalHeight || img.height,
            canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            data,
            sy,
            ey,
            py,
            alpha;
        if (subsampled) {
            naturalHeight /= 2;
        }
        canvas.width = 1;
        canvas.height = naturalHeight;
        context.drawImage(img, 0, 0);
        data = context.getImageData(0, 0, 1, naturalHeight).data;
        // search image edge pixel position in case it is squashed vertically:
        sy = 0;
        ey = naturalHeight;
        py = naturalHeight;
        while (py > sy) {
            alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        return (py / naturalHeight) || 1;
    };

    // Renders image to canvas while working around iOS image scaling bugs:
    // https://github.com/blueimp/JavaScript-Load-Image/issues/13
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
        if (img._type === 'image/jpeg') {
            var context = canvas.getContext('2d'),
                tmpCanvas = document.createElement('canvas'),
                tileSize = 1024,
                tmpContext = tmpCanvas.getContext('2d'),
                subsampled,
                vertSquashRatio,
                tileX,
                tileY;
            tmpCanvas.width = tileSize;
            tmpCanvas.height = tileSize;
            context.save();
            subsampled = loadImage.detectSubsampling(img);
            if (subsampled) {
                sourceX /= 2;
                sourceY /= 2;
                sourceWidth /= 2;
                sourceHeight /= 2;
            }
            vertSquashRatio = loadImage.detectVerticalSquash(img, subsampled);
            if (subsampled || vertSquashRatio !== 1) {
                sourceY *= vertSquashRatio;
                destWidth = Math.ceil(tileSize * destWidth / sourceWidth);
                destHeight = Math.ceil(
                    tileSize * destHeight / sourceHeight / vertSquashRatio
                );
                destY = 0;
                tileY = 0;
                while (tileY < sourceHeight) {
                    destX = 0;
                    tileX = 0;
                    while (tileX < sourceWidth) {
                        tmpContext.clearRect(0, 0, tileSize, tileSize);
                        tmpContext.drawImage(
                            img,
                            sourceX,
                            sourceY,
                            sourceWidth,
                            sourceHeight,
                            -tileX,
                            -tileY,
                            sourceWidth,
                            sourceHeight
                        );
                        context.drawImage(
                            tmpCanvas,
                            0,
                            0,
                            tileSize,
                            tileSize,
                            destX,
                            destY,
                            destWidth,
                            destHeight
                        );
                        tileX += tileSize;
                        destX += destWidth;
                    }
                    tileY += tileSize;
                    destY += destHeight;
                }
                context.restore();
                return canvas;
            }
        }
        return originalRenderMethod(
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
        );
    };

};

module.exports = inject;

},{}],76:[function(require,module,exports){
/*
 * JavaScript Load Image Meta 1.0.2
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Image meta data handling implementation
 * based on the help and contribution of
 * Achim Stöhr.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint continue:true */

'use strict';

var inject = function(loadImage) {
	
    var hasblobSlice = window.Blob && (Blob.prototype.slice ||
            Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    loadImage.blobSlice = hasblobSlice && function () {
        var slice = this.slice || this.webkitSlice || this.mozSlice;
        return slice.apply(this, arguments);
    };

    loadImage.metaDataParsers = {
        jpeg: {
            0xffe1: [] // APP1 marker
        }
    };

    // Parses image meta data and calls the callback with an object argument
    // with the following properties:
    // * imageHead: The complete image head as ArrayBuffer (Uint8Array for IE10)
    // The options arguments accepts an object and supports the following properties:
    // * maxMetaDataSize: Defines the maximum number of bytes to parse.
    // * disableImageHead: Disables creating the imageHead property.
    loadImage.parseMetaData = function (file, callback, options) {
        options = options || {};
        var that = this,
            // 256 KiB should contain all EXIF/ICC/IPTC segments:
            maxMetaDataSize = options.maxMetaDataSize || 262144,
            data = {},
            noMetaData = !(window.DataView  && file && file.size >= 12 &&
                file.type === 'image/jpeg' && loadImage.blobSlice);
        if (noMetaData || !loadImage.readFile(
                loadImage.blobSlice.call(file, 0, maxMetaDataSize),
                function (e) {
                    if (e.target.error) {
                        // FileReader error
                        console.log(e.target.error);
                        callback(data);
                        return;
                    }
                    // Note on endianness:
                    // Since the marker and length bytes in JPEG files are always
                    // stored in big endian order, we can leave the endian parameter
                    // of the DataView methods undefined, defaulting to big endian.
                    var buffer = e.target.result,
                        dataView = new DataView(buffer),
                        offset = 2,
                        maxOffset = dataView.byteLength - 4,
                        headLength = offset,
                        markerBytes,
                        markerLength,
                        parsers,
                        i;
                    // Check for the JPEG marker (0xffd8):
                    if (dataView.getUint16(0) === 0xffd8) {
                        while (offset < maxOffset) {
                            markerBytes = dataView.getUint16(offset);
                            // Search for APPn (0xffeN) and COM (0xfffe) markers,
                            // which contain application-specific meta-data like
                            // Exif, ICC and IPTC data and text comments:
                            if ((markerBytes >= 0xffe0 && markerBytes <= 0xffef) ||
                                    markerBytes === 0xfffe) {
                                // The marker bytes (2) are always followed by
                                // the length bytes (2), indicating the length of the
                                // marker segment, which includes the length bytes,
                                // but not the marker bytes, so we add 2:
                                markerLength = dataView.getUint16(offset + 2) + 2;
                                if (offset + markerLength > dataView.byteLength) {
                                    console.log('Invalid meta data: Invalid segment size.');
                                    break;
                                }
                                parsers = loadImage.metaDataParsers.jpeg[markerBytes];
                                if (parsers) {
                                    for (i = 0; i < parsers.length; i += 1) {
                                        parsers[i].call(
                                            that,
                                            dataView,
                                            offset,
                                            markerLength,
                                            data,
                                            options
                                        );
                                    }
                                }
                                offset += markerLength;
                                headLength = offset;
                            } else {
                                // Not an APPn or COM marker, probably safe to
                                // assume that this is the end of the meta data
                                break;
                            }
                        }
                        // Meta length must be longer than JPEG marker (2)
                        // plus APPn marker (2), followed by length bytes (2):
                        if (!options.disableImageHead && headLength > 6) {
                            if (buffer.slice) {
                                data.imageHead = buffer.slice(0, headLength);
                            } else {
                                // Workaround for IE10, which does not yet
                                // support ArrayBuffer.slice:
                                data.imageHead = new Uint8Array(buffer)
                                    .subarray(0, headLength);
                            }
                        }
                    } else {
                        console.log('Invalid JPEG file: Missing JPEG marker.');
                    }
                    callback(data);
                },
                'readAsArrayBuffer'
            )) {
            callback(data);
        }
    };

};

module.exports = inject;

},{}],77:[function(require,module,exports){
/*
 * JavaScript Load Image Orientation 1.1.0
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

'use strict';

var inject = function(loadImage) {

    var originalHasCanvasOption = loadImage.hasCanvasOption,
        originalTransformCoordinates = loadImage.transformCoordinates,
        originalGetTransformedOptions = loadImage.getTransformedOptions;

    // This method is used to determine if the target image
    // should be a canvas element:
    loadImage.hasCanvasOption = function (options) {
        return originalHasCanvasOption.call(loadImage, options) ||
            options.orientation;
    };

    // Transform image orientation based on
    // the given EXIF orientation option:
    loadImage.transformCoordinates = function (canvas, options) {
        originalTransformCoordinates.call(loadImage, canvas, options);
        var ctx = canvas.getContext('2d'),
            width = canvas.width,
            height = canvas.height,
            orientation = options.orientation;
        if (!orientation || orientation > 8) {
            return;
        }
        if (orientation > 4) {
            canvas.width = height;
            canvas.height = width;
        }
        switch (orientation) {
        case 2:
            // horizontal flip
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
            break;
        case 3:
            // 180° rotate left
            ctx.translate(width, height);
            ctx.rotate(Math.PI);
            break;
        case 4:
            // vertical flip
            ctx.translate(0, height);
            ctx.scale(1, -1);
            break;
        case 5:
            // vertical flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.scale(1, -1);
            break;
        case 6:
            // 90° rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(0, -height);
            break;
        case 7:
            // horizontal flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.translate(width, -height);
            ctx.scale(-1, 1);
            break;
        case 8:
            // 90° rotate left
            ctx.rotate(-0.5 * Math.PI);
            ctx.translate(-width, 0);
            break;
        }
    };

    // Transforms coordinate and dimension options
    // based on the given orientation option:
    loadImage.getTransformedOptions = function (img, opts) {
        var options = originalGetTransformedOptions.call(loadImage, img, opts),
            orientation = options.orientation,
            newOptions,
            i;
        if (!orientation || orientation > 8 || orientation === 1) {
            return options;
        }
        newOptions = {};
        for (i in options) {
            if (options.hasOwnProperty(i)) {
                newOptions[i] = options[i];
            }
        }
        switch (options.orientation) {
        case 2:
            // horizontal flip
            newOptions.left = options.right;
            newOptions.right = options.left;
            break;
        case 3:
            // 180° rotate left
            newOptions.left = options.right;
            newOptions.top = options.bottom;
            newOptions.right = options.left;
            newOptions.bottom = options.top;
            break;
        case 4:
            // vertical flip
            newOptions.top = options.bottom;
            newOptions.bottom = options.top;
            break;
        case 5:
            // vertical flip + 90 rotate right
            newOptions.left = options.top;
            newOptions.top = options.left;
            newOptions.right = options.bottom;
            newOptions.bottom = options.right;
            break;
        case 6:
            // 90° rotate right
            newOptions.left = options.top;
            newOptions.top = options.right;
            newOptions.right = options.bottom;
            newOptions.bottom = options.left;
            break;
        case 7:
            // horizontal flip + 90 rotate right
            newOptions.left = options.bottom;
            newOptions.top = options.right;
            newOptions.right = options.top;
            newOptions.bottom = options.left;
            break;
        case 8:
            // 90° rotate left
            newOptions.left = options.bottom;
            newOptions.top = options.left;
            newOptions.right = options.top;
            newOptions.bottom = options.right;
            break;
        }
        if (options.orientation > 4) {
            newOptions.maxWidth = options.maxHeight;
            newOptions.maxHeight = options.maxWidth;
            newOptions.minWidth = options.minHeight;
            newOptions.minHeight = options.minWidth;
            newOptions.sourceWidth = options.sourceHeight;
            newOptions.sourceHeight = options.sourceWidth;
        }
        return newOptions;
    };

};

module.exports = inject;

},{}],78:[function(require,module,exports){
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
    canvas.getContext('2d').drawImage(
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

},{}],79:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var throttle = require('./throttle');
var tailormade = require('./tailormade');

function bullseye (el, target, options) {
  var o = options;
  var domTarget = target && target.tagName;

  if (!domTarget && arguments.length === 2) {
    o = target;
  }
  if (!domTarget) {
    target = el;
  }
  if (!o) { o = {}; }

  var destroyed = false;
  var throttledWrite = throttle(write, 30);
  var tailorOptions = { update: o.autoupdateToCaret !== false && update };
  var tailor = o.caret && tailormade(target, tailorOptions);

  write();

  if (o.tracking !== false) {
    crossvent.add(window, 'resize', throttledWrite);
  }

  return {
    read: readNull,
    refresh: write,
    destroy: destroy,
    sleep: sleep
  };

  function sleep () {
    tailorOptions.sleeping = true;
  }

  function readNull () { return read(); }

  function read (readings) {
    var bounds = target.getBoundingClientRect();
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (tailor) {
      readings = tailor.read();
      return {
        x: (readings.absolute ? 0 : bounds.left) + readings.x,
        y: (readings.absolute ? 0 : bounds.top) + scrollTop + readings.y + 20
      };
    }
    return {
      x: bounds.left,
      y: bounds.top + scrollTop
    };
  }

  function update (readings) {
    write(readings);
  }

  function write (readings) {
    if (destroyed) {
      throw new Error('Bullseye can\'t refresh after being destroyed. Create another instance instead.');
    }
    if (tailor && !readings) {
      tailorOptions.sleeping = false;
      tailor.refresh(); return;
    }
    var p = read(readings);
    if (!tailor && target !== el) {
      p.y += target.offsetHeight;
    }
    el.style.left = p.x + 'px';
    el.style.top = p.y + 'px';
  }

  function destroy () {
    if (tailor) { tailor.destroy(); }
    crossvent.remove(window, 'resize', throttledWrite);
    destroyed = true;
  }
}

module.exports = bullseye;

},{"./tailormade":80,"./throttle":81,"crossvent":83}],80:[function(require,module,exports){
(function (global){
'use strict';

var sell = require('sell');
var crossvent = require('crossvent');
var seleccion = require('seleccion');
var throttle = require('./throttle');
var getSelection = seleccion.get;
var props = [
  'direction',
  'boxSizing',
  'width',
  'height',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',
  'letterSpacing',
  'wordSpacing'
];
var win = global;
var doc = document;
var ff = win.mozInnerScreenX !== null && win.mozInnerScreenX !== void 0;

function tailormade (el, options) {
  var textInput = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
  var throttledRefresh = throttle(refresh, 30);
  var o = options || {};

  bind();

  return {
    read: readPosition,
    refresh: throttledRefresh,
    destroy: destroy
  };

  function noop () {}
  function readPosition () { return (textInput ? coordsText : coordsHTML)(); }

  function refresh () {
    if (o.sleeping) {
      return;
    }
    return (o.update || noop)(readPosition());
  }

  function coordsText () {
    var p = sell(el);
    var context = prepare();
    var readings = readTextCoords(context, p.start);
    doc.body.removeChild(context.mirror);
    return readings;
  }

  function coordsHTML () {
    var sel = getSelection();
    if (sel.rangeCount) {
      var range = sel.getRangeAt(0);
      var needsToWorkAroundNewlineBug = range.startContainer.nodeName === 'P' && range.startOffset === 0;
      if (needsToWorkAroundNewlineBug) {
        return {
          x: range.startContainer.offsetLeft,
          y: range.startContainer.offsetTop,
          absolute: true
        };
      }
      if (range.getClientRects) {
        var rects = range.getClientRects();
        if (rects.length > 0) {
          return {
            x: rects[0].left,
            y: rects[0].top,
            absolute: true
          };
        }
      }
    }
    return { x: 0, y: 0 };
  }

  function readTextCoords (context, p) {
    var rest = doc.createElement('span');
    var mirror = context.mirror;
    var computed = context.computed;

    write(mirror, read(el).substring(0, p));

    if (el.tagName === 'INPUT') {
      mirror.textContent = mirror.textContent.replace(/\s/g, '\u00a0');
    }

    write(rest, read(el).substring(p) || '.');

    mirror.appendChild(rest);

    return {
      x: rest.offsetLeft + parseInt(computed['borderLeftWidth']),
      y: rest.offsetTop + parseInt(computed['borderTopWidth'])
    };
  }

  function read (el) {
    return textInput ? el.value : el.innerHTML;
  }

  function prepare () {
    var computed = win.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
    var mirror = doc.createElement('div');
    var style = mirror.style;

    doc.body.appendChild(mirror);

    if (el.tagName !== 'INPUT') {
      style.wordWrap = 'break-word';
    }
    style.whiteSpace = 'pre-wrap';
    style.position = 'absolute';
    style.visibility = 'hidden';
    props.forEach(copy);

    if (ff) {
      style.width = parseInt(computed.width) - 2 + 'px';
      if (el.scrollHeight > parseInt(computed.height)) {
        style.overflowY = 'scroll';
      }
    } else {
      style.overflow = 'hidden';
    }
    return { mirror: mirror, computed: computed };

    function copy (prop) {
      style[prop] = computed[prop];
    }
  }

  function write (el, value) {
    if (textInput) {
      el.textContent = value;
    } else {
      el.innerHTML = value;
    }
  }

  function bind (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](el, 'keydown', throttledRefresh);
    crossvent[op](el, 'keyup', throttledRefresh);
    crossvent[op](el, 'input', throttledRefresh);
    crossvent[op](el, 'paste', throttledRefresh);
    crossvent[op](el, 'change', throttledRefresh);
  }

  function destroy () {
    bind(true);
  }
}

module.exports = tailormade;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./throttle":81,"crossvent":83,"seleccion":119,"sell":121}],81:[function(require,module,exports){
'use strict';

function throttle (fn, boundary) {
  var last = -Infinity;
  var timer;
  return function bounced () {
    if (timer) {
      return;
    }
    unbound();

    function unbound () {
      clearTimeout(timer);
      timer = null;
      var next = last + boundary;
      var now = Date.now();
      if (now > next) {
        last = now;
        fn();
      } else {
        timer = setTimeout(unbound, next - now);
      }
    }
  };
}

module.exports = throttle;

},{}],82:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],83:[function(require,module,exports){
(function (global){
'use strict';

var customEvent = require('custom-event');
var eventmap = require('./eventmap');
var doc = document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  return el.detachEvent('on' + type, unwrap(el, type, fn));
}

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./eventmap":84,"custom-event":85}],84:[function(require,module,exports){
(function (global){
'use strict';

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],85:[function(require,module,exports){
(function (global){

var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],86:[function(require,module,exports){
'use strict';

function fuzzysearch (needle, haystack) {
  var tlen = haystack.length;
  var qlen = needle.length;
  if (qlen > tlen) {
    return false;
  }
  if (qlen === tlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < qlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < tlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

module.exports = fuzzysearch;

},{}],87:[function(require,module,exports){
'use strict';

var sell = require('sell');
var crossvent = require('crossvent');
var bullseye = require('bullseye');
var fuzzysearch = require('fuzzysearch');
var KEY_BACKSPACE = 8;
var KEY_ENTER = 13;
var KEY_ESC = 27;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_TAB = 9;
var cache = [];
var doc = document;
var docElement = doc.documentElement;

function find (el) {
  var entry;
  var i;
  for (i = 0; i < cache.length; i++) {
    entry = cache[i];
    if (entry.el === el) {
      return entry.api;
    }
  }
  return null;
}

function horsey (el, options) {
  var cached = find(el);
  if (cached) {
    return cached;
  }

  var o = options || {};
  var parent = o.appendTo || doc.body;
  var render = o.render || defaultRenderer;
  var getText = o.getText || defaultGetText;
  var getValue = o.getValue || defaultGetValue;
  var form = o.form;
  var limit = typeof o.limit === 'number' ? o.limit : Infinity;
  var suggestions = o.suggestions;
  var userFilter = o.filter || defaultFilter;
  var userSet = o.set || defaultSetter;
  var ul = tag('ul', 'sey-list');
  var selection = null;
  var eye;
  var deferredFiltering = defer(filtering);
  var attachment = el;
  var textInput;
  var anyInput;
  var ranchorleft;
  var ranchorright;
  var suggestionsLoad = { counter: 0, value: null };

  if (o.autoHideOnBlur === void 0) { o.autoHideOnBlur = true; }
  if (o.autoHideOnClick === void 0) { o.autoHideOnClick = true; }
  if (o.autoShowOnUpDown === void 0) { o.autoShowOnUpDown = el.tagName === 'INPUT'; }
  if (o.anchor) {
    ranchorleft = new RegExp('^' + o.anchor);
    ranchorright = new RegExp(o.anchor + '$');
  }

  var api = {
    add: add,
    anchor: o.anchor,
    clear: clear,
    show: show,
    hide: hide,
    toggle: toggle,
    destroy: destroy,
    refreshPosition: refreshPosition,
    appendText: appendText,
    appendHTML: appendHTML,
    filterAnchoredText: filterAnchoredText,
    filterAnchoredHTML: filterAnchoredHTML,
    defaultAppendText: appendText,
    defaultFilter: defaultFilter,
    defaultGetText: defaultGetText,
    defaultGetValue: defaultGetValue,
    defaultRenderer: defaultRenderer,
    defaultSetter: defaultSetter,
    retarget: retarget,
    attachment: attachment,
    list: ul,
    suggestions: []
  };
  var entry = { el: el, api: api };

  retarget(el);
  cache.push(entry);
  parent.appendChild(ul);
  el.setAttribute('autocomplete', 'off');

  if (Array.isArray(suggestions)) {
    loaded(suggestions, false);
  }

  return api;

  function retarget (el) {
    inputEvents(true);
    attachment = api.attachment = el;
    textInput = attachment.tagName === 'INPUT' || attachment.tagName === 'TEXTAREA';
    anyInput = textInput || isEditable(attachment);
    inputEvents();
  }

  function refreshPosition () {
    if (eye) { eye.refresh(); }
  }

  function loading (forceShow) {
    if (typeof suggestions === 'function') {
      crossvent.remove(attachment, 'focus', loading);
      var value = textInput ? el.value : el.innerHTML;
      if (value !== suggestionsLoad.value) {
        suggestionsLoad.counter++;
        suggestionsLoad.value = value;

        var counter = suggestionsLoad.counter;
        suggestions(value, function(s) {
          if (suggestionsLoad.counter === counter) {
            loaded(s, forceShow);
          }
        });
      }
    }
  }

  function loaded (suggestions, forceShow) {
    clear();
    suggestions.forEach(add);
    api.suggestions = suggestions;
    if (forceShow) {
      show();
    }
    filtering();
  }

  function clear () {
    unselect();
    while (ul.lastChild) {
      ul.removeChild(ul.lastChild);
    }
  }

  function add (suggestion) {
    var li = tag('li', 'sey-item');
    render(li, suggestion);
    crossvent.add(li, 'click', clickedSuggestion);
    crossvent.add(li, 'horsey-filter', filterItem);
    crossvent.add(li, 'horsey-hide', hideItem);
    ul.appendChild(li);
    api.suggestions.push(suggestion);
    return li;

    function clickedSuggestion () {
      var value = getValue(suggestion);
      set(value);
      hide();
      attachment.focus();
      crossvent.fabricate(attachment, 'horsey-selected', value);
    }

    function filterItem () {
      var value = textInput ? el.value : el.innerHTML;
      if (filter(value, suggestion)) {
        li.className = li.className.replace(/ sey-hide/g, '');
      } else {
        crossvent.fabricate(li, 'horsey-hide');
      }
    }

    function hideItem () {
      if (!hidden(li)) {
        li.className += ' sey-hide';
        if (selection === li) {
          unselect();
        }
      }
    }
  }

  function set (value) {
    if (o.anchor) {
      return (isText() ? api.appendText : api.appendHTML)(value);
    }
    userSet(value);
  }

  function filter (value, suggestion) {
    if (o.anchor) {
      var il = (isText() ? api.filterAnchoredText : api.filterAnchoredHTML)(value, suggestion);
      return il ? userFilter(il.input, il.suggestion) : false;
    }
    return userFilter(value, suggestion);
  }

  function isText () { return isInput(attachment); }
  function visible () { return ul.className.indexOf('sey-show') !== -1; }
  function hidden (li) { return li.className.indexOf('sey-hide') !== -1; }

  function show () {
    if (!visible()) {
      ul.className += ' sey-show';
      eye.refresh();
      crossvent.fabricate(attachment, 'horsey-show');
    }
  }

  function toggler (e) {
    var left = e.which === 1 && !e.metaKey && !e.ctrlKey;
    if (left === false) {
      return; // we only care about honest to god left-clicks
    }
    toggle();
  }

  function toggle () {
    if (!visible()) {
      show();
    } else {
      hide();
    }
  }

  function select (suggestion) {
    unselect();
    if (suggestion) {
      selection = suggestion;
      selection.className += ' sey-selected';
    }
  }

  function unselect () {
    if (selection) {
      selection.className = selection.className.replace(/ sey-selected/g, '');
      selection = null;
    }
  }

  function move (up, moves) {
    var total = ul.children.length;
    if (total < moves) {
      unselect();
      return;
    }
    if (total === 0) {
      return;
    }
    var first = up ? 'lastChild' : 'firstChild';
    var next = up ? 'previousSibling' : 'nextSibling';
    var suggestion = selection && selection[next] || ul[first];

    select(suggestion);

    if (hidden(suggestion)) {
      move(up, moves ? moves + 1 : 1);
    }
  }

  function hide () {
    eye.sleep();
    ul.className = ul.className.replace(/ sey-show/g, '');
    unselect();
    crossvent.fabricate(attachment, 'horsey-hide');
  }

  function keydown (e) {
    var shown = visible();
    var which = e.which || e.keyCode;
    if (which === KEY_DOWN) {
      if (anyInput && o.autoShowOnUpDown) {
        show();
      }
      if (shown) {
        move();
        stop(e);
      }
    } else if (which === KEY_UP) {
      if (anyInput && o.autoShowOnUpDown) {
        show();
      }
      if (shown) {
        move(true);
        stop(e);
      }
    } else if (which === KEY_BACKSPACE) {
      if (anyInput && o.autoShowOnUpDown) {
        show();
      }
    } else if (shown) {
      if (which === KEY_ENTER) {
        if (selection) {
          crossvent.fabricate(selection, 'click');
        } else {
          hide();
        }
        stop(e);
      } else if (which === KEY_ESC) {
        hide();
        stop(e);
      }
    }
  }

  function stop (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function filtering () {
    if (!visible()) {
      return;
    }
    loading(true);
    crossvent.fabricate(attachment, 'horsey-filter');
    var li = ul.firstChild;
    var count = 0;
    while (li) {
      if (count >= limit) {
        crossvent.fabricate(li, 'horsey-hide');
      }
      if (count < limit) {
        crossvent.fabricate(li, 'horsey-filter');
        if (li.className.indexOf('sey-hide') === -1) {
          count++;
        }
      }
      li = li.nextSibling;
    }
    if (!selection) {
      move();
    }
    if (!selection) {
      hide();
    }
  }

  function deferredFilteringNoEnter (e) {
    var which = e.which || e.keyCode;
    if (which === KEY_ENTER) {
      return;
    }
    deferredFiltering();
  }

  function deferredShow (e) {
    var which = e.which || e.keyCode;
    if (which === KEY_ENTER) {
      return;
    }
    setTimeout(show, 0);
  }

  function horseyEventTarget (e) {
    var target = e.target;
    if (target === attachment) {
      return true;
    }
    while (target) {
      if (target === ul || target === attachment) {
        return true;
      }
      target = target.parentNode;
    }
  }

  function hideOnBlur (e) {
    var which = e.which || e.keyCode;
    if (which === KEY_TAB) {
      hide();
    }
  }

  function hideOnClick (e) {
    if (horseyEventTarget(e)) {
      return;
    }
    hide();
  }

  function inputEvents (remove) {
    var op = remove ? 'remove' : 'add';
    if (eye) {
      eye.destroy();
      eye = null;
    }
    if (!remove) {
      eye = bullseye(ul, attachment, { caret: anyInput && attachment.tagName !== 'INPUT' });
      if (!visible()) { eye.sleep(); }
    }
    if (remove || (anyInput && doc.activeElement !== attachment)) {
      crossvent[op](attachment, 'focus', loading);
    } else {
      loading();
    }
    if (anyInput) {
      crossvent[op](attachment, 'keypress', deferredShow);
      crossvent[op](attachment, 'keypress', deferredFiltering);
      crossvent[op](attachment, 'keydown', deferredFilteringNoEnter);
      crossvent[op](attachment, 'paste', deferredFiltering);
      crossvent[op](attachment, 'keydown', keydown);
      if (o.autoHideOnBlur) { crossvent[op](attachment, 'keydown', hideOnBlur); }
    } else {
      crossvent[op](attachment, 'click', toggler);
      crossvent[op](docElement, 'keydown', keydown);
    }
    if (o.autoHideOnClick) { crossvent[op](doc, 'click', hideOnClick); }
    if (form) { crossvent[op](form, 'submit', hide); }
  }

  function destroy () {
    inputEvents(true);
    if (parent.contains(ul)) { parent.removeChild(ul); }
    cache.splice(cache.indexOf(entry), 1);
  }

  function defaultSetter (value) {
    if (textInput) {
      el.value = value;
    } else {
      el.innerHTML = value;
    }
  }

  function defaultRenderer (li, suggestion) {
    li.innerText = li.textContent = getText(suggestion);
  }

  function defaultFilter (q, suggestion) {
    var text = getText(suggestion) || '';
    var value = getValue(suggestion) || '';
    var needle = q.toLowerCase();
    return fuzzysearch(needle, text.toLowerCase()) || fuzzysearch(needle, value.toLowerCase());
  }

  function loopbackToAnchor (text, p) {
    var result = '';
    var anchored = false;
    var start = p.start;
    while (anchored === false && start >= 0) {
      result = text.substr(start - 1, p.start - start + 1);
      anchored = ranchorleft.test(result);
      start--;
    }
    return {
      text: anchored ? result : null,
      start: start
    };
  }

  function filterAnchoredText (q, suggestion) {
    var position = sell(el);
    var input = loopbackToAnchor(q, position).text;
    if (input) {
      return { input: input, suggestion: suggestion };
    }
  }

  function appendText (value) {
    var current = el.value;
    var position = sell(el);
    var input = loopbackToAnchor(current, position);
    var left = current.substr(0, input.start);
    var right = current.substr(input.start + input.text.length + (position.end - position.start));
    var before = left + value + ' ';

    el.value = before + right;
    sell(el, { start: before.length, end: before.length });
  }

  function filterAnchoredHTML () {
    throw new Error('Anchoring in editable elements is disabled by default.');
  }

  function appendHTML () {
    throw new Error('Anchoring in editable elements is disabled by default.');
  }
}

function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'; }

function defaultGetValue (suggestion) {
  return defaultGet('value', suggestion);
}

function defaultGetText (suggestion) {
  return defaultGet('text', suggestion);
}

function defaultGet (type, value) {
  return value && value[type] !== void 0 ? value[type] : value;
}

function tag (type, className) {
  var el = doc.createElement(type);
  el.className = className;
  return el;
}

function defer (fn) { return function () { setTimeout(fn, 0); }; }

function isEditable (el) {
  var value = el.getAttribute('contentEditable');
  if (value === 'false') {
    return false;
  }
  if (value === 'true') {
    return true;
  }
  if (el.parentElement) {
    return isEditable(el.parentElement);
  }
  return false;
}

horsey.find = find;
module.exports = horsey;

},{"bullseye":79,"crossvent":83,"fuzzysearch":86,"sell":121}],88:[function(require,module,exports){
'use strict';

var crossvent = require('crossvent');
var dom = require('./dom');
var text = require('./text');
var props = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'letterSpacing',
  'textTransform',
  'wordSpacing',
  'textIndent',
  'webkitBoxSizing',
  'mozBoxSizing',
  'boxSizing',
  'padding',
  'border'
];
var offset = 20;

module.exports = function factory (el) {
  var mirror = dom('span');

  document.body.appendChild(mirror);
  remap();
  bind();

  return {
    remap: remap,
    refresh: refresh,
    destroy: destroy
  };

  function remap () {
    var c = computed();
    var value;
    var i;
    for (i = 0; i < props.length; i++) {
      value = c[props[i]];
      if (value !== void 0 && value !== null) { // otherwise IE blows up
        mirror.style[props[i]] = value;
      }
    }
    mirror.disabled = 'disabled';
    mirror.style.whiteSpace = 'pre';
    mirror.style.position = 'absolute';
    mirror.style.top = mirror.style.left = '-9999em';
  }

  function refresh () {
    var value = el.value;
    if (value === mirror.value) {
      return;
    }

    text(mirror, value);

    var width = mirror.offsetWidth + offset;

    el.style.width = width + 'px';
  }

  function bind (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](el, 'keydown', refresh);
    crossvent[op](el, 'keyup', refresh);
    crossvent[op](el, 'input', refresh);
    crossvent[op](el, 'paste', refresh);
    crossvent[op](el, 'change', refresh);
  }

  function destroy () {
    bind(true);
    mirror.parentElement.removeChild(mirror);
    el.style.width = '';
  }

  function computed () {
    if (window.getComputedStyle) {
      return window.getComputedStyle(el);
    }
    return el.currentStyle;
  }
};

},{"./dom":89,"./text":95,"crossvent":83}],89:[function(require,module,exports){
'use strict';

module.exports = function dom (tagName, classes) {
  var el = document.createElement(tagName);
  if (classes) {
    el.className = classes;
  }
  return el;
};

},{}],90:[function(require,module,exports){
'use strict';

require('./polyfills/String.prototype.trim');
require('./polyfills/Array.prototype.indexOf');

var crossvent = require('crossvent');
var dom = require('./dom');
var text = require('./text');
var slice = require('./slice');
var autosize = require('./autosize');
var selection = require('./selection');
var inputTag = /^input$/i;
var ELEMENT = 1;
var BACKSPACE = 8;
var END = 35;
var HOME = 36;
var LEFT = 37;
var RIGHT = 39;
var tagClass = /\bnsg-tag\b/;
var tagRemovalClass = /\bnsg-tag-remove\b/;
var editorClass = /\bnsg-editor\b/g;
var inputClass = /\bnsg-input\b/g;
var end = { start: 'end', end: 'end' };
var cache = [];
var defaultDelimiter = ' ';

function find (el) {
  var entry;
  var i;
  for (i = 0; i < cache.length; i++) {
    entry = cache[i];
    if (entry.el === el) {
      return entry.api;
    }
  }
  return null;
}

function insignia (el, options) {
  var cached = find(el);
  if (cached) {
    return cached;
  }

  var _noselect = document.activeElement !== el;
  var o = options || {};
  var delimiter = o.delimiter || defaultDelimiter;
  if (delimiter.length !== 1) {
    throw new Error('Insignia expected a single-character delimiter string');
  }
  var any = hasSiblings(el);
  if (any || !inputTag.test(el.tagName)) {
    throw new Error('Insignia expected an input element without any siblings');
  }
  var parse = o.parse || defaultParse;
  var validate = o.validate || defaultValidate;
  var render = o.render || defaultRenderer;
  var readTag = o.readTag || defaultReader;
	var convertOnFocus = o.convertOnFocus !== false;

  var before = dom('span', 'nsg-tags nsg-tags-before');
  var after = dom('span', 'nsg-tags nsg-tags-after');
  var parent = el.parentElement;
  el.className += ' nsg-input';
  parent.className += ' nsg-editor';
  parent.insertBefore(before, el);
  parent.insertBefore(after, el.nextSibling);
  bind();

  var auto = autosize(el);
  var api = {
    tags: readTags,
    value: readValue,
    convert: convert,
    destroy: destroy
  };
  var entry = { el: el, api: api };

  evaluate([delimiter], true);
  cache.push(entry);
  _noselect = false;

  return api;

  function bind (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](el, 'keydown', keydown);
    crossvent[op](el, 'keypress', keypress);
    crossvent[op](el, 'paste', paste);
    crossvent[op](parent, 'click', click);
		if (convertOnFocus) {
      crossvent[op](document.documentElement, 'focus', documentfocus, true);
    }
  }

  function destroy () {
    bind(true);
    el.value = readValue();
    el.className = el.className.replace(inputClass, '');
    parent.className = parent.className.replace(editorClass, '');
    before.parentElement.removeChild(before);
    after.parentElement.removeChild(after);
    cache.splice(cache.indexOf(entry), 1);
    auto.destroy();
    api.destroyed = true;
    api.destroy = noop(api);
    api.tags = api.value = noop(null);
    return api;
  }

  function noop (value) {
    return function destroyed () {
      return value;
    };
  }

  function documentfocus (e) {
    if (e.target !== el) {
      _noselect = true;
      convert(true);
      _noselect = false;
    }
  }

  function click (e) {
    var target = e.target;
    if (tagRemovalClass.test(target.className)) {
      focusTag(target.parentElement, { start: 'end', end: 'end', remove: true });
      shift();
      return;
    }
    var top = target;
    var tagged = tagClass.test(top.className);
    while (tagged === false && top.parentElement) {
      top = top.parentElement;
      tagged = tagClass.test(top.className);
    }
    if (tagged) {
      focusTag(top, end);
    } else if (target !== el) {
      shift();
      el.focus();
    }
  }

  function shift () {
    focusTag(after.lastChild, end);
    evaluate([delimiter], true);
  }

  function convert (all) {
    evaluate([delimiter], all);
    if (all) {
      each(after, moveLeft);
    }
    crossvent.fabricate(el, 'insignia-converted');
    return api;
  }

  function moveLeft (value, tag) {
    before.appendChild(tag);
  }

  function keydown (e) {
    var sel = selection(el);
    var key = e.which || e.keyCode || e.charCode;
    if (key === HOME) {
      if (before.firstChild) {
        focusTag(before.firstChild, {});
      } else {
        selection(el, { start: 0, end: 0 });
      }
    } else if (key === END) {
      if (after.lastChild) {
        focusTag(after.lastChild, end);
      } else {
        selection(el, end);
      }
    } else if (key === LEFT && sel.start === 0 && before.lastChild) {
      focusTag(before.lastChild, end);
    } else if (key === BACKSPACE && sel.start === 0 && (sel.end === 0 || sel.end !== el.value.length) && before.lastChild) {
      focusTag(before.lastChild, end);
    } else if (key === RIGHT && sel.end === el.value.length && after.firstChild) {
      focusTag(after.firstChild, {});
    } else {
      return;
    }

    e.preventDefault();
    return false;
  }

  function keypress (e) {
    var key = e.which || e.keyCode || e.charCode;
    if (String.fromCharCode(key) === delimiter) {
      convert();
      e.preventDefault();
      return false;
    }
  }

  function paste () {
    setTimeout(function later () { evaluate(); }, 0);
  }

  function evaluate (extras, entirely) {
    var p = selection(el);
    var len = entirely ? Infinity : p.start;
    var tags = el.value.slice(0, len).concat(extras || []).split(delimiter);
    if (tags.length < 1) {
      return;
    }

    var rest = tags.pop() + el.value.slice(len);
    var removal = tags.join(delimiter).length;
    var i;

    for (i = 0; i < tags.length; i++) {
      createTag(before, tags[i]);
    }
    cleanup();
    el.value = rest;
    p.start -= removal;
    p.end -= removal;
    if (_noselect !== true) { selection(el, p); }
    auto.refresh();
    crossvent.fabricate(el, 'insignia-evaluated');
  }

  function cleanup () {
    var tags = [];

    each(before, detect);
    each(after, detect);

    function detect (value, tagElement) {
      if (validate(value, slice(tags))) {
        tags.push(value);
      } else {
        tagElement.parentElement.removeChild(tagElement);
      }
    }
  }

  function defaultRenderer (container, value) {
    text(container, value);
  }

  function defaultReader (tag) {
    return text(tag);
  }

  function createTag (buffer, value) {
    var trimmed = value.trim();
    if (trimmed.length === 0) {
      return;
    }
    var el = dom('span', 'nsg-tag');
    render(el, parse(trimmed));
    if (o.deletion) {
      el.appendChild(dom('span', 'nsg-tag-remove'));
    }
    buffer.appendChild(el);
  }

  function focusTag (tag, p) {
    if (!tag) {
      return;
    }
    evaluate([delimiter], true);
    var parent = tag.parentElement;
    if (parent === before) {
      while (parent.lastChild !== tag) {
        after.insertBefore(parent.lastChild, after.firstChild);
      }
    } else {
      while (parent.firstChild !== tag) {
        before.appendChild(parent.firstChild);
      }
    }
    tag.parentElement.removeChild(tag);
    el.value = p.remove ? '' : readTag(tag);
    el.focus();
    selection(el, p);
    auto.refresh();
  }

  function hasSiblings () {
    var all = el.parentElement.children;
    var i;
    for (i = 0; i < all.length; i++) {
      if (all[i] !== el && all[i].nodeType === ELEMENT) {
        return true;
      }
    }
    return false;
  }

  function each (side, fn) {
    var children = slice(side.children);
    var i;
    var tag;
    for (i = 0; i < children.length; i++) {
      tag = children[i];
      fn(readTag(tag), tag, i);
    }
  }

  function readTags () {
    var all = [];
    var values = el.value.split(delimiter);
    var i;

    each(before, add);

    for (i = 0; i < values.length; i++) {
      add(values[i]);
    }

    each(after, add);

    return all;

    function add (value) {
      if (!value) {
        return;
      }
      var tag = parse(value);
      if (validate(tag, slice(all))) {
        all.push(tag);
      }
    }
  }

  function readValue () {
    return readTags().join(delimiter);
  }

  function defaultParse (value) {
    return value.trim().toLowerCase();
  }

  function defaultValidate (value, tags) {
    return tags.indexOf(value) === -1;
  }
}

insignia.find = find;
module.exports = insignia;

},{"./autosize":88,"./dom":89,"./polyfills/Array.prototype.indexOf":91,"./polyfills/String.prototype.trim":92,"./selection":93,"./slice":94,"./text":95,"crossvent":83}],91:[function(require,module,exports){
'use strict';

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (what, start) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    var length = this.length;
    start = +start || 0;
    if (Math.abs(start) === Infinity) {
      start = 0;
    } else if (start < 0) {
      start += length;
      if (start < 0) { start = 0; }
    }
    for (; start < length; start++) {
      if (this[start] === what) {
        return start;
      }
    }
    return -1;
  };
}

},{}],92:[function(require,module,exports){
'use strict';

if (!String.prototype.trim) {
  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  String.prototype.trim = function () {
    return this.replace(rtrim, '');
  };
}

},{}],93:[function(require,module,exports){
'use strict';

var get = easyGet;
var set = easySet;
var inputTag = /input/i;
var textareaTag = /textarea/i;

if (document.selection && document.selection.createRange) {
  get = hardGet;
  set = hardSet;
}

function easyGet (el) {
  return {
    start: el.selectionStart,
    end: el.selectionEnd
  };
}

function hardGet (el) {
  var active = document.activeElement;
  if (active !== el) {
    el.focus();
  }

  var range = document.selection.createRange();
  var bookmark = range.getBookmark();
  var original = el.value;
  var marker = getUniqueMarker(original);
  var parent = range.parentElement();
  if (parent === null || !inputs(parent)) {
    return result(0, 0);
  }
  range.text = marker + range.text + marker;

  var contents = el.value;

  el.value = original;
  range.moveToBookmark(bookmark);
  range.select();

  return result(contents.indexOf(marker), contents.lastIndexOf(marker) - marker.length);

  function result (start, end) {
    if (active !== el) { // don't disrupt pre-existing state
      if (active) {
        active.focus();
      } else {
        el.blur();
      }
    }
    return { start: start, end: end };
  }
}

function getUniqueMarker (contents) {
  var marker;
  do {
    marker = '@@marker.' + Math.random() * new Date();
  } while (contents.indexOf(marker) !== -1);
  return marker;
}

function inputs (el) {
  return ((inputTag.test(el.tagName) && el.type === 'text') || textareaTag.test(el.tagName));
}

function easySet (el, p) {
  el.selectionStart = special(el, p.start);
  el.selectionEnd = special(el, p.end);
}

function hardSet (el, p) {
  var range = el.createTextRange();

  if (p.start === 'end' && p.end === 'end') {
    range.collapse(false);
    range.select();
  } else {
    range.collapse(true);
    range.moveEnd('character', p.end);
    range.moveStart('character', p.start);
    range.select();
  }
}

function special (el, value) {
  return value === 'end' ? el.value.length : value || 0;
}

function selection (el, p) {
  if (arguments.length === 2) {
    set(el, p);
  }
  return get(el);
}

module.exports = selection;

},{}],94:[function(require,module,exports){
'use strict';

function slice (collection) { // because old IE
  var result = [];
  var i;
  for (i = 0; i < collection.length; i++) {
    result.push(collection[i]);
  }
  return result;
}

module.exports = slice;

},{}],95:[function(require,module,exports){
'use strict';

function text (el, value) {
  if (arguments.length === 2) {
    el.innerText = el.textContent = value;
  }
  if (typeof el.innerText === 'string') {
    return el.innerText;
  }
  return el.textContent;
}

module.exports = text;

},{}],96:[function(require,module,exports){

var Pipe = require('../pipe').Pipe;

var Context = function Context(){
};

Context.prototype.setResult = function(result) {
	this.result = result;
	this.hasResult = true;
	return this;
};

Context.prototype.exit = function() {
	this.exiting = true;
	return this;
};

Context.prototype.switchTo = function(next, pipe) {
	if (typeof next === 'string' || next instanceof Pipe) {
		this.nextPipe = next;
	} else {
		this.next = next;
		if (pipe) {
			this.nextPipe = pipe;
		}
	}
	return this;
};

Context.prototype.push = function(child, name) {
	child.parent = this;
	if (typeof name !== 'undefined') {
		child.childName = name;
	}
	child.root = this.root || this;
	child.options = child.options || this.options;
	if (!this.children) {
		this.children = [child];
		this.nextAfterChildren = this.next || null;
		this.next = child;
	} else {
		this.children[this.children.length - 1].next = child;
		this.children.push(child);
	}
	child.next = this;
	return this;
};

exports.Context = Context;

},{"../pipe":110}],97:[function(require,module,exports){
var Context = require('./context').Context;
var dateReviver = require('../date-reviver');

var DiffContext = function DiffContext(left, right) {
  this.left = left;
  this.right = right;
  this.pipe = 'diff';
};

DiffContext.prototype = new Context();

DiffContext.prototype.setResult = function(result) {
  if (this.options.cloneDiffValues) {
    var clone = typeof this.options.cloneDiffValues === 'function' ?
      this.options.cloneDiffValues : function(value) {
        return JSON.parse(JSON.stringify(value), dateReviver);
      };
    if (typeof result[0] === 'object') {
      result[0] = clone(result[0]);
    }
    if (typeof result[1] === 'object') {
      result[1] = clone(result[1]);
    }
  }
  return Context.prototype.setResult.apply(this, arguments);
};

exports.DiffContext = DiffContext;

},{"../date-reviver":100,"./context":96}],98:[function(require,module,exports){
var Context = require('./context').Context;

var PatchContext = function PatchContext(left, delta) {
  this.left = left;
  this.delta = delta;
  this.pipe = 'patch';
};

PatchContext.prototype = new Context();

exports.PatchContext = PatchContext;

},{"./context":96}],99:[function(require,module,exports){
var Context = require('./context').Context;

var ReverseContext = function ReverseContext(delta) {
  this.delta = delta;
  this.pipe = 'reverse';
};

ReverseContext.prototype = new Context();

exports.ReverseContext = ReverseContext;

},{"./context":96}],100:[function(require,module,exports){
// use as 2nd parameter for JSON.parse to revive Date instances
module.exports = function dateReviver(key, value) {
  var parts;
  if (typeof value === 'string') {
    parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+\-])(\d{2}):(\d{2}))$/.exec(value);
    if (parts) {
      return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4], +parts[5], +parts[6], +(parts[7] || 0)));
    }
  }
  return value;
};

},{}],101:[function(require,module,exports){
var Processor = require('./processor').Processor;
var Pipe = require('./pipe').Pipe;
var DiffContext = require('./contexts/diff').DiffContext;
var PatchContext = require('./contexts/patch').PatchContext;
var ReverseContext = require('./contexts/reverse').ReverseContext;

var trivial = require('./filters/trivial');
var nested = require('./filters/nested');
var arrays = require('./filters/arrays');
var dates = require('./filters/dates');
var texts = require('./filters/texts');

var DiffPatcher = function DiffPatcher(options) {
  this.processor = new Processor(options);
  this.processor.pipe(new Pipe('diff').append(
    nested.collectChildrenDiffFilter,
    trivial.diffFilter,
    dates.diffFilter,
    texts.diffFilter,
    nested.objectsDiffFilter,
    arrays.diffFilter
  ).shouldHaveResult());
  this.processor.pipe(new Pipe('patch').append(
    nested.collectChildrenPatchFilter,
    arrays.collectChildrenPatchFilter,
    trivial.patchFilter,
    texts.patchFilter,
    nested.patchFilter,
    arrays.patchFilter
  ).shouldHaveResult());
  this.processor.pipe(new Pipe('reverse').append(
    nested.collectChildrenReverseFilter,
    arrays.collectChildrenReverseFilter,
    trivial.reverseFilter,
    texts.reverseFilter,
    nested.reverseFilter,
    arrays.reverseFilter
  ).shouldHaveResult());
};

DiffPatcher.prototype.options = function() {
  return this.processor.options.apply(this.processor, arguments);
};

DiffPatcher.prototype.diff = function(left, right) {
  return this.processor.process(new DiffContext(left, right));
};

DiffPatcher.prototype.patch = function(left, delta) {
  return this.processor.process(new PatchContext(left, delta));
};

DiffPatcher.prototype.reverse = function(delta) {
  return this.processor.process(new ReverseContext(delta));
};

DiffPatcher.prototype.unpatch = function(right, delta) {
  return this.patch(right, this.reverse(delta));
};

exports.DiffPatcher = DiffPatcher;

},{"./contexts/diff":97,"./contexts/patch":98,"./contexts/reverse":99,"./filters/arrays":103,"./filters/dates":104,"./filters/nested":106,"./filters/texts":107,"./filters/trivial":108,"./pipe":110,"./processor":111}],102:[function(require,module,exports){

exports.isBrowser = typeof window !== 'undefined';

},{}],103:[function(require,module,exports){
var DiffContext = require('../contexts/diff').DiffContext;
var PatchContext = require('../contexts/patch').PatchContext;
var ReverseContext = require('../contexts/reverse').ReverseContext;

var lcs = require('./lcs');

var ARRAY_MOVE = 3;

var isArray = (typeof Array.isArray === 'function') ?
  // use native function
  Array.isArray :
  // use instanceof operator
  function(a) {
    return a instanceof Array;
  };

var arrayIndexOf = typeof Array.prototype.indexOf === 'function' ?
  function(array, item) {
    return array.indexOf(item);
  } : function(array, item) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
      if (array[i] === item) {
        return i;
      }
    }
    return -1;
  };

function arraysHaveMatchByRef(array1, array2, len1, len2) {
  for (var index1 = 0; index1 < len1; index1++) {
    var val1 = array1[index1];
    for (var index2 = 0; index2 < len2; index2++) {
      var val2 = array2[index2];
      if (val1 === val2) {
        return true;
      }
    }
  }
}

function matchItems(array1, array2, index1, index2, context) {
  var value1 = array1[index1];
  var value2 = array2[index2];
  if (value1 === value2) {
    return true;
  }
  if (typeof value1 !== 'object' || typeof value2 !== 'object') {
    return false;
  }
  var objectHash = context.objectHash;
  if (!objectHash) {
    // no way to match objects was provided, try match by position
    return context.matchByPosition && index1 === index2;
  }
  var hash1;
  var hash2;
  if (typeof index1 === 'number') {
    context.hashCache1 = context.hashCache1 || [];
    hash1 = context.hashCache1[index1];
    if (typeof hash1 === 'undefined') {
      context.hashCache1[index1] = hash1 = objectHash(value1, index1);
    }
  } else {
    hash1 = objectHash(value1);
  }
  if (typeof hash1 === 'undefined') {
    return false;
  }
  if (typeof index2 === 'number') {
    context.hashCache2 = context.hashCache2 || [];
    hash2 = context.hashCache2[index2];
    if (typeof hash2 === 'undefined') {
      context.hashCache2[index2] = hash2 = objectHash(value2, index2);
    }
  } else {
    hash2 = objectHash(value2);
  }
  if (typeof hash2 === 'undefined') {
    return false;
  }
  return hash1 === hash2;
}

var diffFilter = function arraysDiffFilter(context) {
  if (!context.leftIsArray) {
    return;
  }

  var matchContext = {
    objectHash: context.options && context.options.objectHash,
    matchByPosition: context.options && context.options.matchByPosition
  };
  var commonHead = 0;
  var commonTail = 0;
  var index;
  var index1;
  var index2;
  var array1 = context.left;
  var array2 = context.right;
  var len1 = array1.length;
  var len2 = array2.length;

  var child;

  if (len1 > 0 && len2 > 0 && !matchContext.objectHash &&
    typeof matchContext.matchByPosition !== 'boolean') {
    matchContext.matchByPosition = !arraysHaveMatchByRef(array1, array2, len1, len2);
  }

  // separate common head
  while (commonHead < len1 && commonHead < len2 &&
    matchItems(array1, array2, commonHead, commonHead, matchContext)) {
    index = commonHead;
    child = new DiffContext(context.left[index], context.right[index]);
    context.push(child, index);
    commonHead++;
  }
  // separate common tail
  while (commonTail + commonHead < len1 && commonTail + commonHead < len2 &&
    matchItems(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext)) {
    index1 = len1 - 1 - commonTail;
    index2 = len2 - 1 - commonTail;
    child = new DiffContext(context.left[index1], context.right[index2]);
    context.push(child, index2);
    commonTail++;
  }
  var result;
  if (commonHead + commonTail === len1) {
    if (len1 === len2) {
      // arrays are identical
      context.setResult(undefined).exit();
      return;
    }
    // trivial case, a block (1 or more consecutive items) was added
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len2 - commonTail; index++) {
      result[index] = [array2[index]];
    }
    context.setResult(result).exit();
    return;
  }
  if (commonHead + commonTail === len2) {
    // trivial case, a block (1 or more consecutive items) was removed
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len1 - commonTail; index++) {
      result['_' + index] = [array1[index], 0, 0];
    }
    context.setResult(result).exit();
    return;
  }
  // reset hash cache
  delete matchContext.hashCache1;
  delete matchContext.hashCache2;

  // diff is not trivial, find the LCS (Longest Common Subsequence)
  var trimmed1 = array1.slice(commonHead, len1 - commonTail);
  var trimmed2 = array2.slice(commonHead, len2 - commonTail);
  var seq = lcs.get(
    trimmed1, trimmed2,
    matchItems,
    matchContext
  );
  var removedItems = [];
  result = result || {
    _t: 'a'
  };
  for (index = commonHead; index < len1 - commonTail; index++) {
    if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {
      // removed
      result['_' + index] = [array1[index], 0, 0];
      removedItems.push(index);
    }
  }

  var detectMove = true;
  if (context.options && context.options.arrays && context.options.arrays.detectMove === false) {
    detectMove = false;
  }
  var includeValueOnMove = false;
  if (context.options && context.options.arrays && context.options.arrays.includeValueOnMove) {
    includeValueOnMove = true;
  }

  var removedItemsLength = removedItems.length;
  for (index = commonHead; index < len2 - commonTail; index++) {
    var indexOnArray2 = arrayIndexOf(seq.indices2, index - commonHead);
    if (indexOnArray2 < 0) {
      // added, try to match with a removed item and register as position move
      var isMove = false;
      if (detectMove && removedItemsLength > 0) {
        for (var removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {
          index1 = removedItems[removeItemIndex1];
          if (matchItems(trimmed1, trimmed2, index1 - commonHead,
            index - commonHead, matchContext)) {
            // store position move as: [originalValue, newPosition, ARRAY_MOVE]
            result['_' + index1].splice(1, 2, index, ARRAY_MOVE);
            if (!includeValueOnMove) {
              // don't include moved value on diff, to save bytes
              result['_' + index1][0] = '';
            }

            index2 = index;
            child = new DiffContext(context.left[index1], context.right[index2]);
            context.push(child, index2);
            removedItems.splice(removeItemIndex1, 1);
            isMove = true;
            break;
          }
        }
      }
      if (!isMove) {
        // added
        result[index] = [array2[index]];
      }
    } else {
      // match, do inner diff
      index1 = seq.indices1[indexOnArray2] + commonHead;
      index2 = seq.indices2[indexOnArray2] + commonHead;
      child = new DiffContext(context.left[index1], context.right[index2]);
      context.push(child, index2);
    }
  }

  context.setResult(result).exit();

};
diffFilter.filterName = 'arrays';

var compare = {
  numerically: function(a, b) {
    return a - b;
  },
  numericallyBy: function(name) {
    return function(a, b) {
      return a[name] - b[name];
    };
  }
};

var patchFilter = function nestedPatchFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var index, index1;

  var delta = context.delta;
  var array = context.left;

  // first, separate removals, insertions and modifications
  var toRemove = [];
  var toInsert = [];
  var toModify = [];
  for (index in delta) {
    if (index !== '_t') {
      if (index[0] === '_') {
        // removed item from original array
        if (delta[index][2] === 0 || delta[index][2] === ARRAY_MOVE) {
          toRemove.push(parseInt(index.slice(1), 10));
        } else {
          throw new Error('only removal or move can be applied at original array indices' +
            ', invalid diff type: ' + delta[index][2]);
        }
      } else {
        if (delta[index].length === 1) {
          // added item at new array
          toInsert.push({
            index: parseInt(index, 10),
            value: delta[index][0]
          });
        } else {
          // modified item at new array
          toModify.push({
            index: parseInt(index, 10),
            delta: delta[index]
          });
        }
      }
    }
  }

  // remove items, in reverse order to avoid sawing our own floor
  toRemove = toRemove.sort(compare.numerically);
  for (index = toRemove.length - 1; index >= 0; index--) {
    index1 = toRemove[index];
    var indexDiff = delta['_' + index1];
    var removedValue = array.splice(index1, 1)[0];
    if (indexDiff[2] === ARRAY_MOVE) {
      // reinsert later
      toInsert.push({
        index: indexDiff[1],
        value: removedValue
      });
    }
  }

  // insert items, in reverse order to avoid moving our own floor
  toInsert = toInsert.sort(compare.numericallyBy('index'));
  var toInsertLength = toInsert.length;
  for (index = 0; index < toInsertLength; index++) {
    var insertion = toInsert[index];
    array.splice(insertion.index, 0, insertion.value);
  }

  // apply modifications
  var toModifyLength = toModify.length;
  var child;
  if (toModifyLength > 0) {
    for (index = 0; index < toModifyLength; index++) {
      var modification = toModify[index];
      child = new PatchContext(context.left[modification.index], modification.delta);
      context.push(child, modification.index);
    }
  }

  if (!context.children) {
    context.setResult(context.left).exit();
    return;
  }
  context.exit();
};
patchFilter.filterName = 'arrays';

var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    context.left[child.childName] = child.result;
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'arraysCollectChildren';

var reverseFilter = function arraysReverseFilter(context) {
  if (!context.nested) {
    if (context.delta[2] === ARRAY_MOVE) {
      context.newName = '_' + context.delta[1];
      context.setResult([context.delta[0], parseInt(context.childName.substr(1), 10), ARRAY_MOVE]).exit();
    }
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var name, child;
  for (name in context.delta) {
    if (name === '_t') {
      continue;
    }
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter.filterName = 'arrays';

var reverseArrayDeltaIndex = function(delta, index, itemDelta) {
  if (typeof index === 'string' && index[0] === '_') {
    return parseInt(index.substr(1), 10);
  } else if (isArray(itemDelta) && itemDelta[2] === 0) {
    return '_' + index;
  }

  var reverseIndex = +index;
  for (var deltaIndex in delta) {
    var deltaItem = delta[deltaIndex];
    if (isArray(deltaItem)) {
      if (deltaItem[2] === ARRAY_MOVE) {
        var moveFromIndex = parseInt(deltaIndex.substr(1), 10);
        var moveToIndex = deltaItem[1];
        if (moveToIndex === +index) {
          return moveFromIndex;
        }
        if (moveFromIndex <= reverseIndex && moveToIndex > reverseIndex) {
          reverseIndex++;
        } else if (moveFromIndex >= reverseIndex && moveToIndex < reverseIndex) {
          reverseIndex--;
        }
      } else if (deltaItem[2] === 0) {
        var deleteIndex = parseInt(deltaIndex.substr(1), 10);
        if (deleteIndex <= reverseIndex) {
          reverseIndex++;
        }
      } else if (deltaItem.length === 1 && deltaIndex <= reverseIndex) {
        reverseIndex--;
      }
    }
  }

  return reverseIndex;
};

var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child;
  var delta = {
    _t: 'a'
  };

  for (var index = 0; index < length; index++) {
    child = context.children[index];
    var name = child.newName;
    if (typeof name === 'undefined') {
      name = reverseArrayDeltaIndex(context.delta, child.childName, child.result);
    }
    if (delta[name] !== child.result) {
      delta[name] = child.result;
    }
  }
  context.setResult(delta).exit();
};
collectChildrenReverseFilter.filterName = 'arraysCollectChildren';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.collectChildrenPatchFilter = collectChildrenPatchFilter;
exports.reverseFilter = reverseFilter;
exports.collectChildrenReverseFilter = collectChildrenReverseFilter;

},{"../contexts/diff":97,"../contexts/patch":98,"../contexts/reverse":99,"./lcs":105}],104:[function(require,module,exports){
var diffFilter = function datesDiffFilter(context) {
  if (context.left instanceof Date) {
    if (context.right instanceof Date) {
      if (context.left.getTime() !== context.right.getTime()) {
        context.setResult([context.left, context.right]);
      } else {
        context.setResult(undefined);
      }
    } else {
      context.setResult([context.left, context.right]);
    }
    context.exit();
  } else if (context.right instanceof Date) {
    context.setResult([context.left, context.right]).exit();
  }
};
diffFilter.filterName = 'dates';

exports.diffFilter = diffFilter;

},{}],105:[function(require,module,exports){
/*

LCS implementation that supports arrays or strings

reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem

*/

var defaultMatch = function(array1, array2, index1, index2) {
  return array1[index1] === array2[index2];
};

var lengthMatrix = function(array1, array2, match, context) {
  var len1 = array1.length;
  var len2 = array2.length;
  var x, y;

  // initialize empty matrix of len1+1 x len2+1
  var matrix = [len1 + 1];
  for (x = 0; x < len1 + 1; x++) {
    matrix[x] = [len2 + 1];
    for (y = 0; y < len2 + 1; y++) {
      matrix[x][y] = 0;
    }
  }
  matrix.match = match;
  // save sequence lengths for each coordinate
  for (x = 1; x < len1 + 1; x++) {
    for (y = 1; y < len2 + 1; y++) {
      if (match(array1, array2, x - 1, y - 1, context)) {
        matrix[x][y] = matrix[x - 1][y - 1] + 1;
      } else {
        matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);
      }
    }
  }
  return matrix;
};

var backtrack = function(matrix, array1, array2, index1, index2, context) {
  if (index1 === 0 || index2 === 0) {
    return {
      sequence: [],
      indices1: [],
      indices2: []
    };
  }

  if (matrix.match(array1, array2, index1 - 1, index2 - 1, context)) {
    var subsequence = backtrack(matrix, array1, array2, index1 - 1, index2 - 1, context);
    subsequence.sequence.push(array1[index1 - 1]);
    subsequence.indices1.push(index1 - 1);
    subsequence.indices2.push(index2 - 1);
    return subsequence;
  }

  if (matrix[index1][index2 - 1] > matrix[index1 - 1][index2]) {
    return backtrack(matrix, array1, array2, index1, index2 - 1, context);
  } else {
    return backtrack(matrix, array1, array2, index1 - 1, index2, context);
  }
};

var get = function(array1, array2, match, context) {
  context = context || {};
  var matrix = lengthMatrix(array1, array2, match || defaultMatch, context);
  var result = backtrack(matrix, array1, array2, array1.length, array2.length, context);
  if (typeof array1 === 'string' && typeof array2 === 'string') {
    result.sequence = result.sequence.join('');
  }
  return result;
};

exports.get = get;

},{}],106:[function(require,module,exports){
var DiffContext = require('../contexts/diff').DiffContext;
var PatchContext = require('../contexts/patch').PatchContext;
var ReverseContext = require('../contexts/reverse').ReverseContext;

var collectChildrenDiffFilter = function collectChildrenDiffFilter(context) {
  if (!context || !context.children) {
    return;
  }
  var length = context.children.length;
  var child;
  var result = context.result;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (typeof child.result === 'undefined') {
      continue;
    }
    result = result || {};
    result[child.childName] = child.result;
  }
  if (result && context.leftIsArray) {
    result._t = 'a';
  }
  context.setResult(result).exit();
};
collectChildrenDiffFilter.filterName = 'collectChildren';

var objectsDiffFilter = function objectsDiffFilter(context) {
  if (context.leftIsArray || context.leftType !== 'object') {
    return;
  }

  var name, child, propertyFilter = context.options.propertyFilter;
  for (name in context.left) {
    if (!Object.prototype.hasOwnProperty.call(context.left, name)) {
      continue;
    }
    if (propertyFilter && !propertyFilter(name, context)) {
      continue;
    }
    child = new DiffContext(context.left[name], context.right[name]);
    context.push(child, name);
  }
  for (name in context.right) {
    if (!Object.prototype.hasOwnProperty.call(context.right, name)) {
      continue;
    }
    if (propertyFilter && !propertyFilter(name, context)) {
      continue;
    }
    if (typeof context.left[name] === 'undefined') {
      child = new DiffContext(undefined, context.right[name]);
      context.push(child, name);
    }
  }

  if (!context.children || context.children.length === 0) {
    context.setResult(undefined).exit();
    return;
  }
  context.exit();
};
objectsDiffFilter.filterName = 'objects';

var patchFilter = function nestedPatchFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name, child;
  for (name in context.delta) {
    child = new PatchContext(context.left[name], context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
patchFilter.filterName = 'objects';

var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (Object.prototype.hasOwnProperty.call(context.left, child.childName) && child.result === undefined) {
      delete context.left[child.childName];
    } else if (context.left[child.childName] !== child.result) {
      context.left[child.childName] = child.result;
    }
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'collectChildren';

var reverseFilter = function nestedReverseFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name, child;
  for (name in context.delta) {
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter.filterName = 'objects';

var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child;
  var delta = {};
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (delta[child.childName] !== child.result) {
      delta[child.childName] = child.result;
    }
  }
  context.setResult(delta).exit();
};
collectChildrenReverseFilter.filterName = 'collectChildren';

exports.collectChildrenDiffFilter = collectChildrenDiffFilter;
exports.objectsDiffFilter = objectsDiffFilter;
exports.patchFilter = patchFilter;
exports.collectChildrenPatchFilter = collectChildrenPatchFilter;
exports.reverseFilter = reverseFilter;
exports.collectChildrenReverseFilter = collectChildrenReverseFilter;

},{"../contexts/diff":97,"../contexts/patch":98,"../contexts/reverse":99}],107:[function(require,module,exports){
/* global diff_match_patch */
var TEXT_DIFF = 2;
var DEFAULT_MIN_LENGTH = 60;
var cachedDiffPatch = null;

var getDiffMatchPatch = function(required) {
  /*jshint camelcase: false */

  if (!cachedDiffPatch) {
    var instance;
    if (typeof diff_match_patch !== 'undefined') {
      // already loaded, probably a browser
      instance = typeof diff_match_patch === 'function' ?
        new diff_match_patch() : new diff_match_patch.diff_match_patch();
    } else if (typeof require === 'function') {
      try {
        var dmpModuleName = 'diff_match_patch_uncompressed';
        var dmp = require('../../public/external/' + dmpModuleName);
        instance = new dmp.diff_match_patch();
      } catch (err) {
        instance = null;
      }
    }
    if (!instance) {
      if (!required) {
        return null;
      }
      var error = new Error('text diff_match_patch library not found');
      error.diff_match_patch_not_found = true;
      throw error;
    }
    cachedDiffPatch = {
      diff: function(txt1, txt2) {
        return instance.patch_toText(instance.patch_make(txt1, txt2));
      },
      patch: function(txt1, patch) {
        var results = instance.patch_apply(instance.patch_fromText(patch), txt1);
        for (var i = 0; i < results[1].length; i++) {
          if (!results[1][i]) {
            var error = new Error('text patch failed');
            error.textPatchFailed = true;
          }
        }
        return results[0];
      }
    };
  }
  return cachedDiffPatch;
};

var diffFilter = function textsDiffFilter(context) {
  if (context.leftType !== 'string') {
    return;
  }
  var minLength = (context.options && context.options.textDiff &&
    context.options.textDiff.minLength) || DEFAULT_MIN_LENGTH;
  if (context.left.length < minLength ||
    context.right.length < minLength) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  // large text, try to use a text-diff algorithm
  var diffMatchPatch = getDiffMatchPatch();
  if (!diffMatchPatch) {
    // diff-match-patch library not available, fallback to regular string replace
    context.setResult([context.left, context.right]).exit();
    return;
  }
  var diff = diffMatchPatch.diff;
  context.setResult([diff(context.left, context.right), 0, TEXT_DIFF]).exit();
};
diffFilter.filterName = 'texts';

var patchFilter = function textsPatchFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }

  // text-diff, use a text-patch algorithm
  var patch = getDiffMatchPatch(true).patch;
  context.setResult(patch(context.left, context.delta[0])).exit();
};
patchFilter.filterName = 'texts';

var textDeltaReverse = function(delta) {
  var i, l, lines, line, lineTmp, header = null,
    headerRegex = /^@@ +\-(\d+),(\d+) +\+(\d+),(\d+) +@@$/,
    lineHeader, lineAdd, lineRemove;
  lines = delta.split('\n');
  for (i = 0, l = lines.length; i < l; i++) {
    line = lines[i];
    var lineStart = line.slice(0, 1);
    if (lineStart === '@') {
      header = headerRegex.exec(line);
      lineHeader = i;
      lineAdd = null;
      lineRemove = null;

      // fix header
      lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';
    } else if (lineStart === '+') {
      lineAdd = i;
      lines[i] = '-' + lines[i].slice(1);
      if (lines[i - 1].slice(0, 1) === '+') {
        // swap lines to keep default order (-+)
        lineTmp = lines[i];
        lines[i] = lines[i - 1];
        lines[i - 1] = lineTmp;
      }
    } else if (lineStart === '-') {
      lineRemove = i;
      lines[i] = '+' + lines[i].slice(1);
    }
  }
  return lines.join('\n');
};

var reverseFilter = function textsReverseFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }

  // text-diff, use a text-diff algorithm
  context.setResult([textDeltaReverse(context.delta[0]), 0, TEXT_DIFF]).exit();
};
reverseFilter.filterName = 'texts';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.reverseFilter = reverseFilter;

},{}],108:[function(require,module,exports){
var isArray = (typeof Array.isArray === 'function') ?
  // use native function
  Array.isArray :
  // use instanceof operator
  function(a) {
    return a instanceof Array;
  };

var diffFilter = function trivialMatchesDiffFilter(context) {
  if (context.left === context.right) {
    context.setResult(undefined).exit();
    return;
  }
  if (typeof context.left === 'undefined') {
    if (typeof context.right === 'function') {
      throw new Error('functions are not supported');
    }
    context.setResult([context.right]).exit();
    return;
  }
  if (typeof context.right === 'undefined') {
    context.setResult([context.left, 0, 0]).exit();
    return;
  }
  if (typeof context.left === 'function' || typeof context.right === 'function') {
    throw new Error('functions are not supported');
  }
  context.leftType = context.left === null ? 'null' : typeof context.left;
  context.rightType = context.right === null ? 'null' : typeof context.right;
  if (context.leftType !== context.rightType) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.leftType === 'boolean' || context.leftType === 'number') {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.leftType === 'object') {
    context.leftIsArray = isArray(context.left);
  }
  if (context.rightType === 'object') {
    context.rightIsArray = isArray(context.right);
  }
  if (context.leftIsArray !== context.rightIsArray) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
};
diffFilter.filterName = 'trivial';

var patchFilter = function trivialMatchesPatchFilter(context) {
  if (typeof context.delta === 'undefined') {
    context.setResult(context.left).exit();
    return;
  }
  context.nested = !isArray(context.delta);
  if (context.nested) {
    return;
  }
  if (context.delta.length === 1) {
    context.setResult(context.delta[0]).exit();
    return;
  }
  if (context.delta.length === 2) {
    context.setResult(context.delta[1]).exit();
    return;
  }
  if (context.delta.length === 3 && context.delta[2] === 0) {
    context.setResult(undefined).exit();
    return;
  }
};
patchFilter.filterName = 'trivial';

var reverseFilter = function trivialReferseFilter(context) {
  if (typeof context.delta === 'undefined') {
    context.setResult(context.delta).exit();
    return;
  }
  context.nested = !isArray(context.delta);
  if (context.nested) {
    return;
  }
  if (context.delta.length === 1) {
    context.setResult([context.delta[0], 0, 0]).exit();
    return;
  }
  if (context.delta.length === 2) {
    context.setResult([context.delta[1], context.delta[0]]).exit();
    return;
  }
  if (context.delta.length === 3 && context.delta[2] === 0) {
    context.setResult([context.delta[0]]).exit();
    return;
  }
};
reverseFilter.filterName = 'trivial';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.reverseFilter = reverseFilter;

},{}],109:[function(require,module,exports){

var environment = require('./environment');

var DiffPatcher = require('./diffpatcher').DiffPatcher;
exports.DiffPatcher = DiffPatcher;

exports.create = function(options){
  return new DiffPatcher(options);
};

exports.dateReviver = require('./date-reviver');

var defaultInstance;

exports.diff = function() {
  if (!defaultInstance) {
    defaultInstance = new DiffPatcher();
  }
  return defaultInstance.diff.apply(defaultInstance, arguments);
};

exports.patch = function() {
  if (!defaultInstance) {
    defaultInstance = new DiffPatcher();
  }
  return defaultInstance.patch.apply(defaultInstance, arguments);
};

exports.unpatch = function() {
  if (!defaultInstance) {
    defaultInstance = new DiffPatcher();
  }
  return defaultInstance.unpatch.apply(defaultInstance, arguments);
};

exports.reverse = function() {
  if (!defaultInstance) {
    defaultInstance = new DiffPatcher();
  }
  return defaultInstance.reverse.apply(defaultInstance, arguments);
};

if (environment.isBrowser) {
  exports.homepage = '{{package-homepage}}';
  exports.version = '{{package-version}}';
} else {
  var packageInfoModuleName = '../package.json';
  var packageInfo = require(packageInfoModuleName);
  exports.homepage = packageInfo.homepage;
  exports.version = packageInfo.version;

  var formatterModuleName = './formatters';
  var formatters = require(formatterModuleName);
  exports.formatters = formatters;
  // shortcut for console
  exports.console = formatters.console;
}

},{"./date-reviver":100,"./diffpatcher":101,"./environment":102}],110:[function(require,module,exports){
var Pipe = function Pipe(name) {
  this.name = name;
  this.filters = [];
};

Pipe.prototype.process = function(input) {
  if (!this.processor) {
    throw new Error('add this pipe to a processor before using it');
  }
  var debug = this.debug;
  var length = this.filters.length;
  var context = input;
  for (var index = 0; index < length; index++) {
    var filter = this.filters[index];
    if (debug) {
      this.log('filter: ' + filter.filterName);
    }
    filter(context);
    if (typeof context === 'object' && context.exiting) {
      context.exiting = false;
      break;
    }
  }
  if (!context.next && this.resultCheck) {
    this.resultCheck(context);
  }
};

Pipe.prototype.log = function(msg) {
  console.log('[jsondiffpatch] ' + this.name + ' pipe, ' + msg);
};

Pipe.prototype.append = function() {
  this.filters.push.apply(this.filters, arguments);
  return this;
};

Pipe.prototype.prepend = function() {
  this.filters.unshift.apply(this.filters, arguments);
  return this;
};

Pipe.prototype.indexOf = function(filterName) {
  if (!filterName) {
    throw new Error('a filter name is required');
  }
  for (var index = 0; index < this.filters.length; index++) {
    var filter = this.filters[index];
    if (filter.filterName === filterName) {
      return index;
    }
  }
  throw new Error('filter not found: ' + filterName);
};

Pipe.prototype.list = function() {
  var names = [];
  for (var index = 0; index < this.filters.length; index++) {
    var filter = this.filters[index];
    names.push(filter.filterName);
  }
  return names;
};

Pipe.prototype.after = function(filterName) {
  var index = this.indexOf(filterName);
  var params = Array.prototype.slice.call(arguments, 1);
  if (!params.length) {
    throw new Error('a filter is required');
  }
  params.unshift(index + 1, 0);
  Array.prototype.splice.apply(this.filters, params);
  return this;
};

Pipe.prototype.before = function(filterName) {
  var index = this.indexOf(filterName);
  var params = Array.prototype.slice.call(arguments, 1);
  if (!params.length) {
    throw new Error('a filter is required');
  }
  params.unshift(index, 0);
  Array.prototype.splice.apply(this.filters, params);
  return this;
};

Pipe.prototype.clear = function() {
  this.filters.length = 0;
  return this;
};

Pipe.prototype.shouldHaveResult = function(should) {
  if (should === false) {
    this.resultCheck = null;
    return;
  }
  if (this.resultCheck) {
    return;
  }
  var pipe = this;
  this.resultCheck = function(context) {
    if (!context.hasResult) {
      console.log(context);
      var error = new Error(pipe.name + ' failed');
      error.noResult = true;
      throw error;
    }
  };
  return this;
};

exports.Pipe = Pipe;

},{}],111:[function(require,module,exports){

var Processor = function Processor(options){
  this.selfOptions = options || {};
  this.pipes = {};
};

Processor.prototype.options = function(options) {
  if (options) {
    this.selfOptions = options;
  }
  return this.selfOptions;
};

Processor.prototype.pipe = function(name, pipe) {
  if (typeof name === 'string') {
    if (typeof pipe === 'undefined') {
      return this.pipes[name];
    } else {
      this.pipes[name] = pipe;
    }
  }
  if (name && name.name) {
    pipe = name;
    if (pipe.processor === this) { return pipe; }
    this.pipes[pipe.name] = pipe;
  }
  pipe.processor = this;
  return pipe;
};

Processor.prototype.process = function(input, pipe) {
  var context = input;
  context.options = this.options();
  var nextPipe = pipe || input.pipe || 'default';
  var lastPipe, lastContext;
  while (nextPipe) {
    if (typeof context.nextAfterChildren !== 'undefined') {
      // children processed and coming back to parent
      context.next = context.nextAfterChildren;
      context.nextAfterChildren = null;
    }

    if (typeof nextPipe === 'string') {
      nextPipe = this.pipe(nextPipe);
    }
    nextPipe.process(context);
    lastContext = context;
    lastPipe = nextPipe;
    nextPipe = null;
    if (context) {
      if (context.next) {
        context = context.next;
        nextPipe = lastContext.nextPipe || context.pipe || lastPipe;
      }
    }
  }
  return context.hasResult ? context.result : undefined;
};

exports.Processor = Processor;

},{}],112:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}],113:[function(require,module,exports){
(function (global){
'use strict';

var getSelection;
var doc = global.document;
var getSelectionRaw = require('./getSelectionRaw');
var getSelectionNullOp = require('./getSelectionNullOp');
var getSelectionSynthetic = require('./getSelectionSynthetic');
var isHost = require('./isHost');
if (isHost.method(global, 'getSelection')) {
  getSelection = getSelectionRaw;
} else if (typeof doc.selection === 'object' && doc.selection) {
  getSelection = getSelectionSynthetic;
} else {
  getSelection = getSelectionNullOp;
}

module.exports = getSelection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./getSelectionNullOp":114,"./getSelectionRaw":115,"./getSelectionSynthetic":116,"./isHost":117}],114:[function(require,module,exports){
'use strict';

function noop () {}

function getSelectionNullOp () {
  return {
    removeAllRanges: noop,
    addRange: noop
  };
}

module.exports = getSelectionNullOp;

},{}],115:[function(require,module,exports){
(function (global){
'use strict';

function getSelectionRaw () {
  return global.getSelection();
}

module.exports = getSelectionRaw;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],116:[function(require,module,exports){
(function (global){
'use strict';

var rangeToTextRange = require('./rangeToTextRange');
var doc = global.document;
var body = doc.body;
var GetSelectionProto = GetSelection.prototype;

function GetSelection (selection) {
  var self = this;
  var range = selection.createRange();

  this._selection = selection;
  this._ranges = [];

  if (selection.type === 'Control') {
    updateControlSelection(self);
  } else if (isTextRange(range)) {
    updateFromTextRange(self, range);
  } else {
    updateEmptySelection(self);
  }
}

GetSelectionProto.removeAllRanges = function () {
  var textRange;
  try {
    this._selection.empty();
    if (this._selection.type !== 'None') {
      textRange = body.createTextRange();
      textRange.select();
      this._selection.empty();
    }
  } catch (e) {
  }
  updateEmptySelection(this);
};

GetSelectionProto.addRange = function (range) {
  if (this._selection.type === 'Control') {
    addRangeToControlSelection(this, range);
  } else {
    rangeToTextRange(range).select();
    this._ranges[0] = range;
    this.rangeCount = 1;
    this.isCollapsed = this._ranges[0].collapsed;
    updateAnchorAndFocusFromRange(this, range, false);
  }
};

GetSelectionProto.setRanges = function (ranges) {
  this.removeAllRanges();
  var rangeCount = ranges.length;
  if (rangeCount > 1) {
    createControlSelection(this, ranges);
  } else if (rangeCount) {
    this.addRange(ranges[0]);
  }
};

GetSelectionProto.getRangeAt = function (index) {
  if (index < 0 || index >= this.rangeCount) {
    throw new Error('getRangeAt(): index out of bounds');
  } else {
    return this._ranges[index].cloneRange();
  }
};

GetSelectionProto.removeRange = function (range) {
  if (this._selection.type !== 'Control') {
    removeRangeManually(this, range);
    return;
  }
  var controlRange = this._selection.createRange();
  var rangeElement = getSingleElementFromRange(range);
  var newControlRange = body.createControlRange();
  var el;
  var removed = false;
  for (var i = 0, len = controlRange.length; i < len; ++i) {
    el = controlRange.item(i);
    if (el !== rangeElement || removed) {
      newControlRange.add(controlRange.item(i));
    } else {
      removed = true;
    }
  }
  newControlRange.select();
  updateControlSelection(this);
};

GetSelectionProto.eachRange = function (fn, returnValue) {
  var i = 0;
  var len = this._ranges.length;
  for (i = 0; i < len; ++i) {
    if (fn(this.getRangeAt(i))) {
      return returnValue;
    }
  }
};

GetSelectionProto.getAllRanges = function () {
  var ranges = [];
  this.eachRange(function (range) {
    ranges.push(range);
  });
  return ranges;
};

GetSelectionProto.setSingleRange = function (range) {
  this.removeAllRanges();
  this.addRange(range);
};

function createControlSelection (sel, ranges) {
  var controlRange = body.createControlRange();
  for (var i = 0, el, len = ranges.length; i < len; ++i) {
    el = getSingleElementFromRange(ranges[i]);
    try {
      controlRange.add(el);
    } catch (e) {
      throw new Error('setRanges(): Element could not be added to control selection');
    }
  }
  controlRange.select();
  updateControlSelection(sel);
}

function removeRangeManually (sel, range) {
  var ranges = sel.getAllRanges();
  sel.removeAllRanges();
  for (var i = 0, len = ranges.length; i < len; ++i) {
    if (!isSameRange(range, ranges[i])) {
      sel.addRange(ranges[i]);
    }
  }
  if (!sel.rangeCount) {
    updateEmptySelection(sel);
  }
}

function updateAnchorAndFocusFromRange (sel, range) {
  var anchorPrefix = 'start';
  var focusPrefix = 'end';
  sel.anchorNode = range[anchorPrefix + 'Container'];
  sel.anchorOffset = range[anchorPrefix + 'Offset'];
  sel.focusNode = range[focusPrefix + 'Container'];
  sel.focusOffset = range[focusPrefix + 'Offset'];
}

function updateEmptySelection (sel) {
  sel.anchorNode = sel.focusNode = null;
  sel.anchorOffset = sel.focusOffset = 0;
  sel.rangeCount = 0;
  sel.isCollapsed = true;
  sel._ranges.length = 0;
}

function rangeContainsSingleElement (rangeNodes) {
  if (!rangeNodes.length || rangeNodes[0].nodeType !== 1) {
    return false;
  }
  for (var i = 1, len = rangeNodes.length; i < len; ++i) {
    if (!isAncestorOf(rangeNodes[0], rangeNodes[i])) {
      return false;
    }
  }
  return true;
}

function getSingleElementFromRange (range) {
  var nodes = range.getNodes();
  if (!rangeContainsSingleElement(nodes)) {
    throw new Error('getSingleElementFromRange(): range did not consist of a single element');
  }
  return nodes[0];
}

function isTextRange (range) {
  return range && range.text !== void 0;
}

function updateFromTextRange (sel, range) {
  sel._ranges = [range];
  updateAnchorAndFocusFromRange(sel, range, false);
  sel.rangeCount = 1;
  sel.isCollapsed = range.collapsed;
}

function updateControlSelection (sel) {
  sel._ranges.length = 0;
  if (sel._selection.type === 'None') {
    updateEmptySelection(sel);
  } else {
    var controlRange = sel._selection.createRange();
    if (isTextRange(controlRange)) {
      updateFromTextRange(sel, controlRange);
    } else {
      sel.rangeCount = controlRange.length;
      var range;
      for (var i = 0; i < sel.rangeCount; ++i) {
        range = doc.createRange();
        range.selectNode(controlRange.item(i));
        sel._ranges.push(range);
      }
      sel.isCollapsed = sel.rangeCount === 1 && sel._ranges[0].collapsed;
      updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
    }
  }
}

function addRangeToControlSelection (sel, range) {
  var controlRange = sel._selection.createRange();
  var rangeElement = getSingleElementFromRange(range);
  var newControlRange = body.createControlRange();
  for (var i = 0, len = controlRange.length; i < len; ++i) {
    newControlRange.add(controlRange.item(i));
  }
  try {
    newControlRange.add(rangeElement);
  } catch (e) {
    throw new Error('addRange(): Element could not be added to control selection');
  }
  newControlRange.select();
  updateControlSelection(sel);
}

function isSameRange (left, right) {
  return (
    left.startContainer === right.startContainer &&
    left.startOffset === right.startOffset &&
    left.endContainer === right.endContainer &&
    left.endOffset === right.endOffset
  );
}

function isAncestorOf (ancestor, descendant) {
  var node = descendant;
  while (node.parentNode) {
    if (node.parentNode === ancestor) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function getSelection () {
  return new GetSelection(global.document.selection);
}

module.exports = getSelection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./rangeToTextRange":118}],117:[function(require,module,exports){
'use strict';

function isHostMethod (host, prop) {
  var type = typeof host[prop];
  return type === 'function' || !!(type === 'object' && host[prop]) || type === 'unknown';
}

function isHostProperty (host, prop) {
  return typeof host[prop] !== 'undefined';
}

function many (fn) {
  return function areHosted (host, props) {
    var i = props.length;
    while (i--) {
      if (!fn(host, props[i])) {
        return false;
      }
    }
    return true;
  };
}

module.exports = {
  method: isHostMethod,
  methods: many(isHostMethod),
  property: isHostProperty,
  properties: many(isHostProperty)
};

},{}],118:[function(require,module,exports){
(function (global){
'use strict';

var doc = global.document;
var body = doc.body;

function rangeToTextRange (p) {
  if (p.collapsed) {
    return createBoundaryTextRange({ node: p.startContainer, offset: p.startOffset }, true);
  }
  var startRange = createBoundaryTextRange({ node: p.startContainer, offset: p.startOffset }, true);
  var endRange = createBoundaryTextRange({ node: p.endContainer, offset: p.endOffset }, false);
  var textRange = body.createTextRange();
  textRange.setEndPoint('StartToStart', startRange);
  textRange.setEndPoint('EndToEnd', endRange);
  return textRange;
}

function isCharacterDataNode (node) {
  var t = node.nodeType;
  return t === 3 || t === 4 || t === 8 ;
}

function createBoundaryTextRange (p, starting) {
  var bound;
  var parent;
  var offset = p.offset;
  var workingNode;
  var childNodes;
  var range = body.createTextRange();
  var data = isCharacterDataNode(p.node);

  if (data) {
    bound = p.node;
    parent = bound.parentNode;
  } else {
    childNodes = p.node.childNodes;
    bound = offset < childNodes.length ? childNodes[offset] : null;
    parent = p.node;
  }

  workingNode = doc.createElement('span');
  workingNode.innerHTML = '&#feff;';

  if (bound) {
    parent.insertBefore(workingNode, bound);
  } else {
    parent.appendChild(workingNode);
  }

  range.moveToElementText(workingNode);
  range.collapse(!starting);
  parent.removeChild(workingNode);

  if (data) {
    range[starting ? 'moveStart' : 'moveEnd']('character', offset);
  }
  return range;
}

module.exports = rangeToTextRange;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],119:[function(require,module,exports){
'use strict';

var getSelection = require('./getSelection');
var setSelection = require('./setSelection');

module.exports = {
  get: getSelection,
  set: setSelection
};

},{"./getSelection":113,"./setSelection":120}],120:[function(require,module,exports){
(function (global){
'use strict';

var getSelection = require('./getSelection');
var rangeToTextRange = require('./rangeToTextRange');
var doc = global.document;

function setSelection (p) {
  if (doc.createRange) {
    modernSelection();
  } else {
    oldSelection();
  }

  function modernSelection () {
    var sel = getSelection();
    var range = doc.createRange();
    if (!p.startContainer) {
      return;
    }
    if (p.endContainer) {
      range.setEnd(p.endContainer, p.endOffset);
    } else {
      range.setEnd(p.startContainer, p.startOffset);
    }
    range.setStart(p.startContainer, p.startOffset);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function oldSelection () {
    rangeToTextRange(p).select();
  }
}

module.exports = setSelection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./getSelection":113,"./rangeToTextRange":118}],121:[function(require,module,exports){
'use strict';

var get = easyGet;
var set = easySet;

if (document.selection && document.selection.createRange) {
  get = hardGet;
  set = hardSet;
}

function easyGet (el) {
  return {
    start: el.selectionStart,
    end: el.selectionEnd
  };
}

function hardGet (el) {
  var active = document.activeElement;
  if (active !== el) {
    el.focus();
  }

  var range = document.selection.createRange();
  var bookmark = range.getBookmark();
  var original = el.value;
  var marker = getUniqueMarker(original);
  var parent = range.parentElement();
  if (parent === null || !inputs(parent)) {
    return result(0, 0);
  }
  range.text = marker + range.text + marker;

  var contents = el.value;

  el.value = original;
  range.moveToBookmark(bookmark);
  range.select();

  return result(contents.indexOf(marker), contents.lastIndexOf(marker) - marker.length);

  function result (start, end) {
    if (active !== el) { // don't disrupt pre-existing state
      if (active) {
        active.focus();
      } else {
        el.blur();
      }
    }
    return { start: start, end: end };
  }
}

function getUniqueMarker (contents) {
  var marker;
  do {
    marker = '@@marker.' + Math.random() * new Date();
  } while (contents.indexOf(marker) !== -1);
  return marker;
}

function inputs (el) {
  return ((el.tagName === 'INPUT' && el.type === 'text') || el.tagName === 'TEXTAREA');
}

function easySet (el, p) {
  el.selectionStart = parse(el, p.start);
  el.selectionEnd = parse(el, p.end);
}

function hardSet (el, p) {
  var range = el.createTextRange();

  if (p.start === 'end' && p.end === 'end') {
    range.collapse(false);
    range.select();
  } else {
    range.collapse(true);
    range.moveEnd('character', parse(el, p.end));
    range.moveStart('character', parse(el, p.start));
    range.select();
  }
}

function parse (el, value) {
  return value === 'end' ? el.value.length : value || 0;
}

function sell (el, p) {
  if (arguments.length === 2) {
    set(el, p);
  }
  return get(el);
}

module.exports = sell;

},{}],122:[function(require,module,exports){
'use strict';
module.exports = require('./lib/index');

},{"./lib/index":127}],123:[function(require,module,exports){
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

},{"./random/random-from-seed":130}],124:[function(require,module,exports){
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

},{"./alphabet":123,"./encode":126}],125:[function(require,module,exports){
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

},{"./alphabet":123}],126:[function(require,module,exports){
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

},{"./random/random-byte":129}],127:[function(require,module,exports){
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

},{"./alphabet":123,"./build":124,"./decode":125,"./encode":126,"./is-valid":128,"./util/cluster-worker-id":131}],128:[function(require,module,exports){
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

},{"./alphabet":123}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){
'use strict';

module.exports = 0;

},{}],132:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');
var requestBase = require('./request-base');
var isObject = require('./is-object');

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  root = this;
}

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Expose `request`.
 */

var request = module.exports = require('./request').bind(null, Request);

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
        }
      }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    return val.forEach(function(v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  }
  pairs.push(encodeURIComponent(key)
    + '=' + encodeURIComponent(val));
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
      // issue #876: return the http status code if the response parsing fails
      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter` and `requestBase`.
 */

Emitter(Request.prototype);
for (var key in requestBase) {
  Request.prototype[key] = requestBase[key];
}

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr && this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set responseType to `val`. Presently valid responseTypes are 'blob' and 
 * 'arraybuffer'.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (!options) {
    options = {
      type: 'basic'
    }
  }

  switch (options.type) {
    case 'basic':
      var str = btoa(user + ':' + pass);
      this.set('Authorization', 'Basic ' + str);
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
  }
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  this._getFormData().append(field, file, filename || file.name);
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this._header['content-type'];

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * @deprecated
 */
Response.prototype.parse = function serialize(fn){
  if (root.console) {
    console.warn("Client-side parse() method has been renamed to serialize(). This method is not compatible with superagent v2.0");
  }
  this.serialize(fn);
  return this;
};

Response.prototype.serialize = function serialize(fn){
  this._parser = fn;
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = 'download';
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  if (this.username && this.password) {
    xhr.open(this.method, this.url, true, this.username, this.password);
  } else {
    xhr.open(this.method, this.url, true);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};


/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-object":133,"./request":135,"./request-base":134,"emitter":82,"reduce":112}],133:[function(require,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null != obj && 'object' == typeof obj;
}

module.exports = isObject;

},{}],134:[function(require,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

exports.clearTimeout = function _clearTimeout(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */

exports.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

exports.timeout = function timeout(ms){
  this._timeout = ms;
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

exports.then = function then(fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Allow for extension
 */

exports.use = function use(fn) {
  fn(this);
  return this;
}


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

exports.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

exports.getHeader = exports.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

exports.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
exports.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
exports.field = function(name, val) {
  this._getFormData().append(name, val);
  return this;
};

},{"./is-object":133}],135:[function(require,module,exports){
// The node and browser modules expose versions of this with the
// appropriate constructor function bound as first argument
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(RequestConstructor, method, url) {
  // callback
  if ('function' == typeof url) {
    return new RequestConstructor('GET', method).end(url);
  }

  // url first
  if (2 == arguments.length) {
    return new RequestConstructor('GET', method);
  }

  return new RequestConstructor(method, url);
}

module.exports = request;

},{}],136:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],137:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./handle-dom":138,"./handle-swal-dom":140,"./utils":143,"dup":24}],138:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],139:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./handle-dom":138,"./handle-swal-dom":140,"dup":26}],140:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./default-params":136,"./handle-dom":138,"./injected-html":141,"./utils":143,"dup":27}],141:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"dup":28}],142:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"./handle-dom":138,"./handle-swal-dom":140,"./utils":143,"dup":29}],143:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],144:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./modules/default-params":136,"./modules/handle-click":137,"./modules/handle-dom":138,"./modules/handle-key":139,"./modules/handle-swal-dom":140,"./modules/set-params":142,"./modules/utils":143,"dup":31}],145:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":1}],146:[function(require,module,exports){
var assetUrl, imgUrl, siteUrl, url;

url = 'asset.framesia.com';

siteUrl = "https://framesia.com/";

assetUrl = "https://framesia.com/asset/frms/";

imgUrl = "https://res.cloudinary.com/frms/image/upload/";

module.exports = {
  siteUrl: siteUrl,
  assetUrl: assetUrl,
  imgUrl: imgUrl
};


},{}],147:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (Date, IMG_URL, Math, collections, undefined) {
if ( collections)
{
// iterate collections
;(function(){
  var $$obj = collections;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var collection = $$obj[$index];

buf.push("<br/><span height=\"100%\" class=\"i-user__ava--sq\"><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(collection.edited_at) / 1000 + 1) || 1) + "/col/" + (collection._id) + ".jpg", true, false)) + "/></span><span class=\"i-user--footer__name text-green\"><a" + (jade.attr("href", "/c/" + (collection.username) + "", true, false)) + ">" + (jade.escape((jade_interp = collection.name) == null ? '' : jade_interp)) + "</a></span><p class=\"i-user--footer__desc\">" + (jade.escape((jade_interp = collection.description) == null ? '' : jade_interp)) + "</p><p class=\"i-user--footer__username\"><a" + (jade.attr("href", "/c/" + (collection.username) + "", true, false)) + ">/" + (jade.escape((jade_interp = collection.username) == null ? '' : jade_interp)) + "</a></p><div class=\"divider\"></div><br/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var collection = $$obj[$index];

buf.push("<br/><span height=\"100%\" class=\"i-user__ava--sq\"><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(collection.edited_at) / 1000 + 1) || 1) + "/col/" + (collection._id) + ".jpg", true, false)) + "/></span><span class=\"i-user--footer__name text-green\"><a" + (jade.attr("href", "/c/" + (collection.username) + "", true, false)) + ">" + (jade.escape((jade_interp = collection.name) == null ? '' : jade_interp)) + "</a></span><p class=\"i-user--footer__desc\">" + (jade.escape((jade_interp = collection.description) == null ? '' : jade_interp)) + "</p><p class=\"i-user--footer__username\"><a" + (jade.attr("href", "/c/" + (collection.username) + "", true, false)) + ">/" + (jade.escape((jade_interp = collection.username) == null ? '' : jade_interp)) + "</a></p><div class=\"divider\"></div><br/>");
    }

  }
}).call(this);

}}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"IMG_URL" in locals_for_with?locals_for_with.IMG_URL:typeof IMG_URL!=="undefined"?IMG_URL:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"collections" in locals_for_with?locals_for_with.collections:typeof collections!=="undefined"?collections:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],148:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (Date, IMG_URL, Math, __, __n, comments, is_login, undefined) {
jade_mixins["time"] = jade_interp = function(date){
var block = (this && this.block), attributes = (this && this.attributes) || {};
date = new Date(date)
var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var seconds = Math.floor(( new Date()*1 - date*1 ) / 1000)
var minutes = Math.floor(seconds / 60)
var hours = Math.floor(minutes / 60)
var days = Math.floor(hours / 24)
var month = monthList[date.getMonth()]
var year = date.getFullYear()
var date = date.getDate()
if ( days > 7)
{
buf.push("<span>at " + (jade.escape((jade_interp = date) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = month) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = year) == null ? '' : jade_interp)) + "</span>");
}
else if ( days >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d day ago', '%d days ago', days)) == null ? '' : jade_interp)) + "</span>");
}
else if ( hours >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d hour ago', '%d hours ago', hours)) == null ? '' : jade_interp)) + "</span>");
}
else if ( minutes >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d minute ago', '%d minutes ago', minutes)) == null ? '' : jade_interp)) + "</span>");
}
else
{
buf.push("<span>" + (jade.escape((jade_interp = __('Just now')) == null ? '' : jade_interp)) + "</span>");
}
};
// iterate comments
;(function(){
  var $$obj = comments;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var comment = $$obj[$index];

buf.push("<div" + (jade.attr("id", "" + (comment._id) + "", true, false)) + " class=\"b-comment__item\"><div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(comment.user.updated_at) / 1000 + 1) || 1) + "/ava/" + (comment.user._id) + ".jpg", true, false)) + "/></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/" + (comment.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = comment.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"b-comment__date i-user--inline__mod\">");
jade_mixins["time"](comment.created_at);
buf.push("</span></div>");
if ( !comment.is_published )
{
buf.push("<button class=\"i-button i-button--small i-button--w-green pull-right is-private\">Private</button>");
}
buf.push("<div class=\"b-comment__content\">" + (((jade_interp = comment.content.replace(/@([a-z0-9_]{3,16})/g, "<a href='/$1'>@$1</a>")) == null ? '' : jade_interp)) + "<div class=\"b-post__button-wrap\">");
if ( is_login)
{
buf.push("<button" + (jade.attr("data-comment-id", "" + (comment._id) + "", true, false)) + (jade.cls(['b-post__button','js-comment-love',"" + ( comment.is_loving ? 'is-loving' : '') + ""], [null,null,true])) + "><b>" + (jade.escape((jade_interp = comment.love_count) == null ? '' : jade_interp)) + "</b><i class=\"f-icon-love\"></i></button><button" + (jade.attr("data-username", "" + (comment.user.username) + "", true, false)) + (jade.attr("data-comment-id", "" + (comment._id) + "", true, false)) + " class=\"b-post__button js-comment-reply\"><i class=\"f-icon-reply\"></i></button>");
if ( comment.is_yours)
{
buf.push("<button" + (jade.attr("data-comment-id", "" + (comment._id) + "", true, false)) + " class=\"b-post__button i-button--small js-comment-delete pull-right\"><i class=\"icon-del\"></i></button>");
}
}
else
{
buf.push("<button class=\"b-post__button\"><b>" + (jade.escape((jade_interp = comment.love_count) == null ? '' : jade_interp)) + "</b><i class=\"f-icon-love\"></i></button>");
}
buf.push("</div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var comment = $$obj[$index];

buf.push("<div" + (jade.attr("id", "" + (comment._id) + "", true, false)) + " class=\"b-comment__item\"><div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(comment.user.updated_at) / 1000 + 1) || 1) + "/ava/" + (comment.user._id) + ".jpg", true, false)) + "/></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/" + (comment.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = comment.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"b-comment__date i-user--inline__mod\">");
jade_mixins["time"](comment.created_at);
buf.push("</span></div>");
if ( !comment.is_published )
{
buf.push("<button class=\"i-button i-button--small i-button--w-green pull-right is-private\">Private</button>");
}
buf.push("<div class=\"b-comment__content\">" + (((jade_interp = comment.content.replace(/@([a-z0-9_]{3,16})/g, "<a href='/$1'>@$1</a>")) == null ? '' : jade_interp)) + "<div class=\"b-post__button-wrap\">");
if ( is_login)
{
buf.push("<button" + (jade.attr("data-comment-id", "" + (comment._id) + "", true, false)) + (jade.cls(['b-post__button','js-comment-love',"" + ( comment.is_loving ? 'is-loving' : '') + ""], [null,null,true])) + "><b>" + (jade.escape((jade_interp = comment.love_count) == null ? '' : jade_interp)) + "</b><i class=\"f-icon-love\"></i></button><button" + (jade.attr("data-username", "" + (comment.user.username) + "", true, false)) + (jade.attr("data-comment-id", "" + (comment._id) + "", true, false)) + " class=\"b-post__button js-comment-reply\"><i class=\"f-icon-reply\"></i></button>");
if ( comment.is_yours)
{
buf.push("<button" + (jade.attr("data-comment-id", "" + (comment._id) + "", true, false)) + " class=\"b-post__button i-button--small js-comment-delete pull-right\"><i class=\"icon-del\"></i></button>");
}
}
else
{
buf.push("<button class=\"b-post__button\"><b>" + (jade.escape((jade_interp = comment.love_count) == null ? '' : jade_interp)) + "</b><i class=\"f-icon-love\"></i></button>");
}
buf.push("</div></div></div>");
    }

  }
}).call(this);
}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"IMG_URL" in locals_for_with?locals_for_with.IMG_URL:typeof IMG_URL!=="undefined"?IMG_URL:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"__" in locals_for_with?locals_for_with.__:typeof __!=="undefined"?__:undefined,"__n" in locals_for_with?locals_for_with.__n:typeof __n!=="undefined"?__n:undefined,"comments" in locals_for_with?locals_for_with.comments:typeof comments!=="undefined"?comments:undefined,"is_login" in locals_for_with?locals_for_with.is_login:typeof is_login!=="undefined"?is_login:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],149:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (Date, IMG_URL, Math, __, __n, notifs, undefined) {
jade_mixins["time"] = jade_interp = function(date){
var block = (this && this.block), attributes = (this && this.attributes) || {};
date = new Date(date)
var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var seconds = Math.floor(( new Date()*1 - date*1 ) / 1000)
var minutes = Math.floor(seconds / 60)
var hours = Math.floor(minutes / 60)
var days = Math.floor(hours / 24)
var month = monthList[date.getMonth()]
var year = date.getFullYear()
var date = date.getDate()
if ( days > 7)
{
buf.push("<span>at " + (jade.escape((jade_interp = date) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = month) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = year) == null ? '' : jade_interp)) + "</span>");
}
else if ( days >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d day ago', '%d days ago', days)) == null ? '' : jade_interp)) + "</span>");
}
else if ( hours >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d hour ago', '%d hours ago', hours)) == null ? '' : jade_interp)) + "</span>");
}
else if ( minutes >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d minute ago', '%d minutes ago', minutes)) == null ? '' : jade_interp)) + "</span>");
}
else
{
buf.push("<span>" + (jade.escape((jade_interp = __('Just now')) == null ? '' : jade_interp)) + "</span>");
}
};
// iterate notifs
;(function(){
  var $$obj = notifs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var notif = $$obj[$index];

var url = ''
var text = ''
var data = ''
switch (notif.notif_type){
case 'love-post':
url = '/p/' + notif.object.post_id.slug
text = __('loved your article')
data = notif.object.post_id.title
  break;
case 'love-comment':
url = '/p/' + notif.object.post_id.slug + '?comment=' + notif.object.comment_id
text = __('loved your comment')
data = notif.object.comment_id.content
  break;
case 'follow':
url = '/u/' + notif.from.username
text = __('following you')
  break;
case 'comment':
url = '/p/' + notif.object.post_id.slug + '?comment=' + notif.object.comment_id
text = __('commented your article')
data = notif.object.comment_id.content
  break;
case 'mention-comment':
url = '/p/' + notif.object.post_id.slug + '?comment=' + notif.object.comment_id
text = __('mentioned you')
data = notif.object.comment_id.content
  break;
case 'repost':
url = '/p/' + notif.object.post_id.slug
text = __('reposted your article')
data = notif.object.post_id.title
  break;
case 'respond':
url = '/p/' + notif.object.post_id.slug
text = __('responded your article')
data = notif.object.post_id.title
  break;
case '':
url = '/p/' + notif.object.post_id.slug
text = __('responded your article')
data = notif.object.post_id.title
  break;
}
buf.push("<div" + (jade.attr("data-notif-id", "" + (notif._id) + "", true, false)) + (jade.cls(['b-notif__item',"" + ( notif.is_read == true ? 'is-read' : '' ) + ""], [null,true])) + "><a" + (jade.attr("href", "" + (url) + "", true, false)) + "><span class=\"i-user--inline__ava\"><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(notif.from.updated_at) / 1000 + 1) || 1) + "/ava/" + (notif.from._id) + ".jpg", true, false)) + "/></span><span class=\"b-notif__user\">" + (jade.escape((jade_interp = notif.from.name) == null ? '' : jade_interp)) + " </span><span> " + (jade.escape((jade_interp = text) == null ? '' : jade_interp)) + "</span><span> &middot;  </span>");
jade_mixins["time"](notif.created_at);
buf.push("<br/><div class=\"b-notif__data\"><b>" + (jade.escape((jade_interp = data) == null ? '' : jade_interp)) + "</b></div><div class=\"clear\"></div></a></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var notif = $$obj[$index];

var url = ''
var text = ''
var data = ''
switch (notif.notif_type){
case 'love-post':
url = '/p/' + notif.object.post_id.slug
text = __('loved your article')
data = notif.object.post_id.title
  break;
case 'love-comment':
url = '/p/' + notif.object.post_id.slug + '?comment=' + notif.object.comment_id
text = __('loved your comment')
data = notif.object.comment_id.content
  break;
case 'follow':
url = '/u/' + notif.from.username
text = __('following you')
  break;
case 'comment':
url = '/p/' + notif.object.post_id.slug + '?comment=' + notif.object.comment_id
text = __('commented your article')
data = notif.object.comment_id.content
  break;
case 'mention-comment':
url = '/p/' + notif.object.post_id.slug + '?comment=' + notif.object.comment_id
text = __('mentioned you')
data = notif.object.comment_id.content
  break;
case 'repost':
url = '/p/' + notif.object.post_id.slug
text = __('reposted your article')
data = notif.object.post_id.title
  break;
case 'respond':
url = '/p/' + notif.object.post_id.slug
text = __('responded your article')
data = notif.object.post_id.title
  break;
case '':
url = '/p/' + notif.object.post_id.slug
text = __('responded your article')
data = notif.object.post_id.title
  break;
}
buf.push("<div" + (jade.attr("data-notif-id", "" + (notif._id) + "", true, false)) + (jade.cls(['b-notif__item',"" + ( notif.is_read == true ? 'is-read' : '' ) + ""], [null,true])) + "><a" + (jade.attr("href", "" + (url) + "", true, false)) + "><span class=\"i-user--inline__ava\"><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(notif.from.updated_at) / 1000 + 1) || 1) + "/ava/" + (notif.from._id) + ".jpg", true, false)) + "/></span><span class=\"b-notif__user\">" + (jade.escape((jade_interp = notif.from.name) == null ? '' : jade_interp)) + " </span><span> " + (jade.escape((jade_interp = text) == null ? '' : jade_interp)) + "</span><span> &middot;  </span>");
jade_mixins["time"](notif.created_at);
buf.push("<br/><div class=\"b-notif__data\"><b>" + (jade.escape((jade_interp = data) == null ? '' : jade_interp)) + "</b></div><div class=\"clear\"></div></a></div>");
    }

  }
}).call(this);
}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"IMG_URL" in locals_for_with?locals_for_with.IMG_URL:typeof IMG_URL!=="undefined"?IMG_URL:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"__" in locals_for_with?locals_for_with.__:typeof __!=="undefined"?__:undefined,"__n" in locals_for_with?locals_for_with.__n:typeof __n!=="undefined"?__n:undefined,"notifs" in locals_for_with?locals_for_with.notifs:typeof notifs!=="undefined"?notifs:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],150:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (Date, Math, __, __n, post, undefined) {
jade_mixins["time"] = jade_interp = function(date){
var block = (this && this.block), attributes = (this && this.attributes) || {};
date = new Date(date)
var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var seconds = Math.floor(( new Date()*1 - date*1 ) / 1000)
var minutes = Math.floor(seconds / 60)
var hours = Math.floor(minutes / 60)
var days = Math.floor(hours / 24)
var month = monthList[date.getMonth()]
var year = date.getFullYear()
var date = date.getDate()
if ( days > 7)
{
buf.push("<span>at " + (jade.escape((jade_interp = date) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = month) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = year) == null ? '' : jade_interp)) + "</span>");
}
else if ( days >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d day ago', '%d days ago', days)) == null ? '' : jade_interp)) + "</span>");
}
else if ( hours >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d hour ago', '%d hours ago', hours)) == null ? '' : jade_interp)) + "</span>");
}
else if ( minutes >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d minute ago', '%d minutes ago', minutes)) == null ? '' : jade_interp)) + "</span>");
}
else
{
buf.push("<span>" + (jade.escape((jade_interp = __('Just now')) == null ? '' : jade_interp)) + "</span>");
}
};
// iterate post
;(function(){
  var $$obj = post;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div" + (jade.attr("data-edited-at", "" + (item.edited_at) + "", true, false)) + " class=\"b-post__item\"><div class=\"i-user__mod\"><span>" + (jade.escape((jade_interp = __('Created at')) == null ? '' : jade_interp)) + " ");
jade_mixins["time"](item.created_at);
buf.push("</span><span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span><span>" + (jade.escape((jade_interp = __('Last edited at')) == null ? '' : jade_interp)) + " ");
jade_mixins["time"](item.edited_at);
buf.push("</span><span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span><span>" + (jade.escape((jade_interp = item.word_count) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = __('words')) == null ? '' : jade_interp)) + "</span><span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>");
var readTime = Math.round(item.reading_time / 60000)
buf.push("<span>" + (jade.escape((jade_interp =  readTime == 0 ? 1 : readTime ) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = __('min read')) == null ? '' : jade_interp)) + "</span><br/><br/></div><a" + (jade.attr("href", "/p/" + (item._id) + "", true, false)) + "><h2 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h2><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p></a><a" + (jade.attr("href", "/p/" + (item._id) + "/edit", true, false)) + "><button class=\"i-button i-button--small i-button--w-blue\">" + (jade.escape((jade_interp = __('Edit')) == null ? '' : jade_interp)) + "</button></a>");
if ( !item.is_published)
{
buf.push("<button class=\"i-button i-button--small i-button--w-green js-publish-article\">" + (jade.escape((jade_interp = __('Publish')) == null ? '' : jade_interp)) + "</button>");
}
buf.push("<button class=\"i-button i-button--small i-button--w-red pull-right js-delete-article\">" + (jade.escape((jade_interp = __('Delete')) == null ? '' : jade_interp)) + "</button><form method=\"POST\" action=\"/p/delete-article\" class=\"js-delete-article-form\"><input name=\"id\" type=\"hidden\"" + (jade.attr("value", "" + (item._id) + "", true, false)) + "/>");
if ( item.is_published)
{
buf.push("<input name=\"url\" type=\"hidden\" value=\"/me/articles\"/>");
}
else
{
buf.push("<input name=\"url\" type=\"hidden\" value=\"/me/drafts\"/>");
}
buf.push("</form>");
if ( !item.is_published)
{
buf.push("<form method=\"POST\" action=\"/p/publish-article\" class=\"js-publish-article-form\"><input name=\"id\" type=\"hidden\"" + (jade.attr("value", "" + (item._id) + "", true, false)) + "/></form>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div" + (jade.attr("data-edited-at", "" + (item.edited_at) + "", true, false)) + " class=\"b-post__item\"><div class=\"i-user__mod\"><span>" + (jade.escape((jade_interp = __('Created at')) == null ? '' : jade_interp)) + " ");
jade_mixins["time"](item.created_at);
buf.push("</span><span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span><span>" + (jade.escape((jade_interp = __('Last edited at')) == null ? '' : jade_interp)) + " ");
jade_mixins["time"](item.edited_at);
buf.push("</span><span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span><span>" + (jade.escape((jade_interp = item.word_count) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = __('words')) == null ? '' : jade_interp)) + "</span><span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>");
var readTime = Math.round(item.reading_time / 60000)
buf.push("<span>" + (jade.escape((jade_interp =  readTime == 0 ? 1 : readTime ) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = __('min read')) == null ? '' : jade_interp)) + "</span><br/><br/></div><a" + (jade.attr("href", "/p/" + (item._id) + "", true, false)) + "><h2 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h2><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p></a><a" + (jade.attr("href", "/p/" + (item._id) + "/edit", true, false)) + "><button class=\"i-button i-button--small i-button--w-blue\">" + (jade.escape((jade_interp = __('Edit')) == null ? '' : jade_interp)) + "</button></a>");
if ( !item.is_published)
{
buf.push("<button class=\"i-button i-button--small i-button--w-green js-publish-article\">" + (jade.escape((jade_interp = __('Publish')) == null ? '' : jade_interp)) + "</button>");
}
buf.push("<button class=\"i-button i-button--small i-button--w-red pull-right js-delete-article\">" + (jade.escape((jade_interp = __('Delete')) == null ? '' : jade_interp)) + "</button><form method=\"POST\" action=\"/p/delete-article\" class=\"js-delete-article-form\"><input name=\"id\" type=\"hidden\"" + (jade.attr("value", "" + (item._id) + "", true, false)) + "/>");
if ( item.is_published)
{
buf.push("<input name=\"url\" type=\"hidden\" value=\"/me/articles\"/>");
}
else
{
buf.push("<input name=\"url\" type=\"hidden\" value=\"/me/drafts\"/>");
}
buf.push("</form>");
if ( !item.is_published)
{
buf.push("<form method=\"POST\" action=\"/p/publish-article\" class=\"js-publish-article-form\"><input name=\"id\" type=\"hidden\"" + (jade.attr("value", "" + (item._id) + "", true, false)) + "/></form>");
}
buf.push("</div>");
    }

  }
}).call(this);
}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"__" in locals_for_with?locals_for_with.__:typeof __!=="undefined"?__:undefined,"__n" in locals_for_with?locals_for_with.__n:typeof __n!=="undefined"?__n:undefined,"post" in locals_for_with?locals_for_with.post:typeof post!=="undefined"?post:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],151:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (Date, IMG_URL, Math, __, __n, post, undefined) {
jade_mixins["time"] = jade_interp = function(date){
var block = (this && this.block), attributes = (this && this.attributes) || {};
date = new Date(date)
var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var seconds = Math.floor(( new Date()*1 - date*1 ) / 1000)
var minutes = Math.floor(seconds / 60)
var hours = Math.floor(minutes / 60)
var days = Math.floor(hours / 24)
var month = monthList[date.getMonth()]
var year = date.getFullYear()
var date = date.getDate()
if ( days > 7)
{
buf.push("<span>at " + (jade.escape((jade_interp = date) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = month) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = year) == null ? '' : jade_interp)) + "</span>");
}
else if ( days >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d day ago', '%d days ago', days)) == null ? '' : jade_interp)) + "</span>");
}
else if ( hours >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d hour ago', '%d hours ago', hours)) == null ? '' : jade_interp)) + "</span>");
}
else if ( minutes >= 1)
{
buf.push("<span>" + (jade.escape((jade_interp = __n('%d minute ago', '%d minutes ago', minutes)) == null ? '' : jade_interp)) + "</span>");
}
else
{
buf.push("<span>" + (jade.escape((jade_interp = __('Just now')) == null ? '' : jade_interp)) + "</span>");
}
};
jade_mixins["read"] = jade_interp = function(reading_time){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var readTime = ( reading_time / 60000).toFixed(1)
buf.push("<span>" + (jade.escape((jade_interp =  readTime ) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = __('min read')) == null ? '' : jade_interp)) + "</span>");
};
// iterate post
;(function(){
  var $$obj = post;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div" + (jade.attr("data-published-at", "" + (item.published_at) + "", true, false)) + " class=\"b-post__item\">");
if ( item.is_repost == true)
{
buf.push("<div class=\"b-post__head\"><div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(item.user.updated_at) / 1000 + 1) || 1) + "/ava/" + (item.user._id) + ".jpg", true, false)) + "/></a></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"i-user--inline__mod\"><span>  <i class=\"f-icon-repost\"></i> " + (jade.escape((jade_interp = __('suggested')) == null ? '' : jade_interp)) + "  </span>");
jade_mixins["time"](item.published_at);
buf.push("<span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>");
jade_mixins["read"](item.repost.reading_time);
buf.push("</span><div class=\"clear\"></div></div></div><div class=\"b-post__repost\"><a" + (jade.attr("href", "/p/" + (item.repost.slug) + "", true, false)) + "><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.repost.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.repost.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\">" + (jade.escape((jade_interp = __('By')) == null ? '' : jade_interp)) + "  <a" + (jade.attr("href", "/u/" + (item.repost.user.username) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.repost.user.name) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span><b>" + (jade.escape((jade_interp = item.repost.love_count || 0) == null ? '' : jade_interp)) + " <span class=\"text-red\">&#9825;</span></b></p></div></a></div><div class=\"clear\"></div>");
}
else if ( item.is_response == true)
{
buf.push("<div class=\"b-post__head\"><div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(item.user.updated_at) / 1000 + 1) || 1) + "/ava/" + (item.user._id) + ".jpg", true, false)) + "/></a></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"i-user--inline__mod\"><span>  <i class=\"f-icon-reply\"></i> " + (jade.escape((jade_interp = __('responded')) == null ? '' : jade_interp)) + "  </span>");
jade_mixins["time"](item.published_at);
buf.push("<span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>");
jade_mixins["read"](item.reading_time);
buf.push("</span><div class=\"clear\"></div></div></div><div class=\"b-post__response\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><div class=\"b-post__response__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.response.title) == null ? '' : jade_interp)) + "</h3><p class=\"i-user--inline i-user--inline__mod\">" + (jade.escape((jade_interp = __('By')) == null ? '' : jade_interp)) + "  <a" + (jade.attr("href", "/u/" + (item.response.user.username) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.response.user.name) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span><b>" + (jade.escape((jade_interp = item.response.love_count || 0) == null ? '' : jade_interp)) + " <span class=\"text-red\">&#9825;</span></b></p></div></a></div>");
if ( item.is_cover)
{
buf.push("<div class=\"b-post__right\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "v" + (Math.floor(new Date(item.edited_at) / 1000) || 1) + "/post/" + (item._id) + "-cover.jpg", true, false)) + " alt=\"\" class=\"b-post__cover\"/></a></div>");
}
buf.push("<div" + (jade.cls(['b-post__left',item.is_cover ? "" : "is-full"], [null,true])) + "><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p></a><div class=\"b-post__button-wrap\"><button" + (jade.attr("data-article-id", "" + (item._id) + "", true, false)) + (jade.cls(['b-post__button','js-article-love',item.is_loving ? "is-loving" : ""], [null,null,true])) + "><b>" + (jade.escape((jade_interp = item.love_count) == null ? '' : jade_interp)) + "</b><i class=\"f-icon-love\">        </i></button></div></div><div class=\"clear\"></div>");
}
else if ( item.is_repost_link == true)
{
buf.push("<div class=\"b-post__head\"><div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "_fill,w_50/v" + (Math.floor(new Date(item.user.updated_at) / 1000) || 1) + "/ava/" + (item.user._id) + ".jpg", true, false)) + "/></a></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"i-user--inline__mod\"><span>  <i class=\"f-icon-repost\"></i> " + (jade.escape((jade_interp = __('suggested')) == null ? '' : jade_interp)) + "  </span>");
jade_mixins["time"](item.published_at);
buf.push("<span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span></span><div class=\"clear\"></div></div></div><div class=\"b-post__repost\"><a" + (jade.attr("href", "/p/" + (item.repost_link.slug) + "", true, false)) + "><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.repost_link.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.repost_link.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\"><a" + (jade.attr("href", "http://" + (item.repost_link.url) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.repost_link.source ? item.repost_link.source : item.repost_link.hostname) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span></p></div></a></div>");
}
else if ( item.is_link == true)
{
buf.push("<div class=\"b-post__repost\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\"><a" + (jade.attr("href", "http://" + (item.url) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.source ? item.source : item.hostname) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span></p></div></a></div>");
}
else
{
buf.push("<div class=\"b-post__head\">");
if ( item.from_collection)
{
if ( item.from_collection.length > 0)
{
buf.push("<div class=\"b-post__from\">");
// iterate item.from_collection
;(function(){
  var $$obj = item.from_collection;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var col = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/c/" + (col.username) + "", true, false)) + "><i class=\"f-icon-book\"></i><b>" + (jade.escape((jade_interp = col.name) == null ? '' : jade_interp)) + "</b></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var col = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/c/" + (col.username) + "", true, false)) + "><i class=\"f-icon-book\"></i><b>" + (jade.escape((jade_interp = col.name) == null ? '' : jade_interp)) + "</b></a>");
    }

  }
}).call(this);

buf.push("</div>");
}
}
buf.push("<div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(item.user.updated_at) / 1000 + 1) || 1) + "/ava/" + (item.user._id) + ".jpg", true, false)) + "/></a></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"i-user--inline__mod\"><span> " + (jade.escape((jade_interp = __('published')) == null ? '' : jade_interp)) + "  </span>");
jade_mixins["time"](item.published_at);
buf.push("<span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>");
jade_mixins["read"](item.reading_time);
buf.push("</span><div class=\"clear\"></div></div></div>");
if ( item.is_cover)
{
buf.push("<div class=\"b-post__right\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_240,h_160/v" + (Math.floor(new Date(item.edited_at) / 1000) || 1) + "/post/" + (item._id) + "-cover.jpg", true, false)) + " alt=\"\" class=\"b-post__cover\"/></a></div>");
}
buf.push("<div" + (jade.cls(['b-post__left',item.is_cover ? "" : "is-full"], [null,true])) + "><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p></a><div class=\"b-post__button-wrap\"><button" + (jade.attr("data-article-id", "" + (item._id) + "", true, false)) + (jade.cls(['b-post__button','js-article-love',item.is_loving ? "is-loving" : ""], [null,null,true])) + "><b>" + (jade.escape((jade_interp = item.love_count) == null ? '' : jade_interp)) + "</b><i class=\"f-icon-love\"></i></button></div></div><div class=\"clear\"></div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div" + (jade.attr("data-published-at", "" + (item.published_at) + "", true, false)) + " class=\"b-post__item\">");
if ( item.is_repost == true)
{
buf.push("<div class=\"b-post__head\"><div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(item.user.updated_at) / 1000 + 1) || 1) + "/ava/" + (item.user._id) + ".jpg", true, false)) + "/></a></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"i-user--inline__mod\"><span>  <i class=\"f-icon-repost\"></i> " + (jade.escape((jade_interp = __('suggested')) == null ? '' : jade_interp)) + "  </span>");
jade_mixins["time"](item.published_at);
buf.push("<span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>");
jade_mixins["read"](item.repost.reading_time);
buf.push("</span><div class=\"clear\"></div></div></div><div class=\"b-post__repost\"><a" + (jade.attr("href", "/p/" + (item.repost.slug) + "", true, false)) + "><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.repost.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.repost.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\">" + (jade.escape((jade_interp = __('By')) == null ? '' : jade_interp)) + "  <a" + (jade.attr("href", "/u/" + (item.repost.user.username) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.repost.user.name) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span><b>" + (jade.escape((jade_interp = item.repost.love_count || 0) == null ? '' : jade_interp)) + " <span class=\"text-red\">&#9825;</span></b></p></div></a></div><div class=\"clear\"></div>");
}
else if ( item.is_response == true)
{
buf.push("<div class=\"b-post__head\"><div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(item.user.updated_at) / 1000 + 1) || 1) + "/ava/" + (item.user._id) + ".jpg", true, false)) + "/></a></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"i-user--inline__mod\"><span>  <i class=\"f-icon-reply\"></i> " + (jade.escape((jade_interp = __('responded')) == null ? '' : jade_interp)) + "  </span>");
jade_mixins["time"](item.published_at);
buf.push("<span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>");
jade_mixins["read"](item.reading_time);
buf.push("</span><div class=\"clear\"></div></div></div><div class=\"b-post__response\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><div class=\"b-post__response__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.response.title) == null ? '' : jade_interp)) + "</h3><p class=\"i-user--inline i-user--inline__mod\">" + (jade.escape((jade_interp = __('By')) == null ? '' : jade_interp)) + "  <a" + (jade.attr("href", "/u/" + (item.response.user.username) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.response.user.name) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span><b>" + (jade.escape((jade_interp = item.response.love_count || 0) == null ? '' : jade_interp)) + " <span class=\"text-red\">&#9825;</span></b></p></div></a></div>");
if ( item.is_cover)
{
buf.push("<div class=\"b-post__right\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "v" + (Math.floor(new Date(item.edited_at) / 1000) || 1) + "/post/" + (item._id) + "-cover.jpg", true, false)) + " alt=\"\" class=\"b-post__cover\"/></a></div>");
}
buf.push("<div" + (jade.cls(['b-post__left',item.is_cover ? "" : "is-full"], [null,true])) + "><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p></a><div class=\"b-post__button-wrap\"><button" + (jade.attr("data-article-id", "" + (item._id) + "", true, false)) + (jade.cls(['b-post__button','js-article-love',item.is_loving ? "is-loving" : ""], [null,null,true])) + "><b>" + (jade.escape((jade_interp = item.love_count) == null ? '' : jade_interp)) + "</b><i class=\"f-icon-love\">        </i></button></div></div><div class=\"clear\"></div>");
}
else if ( item.is_repost_link == true)
{
buf.push("<div class=\"b-post__head\"><div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "_fill,w_50/v" + (Math.floor(new Date(item.user.updated_at) / 1000) || 1) + "/ava/" + (item.user._id) + ".jpg", true, false)) + "/></a></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"i-user--inline__mod\"><span>  <i class=\"f-icon-repost\"></i> " + (jade.escape((jade_interp = __('suggested')) == null ? '' : jade_interp)) + "  </span>");
jade_mixins["time"](item.published_at);
buf.push("<span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span></span><div class=\"clear\"></div></div></div><div class=\"b-post__repost\"><a" + (jade.attr("href", "/p/" + (item.repost_link.slug) + "", true, false)) + "><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.repost_link.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.repost_link.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\"><a" + (jade.attr("href", "http://" + (item.repost_link.url) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.repost_link.source ? item.repost_link.source : item.repost_link.hostname) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span></p></div></a></div>");
}
else if ( item.is_link == true)
{
buf.push("<div class=\"b-post__repost\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\"><a" + (jade.attr("href", "http://" + (item.url) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.source ? item.source : item.hostname) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span></p></div></a></div>");
}
else
{
buf.push("<div class=\"b-post__head\">");
if ( item.from_collection)
{
if ( item.from_collection.length > 0)
{
buf.push("<div class=\"b-post__from\">");
// iterate item.from_collection
;(function(){
  var $$obj = item.from_collection;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var col = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/c/" + (col.username) + "", true, false)) + "><i class=\"f-icon-book\"></i><b>" + (jade.escape((jade_interp = col.name) == null ? '' : jade_interp)) + "</b></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var col = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/c/" + (col.username) + "", true, false)) + "><i class=\"f-icon-book\"></i><b>" + (jade.escape((jade_interp = col.name) == null ? '' : jade_interp)) + "</b></a>");
    }

  }
}).call(this);

buf.push("</div>");
}
}
buf.push("<div class=\"i-user--inline\"><span class=\"i-user--inline__ava\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(item.user.updated_at) / 1000 + 1) || 1) + "/ava/" + (item.user._id) + ".jpg", true, false)) + "/></a></span><span class=\"i-user--inline__name\"><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</a></span><span class=\"i-user--inline__mod\"><span> " + (jade.escape((jade_interp = __('published')) == null ? '' : jade_interp)) + "  </span>");
jade_mixins["time"](item.published_at);
buf.push("<span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>");
jade_mixins["read"](item.reading_time);
buf.push("</span><div class=\"clear\"></div></div></div>");
if ( item.is_cover)
{
buf.push("<div class=\"b-post__right\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_240,h_160/v" + (Math.floor(new Date(item.edited_at) / 1000) || 1) + "/post/" + (item._id) + "-cover.jpg", true, false)) + " alt=\"\" class=\"b-post__cover\"/></a></div>");
}
buf.push("<div" + (jade.cls(['b-post__left',item.is_cover ? "" : "is-full"], [null,true])) + "><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p></a><div class=\"b-post__button-wrap\"><button" + (jade.attr("data-article-id", "" + (item._id) + "", true, false)) + (jade.cls(['b-post__button','js-article-love',item.is_loving ? "is-loving" : ""], [null,null,true])) + "><b>" + (jade.escape((jade_interp = item.love_count) == null ? '' : jade_interp)) + "</b><i class=\"f-icon-love\"></i></button></div></div><div class=\"clear\"></div>");
}
buf.push("</div>");
    }

  }
}).call(this);
}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"IMG_URL" in locals_for_with?locals_for_with.IMG_URL:typeof IMG_URL!=="undefined"?IMG_URL:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"__" in locals_for_with?locals_for_with.__:typeof __!=="undefined"?__:undefined,"__n" in locals_for_with?locals_for_with.__n:typeof __n!=="undefined"?__n:undefined,"post" in locals_for_with?locals_for_with.post:typeof post!=="undefined"?post:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],152:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (__, post, undefined) {
































// iterate post
;(function(){
  var $$obj = post;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div" + (jade.attr("data-love-id", "" + (item.loveId) + "", true, false)) + " class=\"b-post__item\"><div class=\"b-post__repost\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\">" + (jade.escape((jade_interp = __('By')) == null ? '' : jade_interp)) + "  <a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span><b>" + (jade.escape((jade_interp = item.love_count || 0) == null ? '' : jade_interp)) + " <span class=\"text-red\">&#9825;</span></b></p></div></a></div><div class=\"clear\"></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div" + (jade.attr("data-love-id", "" + (item.loveId) + "", true, false)) + " class=\"b-post__item\"><div class=\"b-post__repost\"><a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\">" + (jade.escape((jade_interp = __('By')) == null ? '' : jade_interp)) + "  <a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span><b>" + (jade.escape((jade_interp = item.love_count || 0) == null ? '' : jade_interp)) + " <span class=\"text-red\">&#9825;</span></b></p></div></a></div><div class=\"clear\"></div></div>");
    }

  }
}).call(this);
}.call(this,"__" in locals_for_with?locals_for_with.__:typeof __!=="undefined"?__:undefined,"post" in locals_for_with?locals_for_with.post:typeof post!=="undefined"?post:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],153:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (post, undefined) {
// iterate post
;(function(){
  var $$obj = post;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><div class=\"b-notif__item\"><h5 class=\"b-notif__title\">" + (jade.escape((jade_interp = item.title) == null ? '' : jade_interp)) + "</h5><p class=\"b-notif__subtitle\">" + (jade.escape((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><div class=\"b-notif__user\">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + " </div></a><div class=\"clear\"></div></div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + "><div class=\"b-notif__item\"><h5 class=\"b-notif__title\">" + (jade.escape((jade_interp = item.title) == null ? '' : jade_interp)) + "</h5><p class=\"b-notif__subtitle\">" + (jade.escape((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p><a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><div class=\"b-notif__user\">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + " </div></a><div class=\"clear\"></div></div></a>");
    }

  }
}).call(this);
}.call(this,"post" in locals_for_with?locals_for_with.post:typeof post!=="undefined"?post:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],154:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (Date, IMG_URL, Math, __, post, undefined) {





































// iterate post
;(function(){
  var $$obj = post;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + (jade.attr("data-published-at", "" + (item.published_at) + "", true, false)) + "><div class=\"b-post__repost--half\">");
if ( item.is_cover == true)
{
buf.push("<div class=\"is-half img\"><img" + (jade.attr("src", "" + (IMG_URL) + "/v" + (Math.floor(new Date(item.edited_at) / 1000) || 1) + "/post/" + (item._id) + "-cover.jpg", true, false)) + "/></div>");
}
buf.push("<div class=\"is-half\"><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\">" + (jade.escape((jade_interp = __('By')) == null ? '' : jade_interp)) + "  <a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span><b>" + (jade.escape((jade_interp = item.love_count || 0) == null ? '' : jade_interp)) + " <span class=\"text-red\">&#9825;</span></b></p></div></div><div class=\"clear\"></div></div><div class=\"clear\"></div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/p/" + (item.slug) + "", true, false)) + (jade.attr("data-published-at", "" + (item.published_at) + "", true, false)) + "><div class=\"b-post__repost--half\">");
if ( item.is_cover == true)
{
buf.push("<div class=\"is-half img\"><img" + (jade.attr("src", "" + (IMG_URL) + "/v" + (Math.floor(new Date(item.edited_at) / 1000) || 1) + "/post/" + (item._id) + "-cover.jpg", true, false)) + "/></div>");
}
buf.push("<div class=\"is-half\"><div class=\"b-post__repost__content\"><h3 class=\"b-post__title\">" + (((jade_interp = item.title) == null ? '' : jade_interp)) + "</h3><p class=\"b-post__subtitle\">" + (((jade_interp = item.subtitle) == null ? '' : jade_interp)) + "</p><p class=\"i-user--inline i-user--inline__mod\">" + (jade.escape((jade_interp = __('By')) == null ? '' : jade_interp)) + "  <a" + (jade.attr("href", "/u/" + (item.user.username) + "", true, false)) + "><span class=\"text-red\">" + (jade.escape((jade_interp = item.user.name) == null ? '' : jade_interp)) + "</span></a><span style=\"margin:5px\">&middot;</span><b>" + (jade.escape((jade_interp = item.love_count || 0) == null ? '' : jade_interp)) + " <span class=\"text-red\">&#9825;</span></b></p></div></div><div class=\"clear\"></div></div><div class=\"clear\"></div></a>");
    }

  }
}).call(this);

buf.push("");}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"IMG_URL" in locals_for_with?locals_for_with.IMG_URL:typeof IMG_URL!=="undefined"?IMG_URL:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"__" in locals_for_with?locals_for_with.__:typeof __!=="undefined"?__:undefined,"post" in locals_for_with?locals_for_with.post:typeof post!=="undefined"?post:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],155:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (tags, undefined) {
buf.push("<div class=\"tag-col is-center\">");
// iterate tags
;(function(){
  var $$obj = tags;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var tag = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/s?q=" + (tag._id) + "&type=topic", true, false)) + "><div class=\"nsg-tag\">" + (jade.escape((jade_interp = tag._id) == null ? '' : jade_interp)) + "  </div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var tag = $$obj[$index];

buf.push("<a" + (jade.attr("href", "/s?q=" + (tag._id) + "&type=topic", true, false)) + "><div class=\"nsg-tag\">" + (jade.escape((jade_interp = tag._id) == null ? '' : jade_interp)) + "  </div></a>");
    }

  }
}).call(this);

buf.push("</div>");}.call(this,"tags" in locals_for_with?locals_for_with.tags:typeof tags!=="undefined"?tags:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":145}],156:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (Date, IMG_URL, Math, undefined, users) {
if ( users)
{
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

buf.push("<br/><span height=\"100%\" class=\"i-user__ava\"><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(user.updated_at) / 1000 + 1) || 1) + "/ava/" + (user._id) + ".jpg", true, false)) + "/></span><span class=\"i-user--footer__name text-red\"><a" + (jade.attr("href", "/u/" + (user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = user.name) == null ? '' : jade_interp)) + "</a></span><p class=\"i-user--footer__desc\">" + (jade.escape((jade_interp = user.description) == null ? '' : jade_interp)) + "</p><p class=\"i-user--footer__username\"><a" + (jade.attr("href", "/u/" + (user.username) + "", true, false)) + ">/" + (jade.escape((jade_interp = user.username) == null ? '' : jade_interp)) + "</a></p><div class=\"divider\"></div><br/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

buf.push("<br/><span height=\"100%\" class=\"i-user__ava\"><img" + (jade.attr("src", "" + (IMG_URL) + "c_fill,w_50/v" + (Math.floor(new Date(user.updated_at) / 1000 + 1) || 1) + "/ava/" + (user._id) + ".jpg", true, false)) + "/></span><span class=\"i-user--footer__name text-red\"><a" + (jade.attr("href", "/u/" + (user.username) + "", true, false)) + ">" + (jade.escape((jade_interp = user.name) == null ? '' : jade_interp)) + "</a></span><p class=\"i-user--footer__desc\">" + (jade.escape((jade_interp = user.description) == null ? '' : jade_interp)) + "</p><p class=\"i-user--footer__username\"><a" + (jade.attr("href", "/u/" + (user.username) + "", true, false)) + ">/" + (jade.escape((jade_interp = user.username) == null ? '' : jade_interp)) + "</a></p><div class=\"divider\"></div><br/>");
    }

  }
}).call(this);

}}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"IMG_URL" in locals_for_with?locals_for_with.IMG_URL:typeof IMG_URL!=="undefined"?IMG_URL:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined,"users" in locals_for_with?locals_for_with.users:typeof users!=="undefined"?users:undefined));;return buf.join("");
};
},{"jade/runtime":145}]},{},[71]);
