const { Router } = require('express');
const {  registerUserHandler, loginUserHandler, getAllUsersHandler } = require('../handlers/authhandler');

const auth = Router();

auth.post('/register', registerUserHandler);
auth.post('/login', loginUserHandler); 
auth.get('/', getAllUsersHandler)

module.exports = auth;