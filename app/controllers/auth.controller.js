const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Role = db.roles;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Signup logic and export
exports.signup = function (req, res) {
    // Create new user getting values from request
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    // Save the new user and verify
    user.save(function (error, user) {
        // Catch error and return if found
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        // Check if there is a role in body request
        if (req.body.roles) {
            // Find all roles
            Role.find(
                {
                    name: { $in: req.body.roles },
                },
                (error, roles) => {
                    if (error) {
                        res.status(500).send({ message: error });
                        return;
                    }
                    user.roles = roles.map((role) => role._id);
                    user.save((error) => {
                        if (error) {
                            res.status(500).send({ message: error });
                            return;
                        }
                        res.send({
                            message: "User was registered succesfully!",
                        });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (error, role) => {
                if (error) {
                    res.status(500).send({ message: error });
                    return;
                }
                res.send({ message: "User was registered successfully!" });
            });
        }
    });
};
exports.signin = function (req, res) {
    User.findOne({
        username: req.body.username,
    })
        .populate("roles", "-__v")
        .exec((error, user) => {
            if (error) {
                res.status(500).send({ message: error });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            var passwordIdValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIdValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password",
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400,
            });
            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            });
        });
};
