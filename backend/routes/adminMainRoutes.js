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
  listMRTableRules,
  checkIdRules,
  createInfluencerRules,
  editInfluencerInfoRules,
  createEmployeeRules,
  changeEmployeePwdRules,
  editEmployeeInfoRules,
  addStateSalesTaxRules,
  editStateSalesTaxRules
} from '../middleware/validateAdmMainMdware.js';
import { protectAdmin } from '../middleware/authMdware.js';
import * as admInfluencerCtrl from '../controllers/admInfluencerCtrl.js';
import * as admEmployeeCtrl from '../controllers/admEmployeeCtrl.js';
import * as admSalestaxCtrl from '../controllers/admSalestaxCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/admmain/manage/influencer/create
 * @access private
 * @desc Create influencer in admin dashboard
 */
router
  .route('/manage/influencer/create')
  .post(
    protectAdmin,
    createInfluencerRules(),
    validate,
    admInfluencerCtrl.createInfluencer
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/influencer/tbllist
 * @access private
 * @desc List influencers in table format in admin dashboard
 */
router
  .route('/manage/influencer/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admInfluencerCtrl.listInfluencersTable
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/influencer/edit
 * @access private
 * @desc Edit influencer info in admin dashboard
 */
router
  .route('/manage/influencer/edit')
  .post(
    protectAdmin,
    editInfluencerInfoRules(),
    validate,
    admInfluencerCtrl.editInfluencerInfo
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/influencer/delete
 * @access private
 * @desc Delete influencer entity in admin dashboard
 */
router
  .route('/manage/influencer/delete')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInfluencerCtrl.deleteInfluencer
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/create
 * @access private
 * @desc Create employee account in admin dashboard
 */
router
  .route('/manage/employee/create')
  .post(
    protectAdmin,
    createEmployeeRules(),
    validate,
    admEmployeeCtrl.createEmployee
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/tbllist
 * @access private
 * @desc List employees in table format in admin dashboard
 */
router
  .route('/manage/employee/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admEmployeeCtrl.listEmployeesTable
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/changepwd
 * @access private
 * @desc Change employee account password in admin dashboard
 */
router
  .route('/manage/employee/changepwd')
  .post(
    protectAdmin,
    changeEmployeePwdRules(),
    validate,
    admEmployeeCtrl.changeEmployeePwd
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/edit
 * @access private
 * @desc Edit employee info in admin dashboard
 */
router
  .route('/manage/employee/edit')
  .post(
    protectAdmin,
    editEmployeeInfoRules(),
    validate,
    admEmployeeCtrl.editEmployeeInfo
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/delete
 * @access private
 * @desc Delete employee account in admin dashboard
 */
router
  .route('/manage/employee/delete')
  .post(protectAdmin, checkIdRules(), validate, admEmployeeCtrl.deleteEmployee);

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/toggleactive
 * @access private
 * @desc Toggle active/inactive status of employee account in admin dashboard
 */
router
  .route('/manage/employee/toggleactive')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admEmployeeCtrl.toggleActiveEmployeeStatus
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/state/salestax/add
 * @access private
 * @desc Add sales tax info over state in admin dashboard
 */
router
  .route('/manage/state/salestax/add')
  .post(
    protectAdmin,
    addStateSalesTaxRules(),
    validate,
    admSalestaxCtrl.addStateSalesTax
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/state/salestax/tbllist
 * @access private
 * @desc List sales tax info in table format in admin dashboard
 */
router
  .route('/manage/state/salestax/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admSalestaxCtrl.listStateSalesTaxTable
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/state/salestax/edit
 * @access private
 * @desc Edit sales tax info over state in admin dashboard
 */
router
  .route('/manage/state/salestax/edit')
  .post(
    protectAdmin,
    editStateSalesTaxRules(),
    validate,
    admSalestaxCtrl.editStateSalesTax
  );

/**
 * @method POST
 * @route dfnew/admmain/manage/state/salestax/delete
 * @access private
 * @desc Delete sales tax info over state in admin dashboard
 */
router
  .route('/manage/state/salestax/delete')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admSalestaxCtrl.deleteStateSalesTax
  );

export default router;
