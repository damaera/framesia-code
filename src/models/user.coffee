mongoose = require 'mongoose'

{ Schema } = mongoose

toTitleCase = (str) ->
  str
    .replace /\s+/g, ' '
    .replace /\w\S*/g, (txt) ->
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()

UserSchema = new Schema
  name:
    type: String
    required: true
    trim: true
    minLength: 3
    maxLength: 40
    set: toTitleCase

  username:
    unique: true
    type: String
    # required: true
    trim: true
    match: /^[a-zA-Z0-9-]{3,20}$/

  picture: String
  facebook_id:
    type: String
    unique: true
  joined_at:
    type: Date
    default: Date.now()
  updated_at: Date
  is_new: Boolean
  description:
    trim: true
    type: String
    match: /^(.|\n){2,240}$/
  following_user_count:
    type: Number
    default: 0
  following_col_count:
    type: Number
    default: 0
  following_tag_count:
    type: Number
    default: 0
  follower_count:
    type: Number
    default: 0

  language_chosen: String
  country_chosen: String

UserSchema.index { name: 'text', username: 'text' }

module.exports = mongoose.model 'User', UserSchema
