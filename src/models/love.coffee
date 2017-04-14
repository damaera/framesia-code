mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId, Mixed } = Schema.Types

LoveSchema = new Schema
  user:
    type: ObjectId
    ref: 'User'
    required: true
  to:
    type: ObjectId
    required: true
    refPath: 'love_type'
  love_type:
    type: String
    enum: ['Post', 'Comment']
  created_at:
    type: Date
    default: Date.now()

module.exports = mongoose.model 'Love', LoveSchema
