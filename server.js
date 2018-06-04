const express = require('express')
var session = require('express-session');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const sslRedirect = require('heroku-ssl-redirect')
//var MemoryStore = require('memorystore')(session)

const getDatabaseConnection = require('./backend/db/database')
// connect database
getDatabaseConnection();

const appRouter = require('./backend/routes')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(sslRedirect()) /* enable ssl redirect */

app.use(cookieParser());
app.use(session({
  secret: 'gamico_user_secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: 600000
  },
}));

// serve static files
app.use(express.static('./frontend/build'))
// serve api
app.use('/api/v1/', appRouter)

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('App listening on port ' + port)
})