const db = require('../models')
const { findById } = require('../models/role.model')
const User = db.users

exports.allAccess = (req, res) => {
    res.status(200).send('Public Content')
}
exports.userBoard = (req, res) => {
    res.status(200).send('User Content')
}
exports.adminBoard = (req, res) => {
    res.status(200).send('Admin content')
}
exports.moderatorBoard = (req, res) => {
    res.status(200).send('Moderator content')
}

exports.deleteAll = async (req, res) => {
    try {
        await User.deleteMany()
        res.status(200).json({ message: 'All users deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.getAll = async (req, res) => {
    try {
        const data = await User.find().populate('projects')
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.getUser = async (req, res) => {
    const id = req.params.id
    try {
        const data = await User.findById(id).populate('projects')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.updateUser = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        await User.findByIdAndUpdate(id, body)
        res.status(200).json({ message: 'User updated' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
