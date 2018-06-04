const express = require('express')
const userContoller = require('./controllers/UserCtrl')
var cookieParser = require('cookie-parser');

const router = express.Router()
router.post('/users', userContoller.createUserHandler)
router.post('/users/find', userContoller.getUserhandler)
router.post('/login', userContoller.loginHandler)
router.get('/logout', userContoller.logoutHandler)
router.get('/authstatus', userContoller.loginStatusHandler)

module.exports = router
