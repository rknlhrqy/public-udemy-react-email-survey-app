/* global require */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();
// Plug in general Promise to Mongoose.
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey1, keys.cookieKey2],
}));
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport');

mongoose.connect(keys.mongoDbUri, { useNewUrlParser: true });

require('./routes/auth_routes')(app);
require('./routes/billing_routes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express Framework will serve up production assets
  // like the main.js and main.css files.
  app.use(express.static('client/build'));

  // Express Framework will serve up the index.html file
  // if it does not recognize the route
  const path = require('path');
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
