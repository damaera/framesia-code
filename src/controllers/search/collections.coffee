Collection = require '../../models/collection'

_ = require 'lodash'


module.exports = (req, res, next) ->

  findColletion = (data, last) ->
    Collection.find data
      .select 'name username description follower_count'
      .skip last
      .limit 7
      .lean()
      .exec (err, collections) ->
        if err
          console.log err
        res.json collections

  { q, last, all } = req.query
  last = last*1 or 0

  if q
    if not all
      qRegex = new RegExp q, "i"
      findData =
        $or: [
          {
            $or: [
              { name: qRegex }
              { username: qRegex }
            ]
            is_anyone_can_request: true
          }
          {
            $and: [
              $or: [
                { name: qRegex }
                { username: qRegex }
              ]
              $or: [
                { admin: req.user._id }
                { member: req.user._id }
              ]
            ]
          }
        ]
      findColletion findData
    else
      qRegex = new RegExp q, "i"
      findData = $text: { $search : q }
      findColletion findData, last


  else if req.user
    userId = req.user._id
    findData =
      $or: [
        { admin: req.user._id }
        { member: req.user._id }
      ]
    findColletion findData

  else
    res.json { error: 'query required' }
