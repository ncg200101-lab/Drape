/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import { dbMainConn } from '../config/db.js';
import userSchema from '../models/main/userSchema.js';

/**
 * @notice error code 401 is only available here
 */

const protect = asyncHandler(async (req, res, next) => {
  const UserModel = dbMainConn.model('User', userSchema);
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserModel.findOne({
        _id: decoded.id,
        'tokens.token': token
      }).select('-password');
      if (!user) {
        console.log('MDWARE_protect_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protect_401:', err);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protect_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
  const UserModel = dbMainConn.model('User', userSchema);
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserModel.findOne({
        _id: decoded.id,
        'tokens.token': token
      }).select('-password');
      if (!user) {
        console.log(
          'MDWARE_protectAdmin_401:',
          'User not found, invalid token'
        );
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      const adminRoles = [100, 101];
      if (!adminRoles.includes(user.role)) {
        console.log(
          'MDWARE_protectAdmin_401:',
          'Forbidden, invalid role access'
        );
        return res.status(401).json({
          msg: 'Forbidden, invalid role access'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protectAdmin_401:', err);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protectAdmin_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

export { protect, protectAdmin };
