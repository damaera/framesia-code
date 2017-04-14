mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId, Mixed } = Schema.Types

PostSchema = new Schema
  user:
    type: ObjectId
    ref: 'User'
  title: 
    type: String
    minLength: 3
    maxLength: 100
  subtitle:
    type: String
    minLength: 15
    maxLength: 300
  slug: String

  is_cover: Boolean
  is_cover_full: Boolean
  is_title_center: Boolean
  cover:
    width: Number
    height: Number

  is_published:
    type: Boolean
    default: false

  created_at:
    type: Date
    default: Date.now()
  edited_at:
    type: Date
    default: Date.now()
  published_at:
    type: Date
    default: Date.now()

  content: [Mixed]

  love_count:
    type: Number
    default: 0
  comment_count:
    type: Number
    default: 0
  response_count:
    type: Number
    default: 0
  repost_count:
    type: Number
    default: 0
  repost_link_count:
    type: Number
    default: 0

  language_detected: String
  reading_time: Number
  word_count: Number

  is_response:
    type: Boolean
    default: false
  response:
    type: ObjectId
    ref: 'Post'

  is_repost:
    type: Boolean
    default: false
  repost:
    type: ObjectId
    ref: 'Post'

  is_link:
    type: Boolean
    default: false
  is_repost_link:
    type: Boolean
    default: false
  repost_link:
    type: ObjectId
    ref: 'Post'

  url: String
  source: String
  hostname: String

  collections:
    validate:
      validator: (val) ->
        val.length <= 3
    type: [
      type: ObjectId
      ref: 'Collection'
    ]

  tags:
    validate:
      validator: (val) ->
        val.length <= 3
    type: [
      type: String
      maxlength: 30
    ]


PostSchema.index { title: 'text', subtitle: 'text', tags: 'text' }

module.exports = mongoose.model 'Post', PostSchema
