//Export module with the routes
module.exports = (app) => {
    //Import function that will be execute as callback for the routes
    const projects = require("../controllers/project.controller");
    //Import the router method from express for definng routes
    var router = require("express").Router();

    //Route for creating a POST request to create a new project
    //Call post method from router, pass parameter for the endpoint followed by the function created in the controller
    router.post("/", projects.create);
    //Get records for all projects
    router.get("/", projects.getAll);

    // Get Record Based on ID
    router.get("/:id", projects.getById);

    // Delete Record based on ID
    router.delete("/:id", projects.deleteById);
    // Delete all record
    router.delete("/", projects.deleteAll);
    // PATCH record => UPDATE
    router.patch("/:id", projects.updateProject);
    //Assign the predifined endpoints for all the CRUD requests
    app.use("/api/v1/projects", router);
};
