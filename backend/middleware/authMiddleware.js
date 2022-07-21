const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(401)
        throw new Error("Not authorized, no token");
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      next();

      req.user = await User.findById(decodedToken.id);
    } 
    catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
    
  }
});

module.exports = {protect};