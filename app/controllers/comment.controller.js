const db = require("../models");
const Comment = db.comments;
const Project = db.projects;

exports.addComment = async (req, res) => {
    const id = req.params.id;

    const data = new Comment({
        text: req.body.text,
        project: id,
    });
    await data.save();
    const projectRelated = await Project.findById(id);
    projectRelated.comments.push(data);
    try {
        await projectRelated.save();
        res.status(200).json({ message: "Comment saved" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteComment = async (req, res) => {
    const id = req.params.id;
    try {
        const data = Comment.findById(id);
        if (!data) {
            res.status(400).json({ error: "Record not found" });
        } else {
            await Comment.findByIdAndRemove(id);
            res.status(200).json({ message: "Record Deleted" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
