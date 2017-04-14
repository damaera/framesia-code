_ = require 'lodash'

module.exports = (catalog) ->
  chooseToClient = [
    'Enter comment'

    'Article title'
    'In response to'
    'By'
    'Article content'
    'Valid link'

    'loved your article'
    'loved your comment'
    'commented your article'
    'following you'
    'mentioned you'
    'reposted your article'
    'responded your article'

    'Created at'
    'Last edited at'
    'words'
    'min read'
    'Edit'
    'Publish'
    'Delete'

    'suggested'
    'responded'
    'published'

    '%d day ago'
    '%d hour ago'
    '%d minute ago'

    'Just now'

    'No collections'
    'No articles'
  ]

  return _.pick catalog, chooseToClient
