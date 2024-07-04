var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playersRouter = require('./routes/players');
var gameEventsRouter = require('./routes/game-events');
const gameAppearancesRouter = require('./routes/game-appearances');
const gameRouter = require('./routes/games');
const clubsRouter = require('./routes/clubs');
const clubGamesRouter = require('./routes/club-games');
const playerValuationsRouter = require('./routes/player-valuations');
const gameLineupsRouter = require('./routes/game-lineups');

const config = require('./configs/config');
const mongodatabase = require('./databases/mongodatabase');
const services = require('./service-layer')('./services');

const bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");

var app = express();

/* Options for the swagger docs */
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "IUM_TWEB MAIN SERVER",
      version: "0.1.0",
      description:
          "This is a simple project for IUMTWEB made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Claudio",
        email: "claudio.gesposito@hotmail.it",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});
//https://stackoverflow.com/questions/75577333/swagger-json-file-download-on-nodejs-api
// openapi swagger json: http://localhost:3000/swagger.json
//swagger doc: http://localhost:3000/api-docs/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add headers before the routes are defined to avoid CORS issues
// Reference: https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true); // No cookies needed

  // Pass to next layer of middleware
  next();
});

/* Set up routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/players', playersRouter);
app.use('/game-events', gameEventsRouter);
app.use('/game-appearances', gameAppearancesRouter);
app.use('/games', gameRouter);
app.use('/clubs', clubsRouter);
app.use('/club-games', clubGamesRouter);
app.use('/player-valuations', playerValuationsRouter);
app.use('/game-lineups', gameLineupsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* Initialize mongodb connection */
mongodatabase.connect().then(() => {
  services.log.info('Connection to mongodb established with success!');
}).catch((error) => {
  services.log.info('Connection to mongodb did not work... Terminating! Error:' + JSON.stringify(error));
  process.exit(1);
});

module.exports = app;
