import React, {Component} from 'react';

import Time from './Time'
import ReadTime from './ReadTime'
import { __, __n } from './LangCatalog'

import { If } from 'react-conditioner'

import { IMG_URL } from '../config'

class FeedItem extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <div className="b-post__head">
          <If condition={ data.from_collection && data.from_collection.length > 0 }>
            <div className="b-post__from">
              { data.from_collection && data.from_collection.map((col, colIdx) => {
                return(
                  <a href="/c/${col.username}">
                    <i className="f-icon-book"></i>
                    <b>{ col.name }</b>
                  </a>
                )
              }) }
            </div>
          </If>

          <div className="i-user--inline">
            <span className="i-user--inline__ava">
              <a href={`/u/${data.user.username}`}>
                <img
                  src={`${IMG_URL}c_fill,w_50/v${Math.floor(new Date(data.user.updated_at) / 1000 + 1) || 1}/ava/${data.user._id}.jpg`}
                  alt={data.user.username + ' Framesia'}/>
              </a>
            </span>
            <span className="i-user--inline__name">
              <a href={`/u/${data.user.username}`}>{ data.user.name }</a>
            </span>
            <span>&nbsp;{ __('published') }<Time date={data.published_at}/></span>
            <span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
            <ReadTime time={data.reading_time} />
            <div className="clear"></div>
          </div>

          <If condition={data.is_cover}>
            <div className="b-post__right">
              <a href={`/p/${data.slug}`}>
                <img
                  src={`${IMG_URL}c_fill,w_240,h_160/v${Math.floor(new Date(data.edited_at) / 1000) || 1}/post/${data._id}-cover.jpg`}
                  alt={data.title}
                  className="b-post__cover" />
              </a>
            </div>
          </If>

          <div className={`b-post__left ${data.is_cover ? "" : "is-full"}`}>
            <a href={`/p/${data.slug}`}>
              <h3 className="b-post__title" dangerouslySetInnerHTML={{__html: data.title}} />
            </a>
          </div>
              {/*p.b-post__subtitle !{item.subtitle}
              //- button.i-button.i-button--small.i-button--w-green Selengkapnya
            .b-post__button-wrap
              button.b-post__button.js-article-love(class=item.is_loving ? "is-loving" : "" data-article-id="#{item._id}")
                b #{item.love_count}
                i.f-icon-love*/}
          
        </div>
      </div>
    );
  }
}

export default FeedItem;