import React from 'react'

import { __, __n } from './LangCatalog'

const Time = (props) => {
  const datetime = new Date(props.date)
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const seconds = Math.floor(( new Date()*1 - datetime*1 ) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const month = monthList[datetime.getMonth()]
  const year = datetime.getFullYear()
  const date = datetime.getDate()

  if (days > 7) {
    return <span>at {date} {month} {year}</span>
  } else if (days >= 1) {
    return __n('%d day ago', '%d days ago', days)
  } else if (hours >= 1) {
    return __n('%d hour ago', '%d hours ago', hours)
  } else if (minutes >= 1) {
    return __n('%d minute ago', '%d minutes ago', minutes)
  } else {
    return __('Just now')
  }
}

export default Time