mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId, Mixed } = Schema.Types

NotifSchema = new Schema
  from:
    type: ObjectId
    ref: 'User'
    required: true
  notif_type:
    type: String
    enum: [
      'follow'

      'repost'
      'respond'

      'mention-comment'

      'comment'

      'love-post'
      'love-comment'

      'invited-to-col'
      'accept-article-col'
      'accept-member-col'
      'make-admin-col'
    ]
  to:
    type: ObjectId
    ref: 'User'
    required: true
  object:
    user_id:
      type: ObjectId
      ref: 'User'
    post_id:
      type: ObjectId
      ref: 'Post'
    comment_id:
      type: ObjectId
      ref: 'Comment'
    collection_id:
      type: ObjectId
      ref: 'Collection'
  is_read:
    type: Boolean
    default: false
  created_at:
    type: Date
    default: Date.now()

module.exports = mongoose.model 'Notif', NotifSchema
