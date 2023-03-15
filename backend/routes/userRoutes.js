/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';

import { validate } from '../middleware/validateMdware.js';
import {
  signupRules,
  loginRules,
  verifyRules,
  forgotpwdRules,
  resetpwdRules,
  editLoginDetailsRules,
  selectFitRules
} from '../middleware/validateAuthMdware.js';
import { protect } from '../middleware/authMdware.js';
import * as userCtrl from '../controllers/userCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/user/signup
 * @access public
 * @desc Sign up user (Customer)
 */
router.post('/signup', signupRules(), validate, userCtrl.signupUser);

/**
 * @method POST
 * @route dfnew/user/login
 * @access public
 * @desc Login user
 */
router.post('/login', loginRules(), validate, userCtrl.loginUser);

/**
 * @method GET
 * @route dfnew/user/uinfo
 * @access private
 * @desc Get user's info
 */
router.route('/uinfo').get(protect, userCtrl.getUserInfo);

/**
 * @method POST
 * @route dfnew/user/verify
 * @access public
 * @desc Verify user's email
 */
router.post('/verify', verifyRules(), validate, userCtrl.verifyUser);

/**
 * @method POST
 * @route dfnew/user/forgotpwd
 * @access public
 * @desc Accept request from user who has forgotten password
 */
router.post('/forgotpwd', forgotpwdRules(), validate, userCtrl.handleForgotPwd);

/**
 * @method POST
 * @route dfnew/user/resetpwd
 * @access public
 * @desc Reset user's password
 */
router.post('/resetpwd', resetpwdRules(), validate, userCtrl.resetUserPwd);

/**
 * @method POST
 * @route dfnew/user/logindetails/edit
 * @access private
 * @desc Edit user's login details including Full Name, Password, etc.
 */
router
  .route('/logindetails/edit')
  .post(protect, editLoginDetailsRules(), validate, userCtrl.editLoginDetails);

/**
 * @method POST
 * @route dfnew/user/selectfit
 * @access private
 * @desc Select user's gender fit when initial fitFor is 2
 */
router
  .route('/selectfit')
  .post(protect, selectFitRules(), validate, userCtrl.selectUserFit);

/**
 * @method POST
 * @route dfnew/user/logout
 * @access private
 * @desc Logout user by destroying token
 */
router.route('/logout').post(protect, userCtrl.logoutUser);

/**
 * @method POST
 * @route dfnew/user/logout/strict
 * @access private
 * @desc Logout user strictly by removing all the tokens
 */
router.route('/logout/strict').post(protect, userCtrl.strictLogoutUser);

/**
 * @method POST
 * @route dfnew/user/kids/add/:order
 * @access private
 * @desc Add user's kid (with order of 1 ~ 4)
 */
router.route('/kids/add/:order').post(protect, userCtrl.addChild);

/**
 * @method GET
 * @route dfnew/user/influencer/:arg
 * @access public
 * @desc Confirm influencer registration
 */
router.get('/influencer/:arg', userCtrl.confirmInfluencer);

export default router;
