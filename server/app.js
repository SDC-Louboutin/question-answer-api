var express = require('express');

// Middleware
var morgan = require('morgan');
var cors = require('cors');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', process.env.PORT);

// Logging and parsing
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Set up our routes
app.use('/qa', router);

// // Serve the client files
// app.use(express.static(__dirname + '/../client'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

