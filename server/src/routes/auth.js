const { Router } = require('express');
const {  registerUserHandler, loginUserHandler } = require('../handlers/authhandler');

const auth = Router();

auth.post('/register', registerUserHandler);
auth.post('/login', loginUserHandler); 

module.exports = auth;