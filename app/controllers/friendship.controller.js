const db = require('../models')
const FriendRequest = db.friendRequest
const User = db.users

exports.sentFriendship = async (req, res) => {
    const userReceiver = req.body.userReceiver
    const userSender = req.body.userSender

    const data = new FriendRequest({
        requester: userSender,
        receiver: userReceiver,
        status: 'requested',
    })

    try {
        await data.save()
        const receiver = await User.findById(userReceiver)

        const requester = await User.findById(userSender)
        receiver.friendRequest.push(data)
        requester.friendRequest.push(data)
        await receiver.save()
        await requester.save()

        res.status(200).json({ friendship: data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.acceptFriendship = async (req, res) => {
    const userReceiver = req.body.userReceiver
    const userSender = req.body.userSender

    try {
        const data = await FriendRequest.findOneAndUpdate({
            status: req.body.status,
        })
            .where('requester')
            .equals(`${userSender}`)
            .where('receiver')
            .equals(`${userReceiver}`)

        if (req.body.status === 'accepted') {
            const receiver = await User.findById(userReceiver)

            const requester = await User.findById(userSender)
            receiver.friends.push(requester)
            requester.friends.push(receiver)
            await receiver.save()
            await requester.save()
        }
        res.status(200).json(data /* , { message: 'friend request updated' } */)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.cancelFriendship = async (req, res) => {}

exports.deleteAll = async (req, res) => {
    try {
        await FriendRequest.deleteMany()
        res.status(200).json({ message: 'all records deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.getAll = async (req, res) => {
    try {
        const data = await FriendRequest.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
