const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')
const { Router } = require('express')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })
    app.get('/api/test/all', controller.allAccess)
    app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard)
    app.get(
        'api/test/mod',
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    )
    app.get(
        '/api/test/admin',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    )
    app.delete('/api/v1/users', controller.deleteAll)
    app.get('/api/v1/users', controller.getAll)
    app.get('/api/v1/user/:id', controller.getUser)
    app.patch('/api/v1/user/:id', controller.updateUser)
}
