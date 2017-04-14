cloudinary = require 'cloudinary'

cloudinary.config
  cloud_name: 'frms'
  api_key: '591385594686221'
  api_secret: 'Me9NoX6leslFqnZdDWqZmbqbxRo'

module.exports =
  upload: cloudinary.uploader.upload