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
  menFPBasicInfoRules,
  menFPStyleFitRules,
  menFPCustomDsgnBrandRules,
  menFPScheduleRules,
  menFPShipAddressRules
} from '../middleware/validateMFitprofileMdware.js';
import {
  womenFPBasicInfoRules,
  womenFPStyleFitRules,
  womenFPCustomDsgnBrandRules,
  womenFPScheduleRules,
  womenFPShipAddressRules
} from '../middleware/validateWFitprofileMdware.js';
import { protect } from '../middleware/authMdware.js';
import * as mfitprofileCtrl from '../controllers/mfitprofileCtrl.js';
import * as wfitprofileCtrl from '../controllers/wfitprofileCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/fitprofile/basicinfo/men/edit
 * @access private
 * @desc Edit (Add/Modify) basic information of men fit profile
 */
router
  .route('/basicinfo/men/edit')
  .post(
    protect,
    menFPBasicInfoRules(),
    validate,
    mfitprofileCtrl.editMenFPBasicInfo
  );

/**
 * @method GET
 * @route dfnew/fitprofile/basicinfo/men
 * @access private
 * @desc Get male user's basic information of men fit profile
 */
router.route('/basicinfo/men').get(protect, mfitprofileCtrl.getMenFPBasicInfo);

/**
 * @method POST
 * @route dfnew/fitprofile/stylefit/men/edit
 * @access private
 * @desc Edit (Add/Modify) style fit of men fit profile
 */
router
  .route('/stylefit/men/edit')
  .post(
    protect,
    menFPStyleFitRules(),
    validate,
    mfitprofileCtrl.editMenFPStyleFit
  );

/**
 * @method GET
 * @route dfnew/fitprofile/stylefit/men
 * @access private
 * @desc Get male user's style fit of men fit profile
 */
router.route('/stylefit/men').get(protect, mfitprofileCtrl.getMenFPStyleFit);

/**
 * @method POST
 * @route dfnew/fitprofile/pricerange/men/edit
 * @access private
 * @desc Edit (Add/Modify) price range of men fit profile
 */
router
  .route('/pricerange/men/edit')
  .post(protect, mfitprofileCtrl.editMenFPPriceRange);

/**
 * @method GET
 * @route dfnew/fitprofile/pricerange/men
 * @access private
 * @desc Get male user's price range of men fit profile
 */
router
  .route('/pricerange/men')
  .get(protect, mfitprofileCtrl.getMenFPPriceRange);

/**
 * @method POST
 * @route dfnew/fitprofile/customdsgnbrand/men/edit
 * @access private
 * @desc Edit (Add/Modify) custom design & brands of men fit profile
 */
router
  .route('/customdsgnbrand/men/edit')
  .post(
    protect,
    menFPCustomDsgnBrandRules(),
    validate,
    mfitprofileCtrl.editMenFPCustomDsgnBrand
  );

/**
 * @method GET
 * @route dfnew/fitprofile/customdsgnbrand/men
 * @access private
 * @desc Get male user's custom design & brands of men fit profile
 */
router
  .route('/customdsgnbrand/men')
  .get(protect, mfitprofileCtrl.getMenFPCustomDsgnBrand);

/**
 * @method POST
 * @route dfnew/fitprofile/schedule/men/edit
 * @access private
 * @desc Edit (Add/Modify) delivery schedule of men fit profile
 */
router
  .route('/schedule/men/edit')
  .post(
    protect,
    menFPScheduleRules(),
    validate,
    mfitprofileCtrl.editMenFPSchedule
  );

/**
 * @method GET
 * @route dfnew/fitprofile/schedule/men
 * @access private
 * @desc Get male user's delivery schedule of men fit profile
 */
router.route('/schedule/men').get(protect, mfitprofileCtrl.getMenFPSchedule);

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/men/edit
 * @access private
 * @desc Edit (Add/Modify) shipping address of men fit profile
 */
router
  .route('/shipaddress/men/edit')
  .post(
    protect,
    menFPShipAddressRules(),
    validate,
    mfitprofileCtrl.editMenFPShipAddress
  );

/**
 * @method GET
 * @route dfnew/fitprofile/shipaddresses/men/all
 * @access private
 * @desc Get male user's all ship addresses of men fit profile
 */
router
  .route('/shipaddresses/men/all')
  .get(protect, mfitprofileCtrl.getMenFPShipAddressesAll);

/**
 * @method GET
 * @route dfnew/fitprofile/shipaddress/men/:id
 * @access private
 * @desc Get male user's ship address of men fit profile by ID
 */
router
  .route('/shipaddress/men/:id')
  .get(protect, mfitprofileCtrl.getMenFPShipAddress);

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/men/delete/:id
 * @access private
 * @desc Delete male user's ship address of men fit profile by ID
 */
router
  .route('/shipaddress/men/delete/:id')
  .post(protect, mfitprofileCtrl.deleteMenFPShipAddress);

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/men/setdefault/:id
 * @access private
 * @desc Set male user's ship address of men fit profile as Default by ID
 */
router
  .route('/shipaddress/men/setdefault/:id')
  .post(protect, mfitprofileCtrl.setMenFPShipAddressDefault);

/**
 * @method POST
 * @route dfnew/fitprofile/billinginfo/men/add
 * @access private
 * @desc Add card payment billing info of men fit profile
 */
router
  .route('/billinginfo/men/add')
  .post(protect, mfitprofileCtrl.addMenFPBillingInfo);

/**
 * @method GET
 * @route dfnew/fitprofile/billinginfos/men/all
 * @access private
 * @desc Get male user's all billing infos of men fit profile
 */
router
  .route('/billinginfos/men/all')
  .get(protect, mfitprofileCtrl.getMenFPBillingInfosAll);

/**
 * @method GET
 * @route dfnew/fitprofile/billinginfo/men/:id
 * @access private
 * @desc Get male user's billing info of men fit profile by ID
 */
router
  .route('/billinginfo/men/:id')
  .get(protect, mfitprofileCtrl.getMenFPBillingInfo);

/**
 * @method POST
 * @route dfnew/fitprofile/basicinfo/women/edit
 * @access private
 * @desc Edit (Add/Modify) basic information of women fit profile
 */
router
  .route('/basicinfo/women/edit')
  .post(
    protect,
    womenFPBasicInfoRules(),
    validate,
    wfitprofileCtrl.editWomenFPBasicInfo
  );

/**
 * @method GET
 * @route dfnew/fitprofile/basicinfo/women
 * @access private
 * @desc Get female user's basic information of women fit profile
 */
router
  .route('/basicinfo/women')
  .get(protect, wfitprofileCtrl.getWomenFPBasicInfo);

/**
 * @method POST
 * @route dfnew/fitprofile/stylefit/women/edit
 * @access private
 * @desc Edit (Add/Modify) style fit of women fit profile
 */
router
  .route('/stylefit/women/edit')
  .post(
    protect,
    womenFPStyleFitRules(),
    validate,
    wfitprofileCtrl.editWomenFPStyleFit
  );

/**
 * @method GET
 * @route dfnew/fitprofile/stylefit/women
 * @access private
 * @desc Get female user's style fit of women fit profile
 */
router
  .route('/stylefit/women')
  .get(protect, wfitprofileCtrl.getWomenFPStyleFit);

/**
 * @method POST
 * @route dfnew/fitprofile/pricerange/women/edit
 * @access private
 * @desc Edit (Add/Modify) price range of women fit profile
 */
router
  .route('/pricerange/women/edit')
  .post(protect, wfitprofileCtrl.editWomenFPPriceRange);

/**
 * @method GET
 * @route dfnew/fitprofile/pricerange/women
 * @access private
 * @desc Get female user's price range of women fit profile
 */
router
  .route('/pricerange/women')
  .get(protect, wfitprofileCtrl.getWomenFPPriceRange);

/**
 * @method POST
 * @route dfnew/fitprofile/customdsgnbrand/women/edit
 * @access private
 * @desc Edit (Add/Modify) custom design & brands of women fit profile
 */
router
  .route('/customdsgnbrand/women/edit')
  .post(
    protect,
    womenFPCustomDsgnBrandRules(),
    validate,
    wfitprofileCtrl.editWomenFPCustomDsgnBrand
  );

/**
 * @method GET
 * @route dfnew/fitprofile/customdsgnbrand/women
 * @access private
 * @desc Get female user's custom design & brands of women fit profile
 */
router
  .route('/customdsgnbrand/women')
  .get(protect, wfitprofileCtrl.getWomenFPCustomDsgnBrand);

/**
 * @method POST
 * @route dfnew/fitprofile/schedule/women/edit
 * @access private
 * @desc Edit (Add/Modify) delivery schedule of women fit profile
 */
router
  .route('/schedule/women/edit')
  .post(
    protect,
    womenFPScheduleRules(),
    validate,
    wfitprofileCtrl.editWomenFPSchedule
  );

/**
 * @method GET
 * @route dfnew/fitprofile/schedule/women
 * @access private
 * @desc Get female user's delivery schedule of women fit profile
 */
router
  .route('/schedule/women')
  .get(protect, wfitprofileCtrl.getWomenFPSchedule);

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/women/edit
 * @access private
 * @desc Edit (Add/Modify) shipping address of women fit profile
 */
router
  .route('/shipaddress/women/edit')
  .post(
    protect,
    womenFPShipAddressRules(),
    validate,
    wfitprofileCtrl.editWomenFPShipAddress
  );

/**
 * @method GET
 * @route dfnew/fitprofile/shipaddresses/women/all
 * @access private
 * @desc Get female user's all ship addresses of women fit profile
 */
router
  .route('/shipaddresses/women/all')
  .get(protect, wfitprofileCtrl.getWomenFPShipAddressesAll);

/**
 * @method GET
 * @route dfnew/fitprofile/shipaddress/women/:id
 * @access private
 * @desc Get female user's ship address of women fit profile by ID
 */
router
  .route('/shipaddress/women/:id')
  .get(protect, wfitprofileCtrl.getWomenFPShipAddress);

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/women/delete/:id
 * @access private
 * @desc Delete female user's ship address of women fit profile by ID
 */
router
  .route('/shipaddress/women/delete/:id')
  .post(protect, wfitprofileCtrl.deleteWomenFPShipAddress);

/**
 * @method POST
 * @route dfnew/fitprofile/shipaddress/women/setdefault/:id
 * @access private
 * @desc Set female user's ship address of women fit profile as Default by ID
 */
router
  .route('/shipaddress/women/setdefault/:id')
  .post(protect, wfitprofileCtrl.setWomenFPShipAddressDefault);

/**
 * @method POST
 * @route dfnew/fitprofile/billinginfo/women/add
 * @access private
 * @desc Add card payment billing info of women fit profile
 */
router
  .route('/billinginfo/women/add')
  .post(protect, wfitprofileCtrl.addWomenFPBillingInfo);

/**
 * @method GET
 * @route dfnew/fitprofile/billinginfos/women/all
 * @access private
 * @desc Get female user's all billing infos of women fit profile
 */
router
  .route('/billinginfos/women/all')
  .get(protect, wfitprofileCtrl.getWomenFPBillingInfosAll);

/**
 * @method GET
 * @route dfnew/fitprofile/billinginfo/women/:id
 * @access private
 * @desc Get female user's billing info of women fit profile by ID
 */
router
  .route('/billinginfo/women/:id')
  .get(protect, wfitprofileCtrl.getWomenFPBillingInfo);

export default router;
