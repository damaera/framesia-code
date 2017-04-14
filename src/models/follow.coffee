mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId } = Schema.Types

FollowSchema = new Schema
  from:
    type: ObjectId
    ref: 'User'
  to:
    type: ObjectId
    refPath: 'follow_type'
  follow_type:
    type: String
    enum: ['User', 'Collection', 'Tag']
  created_at:
    type: Date
    default: Date.now()


module.exports = mongoose.model 'Follow', FollowSchema
