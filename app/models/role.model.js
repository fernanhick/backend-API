const mongoose = require('mongoose')

const role = mongoose.model(
  'Role',
  new mongoose.Schema({
    name: {
      type: String
    }
  })
)
module.exports = role
