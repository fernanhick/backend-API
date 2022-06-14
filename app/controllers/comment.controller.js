const db = require('../models')
const Comment = db.comments
const Project = db.projects
const User = db.users

exports.addComment = async (req, res) => {
    const id = req.params.id
    const userId = req.body.user
    const data = new Comment({
        text: req.body.text,
        project: id,
        user: userId,
    })
    await data.save()
    const projectRelated = await Project.findById(id)
    const userRelated = await User.findById(userId)
    userRelated.comments.push(data)
    projectRelated.comments.push(data)
    try {
        await projectRelated.save()
        await userRelated.save()
        res.status(200).json({ message: 'Comment saved' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.deleteComment = async (req, res) => {
    const id = req.params.id
    try {
        const data = Comment.findById(id)
        if (!data) {
            res.status(400).json({ error: 'Record not found' })
        } else {
            await Comment.findByIdAndRemove(id)
            res.status(200).json({ message: 'Record Deleted' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.deleteAllComments = async (req, res) => {
    try {
        await Comment.deleteMany()
        res.status(200).json({ message: 'All records deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
