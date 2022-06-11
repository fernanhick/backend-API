// import the index file to link with the models
const db = require('../models')
// Initiate instance of the project models
const Project = db.projects
const User = db.users
// Create the logic for CRUD functionalities
exports.create = async (req, res) => {
    // const user = await User.findById(req.body.user)
    const user = req.body.user
    // Store data into a new Project object
    const data = new Project({
        title: req.body.title,
        description: req.body.description,
        members: req.body.members,
        technologies: req.body.technologies,
        user: user,
    })
    // Save data with mongoose method save()
    await data.save()
    const relU = await User.findById(user)
    try {
        // Response with a 200 status and json object display
        relU.projects.push(data)
        await relU.save()

        res.status(200).json({ record: data })
    } catch (error) {
        // Catch error and send Response with a status 400 and display error message
        res.status(400).json({ error: error.message })
    }
}
// Get records for all Projects
exports.getAll = async (req, res) => {
    try {
        const data = await Project.find()
            .populate('comments')
            .populate('user', 'username projects')
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).json({ error: 'No Id detected' })
    }

    try {
        const data = await Project.findById(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.deleteById = async (req, res) => {
    // get id from parameters
    const id = req.params.id

    try {
        const data = await Project.findById(id)
        if (!data) {
            res.status(400).json({ error: 'Record not found' })
        } else {
            await Project.findByIdAndRemove(id)
            res.status(200).json({ message: ` record ${id} deleted` })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.deleteAll = async (req, res) => {
    try {
        await Project.deleteMany()
        res.status(200).json({ message: 'All records deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.updateProject = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        await Project.findByIdAndUpdate(id, body)
        res.status(200).json({ message: `Record ${id} updated`, data: body })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
