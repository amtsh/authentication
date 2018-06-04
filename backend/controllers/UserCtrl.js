const User = require('../models/User')
const bcrypt = require('bcrypt');

exports.createUserHandler = (req, res) => {
  var requiredParams = ['username', 'email', 'password']

  if (missingParams(req.body, requiredParams)) {
    res.status(400).json({ message: "Bad request. Required " + requiredParams.toString() })
    return;
  }

  const password = bcrypt.hashSync(req.body.password, 10)
  const params = {
    'username': req.body.username,
    'email': req.body.email,
    'password': password
  }

  /* Create user if username and email not taken */

  User.find(params, user => {
    if (user) {
      res.status(409).json({'error': 'username or email already taken.' })
    } else {
      User.create(params, (response) => {
        req.session.user = req.body.email
        res.status(201).json(response)
      })
    }
  })
}

exports.getUserhandler = (req, res) => {
  var requiredParams = ['email']

  var params = {}
  if (req.body.email) {
    params.email = req.body.email
  }
  if (req.session.user) {
    params.email = req.session.user
  }

  if (missingParams(params, requiredParams)) {
    res.status(400).json({ error: "Bad request. Required " + requiredParams.toString() })
    return;
  }

  User.find(params, (response) => {
    res.status(200).json(response || {})
  })
}

exports.loginHandler = (req, res) => {
  var requiredParams = ['email', 'password']

  if (missingParams(req.body, requiredParams)) {
    res.status(400).json({ error: "Bad request. Required " + requiredParams.toString() })
    return;
  }

  const params = {
    'email': req.body.email,
  }

  User.find(params, (response) => {
    let uuid = uuidGenerator()
    if (!response) {
      res.status(400).json({'error': 'Incorrect email'})
      return
    }
    if (bcrypt.compareSync(req.body.password, response.password)) {

      req.session.user = req.body.email
      res.status(200).json({'message': 'success'})

    } else {
      res.status(400).json({'error': 'Incorrect password'})
    }
  })

}

exports.logoutHandler = (req, res) => {
  
  if (req.cookies.gamico_session || req.session.user) {
    delete req.session.user
    res.clearCookie('gamico_session');
  }
  res.status(200).json({'status': true})
}

exports.loginStatusHandler = (req, res) => {
  
  if (req.session.user && req.cookies.gamico_session) {
      res.status(200).json({'status': true})
      return
  }
  res.status(200).json({'status': false})
}

const missingParams = (object, keys) => {
  for (key in keys) {
    if (!(keys[key] in object)) {
      return true
    }
  }
  return false
}

const uuidGenerator = () => {
  return  Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
}
