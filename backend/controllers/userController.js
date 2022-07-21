const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const {errorHandler} = require('../middleware/errorMiddlewre')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
  const {firstName, lastName, username, email, password} = req.body
  if (!firstName || !lastName || !username || !email || !password) {
    return errorHandler({err: 'Please fill all fields', req, res, status: 400})
  }

  const userWithEmail = await User.findByEmail(email);
  if (userWithEmail.length > 0) {
    return errorHandler({err:'User already exists', req, res, status: 400})
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //let user = new User(firstName, lastName, username, email, hashedPassword);
  const user = await User.create(firstName, lastName, username, email, hashedPassword);

  if (user.affectedRows > 0) {
    res.status(201).json({
      id: user.insertId,
      token: User.generateToken(user.insertId),
    });
  }
  else {
    return errorHandler({err: 'Invalid user data', req, res, status: 400});
  }

});

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findByEmail(email);
    
  if (!user) {
    return errorHandler({err:'User not found', req, res, status: 404})
    // res.status(404).json({'error': 'User not found'});
  }

  const pass = await User.validatePassword(password, user.password);

  if (!pass) {
    return errorHandler({err:'Incorrect password', req, res, status: 404})
  }
  
  if (user && pass) {
    res.status(201).json({
      token: User.generateToken(user.id),
    })
  }
  // else {
  //  res.status(400);
  //  throw new Error("Invalid credentials");
  // }
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
})

const getAll = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({users});
})

const getuserByEmail = asyncHandler(async (req, res) => {
  const user = await User.findByEmail(req.query.email);
  res.status(200).json({user});
})

module.exports = {
  registerUser,
  loginUser,
  getUser, 
  getAll,
  getuserByEmail
}