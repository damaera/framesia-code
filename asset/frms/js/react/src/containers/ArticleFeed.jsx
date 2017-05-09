import React, { Component } from 'react';

import { If } from 'react-conditioner'
import axios from 'axios'

import Spinner from '../components/Spinner'
import FeedItem from '../components/FeedItem'

class ArticleFeed extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      data: []
    }
  }

  componentDidMount() {
    axios.get('/p/home-feed')
      .then((res) => {
        this.setState({
          loading: false,
          data: res.data
        })
      })
  }

  feedList (data) {
    return (
      data.map((item, idx) => {
        return <FeedItem data={item} key={idx} />
      })
    )
  }

  render() {
    return (
      <div>
        <If condition={this.state.loading}>
          <Spinner />
        </If>
        { this.feedList(this.state.data) }
      </div>
    );
  }
}

export default ArticleFeed;