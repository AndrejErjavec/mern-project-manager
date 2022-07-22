const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const errorHandler = require('./errorMiddlewre')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Token format in http authorization headers: 'Bearer fheia56ef834u39...'

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token form headers - take only the token after 'Bearer' keyword
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token and store it inside req.user
      // Because we generate token based on id, we can get the id from decoded token
      // Remove password from decoded token
      let user = (await User.findById(decoded.id))[0];
      // We don't want to have the hashed password stored in req.user
      delete user.password;
      // User is not a pre-existing field in req. We could say req.something = user
      req.user = user;

      next();

    } catch (err) {
      // return errorHandler({err: 'Not authorized', status: 401});
      console.log(err)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    // return errorHandler({err: 'No token', status: 401});
    res.status(401)
    throw new Error('Not authorized, no token')
  }
});

module.exports = {protect};