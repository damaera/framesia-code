import React from 'react';
import ReactDOM from 'react-dom';

import ArticleFeed from './containers/ArticleFeed';

const $ = (el) => document.querySelector(el)

if ($('.r-article-feed')) {
  ReactDOM.render(
    <ArticleFeed />,
    $('.r-article-feed')
  )
}