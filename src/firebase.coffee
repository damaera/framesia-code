admin = require "firebase-admin"

serviceAccount = require "./frms-20c87-firebase-adminsdk-nstzk-b8c4fe7818.json"

admin.initializeApp {
  credential: admin.credential.cert serviceAccount
  databaseURL: "https://frms-20c87.firebaseio.com"
}

module.exports = admin