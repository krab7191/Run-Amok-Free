// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
    console.log('loading dev environments');
}

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db');
const routes = require('./routes');
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
}));

//  Handle cookies, sessions model in MongoDB, etc
app.use(passport.initialize());
app.use(passport.session());

// If its production environment!
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    console.log('YOU ARE IN THE PRODUCTION ENV');
    app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/'))
    });
}

// Routing
app.use(routes);

// Error handler
app.use(function (err, req, res, next) {
    console.log('====== ERROR =======');
    console.error(err.stack);
    res.status(500);
});

// Starting Server
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
