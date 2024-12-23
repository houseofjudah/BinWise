const express = require('express');
const router =  express.Router();
const {signupUser, signinUser} = require('../controllers/user.controller');

router.post( '/signup', signupUser );
router.post('/login', signinUser);


module.exports = router;
