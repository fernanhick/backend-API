const db = require("../models");
const User = db.user;

exports.signup = async (req, res) => {
    if (!req.body.username || req.body.password) {
        res.json({ succes: false, error: "Send needed parameters" });
        return;
    }
    const data = new User({
        username: req.body.username,
        password: req.body.password,
    });
};
