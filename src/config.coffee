path = require 'path'

inDomain = false

siteUrl = "http://localhost:8080/"

# assetUrl = "https://asset.framesia.com/frms/"
assetUrl = "http://localhost:8080/asset/frms/"

dbUrl = "mongodb://damn:123qwe@ds149030.mlab.com:49030/frms"
# dbUrl = "mongodb://test:123qwe@ds161630.mlab.com:61630/frms-dev"

facebook = 
  clientID: '1570105449948928'
  clientSecret: 'f1a992265b221065764cfaf455a693c3'
  callbackURL: "#{siteUrl}a/facebook/callback"
  profileFields: ['id', 'name', 'picture.type(large)', 'displayName', 'email']


if inDomain
  siteUrl = "https://framesia.com/"
  assetUrl = "https://asset.framesia.com/frms/"
  dbUrl = "mongodb://damn:123qwe@ds149030.mlab.com:49030/frms"
  facebook = 
    clientID: '1512739612352179'
    clientSecret: '007e7f6568c252f92f0417a03318de63'
    callbackURL: "#{siteUrl}a/facebook/callback"
    profileFields: ['id', 'name', 'picture.type(large)', 'displayName', 'email']

imgUrl = "https://res.cloudinary.com/frms/image/upload/"
imgDir =  path.join __dirname, '../fr-img/'

module.exports =
  siteUrl: siteUrl
  assetUrl: assetUrl
  imgUrl: imgUrl
  imgDir: imgDir
  dbUrl: dbUrl
  facebook: facebook
