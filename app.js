const express = require("express");
const passport = require("passport");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 4000 || process.env.PORT;


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , "public")));
app.use(cors());
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(session({ secret: 'chat-app', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//setting up mongooose
mongoose.connect('mongodb://localhost/chat_app' , (err) => {
    if (err) {
        console.log(err);
    }
    console.log("success");
});
//mongoose.set('debug', true);

app.get("/" , (req , res) => {
    app.sendFile("index");
});


app.listen(PORT , () => {
    console.log("started listening on port " + PORT);
})