module.exports = (app) => {
    const controller = require('../controllers/friendship.controller')
    app.get('/api/v1/friendship', controller.getAll)
    app.delete('/api/v1/friendship', controller.deleteAll)
    app.post('/api/v1/friendship/send', controller.sentFriendship)
    app.patch('/api/v1/friendship/resolve', controller.acceptFriendship)
}
