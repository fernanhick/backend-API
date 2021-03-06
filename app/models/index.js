const dbConfig = require('../config/db.config')
const mongoose = require('mongoose')

// create an object for the database structure
const db = {}
// Set instance of mongoose to the db.mongoose
db.mongoose = mongoose
// Set the url to the db object using the config stored in the url inside dbConfig
db.url = dbConfig.url

// import models for each collection
db.projects = require('./project.model')(mongoose)
db.comments = require('./comment.model')(mongoose)
db.users = require('./user.model')(mongoose)
db.roles = require('./role.model')
db.ROLES = ['user', 'admin', 'moderator']
// exports the db object from the module
module.exports = db
