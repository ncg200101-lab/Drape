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
  checkIdRules
} from '../middleware/validateAdmMainMdware.js';
import {
  supplyAddSupProdCategoryRules,
  supplyEditSupProdCategoryRules,
  supplyAddSupProductRules,
  supplySupProductStockRules,
  supplyEditSupProductRules
} from '../middleware/validateAdmSupplierMdware.js';
import { protectAdmin } from '../middleware/authMdware.js';
import * as admSupplierCtrl from '../controllers/admSupplierCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/category/add
 * @access private
 * @desc Add supplier product category in supplier dashboard
 */
router
  .route('/manage/supproduct/category/add')
  .post(
    protectAdmin,
    supplyAddSupProdCategoryRules(),
    validate,
    admSupplierCtrl.addSupProdCategory
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/category/tbllist
 * @access private
 * @desc List supplier product categories in table format in supplier dashboard
 */
router
  .route('/manage/supproduct/category/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admSupplierCtrl.listSupProdCategoriesTable
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/category/edit
 * @access private
 * @desc Edit supplier product category in supplier dashboard
 */
router
  .route('/manage/supproduct/category/edit')
  .post(
    protectAdmin,
    supplyEditSupProdCategoryRules(),
    validate,
    admSupplierCtrl.editSupProdCategory
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/category/delete
 * @access private
 * @desc Delete supplier product category in supplier dashboard
 */
router
  .route('/manage/supproduct/category/delete')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admSupplierCtrl.deleteSupProdCategory
  );

/**
 * @method GET
 * @route dfnew/admsupplier/manage/supproduct/categories
 * @access private
 * @desc Get supplier product categories in supplier dashboard
 */
router
  .route('/manage/supproduct/categories')
  .get(protectAdmin, admSupplierCtrl.getSupProdCategories);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/add
 * @access private
 * @desc Add supplier product in supplier dashboard
 */
router
  .route('/manage/supproduct/add')
  .post(
    protectAdmin,
    supplyAddSupProductRules(),
    validate,
    admSupplierCtrl.addSupplierProduct
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/tbllist
 * @access private
 * @desc List supplier products in table format in supplier dashboard
 */
router
  .route('/manage/supproduct/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admSupplierCtrl.listSupProductsTable
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/addmore/stock
 * @access private
 * @desc Add more stock of supplier products in supplier dashboard
 */
router
  .route('/manage/supproduct/addmore/stock')
  .post(
    protectAdmin,
    supplySupProductStockRules(),
    validate,
    admSupplierCtrl.addMoreSupProductStock
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/manualdeduct/stock
 * @access private
 * @desc Deduct stock of supplier products manually in supplier dashboard
 */
router
  .route('/manage/supproduct/manualdeduct/stock')
  .post(
    protectAdmin,
    supplySupProductStockRules(),
    validate,
    admSupplierCtrl.manualDeductSupProductStock
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/edit
 * @access private
 * @desc Edit supplier product in supplier dashboard
 */
router
  .route('/manage/supproduct/edit')
  .post(
    protectAdmin,
    supplyEditSupProductRules(),
    validate,
    admSupplierCtrl.editSupplierProduct
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/delete
 * @access private
 * @desc Delete supplier product in supplier dashboard
 */
router
  .route('/manage/supproduct/delete')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admSupplierCtrl.deleteSupplierProduct
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/deduct/details/tbllist
 * @access private
 * @desc List supplier product used(deduct) details in table format in supplier dashboard
 */
router
  .route('/manage/supproduct/deduct/details/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admSupplierCtrl.listSupProductDeductDetailsTable
  );

/**
 * @method POST
 * @route dfnew/admsupplier/manage/supproduct/deduct/summary/tbllist
 * @access private
 * @desc List supplier product used(deduct) summary in table format in supplier dashboard
 */
router
  .route('/manage/supproduct/deduct/summary/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admSupplierCtrl.listSupProductDeductSummaryTable
  );

export default router;
