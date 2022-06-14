const { authJwt } = require('../middleware')

module.exports = (app) => {
    const comments = require('../controllers/comment.controller')
    const router = require('express').Router()
    // Post a comment passing the id of the project
    router.post('/:id/comment', comments.addComment)
    // Delete an comments passing the id of the comment
    router.delete('/comment/:id', comments.deleteComment)
    // Delete all comments
    router.delete(
        '/comment/',
        [authJwt.verifyToken],
        comments.deleteAllComments
    )
    app.use('/api/v1/projects', router)
}
