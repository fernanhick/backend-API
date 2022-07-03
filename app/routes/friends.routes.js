module.exports = (app) => {
    const controller = require('../controllers/friendship.controller')
    app.post('/api/v1/friendship/send', controller.sentFriendship)
    app.get('/api/v1/friendship', controller.getAll)
    app.delete('/api/v1/friendship', controller.deleteFriendship)
    app.patch('/api/v1/friendship/accept', controller.acceptFriendship)
}
