/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import bodyParser from 'body-parser';

import { protect } from '../middleware/authMdware.js';
import * as paymentCtrl from '../controllers/paymentCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/payment/stripe/paymethod/attach
 * @access private
 * @desc Add payment method
 */
router
  .route('/stripe/paymethod/attach')
  .post(protect, paymentCtrl.attachPayMethod);

/**
 * @method GET
 * @route dfnew/payment/stripe/paymethods/list
 * @access private
 * @desc List payment methods
 */
router.route('/stripe/paymethods/list').get(protect, paymentCtrl.getPayMethods);

/**
 * @method POST
 * @route dfnew/payment/stripe/payintent/stylingfee/create
 * @access private
 * @desc Create payment intent of styling fee
 */
router
  .route('/stripe/payintent/stylingfee/create')
  .post(protect, paymentCtrl.createPayIntentOfStyleFee);

/**
 * @method POST
 * @route dfnew/payment/stripe/payintent/confirm
 * @access private
 * @desc Confirm payment intent
 */
router
  .route('/stripe/payintent/confirm')
  .post(protect, paymentCtrl.confirmPayIntent);

/**
 * @method POST
 * @route dfnew/payment/stripe/webhook
 * @access public
 * @desc Listen to Stripe events by webhook
 */
router.post(
  '/stripe/webhook',
  bodyParser.raw({ type: 'application/json' }),
  paymentCtrl.payWebhookHandler
);

export default router;
