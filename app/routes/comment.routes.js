module.exports = (app) => {
    const comments = require("../controllers/comment.controller");
    var router = require("express").Router();

    router.post("/:id/comment", comments.addComment);

    app.use("/api/v1/projects", router);
};
