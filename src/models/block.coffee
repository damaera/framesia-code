mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId } = Schema.Types

BlockSchema = new Schema
  block_id:
    type: ObjectId
    refPath: 'block_type'
    unique: true
  block_type: 
    type: String
    enum: ['Post', 'User']
  time:
    type: Date
    default: Date.now()

module.exports = mongoose.model 'Block', BlockSchema
