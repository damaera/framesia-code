// { $ } = require './selector.coffee'
// langCatalog = LANG_CATALOG

// module.exports =
//   __: (str) -> langCatalog[str] or ''
//   __n: (str1, str2, str3) ->
//     if str3 == 1
//       (langCatalog[str1].one.replace /%s|%d/g, str3) or ''
//     else
//       (langCatalog[str1].other.replace /%s|%d/g, str3) or ''

import React from 'react'

const lang = window.LANG_CATALOG

export const __ = (str) => {
  return <span>{ lang[str] || '' }</span>
}

export const __n = (str1, str2, str3) => {
  if (str3 == 1) {
    return <span>{ lang[str1].one.replace(/%s|%d/g, str3) || '' }</span>
  } else {
    return <span>{ lang[str1].other.replace(/%s|%d/g, str3) || '' }</span>
  }
}