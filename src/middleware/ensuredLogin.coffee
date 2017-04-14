module.exports = (req, res, next) ->
  whitelist = ['/u/first-time', '/a/logout', '/a/facebook', '/read']
  whitelist2 = ['/u/edit']

  if req.path is whitelist[0] then next()
  else if req.path is whitelist[1] then next()
  else if req.path is whitelist[2] then next()
  else if req.path is whitelist[3] then next()
  else if req.user?.is_new 
    if req.path is whitelist2[0]
      next()
    else
      res.redirect '/u/first-time'
  else if not req.user
    if req.method is 'POST' then res.redirect '/!'
    else next()
  else next()
