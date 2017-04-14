mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId } = Schema.Types

ReportSchema = new Schema
  post:
    type: ObjectId
    ref: 'Post'
  reason:
    type: String
    maxLength: 200
  user:
    type: ObjectId
    ref: 'User'
  time:
    type: Date
    default: Date.now()

module.exports = mongoose.model 'Report', ReportSchema
