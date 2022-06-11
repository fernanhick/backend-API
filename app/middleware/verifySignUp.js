const db = require('../models')
const ROLES = db.ROLES
const User = db.users

// function to verify user and password
const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // USERNAME
  User.findOne({
    username: req.body.username
  }).exec((error, user) => {
    // check if there is an error
    if (error) {
      res.status(500).send({ message: error })
      return
    }
    if (user) {
      res.status(400).send({
        error: 'Failed! Username is already in use.'
      })
      return
    }
    // EMAIL
    User.findOne({
      email: req.body.email
    }).exec((error, user) => {
      if (error) {
        res.status(400).send({ message: error })
        return
      }
      if (user) {
        res.status(500).send({
          message: 'Failed! email is already registered.'
        })
        return
      }
      next()
    })
  })
}
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed role ${req.body.roles[i]} does not exist`
        })
        return
      }
    }
  }
  next()
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp
