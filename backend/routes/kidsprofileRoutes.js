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
  kidBasicInfoRules,
  kidGirlStyleFitRules,
  kidBoyStyleFitRules,
  kidCustomDsgnBrandRules,
  kidScheduleRules,
  kidShipAddressRules
} from '../middleware/validateKidsprofileMdware.js';
import { protect } from '../middleware/authMdware.js';
import * as kidsprofileCtrl from '../controllers/kidsprofileCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/kidsprofile/basicinfo/:order/edit
 * @access private
 * @desc Edit (Add/Modify) basic information of child's fit profile
 */
router
  .route('/basicinfo/:order/edit')
  .post(
    protect,
    kidBasicInfoRules(),
    validate,
    kidsprofileCtrl.editKidBasicInfo
  );

/**
 * @method GET
 * @route dfnew/kidsprofile/basicinfo/:order
 * @access private
 * @desc Get child's basic information of fit profile
 */
router.route('/basicinfo/:order').get(protect, kidsprofileCtrl.getKidBasicInfo);

/**
 * @method POST
 * @route dfnew/kidsprofile/stylefit/girl/:order/edit
 * @access private
 * @desc Edit (Add/Modify) style fit of Girl child's fit profile
 */
router
  .route('/stylefit/girl/:order/edit')
  .post(
    protect,
    kidGirlStyleFitRules(),
    validate,
    kidsprofileCtrl.editKidStyleFit
  );

/**
 * @method POST
 * @route dfnew/kidsprofile/stylefit/boy/:order/edit
 * @access private
 * @desc Edit (Add/Modify) style fit of Boy child's fit profile
 */
router
  .route('/stylefit/boy/:order/edit')
  .post(
    protect,
    kidBoyStyleFitRules(),
    validate,
    kidsprofileCtrl.editKidStyleFit
  );

/**
 * @method GET
 * @route dfnew/kidsprofile/stylefit/girl/:order
 * @access private
 * @desc Get Girl child's style fit of fit profile
 */
router
  .route('/stylefit/girl/:order')
  .get(protect, kidsprofileCtrl.getKidStyleFit);

/**
 * @method GET
 * @route dfnew/kidsprofile/stylefit/boy/:order
 * @access private
 * @desc Get Boy child's style fit of fit profile
 */
router
  .route('/stylefit/boy/:order')
  .get(protect, kidsprofileCtrl.getKidStyleFit);

/**
 * @method POST
 * @route dfnew/kidsprofile/pricerange/girl/:order/edit
 * @access private
 * @desc Edit (Add/Modify) price range of Girl child's fit profile
 */
router
  .route('/pricerange/girl/:order/edit')
  .post(protect, kidsprofileCtrl.editKidPriceRange);

/**
 * @method POST
 * @route dfnew/kidsprofile/pricerange/boy/:order/edit
 * @access private
 * @desc Edit (Add/Modify) price range of Boy child's fit profile
 */
router
  .route('/pricerange/boy/:order/edit')
  .post(protect, kidsprofileCtrl.editKidPriceRange);

/**
 * @method GET
 * @route dfnew/kidsprofile/pricerange/girl/:order
 * @access private
 * @desc Get Girl child's price range of fit profile
 */
router
  .route('/pricerange/girl/:order')
  .get(protect, kidsprofileCtrl.getKidPriceRange);

/**
 * @method GET
 * @route dfnew/kidsprofile/pricerange/boy/:order
 * @access private
 * @desc Get Boy child's price range of fit profile
 */
router
  .route('/pricerange/boy/:order')
  .get(protect, kidsprofileCtrl.getKidPriceRange);

/**
 * @method POST
 * @route dfnew/kidsprofile/customdsgnbrand/girl/:order/edit
 * @access private
 * @desc Edit (Add/Modify) custom design & brands of Girl child's fit profile
 */
router
  .route('/customdsgnbrand/girl/:order/edit')
  .post(
    protect,
    kidCustomDsgnBrandRules(),
    validate,
    kidsprofileCtrl.editKidCustomDsgnBrand
  );

/**
 * @method POST
 * @route dfnew/kidsprofile/customdsgnbrand/boy/:order/edit
 * @access private
 * @desc Edit (Add/Modify) custom design & brands of Boy child's fit profile
 */
router
  .route('/customdsgnbrand/boy/:order/edit')
  .post(
    protect,
    kidCustomDsgnBrandRules(),
    validate,
    kidsprofileCtrl.editKidCustomDsgnBrand
  );

/**
 * @method GET
 * @route dfnew/kidsprofile/customdsgnbrand/girl/:order
 * @access private
 * @desc Get Girl child's custom design & brands of fit profile
 */
router
  .route('/customdsgnbrand/girl/:order')
  .get(protect, kidsprofileCtrl.getKidCustomDsgnBrand);

/**
 * @method GET
 * @route dfnew/kidsprofile/customdsgnbrand/boy/:order
 * @access private
 * @desc Get Boy child's custom design & brands of fit profile
 */
router
  .route('/customdsgnbrand/boy/:order')
  .get(protect, kidsprofileCtrl.getKidCustomDsgnBrand);

/**
 * @method POST
 * @route dfnew/kidsprofile/schedule/girl/:order/edit
 * @access private
 * @desc Edit (Add/Modify) delivery schedule of Girl child's fit profile
 */
router
  .route('/schedule/girl/:order/edit')
  .post(protect, kidScheduleRules(), validate, kidsprofileCtrl.editKidSchedule);

/**
 * @method POST
 * @route dfnew/kidsprofile/schedule/boy/:order/edit
 * @access private
 * @desc Edit (Add/Modify) delivery schedule of Boy child's fit profile
 */
