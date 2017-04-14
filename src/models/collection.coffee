mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId } = Schema.Types

CollectionSchema = new Schema
  name:
    type: String
    required: true
    trim: true
    minLength: 3
    maxLength: 50

  description:
    type: String
    required: true
  username:
    type: String
    index: true
    match: /^[a-zA-Z0-9-]{3,30}$/

  is_anyone_can_join:
    type: Boolean
    default: false
  is_anyone_can_request:
    type: Boolean
    default: false
  is_anyone_can_post:
    type: Boolean
    default: false

  owner:
    type: ObjectId
    ref: 'User'

  admin:
    validate:
      validator: (val) ->
        val.length <= 7
    type: [
      type: ObjectId
      ref: 'User'
    ]
  admin_requested: [
    type: ObjectId
    ref: 'User'
  ]

  member: [
    type: ObjectId
    ref: 'User'
  ]
  member_requested: [
    type: ObjectId
    ref: 'User'
  ]

  articles_request: [
    type: ObjectId
    ref: 'Post'
  ]
  articles_invited: [
    type: ObjectId
    ref: 'Post'
  ]

  created_at:
    type: Date
    default: Date.now()
  edited_at:
    type: Date
    default: Date.now()

  follower_count:
    type: Number
    default: 0

  featured_articles: 
    validate:
      validator: (val) ->
        val.length <= 3
    type: [
      type: ObjectId
      ref: 'Post'
    ]

  main_featured_article: 
    type: ObjectId
    ref: 'Post'

  tags:
    validate:
      validator: (val) ->
        val.length <= 3
    type: [
      type: String
    ]

CollectionSchema.index { name: 'text', username: 'text', tags: 'text' }

module.exports = mongoose.model 'Collection', CollectionSchema
