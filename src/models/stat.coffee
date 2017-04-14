mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId, Mixed } = Schema.Types

StatSchema = new Schema
  is_user: Boolean
  user:
    type: ObjectId
    ref: 'User'
  article:
    type: ObjectId
    ref: 'Post'
  stat_type:
    type: String
    enum: [
      'view'
      'read'
    ]
  time:
    type: Date
    default: Date.now()

module.exports = mongoose.model 'Stat', StatSchema
