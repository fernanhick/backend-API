require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT;
const app = express();
const corsOptions = {
    origin: "http://localhost:8080",
};

//import database config from the models index.js
const db = require("./app/models");
const Role = require("./app/models/role.model");

//set the cors url from where call can be made
app.use(cors(corsOptions));
//setup json parser through body-parser
app.use(bodyParser.json());
// parse request of content type - application x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Simple route to main
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Projects V1 API" });
});

//IMPORT routes for each model so this can be executed
require("./app/routes/project.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
});

//Setup the connection to monngoose database
db.mongoose
    .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }) //connect to db.url
    .then(() => {
        console.log(`Connected to database ${db.url}`); //display message for connection
    })
    .catch((err) => {
        //catch error if happened and sisplay message
        console.log({ "Cannot connect to database": err.message });
        process.exit(); //exit process in case of an error
    });

function initial() {
    Role.estimatedDocumentCount((error, count) => {
        if (!error && count === 0) {
            new Role({
                name: "user",
            }).save((error) => {
                if (error) {
                    console.log("error", error);
                }
                console.log("Added 'user' to roles collection");
            });
            new Role({
                name: "moderator",
            }).save((error) => {
                if (error) {
                    console.log("error", error);
                }
                console.log("Added 'moderator' to roles collection");
            });
            new Role({
                name: "admin",
            }).save((error) => {
                if (error) {
                    console.log("error", error);
                }
                console.log("Added 'admin' to roles collection");
            });
        }
    });
}

initial();
