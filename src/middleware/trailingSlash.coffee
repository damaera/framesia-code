module.exports = (req, res, next) ->
  if req.url.substr(-1) is '/' and req.url.length > 1
  then res.redirect req.url.slice 0, -1
  else next()
