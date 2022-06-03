//import the index file to link with the models
const db = require("../models");
//Initiate instance of the project models
const Project = db.projects;

//Create the logic for CRUD functionalities
exports.create = async (req, res) => {
    //Store data into a new Project object
    const data = new Project({
        title: req.body.title,
        description: req.body.description,
        members: req.body.members,
        technologies: req.body.technologies,
    });
    //Try posting the data
    try {
        //Save data with mongoose method save()
        data.save();
        // Response with a 200 status and json object display
        res.status(200).json({ record: data });
    } catch (error) {
        //Catch error and send Response with a status 400 and display error message
        res.status(400).json({ error: error.message });
    }
};
//Get records for all Projects
exports.getAll = async (req, res) => {
    try {
        const data = await Project.find().populate("comments");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
