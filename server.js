const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// create express app
const app = express();
const dir = path.join(__dirname, '/public');
app.use(express.static(dir));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json("Hello World!");
});


app.post('/detect_face', (req, res) => {
    console.log(req.body);
    res.json({status:200});
});

require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});