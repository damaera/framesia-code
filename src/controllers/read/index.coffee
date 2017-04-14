express = require 'express'
router = express.Router()

read = require 'node-readability'
request = require 'request'
extractor = require 'unfluff'

Link = require '../../models/link'

saveLink = require './saveLink'


router.get '/', (req, res, next) ->
  { img } = req.query
  if img
    urlImg = (img.split '?')[0]
    # request = request.defaults { encoding: null }
    # request img, (error, response, body) ->
    request.get(urlImg).pipe(res)
    # request img, {encoding: null}, (err, resp, body) ->
    #   console.log resp
    #   res.send body
    # console.log img
    # res.send img
  else
    res.render 'reader', {
      empty: true
      author: 'Framesia'
      description: 'Baca artikel'
      keywords: 'framesia,artikel'
    }

router.post '/', saveLink


module.exports = router
