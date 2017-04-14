mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId } = Schema.Types

LinkSchema = new Schema
  slug: String
  url: String
  title: String
  source: String
  description: String
  hostname: String
  tags: String

module.exports = mongoose.model 'Link', LinkSchema
