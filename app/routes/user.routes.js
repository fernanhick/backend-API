module.exports = (app) => {
    const users = require("../controllers/user.controller");
    var router = require("express").Router();

    // signup endpoint
    router.post("/", users.signup);

    app.use("api/v1/signup", router);
};