router
  .route('/schedule/boy/:order/edit')
  .post(protect, kidScheduleRules(), validate, kidsprofileCtrl.editKidSchedule);

/**
 * @method GET
 * @route dfnew/kidsprofile/schedule/girl/:order
 * @access private
 * @desc Get Girl child's delivery schedule of fit profile
 */
router
  .route('/schedule/girl/:order')
  .get(protect, kidsprofileCtrl.getKidSchedule);

/**
 * @method GET
 * @route dfnew/kidsprofile/schedule/boy/:order
 * @access private
 * @desc Get Boy child's delivery schedule of fit profile
 */
router
  .route('/schedule/boy/:order')
  .get(protect, kidsprofileCtrl.getKidSchedule);

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/girl/:order/edit
 * @access private
 * @desc Edit (Add/Modify) shipping address of Girl child's fit profile
 */
router
  .route('/shipaddress/girl/:order/edit')
  .post(
    protect,
    kidShipAddressRules(),
    validate,
    kidsprofileCtrl.editKidShipAddress
  );

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/boy/:order/edit
 * @access private
 * @desc Edit (Add/Modify) shipping address of Boy child's fit profile
 */
router
  .route('/shipaddress/boy/:order/edit')
  .post(
    protect,
    kidShipAddressRules(),
    validate,
    kidsprofileCtrl.editKidShipAddress
  );

/**
 * @method GET
 * @route dfnew/kidsprofile/shipaddresses/girl/:order/all
 * @access private
 * @desc Get Girl child's all ship addresses of fit profile
 */
router
  .route('/shipaddresses/girl/:order/all')
  .get(protect, kidsprofileCtrl.getKidShipAddressesAll);

/**
 * @method GET
 * @route dfnew/kidsprofile/shipaddresses/boy/:order/all
 * @access private
 * @desc Get Boy child's all ship addresses of fit profile
 */
router
  .route('/shipaddresses/boy/:order/all')
  .get(protect, kidsprofileCtrl.getKidShipAddressesAll);

/**
 * @method GET
 * @route dfnew/kidsprofile/shipaddress/girl/:order/:id
 * @access private
 * @desc Get Girl child's ship address of fit profile by ID
 */
router
  .route('/shipaddress/girl/:order/:id')
  .get(protect, kidsprofileCtrl.getKidShipAddress);

/**
 * @method GET
 * @route dfnew/kidsprofile/shipaddress/boy/:order/:id
 * @access private
 * @desc Get Boy child's ship address of fit profile by ID
 */
router
  .route('/shipaddress/boy/:order/:id')
  .get(protect, kidsprofileCtrl.getKidShipAddress);

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/girl/:order/delete/:id
 * @access private
 * @desc Delete Girl child's ship address of fit profile by ID
 */
router
  .route('/shipaddress/girl/:order/delete/:id')
  .post(protect, kidsprofileCtrl.deleteKidShipAddress);

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/boy/:order/delete/:id
 * @access private
 * @desc Delete Boy child's ship address of fit profile by ID
 */
router
  .route('/shipaddress/boy/:order/delete/:id')
  .post(protect, kidsprofileCtrl.deleteKidShipAddress);

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/girl/:order/setdefault/:id
 * @access private
 * @desc Set Girl child's ship address of fit profile as Default by ID
 */
router
  .route('/shipaddress/girl/:order/setdefault/:id')
  .post(protect, kidsprofileCtrl.setKidShipAddressDefault);

/**
 * @method POST
 * @route dfnew/kidsprofile/shipaddress/boy/:order/setdefault/:id
 * @access private
 * @desc Set Boy child's ship address of fit profile as Default by ID
 */
router
  .route('/shipaddress/boy/:order/setdefault/:id')
  .post(protect, kidsprofileCtrl.setKidShipAddressDefault);

/**
 * @method POST
 * @route dfnew/kidsprofile/billinginfo/girl/:order/add
 * @access private
 * @desc Add card payment billing info of Girl child's fit profile
 */
router
  .route('/billinginfo/girl/:order/add')
  .post(protect, kidsprofileCtrl.addKidBillingInfo);

/**
 * @method POST
 * @route dfnew/kidsprofile/billinginfo/boy/:order/add
 * @access private
 * @desc Add card payment billing info of Boy child's fit profile
 */
router
  .route('/billinginfo/boy/:order/add')
  .post(protect, kidsprofileCtrl.addKidBillingInfo);

/**
 * @method GET
 * @route dfnew/kidsprofile/billinginfos/girl/:order/all
 * @access private
 * @desc Get Girl child's all billing infos of fit profile
 */
router
  .route('/billinginfos/girl/:order/all')
  .get(protect, kidsprofileCtrl.getKidBillingInfosAll);

/**
 * @method GET
 * @route dfnew/kidsprofile/billinginfos/boy/:order/all
 * @access private
 * @desc Get Boy child's all billing infos of fit profile
 */
router
  .route('/billinginfos/boy/:order/all')
  .get(protect, kidsprofileCtrl.getKidBillingInfosAll);

/**
 * @method GET
 * @route dfnew/kidsprofile/billinginfo/girl/:order/:id
 * @access private
 * @desc Get Girl child's billing info of fit profile by ID
 */
router
  .route('/billinginfo/girl/:order/:id')
  .get(protect, kidsprofileCtrl.getKidBillingInfo);

/**
 * @method GET
 * @route dfnew/kidsprofile/billinginfo/boy/:order/:id
 * @access private
 * @desc Get Boy child's billing info of fit profile by ID
 */
router
  .route('/billinginfo/boy/:order/:id')
  .get(protect, kidsprofileCtrl.getKidBillingInfo);

export default router;
