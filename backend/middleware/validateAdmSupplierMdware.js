/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { body } from 'express-validator';
import validator from 'validator';

const supplyAddSupProdCategoryRules = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Name of supplier product category is required')
  ];
};

const supplyEditSupProdCategoryRules = () => {
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
      .withMessage('Name of supplier product category is required')
  ];
};

const supplyAddSupProductRules = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Name of supplier product is required'),
    body('category')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Supplier product category is required'),
    body('supProductImgUrl')
      .trim()
      .custom((value) => {
        return true;
      })
      .withMessage('Image URL of supplier product is invalid'),
    body('description')
      .trim()
      .escape()
      .custom((value) => {
        if (!value) return true;
        const words = value.match(/\b\w+\b/g);
        if (words && words.length >= 2) {
          return true;
        } else {
          throw new Error('Please input at least 2 words');
        }
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity of supplier product is mandatory')
      .isInt({ min: 0 })
      .withMessage('Quantity of supplier product is invalid')
      .toInt(),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Price of supplier product is mandatory')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return parseInt(value, 10);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return parseFloat(value);
        } else {
          throw new Error('Price of supplier product is invalid');
        }
      }),
    body('supplierName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Supplier name is required'),
    body('supplierAddress')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Supplier address is required'),
    body('supplierEmail')
      .not()
      .isEmpty()
      .withMessage('Supplier email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Supplier email is invalid'),
    body('supplierPhone')
      .not()
      .isEmpty()
      .withMessage('Supplier phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Supplier phone number is invalid')
  ];
};

const supplySupProductStockRules = () => {
  return [
    body('_id')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('ID is required'),
    body('count')
      .not()
      .isEmpty()
      .withMessage('Stock count is mandatory')
      .isInt({ min: 0 })
      .withMessage('Stock count is invalid')
      .toInt()
  ];
};

const supplyEditSupProductRules = () => {
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
      .withMessage('Name of supplier product is required'),
    body('supProductImgUrl')
      .trim()
      .custom((value) => {
        return true;
      })
      .withMessage('Image URL of supplier product is invalid'),
    body('description')
      .trim()
      .escape()
      .custom((value) => {
        if (!value) return true;
        const words = value.match(/\b\w+\b/g);
        if (words && words.length >= 2) {
          return true;
        } else {
          throw new Error('Please input at least 2 words');
        }
      }),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Price of supplier product is mandatory')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return parseInt(value, 10);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return parseFloat(value);
        } else {
          throw new Error('Price of supplier product is invalid');
        }
      }),
    body('supplierName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Supplier name is required'),
    body('supplierAddress')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Supplier address is required'),
    body('supplierEmail')
      .not()
      .isEmpty()
      .withMessage('Supplier email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Supplier email is invalid'),
    body('supplierPhone')
      .not()
      .isEmpty()
      .withMessage('Supplier phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Supplier phone number is invalid'),
    body('currentStock')
      .not()
      .isEmpty()
      .withMessage('Current in-stock of supplier product is mandatory')
      .isInt({ min: 0 })
      .withMessage('Current in-stock of supplier product is mandatory')
      .toInt()
  ];
};

export {
  supplyAddSupProdCategoryRules,
  supplyEditSupProdCategoryRules,
  supplyAddSupProductRules,
  supplySupProductStockRules,
  supplyEditSupProductRules
};
