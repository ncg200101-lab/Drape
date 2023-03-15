/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { body } from 'express-validator';

const signupRules = () => {
  return [
    body('firstName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('First name is required'),
    body('lastName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Last name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('fitFor')
      .not()
      .isEmpty()
      .withMessage('FitFor is mandatory')
      .isInt({ min: 0, max: 2 })
      .withMessage('FitFor is out of range')
      .toInt()
  ];
};

const loginRules = () => {
  return [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ];
};

const verifyRules = () => {
  return [
    body('tokenStr')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Token string is required')
  ];
};

const forgotpwdRules = () => {
  return [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid')
  ];
};

const resetpwdRules = () => {
  return [
    body('tokenStr')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Token string is required'),
    body('newPwd')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ];
};

const editLoginDetailsRules = () => {
  return [
    body('firstName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('First name is required'),
    body('lastName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Last name is required'),
    body('currentPwd')
      .trim()
      .custom((value) => {
        if (!value) return true;
        if (value.length < 6) {
          throw new Error('Current password must be at least 6 characters');
        }
        return true;
      }),
    body('newPwd')
      .trim()
      .custom((value) => {
        if (!value) return true;
        if (value.length < 6) {
          throw new Error('New password must be at least 6 characters');
        }
        return true;
      }),
    body('confirmPwd')
      .trim()
      .custom((value) => {
        if (!value) return true;
        if (value.length < 6) {
          throw new Error('Confirm password must be at least 6 characters');
        }
        return true;
      })
  ];
};

const selectFitRules = () => {
  return [
    body('fitFor')
      .not()
      .isEmpty()
      .withMessage('FitFor is mandatory')
      .isInt({ min: 0, max: 1 })
      .withMessage('FitFor is out of range')
      .toInt()
  ];
};

export {
  signupRules,
  loginRules,
  verifyRules,
  forgotpwdRules,
  resetpwdRules,
  editLoginDetailsRules,
  selectFitRules
};
