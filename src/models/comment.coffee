mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId, Mixed } = Schema.Types


# ReplySchema = new Schema
#   user:
#     type: ObjectId
#     ref: 'User'
#     content: String
#   content: String
#   love_count:
#     type: Number
#     default: 0
#   created_at:
#     type: Date
#     default: new Date
#   edited_at:
#     type: Date
#     default: new Date

CommentSchema = new Schema
  post:
    type: ObjectId
    ref: 'Post'
  user:
    type: ObjectId
    ref: 'User'
  content: String

  created_at:
    type: Date
    default: Date.now()
  # edited_at:
  #   type: Date
  #   default: new Date

  # replies_count:
  #   type: Number
  #   default: 0
  love_count:
    type: Number
    default: 0

  is_published: Boolean
  # replies: [ReplySchema]

module.exports = mongoose.model 'Comment', CommentSchema
