Stat = require '../../models/stat'

_ = require 'lodash'

module.exports = (data, userId) ->
  dataStat =
    article: data.articleId
    stat_type: 'read'
    time: Date.now()

  if userId is 0
    dataStat.is_user = false
  else
    dataStat.is_user = true
    dataStat.user = userId

  newStat = new Stat dataStat
  newStat.save (err) ->
    console.log
