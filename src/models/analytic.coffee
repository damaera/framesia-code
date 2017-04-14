mongoose = require 'mongoose'

{ Schema } = mongoose

{ ObjectId } = Schema.Types

AnalyticSchema = new Schema

  user:
    type: ObjectId
    ref: 'User'

  path: String
  method: String
  query: Object

  is_xhr: Boolean
  is_fresh: Boolean

  browser:
    name: String
    version: String
  os:
    name: String
    version: String

  ip: String
  country: String

  referer: String

  time:
    type: Date
    default: Date.now()

module.exports = mongoose.model 'Analytic', AnalyticSchema
