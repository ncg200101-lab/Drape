/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { body } from 'express-validator';
import validator from 'validator';

const listMRTableRules = () => {
  return [
    body('start')
      .not()
      .isEmpty()
      .withMessage('Start is mandatory')
      .isInt({ min: 0 })
      .withMessage('Start is invalid')
      .toInt(),
    body('size')
      .not()
      .isEmpty()
      .withMessage('Size is mandatory')
      .isInt({ min: 1 })
      .withMessage('Size is invalid')
      .toInt(),
    body('filters')
      .trim()
      .custom((value) => {
        try {
          const parsedVal = JSON.parse(value);
          if (typeof parsedVal === 'object' && Array.isArray(parsedVal)) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log('VALID_listMRTableRules_ERROR:', e);
          return false;
        }
      })
      .withMessage('Filters is invalid'),
    body('sorting')
      .trim()
      .custom((value) => {
        try {
          const parsedVal = JSON.parse(value);
          if (typeof parsedVal === 'object' && Array.isArray(parsedVal)) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log('VALID_listMRTableRules_ERROR:', e);
          return false;
        }
      })
      .withMessage('Sorting is invalid'),
    body('globalFilter').trim()
  ];
};

const checkIdRules = () => {
  return [
    body('_id')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('ID is required')
  ];
};

const createInfluencerRules = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid'),
    body('note').trim().escape()
  ];
};

const editInfluencerInfoRules = () => {
  return [
    body('_id')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('ID is required'),
    body('name')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid'),
    body('note').trim().escape()
  ];
};

const createEmployeeRules = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Name is required'),
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
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid'),
    body('type')
      .not()
      .isEmpty()
      .withMessage('Employee type is mandatory')
      .isInt({ min: 0, max: 3 })
      .withMessage('Employee type is invalid')
      .toInt(),
    body('about').trim().escape(),
    body('address').trim().escape()
  ];
};

const changeEmployeePwdRules = () => {
  return [
    body('_id')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('ID is required'),
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

const editEmployeeInfoRules = () => {
  return [
    body('_id')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('ID is required'),
    body('name')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid'),
    body('type')
      .not()
      .isEmpty()
      .withMessage('Employee type is mandatory')
      .isInt({ min: 0, max: 3 })
      .withMessage('Employee type is invalid')
      .toInt(),
    body('about').trim().escape(),
    body('address').trim().escape()
  ];
};

const addStateSalesTaxRules = () => {
  return [
    body('stateName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('State name is required'),
    body('zipMin')
      .not()
      .isEmpty()
      .withMessage('Zipcode min is required')
      .trim()
      .custom((value) => {
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        return regexZip.test(value);
      })
      .withMessage('Zipcode min is invalid'),
    body('zipMax')
      .not()
      .isEmpty()
      .withMessage('Zipcode max is required')
      .trim()
      .custom((value) => {
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        return regexZip.test(value);
      })
      .withMessage('Zipcode max is invalid'),
    body('taxRate')
      .not()
      .isEmpty()
      .withMessage('Tax rate is mandatory')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return parseInt(value, 10);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return parseFloat(value);
        } else {
          throw new Error('Tax rate is invalid');
        }
      })
  ];
};

const editStateSalesTaxRules = () => {
  return [
    body('_id')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('ID is required'),
    body('stateName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('State name is required'),
    body('zipMin')
      .not()
      .isEmpty()
      .withMessage('Zipcode min is required')
      .trim()
      .custom((value) => {
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        return regexZip.test(value);
      })
      .withMessage('Zipcode min is invalid'),
    body('zipMax')
      .not()
      .isEmpty()
      .withMessage('Zipcode max is required')
      .trim()
      .custom((value) => {
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        return regexZip.test(value);
      })
      .withMessage('Zipcode max is invalid'),
    body('taxRate')
      .not()
      .isEmpty()
      .withMessage('Tax rate is mandatory')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return parseInt(value, 10);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return parseFloat(value);
        } else {
          throw new Error('Tax rate is invalid');
        }
      })
  ];
};

export {
  listMRTableRules,
  checkIdRules,
  createInfluencerRules,
  editInfluencerInfoRules,
  createEmployeeRules,
  changeEmployeePwdRules,
  editEmployeeInfoRules,
  addStateSalesTaxRules,
  editStateSalesTaxRules
};
