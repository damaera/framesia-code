import React from 'react'

import { __, __n } from './LangCatalog'

const ReadTime = ({ time }) => {
  const readTime = ( time / 60000).toFixed(1)
  return (
    <span>{ readTime } {__('min read')}</span>
  )
}

export default ReadTime