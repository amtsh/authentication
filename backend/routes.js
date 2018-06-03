const express = require('express')
const userContoller = require('./controllers/UserCtrl')

const router = express.Router()
router.post('/users', userContoller.createUserHandler)
router.post('/users/find', userContoller.getUserhandler)
router.post('/login', userContoller.loginHandler)
router.post('/logout', userContoller.logoutHandler)

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies['gamico_user_sid']) {
      res.status(200).json({"authenticated": true})
  } else {
      next();
  }
};

module.exports = router
