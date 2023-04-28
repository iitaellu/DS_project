const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const session = require('express-session');

//Connecting to database
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database: '+config.database);
})
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
})

const app = express();

const users = require('./routes/users');
//const doctorpassport = require('./config/doctorpassport');

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//require('./config/doctorpassport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send("<h1>Somewhere in H-Health</h1>")
});

app.listen(port, () => {
    console.log('Server started on port ' + port)
});