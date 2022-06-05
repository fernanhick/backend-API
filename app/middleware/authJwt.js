const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Role = db.roles;
// Verify token function
verifyToken = (req, res, next) => {
    //store token in variable
    let token = req.headers["x-access-token"];
    // check if there is a value for the token
    if (!token) {
        // Return if token not found
        return res.status(403).send({ message: "No token provided!" });
    }
    // Verify token passing token with config secret and callback if there is an error
    jwt.verify(token, config.secret, (error, decoded) => {
        // if there is an error found the return
        if (error) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        // Set the decoded
        req.userId = decoded.id;
        next();
    });
};
isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((error, user) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles },
            },
            (error, roles) => {
                if (error) {
                    res.status(500).send({ message: error });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: "Require admin role" });
                return;
            }
        );
    });
};
isModerator = (req, res, next) => {
    User.findById(req.userId).exec((error, user) => {
        if (error) {
            res.status(500).send({ message: error });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles },
            },
            (error, roles) => {
                if (error) {
                    res.status(500).send({ message: error });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }
                res.status(400).send({ message: "Require moderator role" });
                return;
            }
        );
    });
};
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
};
module.exports = authJwt;
