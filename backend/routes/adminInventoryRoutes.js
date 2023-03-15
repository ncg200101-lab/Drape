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
  invAddColorRules,
  invEditColorRules,
  createBrandStaffRules,
  changeBrandStaffPwdRules,
  editBrandStaffInfoRules,
  invAddProdCategoryRules,
  invEditProdCategoryRules,
  invAddProdSubCategoryRackRules,
  invEditProdSubCategoryRackRules,
  invAddProductForMenRules,
  invAddProductForWomenRules,
  invAddProductForKidsRules,
  invEditProductForMenRules,
  invEditProductForWomenRules,
  invEditProductForKidsRules
} from '../middleware/validateAdmInventoryMdware.js';
import { protectAdmin } from '../middleware/authMdware.js';
import * as admInventoryCtrl from '../controllers/admInventoryCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/adminventory/manage/color/add
 * @access private
 * @desc Add color in inventory dashboard
 */
router
  .route('/manage/color/add')
  .post(protectAdmin, invAddColorRules(), validate, admInventoryCtrl.addColor);

/**
 * @method POST
 * @route dfnew/adminventory/manage/color/tbllist
 * @access private
 * @desc List colors in table format in inventory dashboard
 */
router
  .route('/manage/color/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admInventoryCtrl.listColorsTable
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/color/edit
 * @access private
 * @desc Edit color in inventory dashboard
 */
router
  .route('/manage/color/edit')
  .post(
    protectAdmin,
    invEditColorRules(),
    validate,
    admInventoryCtrl.editColor
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/color/delete
 * @access private
 * @desc Delete color in inventory dashboard
 */
router
  .route('/manage/color/delete')
  .post(protectAdmin, checkIdRules(), validate, admInventoryCtrl.deleteColor);

/**
 * @method GET
 * @route dfnew/adminventory/manage/colors
 * @access private
 * @desc Get colors in inventory dashboard
 */
router.route('/manage/colors').get(protectAdmin, admInventoryCtrl.getColors);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/create
 * @access private
 * @desc Create brand staff account in inventory dashboard
 */
router
  .route('/manage/brand/staff/create')
  .post(
    protectAdmin,
    createBrandStaffRules(),
    validate,
    admInventoryCtrl.createBrandStaff
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/tbllist
 * @access private
 * @desc List brand staff in table format in inventory dashboard
 */
router
  .route('/manage/brand/staff/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admInventoryCtrl.listBrandStaffTable
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/changepwd
 * @access private
 * @desc Change brand staff account password in inventory dashboard
 */
router
  .route('/manage/brand/staff/changepwd')
  .post(
    protectAdmin,
    changeBrandStaffPwdRules(),
    validate,
    admInventoryCtrl.changeBrandStaffPwd
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/edit
 * @access private
 * @desc Edit brand staff info in inventory dashboard
 */
router
  .route('/manage/brand/staff/edit')
  .post(
    protectAdmin,
    editBrandStaffInfoRules(),
    validate,
    admInventoryCtrl.editBrandStaffInfo
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/delete
 * @access private
 * @desc Delete brand staff account in inventory dashboard
 */
router
  .route('/manage/brand/staff/delete')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.deleteBrandStaff
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/toggleactive
 * @access private
 * @desc Toggle active/inactive status of brand staff account in inventory dashboard
 */
router
  .route('/manage/brand/staff/toggleactive')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.toggleActiveBrandStaffStatus
  );

/**
 * @method GET
 * @route dfnew/adminventory/manage/brand/staff/count
 * @access private
 * @desc Count numbers of brand staff in inventory dashboard
 */
router
  .route('/manage/brand/staff/count')
  .get(protectAdmin, admInventoryCtrl.countBrandStaff);

/**
 * @method GET
 * @route dfnew/adminventory/manage/brand/staff/getbrands
 * @access private
 * @desc Get brand names in inventory dashboard
 */
router
  .route('/manage/brand/staff/getbrands')
  .get(protectAdmin, admInventoryCtrl.getBrandNames);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/add
 * @access private
 * @desc Add category of inventory product in inventory dashboard
 */
router
  .route('/manage/product/category/add')
  .post(
    protectAdmin,
    invAddProdCategoryRules(),
    validate,
    admInventoryCtrl.addInvProdCategory
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/tbllist
 * @access private
 * @desc List categories of inventory product in table format in inventory dashboard
 */
router
  .route('/manage/product/category/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admInventoryCtrl.listInvProdCategoriesTable
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/edit
 * @access private
 * @desc Edit category of inventory product in inventory dashboard
 */
router
  .route('/manage/product/category/edit')
  .post(
    protectAdmin,
    invEditProdCategoryRules(),
    validate,
    admInventoryCtrl.editInvProdCategory
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/delete
 * @access private
 * @desc Delete category of inventory product in inventory dashboard
 */
router
  .route('/manage/product/category/delete')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.deleteInvProdCategory
  );

/**
 * @method GET
 * @route dfnew/adminventory/manage/product/categories
 * @access private
 * @desc Get categories of inventory product in inventory dashboard
 */
router
  .route('/manage/product/categories')
  .get(protectAdmin, admInventoryCtrl.getInvProdCategories);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/subcategory/rack/add
 * @access private
 * @desc Add sub-category (rack) of inventory product in inventory dashboard
 */
router
  .route('/manage/product/subcategory/rack/add')
  .post(
    protectAdmin,
    invAddProdSubCategoryRackRules(),
    validate,
    admInventoryCtrl.addInvProdSubCategoryRack
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/subcategory/rack/tbllist
 * @access private
 * @desc List sub-categories of inventory product in inventory dashboard
 */
router
  .route('/manage/product/subcategory/rack/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admInventoryCtrl.listInvProdSubCategoriesTable
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/subcategory/rack/edit
 * @access private
 * @desc Edit sub-category (rack) of inventory product in inventory dashboard
 */
router
  .route('/manage/product/subcategory/rack/edit')
  .post(
    protectAdmin,
    invEditProdSubCategoryRackRules(),
    validate,
    admInventoryCtrl.editInvProdSubCategoryRack
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/subcategory/rack/delete
 * @access private
 * @desc Delete sub-category (rack) of inventory product in inventory dashboard
 */
router
  .route('/manage/product/subcategory/rack/delete')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.deleteInvProdSubCategoryRack
  );

/**
 * @method GET
 * @route dfnew/adminventory/manage/product/:categoryId/subcategories
 * @access private
 * @desc Get sub-categories of inventory product in inventory dashboard
 */
router
  .route('/manage/product/:categoryId/subcategories')
  .get(protectAdmin, admInventoryCtrl.getInvProdSubCategories);

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/add/men
 * @access private
 * @desc Add inventory product for men in inventory dashboard
 */
router
  .route('/manage/invproduct/add/men')
  .post(
    protectAdmin,
    invAddProductForMenRules(),
    validate,
    admInventoryCtrl.addInvProductForMen
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/add/women
 * @access private
 * @desc Add inventory product for women in inventory dashboard
 */
router
  .route('/manage/invproduct/add/women')
  .post(
    protectAdmin,
    invAddProductForWomenRules(),
    validate,
    admInventoryCtrl.addInvProductForWomen
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/add/kid/:gender
 * @access private
 * @desc Add inventory product for kids in inventory dashboard
 */
router
  .route('/manage/invproduct/add/kid/:gender')
  .post(
    protectAdmin,
    invAddProductForKidsRules(),
    validate,
    admInventoryCtrl.addInvProductForKids
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/tbllist
 * @access private
 * @desc List inventory products in inventory dashboard
 */
router
  .route('/manage/invproduct/tbllist')
  .post(
    protectAdmin,
    listMRTableRules(),
    validate,
    admInventoryCtrl.listInvProductsTable
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/edit/men
 * @access private
 * @desc Edit inventory product for men in inventory dashboard
 */
router
  .route('/manage/invproduct/edit/men')
  .post(
    protectAdmin,
    invEditProductForMenRules(),
    validate,
    admInventoryCtrl.editInvProductForMen
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/edit/women
 * @access private
 * @desc Edit inventory product for women in inventory dashboard
 */
router
  .route('/manage/invproduct/edit/women')
  .post(
    protectAdmin,
    invEditProductForWomenRules(),
    validate,
    admInventoryCtrl.editInvProductForWomen
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/edit/kid/:gender
 * @access private
 * @desc Edit inventory product for kids in inventory dashboard
 */
router
  .route('/manage/invproduct/edit/kid/:gender')
  .post(
    protectAdmin,
    invEditProductForKidsRules(),
    validate,
    admInventoryCtrl.editInvProductForKids
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/delete/men
 * @access private
 * @desc Delete inventory product for men in inventory dashboard
 */
router
  .route('/manage/invproduct/delete/men')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.deleteInvProductForMen
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/delete/women
 * @access private
 * @desc Delete inventory product for women in inventory dashboard
 */
router
  .route('/manage/invproduct/delete/women')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.deleteInvProductForWomen
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/delete/kid
 * @access private
 * @desc Delete inventory product for kids in inventory dashboard
 */
router
  .route('/manage/invproduct/delete/kid')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.deleteInvProductForKids
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/toggleactive/men
 * @access private
 * @desc Toggle active/inactive status of inventory product for men in inventory dashboard
 */
router
  .route('/manage/invproduct/toggleactive/men')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.toggleInvProductActiveForMen
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/toggleactive/women
 * @access private
 * @desc Toggle active/inactive status of inventory product for women in inventory dashboard
 */
router
  .route('/manage/invproduct/toggleactive/women')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.toggleInvProductActiveForWomen
  );

/**
 * @method POST
 * @route dfnew/adminventory/manage/invproduct/toggleactive/kid
 * @access private
 * @desc Toggle active/inactive status of inventory product for kids in inventory dashboard
 */
router
  .route('/manage/invproduct/toggleactive/kid')
  .post(
    protectAdmin,
    checkIdRules(),
    validate,
    admInventoryCtrl.toggleInvProductActiveForKids
  );

export default router;
