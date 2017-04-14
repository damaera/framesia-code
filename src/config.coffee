path = require 'path'

siteUrl = "https://framesia.com/"
assetUrl = "https://framesia.com/asset/frms/"

# siteUrl = "http://localhost:8080/"
# assetUrl = "http://localhost:8080/asset/frms/"

imgUrl = "https://res.cloudinary.com/frms/image/upload/"
imgDir =  path.join __dirname, '../fr-img/'

# console.log imgDir

module.exports =
  siteUrl: siteUrl
  assetUrl: assetUrl
  imgUrl: imgUrl
  imgDir: imgDir
  facebook:
    clientID: '1512739612352179'
    clientSecret: '007e7f6568c252f92f0417a03318de63'
    callbackURL: "#{siteUrl}a/facebook/callback"
    profileFields: ['id', 'name', 'picture.type(large)', 'displayName']
