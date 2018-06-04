const express = require('express')
const userContoller = require('./controllers/UserCtrl')
var cookieParser = require('cookie-parser');

const sessionChecker = (req, res, next) => {

  if (req.session.user && req.cookies.gamico_session) {
      res.status(200).json({'status': true})
  } else {
      next();
  }
};


const router = express.Router()
router.post('/users', userContoller.createUserHandler)
router.post('/users/find', userContoller.getUserhandler)
router.post('/login', userContoller.loginHandler)
router.get('/logout', userContoller.logoutHandler)
router.get('/authstatus', sessionChecker, userContoller.loginStatusHandler)

module.exports = router
