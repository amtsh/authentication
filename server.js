const express = require('express')
var session = require('express-session');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const sslRedirect = require('heroku-ssl-redirect')

const app = express()
app.use(cookieParser());
// serve static files
app.use(express.static('./frontend/build'))

const getDatabaseConnection = require('./backend/db/database')
// connect database
getDatabaseConnection();

const appRouter = require('./backend/routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(sslRedirect()) /* enable ssl redirect */

app.use(session({
  secret: process.env.secret || 'gamico_secret_dev',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  },
  name: 'gamico_session'
}));

app.use((req, res, next) => {
  if (req.cookies.gamico_session && !req.session.user) {
    console.log("cleared cookies")
    res.clearCookie('gamico_session');
  }
  next();
});

// serve api
app.use('/api/v1/', appRouter)

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('App listening on port ' + port)
})