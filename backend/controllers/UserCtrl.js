const User = require('../models/User')

exports.createUserHandler = (req, res) => {
  var requiredParams = ['username', 'email', 'password']

  if (missingParams(req.body, requiredParams)) {
    res.status(400).json({ message: "Bad request. Required " + requiredParams.toString() })
    return;
  }

  const params = {
    'username': req.body.username,
    'email': req.body.email,
    'password': req.body.password,
  }

  /* Create user if username and email not taken */

  User.find(params, user => {
    if (user) {
      res.status(409).json({'error': 'username or email already taken.' })
    } else {
      User.create(params, (response) => {
        res.status(201).json(response)
      })
    }
  })
}

exports.getUserhandler = (req, res) => {
  var requiredParams = ['email']

  if (missingParams(req.body, requiredParams)) {
    res.status(400).json({ error: "Bad request. Required " + requiredParams.toString() })
    return;
  }

  const params = {
    'email': req.body.email,
  }

  User.find(params, (response) => {
    res.status(200).json(response)
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
    if (req.body.password === response.password) {

      if (req.sessionID) {
        req.session.user = req.body.email
        res.status(200).json({'message': 'success'})
      }

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
  
  let status = (req.sessionID in req.session)
  res.status(200).json({'status': status})
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