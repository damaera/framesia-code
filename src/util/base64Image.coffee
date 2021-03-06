module.exports = (dataString) ->
  matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  response = {}

  if matches

    if matches.length isnt 3
      return new Error 'Invalid input string'

    response.type = matches[1]
    response.data = new Buffer matches[2], 'base64'
    return response

  else
    return false