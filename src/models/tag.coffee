mongoose = require 'mongoose'

{ Schema } = mongoose

# { ObjectId, Mixed } = Schema.Types

TagSchema = new Schema
  name: String
  follower_count: 
    type: Number
    default: 0
  related: [
    {
      name: String
      count: Number
    }
  ]

module.exports = mongoose.model 'Tag', TagSchema
