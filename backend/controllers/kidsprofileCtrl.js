/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import path from 'path';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import converter from 'number-to-words';

import { s3Client } from '../libs/s3Client.js';
import { dbMainConn } from '../config/db.js';
import kidsSchema from '../models/main/kidsSchema.js';
import kgFitProfileSchema from '../models/main/kgFitProfileSchema.js';
import kbFitProfileSchema from '../models/main/kbFitProfileSchema.js';
import kgFitProfileBasicInfoSchema from '../models/main/kgFitProfileBasicInfoSchema.js';
import kbFitProfileBasicInfoSchema from '../models/main/kbFitProfileBasicInfoSchema.js';
import kgFitProfileStyleFitSchema from '../models/main/kgFitProfileStyleFitSchema.js';
import kbFitProfileStyleFitSchema from '../models/main/kbFitProfileStyleFitSchema.js';
import kgFitProfilePriceRangeSchema from '../models/main/kgFitProfilePriceRangeSchema.js';
import kbFitProfilePriceRangeSchema from '../models/main/kbFitProfilePriceRangeSchema.js';
import kgFitProfileCustomDsgnBrandSchema from '../models/main/kgFitProfileCustomDsgnBrandSchema.js';
import kbFitProfileCustomDsgnBrandSchema from '../models/main/kbFitProfileCustomDsgnBrandSchema.js';
import fitProfileScheduleSchema from '../models/main/fitProfileScheduleSchema.js';
import fitProfileShipAddressSchema from '../models/main/fitProfileShipAddressSchema.js';
import fitProfileBillingInfoSchema from '../models/main/fitProfileBillingInfoSchema.js';

const __dirname = path.resolve();

const editKidBasicInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_editKidBasicInfo_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const KgFitProfileBasicInfoModel = dbMainConn.model(
      'KgFitProfileBasicInfo',
      kgFitProfileBasicInfoSchema
    );
    const KbFitProfileBasicInfoModel = dbMainConn.model(
      'KbFitProfileBasicInfo',
      kbFitProfileBasicInfoSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_editKidBasicInfo_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    //-- decide child's name & gender
    const kidId = kid._id;
    const { name, lookingFor } = req.body;
    const gender = lookingFor + 1;
    kid.gender = gender;
    kid.name = name;
    await kid.save();
    //-- now, basic info
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    const KidProfileBasicInfoModel =
      gender === 1 ? KgFitProfileBasicInfoModel : KbFitProfileBasicInfoModel;
    let fpStatus = { id: null, isNew: null };
    let kidFP = null;
    let newKidFP = null;
    let fpBasicInfo = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- add new
      newKidFP = await KidFitProfileModel.create({ kidId });
      if (!newKidFP) {
        console.log(
          'API_editKidBasicInfo_400:',
          'Failed to create base of Kid Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Kid Fit Profile'
        });
      }
      fpStatus = { id: newKidFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: kidFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const basicInfoFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpBasicInfo = await KidProfileBasicInfoModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: basicInfoFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpBasicInfo) {
      console.log(
        'API_editKidBasicInfo_400:',
        'Failed to edit Basic Info of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Basic Info of Kid Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newKidFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await newKidFP.save();
    } else {
      kidFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await kidFP.save();
    }
    //-- okay
    console.log(
      'API_editKidBasicInfo_200:',
      'Basic Info of Kid Fit Profile is saved'
    );
    res.status(200).send('Basic Info of Kid Fit Profile is saved');
  } catch (e) {
    console.log('API_editKidBasicInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidBasicInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidBasicInfo_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const KgFitProfileBasicInfoModel = dbMainConn.model(
      'KgFitProfileBasicInfo',
      kgFitProfileBasicInfoSchema
    );
    const KbFitProfileBasicInfoModel = dbMainConn.model(
      'KbFitProfileBasicInfo',
      kbFitProfileBasicInfoSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidBasicInfo_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    if (!gender) {
      //-- gender is mandatory
      console.log(
        'API_getKidBasicInfo_200:',
        'No Kid Fit Profile yet due to Gender missing'
      );
      return res.status(200).json(null);
    }
    //-- now, basic info
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    const KidProfileBasicInfoModel =
      gender === 1 ? KgFitProfileBasicInfoModel : KbFitProfileBasicInfoModel;
    let kidFP = null;
    let fpBasicInfo = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidBasicInfo_200:', 'No Kid Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpBiItemId = kidFP?.inputStatus?.basicInfo?.itemId;
    const fpBiIsComplete = kidFP?.inputStatus?.basicInfo?.isComplete;
    if (!fpBiItemId || fpBiIsComplete !== true) {
      //-- no basic info of fit profile yet
      //-- make a deep check again
      fpBasicInfo = await KidProfileBasicInfoModel.findOne(
        { profileId: kidFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpBasicInfo) {
        //-- no basic info yet really
        console.log(
          'API_getKidBasicInfo_200:',
          'No Basic Info of Kid Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- basic info exists in fact
      //-- adjust fit profile status
      kidFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await kidFP.save();
      //-- okay, not bad
      console.log(
        'API_getKidBasicInfo_200:',
        'Basic Info of Kid Fit Profile is returned'
      );
      return res.status(200).json(fpBasicInfo);
    }
    //-- everything seems fine so far
    fpBasicInfo = await KidProfileBasicInfoModel.findById(fpBiItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpBasicInfo) {
      //-- wrong of mismatch
      console.log(
        'API_getKidBasicInfo_400:',
        'No Basic Info of Kid Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Basic Info of Kid Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getKidBasicInfo_200:',
      'Basic Info of Kid Fit Profile is retrieved'
    );
    res.status(200).json(fpBasicInfo);
  } catch (e) {
    console.log('API_getKidBasicInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editKidStyleFit = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_editKidStyleFit_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const KgFitProfileStyleFitModel = dbMainConn.model(
      'KgFitProfileStyleFit',
      kgFitProfileStyleFitSchema
    );
    const KbFitProfileStyleFitModel = dbMainConn.model(
      'KbFitProfileStyleFit',
      kbFitProfileStyleFitSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_editKidStyleFit_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_editKidStyleFit_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, style fit
    const kidId = kid._id;
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    const KidProfileStyleFitModel =
      gender === 1 ? KgFitProfileStyleFitModel : KbFitProfileStyleFitModel;
    let fpStatus = { id: null, isNew: null };
    let kidFP = null;
    let newKidFP = null;
    let fpStyleFit = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- add new
      newKidFP = await KidFitProfileModel.create({ kidId });
      if (!newKidFP) {
        console.log(
          'API_editKidStyleFit_400:',
          'Failed to create base of Kid Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Kid Fit Profile'
        });
      }
      fpStatus = { id: newKidFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: kidFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const styleFitFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpStyleFit = await KidProfileStyleFitModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: styleFitFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpStyleFit) {
      console.log(
        'API_editKidStyleFit_400:',
        'Failed to edit Style Fit of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Style Fit of Kid Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newKidFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await newKidFP.save();
    } else {
      kidFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await kidFP.save();
    }
    //-- okay
    console.log(
      'API_editKidStyleFit_200:',
      'Style Fit of Kid Fit Profile is saved'
    );
    res.status(200).send('Style Fit of Kid Fit Profile is saved');
  } catch (e) {
    console.log('API_editKidStyleFit_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidStyleFit = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidStyleFit_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const KgFitProfileStyleFitModel = dbMainConn.model(
      'KgFitProfileStyleFit',
      kgFitProfileStyleFitSchema
    );
    const KbFitProfileStyleFitModel = dbMainConn.model(
      'KbFitProfileStyleFit',
      kbFitProfileStyleFitSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidStyleFit_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidStyleFit_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, style fit
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    const KidProfileStyleFitModel =
      gender === 1 ? KgFitProfileStyleFitModel : KbFitProfileStyleFitModel;
    let kidFP = null;
    let fpStyleFit = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidStyleFit_200:', 'No Kid Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpSfItemId = kidFP?.inputStatus?.styleFit?.itemId;
    const fpSfIsComplete = kidFP?.inputStatus?.styleFit?.isComplete;
    if (!fpSfItemId || fpSfIsComplete !== true) {
      //-- no style fit of fit profile yet
      //-- make a deep check again
      fpStyleFit = await KidProfileStyleFitModel.findOne(
        { profileId: kidFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpStyleFit) {
        //-- no style fit yet really
        console.log(
          'API_getKidStyleFit_200:',
          'No Style Fit of Kid Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- style fit exists in fact
      //-- adjust fit profile status
      kidFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await kidFP.save();
      //-- okay, not bad
      console.log(
        'API_getKidStyleFit_200:',
        'Style Fit of Kid Fit Profile is returned'
      );
      return res.status(200).json(fpStyleFit);
    }
    //-- everything seems fine so far
    fpStyleFit = await KidProfileStyleFitModel.findById(fpSfItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpStyleFit) {
      //-- wrong of mismatch
      console.log(
        'API_getKidStyleFit_400:',
        'No Style Fit of Kid Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Style Fit of Kid Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getKidStyleFit_200:',
      'Style Fit of Kid Fit Profile is retrieved'
    );
    res.status(200).json(fpStyleFit);
  } catch (e) {
    console.log('API_getKidStyleFit_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editKidPriceRange = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_editKidPriceRange_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const KgFitProfilePriceRangeModel = dbMainConn.model(
      'KgFitProfilePriceRange',
      kgFitProfilePriceRangeSchema
    );
    const KbFitProfilePriceRangeModel = dbMainConn.model(
      'KbFitProfilePriceRange',
      kbFitProfilePriceRangeSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_editKidPriceRange_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_editKidPriceRange_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, price range
    const kidId = kid._id;
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    const KidProfilePriceRangeModel =
      gender === 1 ? KgFitProfilePriceRangeModel : KbFitProfilePriceRangeModel;
    let fpStatus = { id: null, isNew: null };
    let kidFP = null;
    let newKidFP = null;
    let fpPriceRange = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- add new
      newKidFP = await KidFitProfileModel.create({ kidId });
      if (!newKidFP) {
        console.log(
          'API_editKidPriceRange_400:',
          'Failed to create base of Kid Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Kid Fit Profile'
        });
      }
      fpStatus = { id: newKidFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: kidFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const priceRangeFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpPriceRange = await KidProfilePriceRangeModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: priceRangeFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpPriceRange) {
      console.log(
        'API_editKidPriceRange_400:',
        'Failed to edit Price Range of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Price Range of Kid Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newKidFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await newKidFP.save();
    } else {
      kidFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await kidFP.save();
    }
    //-- okay
    console.log(
      'API_editKidPriceRange_200:',
      'Price Range of Kid Fit Profile is saved'
    );
    res.status(200).send('Price Range of Kid Fit Profile is saved');
  } catch (e) {
    console.log('API_editKidPriceRange_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidPriceRange = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidPriceRange_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const KgFitProfilePriceRangeModel = dbMainConn.model(
      'KgFitProfilePriceRange',
      kgFitProfilePriceRangeSchema
    );
    const KbFitProfilePriceRangeModel = dbMainConn.model(
      'KbFitProfilePriceRange',
      kbFitProfilePriceRangeSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidPriceRange_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidPriceRange_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, price range
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    const KidProfilePriceRangeModel =
      gender === 1 ? KgFitProfilePriceRangeModel : KbFitProfilePriceRangeModel;
    let kidFP = null;
    let fpPriceRange = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidPriceRange_200:', 'No Kid Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpPrItemId = kidFP?.inputStatus?.priceRange?.itemId;
    const fpPrIsComplete = kidFP?.inputStatus?.priceRange?.isComplete;
    if (!fpPrItemId || fpPrIsComplete !== true) {
      //-- no price range of fit profile yet
      //-- make a deep check again
      fpPriceRange = await KidProfilePriceRangeModel.findOne(
        { profileId: kidFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpPriceRange) {
        //-- no price range yet really
        console.log(
          'API_getKidPriceRange_200:',
          'No Price Range of Kid Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- price range exists in fact
      //-- adjust fit profile status
      kidFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await kidFP.save();
      //-- okay, not bad
      console.log(
        'API_getKidPriceRange_200:',
        'Style Fit of Kid Fit Profile is returned'
      );
      return res.status(200).json(fpPriceRange);
    }
    //-- everything seems fine so far
    fpPriceRange = await KidProfilePriceRangeModel.findById(fpPrItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpPriceRange) {
      //-- wrong of mismatch
      console.log(
        'API_getKidPriceRange_400:',
        'No Price Range of Kid Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Price Range of Kid Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getKidPriceRange_200:',
      'Price Range of Kid Fit Profile is retrieved'
    );
    res.status(200).json(fpPriceRange);
  } catch (e) {
    console.log('API_getKidPriceRange_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editKidCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_editKidCustomDsgnBrand_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const KgFitProfileCustomDsgnBrandModel = dbMainConn.model(
      'KgFitProfileCustomDsgnBrand',
      kgFitProfileCustomDsgnBrandSchema
    );
    const KbFitProfileCustomDsgnBrandModel = dbMainConn.model(
      'KbFitProfileCustomDsgnBrand',
      kbFitProfileCustomDsgnBrandSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_editKidCustomDsgnBrand_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_editKidCustomDsgnBrand_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, custom design & brands
    const kidId = kid._id;
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    const KidProfileCustomDsgnBrandModel =
      gender === 1
        ? KgFitProfileCustomDsgnBrandModel
        : KbFitProfileCustomDsgnBrandModel;
    let fpStatus = { id: null, isNew: null };
    let kidFP = null;
    let newKidFP = null;
    let fpCustomDsgnBrand = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- add new
      newKidFP = await KidFitProfileModel.create({ kidId });
      if (!newKidFP) {
        console.log(
          'API_editKidCustomDsgnBrand_400:',
          'Failed to create base of Kid Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Kid Fit Profile'
        });
      }
      fpStatus = { id: newKidFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: kidFP._id, isNew: false };
    }
    let {
      dsgnImgUrl1st,
      dsgnImgUrl2nd,
      dsgnImgUrl3rd,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    //-- read uploaded local image files to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const imgUrlArr = [dsgnImgUrl1st, dsgnImgUrl2nd, dsgnImgUrl3rd];
    let errMsg = '';
    for (const [idx, url] of imgUrlArr.entries()) {
      if (url) {
        if (
          url.includes(
            `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
          )
        ) {
          //-- no need to upload
          //-- silence is gold
        } else {
          const destPath = path.join(
            __dirname,
            `${process.env.MULTER_DEST_DIR}`
          );
          if (!existsSync(`${destPath}${url}`)) {
            const ordinal = converter.toWordsOrdinal(idx + 1).toUpperCase();
            errMsg += `${ordinal} Design image file does not exist.\n`;
          } else {
            const fileContent = readFileSync(`${destPath}${url}`);
            const key = `fitprofile/${
              gender === 1 ? 'kidgirl' : 'kidboy'
            }/${url}`;
            const s3Cmd = new PutObjectCommand({
              Bucket: bucket,
              Key: key,
              Body: fileContent
            });
            const s3Res = await s3Client.send(s3Cmd);
            console.log('API_editKidCustomDsgnBrand:', s3Res);
            const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
            if (idx === 0) {
              dsgnImgUrl1st = s3Url;
            } else if (idx === 1) {
              dsgnImgUrl2nd = s3Url;
            } else if (idx === 2) {
              dsgnImgUrl3rd = s3Url;
            }
          }
        }
      }
    }
    if (errMsg) {
      console.log('API_editKidCustomDsgnBrand_400:', errMsg);
      return res.status(400).json({
        msg: errMsg
      });
    }
    const customDsgnBrandFields = {
      profileId: fpStatus.id,
      dsgnImgUrl1st,
      dsgnImgUrl2nd,
      dsgnImgUrl3rd,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpCustomDsgnBrand = await KidProfileCustomDsgnBrandModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: customDsgnBrandFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpCustomDsgnBrand) {
      console.log(
        'API_editKidCustomDsgnBrand_400:',
        'Failed to edit Custom Design & Brands of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Custom Design & Brands of Kid Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newKidFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await newKidFP.save();
    } else {
      kidFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await kidFP.save();
    }
    //-- remove uploaded temp image files after uploading to s3
    for (const url of imgUrlArr) {
      if (url) {
        if (
          url.includes(
            `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
          )
        ) {
          //-- no need to remove
          //-- silence is gold
        } else {
          const destPath = path.join(
            __dirname,
            `${process.env.MULTER_DEST_DIR}`
          );
          unlinkSync(`${destPath}${url}`);
        }
      }
    }
    //-- okay
    console.log(
      'API_editKidCustomDsgnBrand_200:',
      'Custom Design & Brands of Kid Fit Profile is saved'
    );
    res.status(200).send('Custom Design & Brands of Kid Fit Profile is saved');
  } catch (e) {
    console.log('API_editKidCustomDsgnBrand_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidCustomDsgnBrand_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const KgFitProfileCustomDsgnBrandModel = dbMainConn.model(
      'KgFitProfileCustomDsgnBrand',
      kgFitProfileCustomDsgnBrandSchema
    );
    const KbFitProfileCustomDsgnBrandModel = dbMainConn.model(
      'KbFitProfileCustomDsgnBrand',
      kbFitProfileCustomDsgnBrandSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidCustomDsgnBrand_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidCustomDsgnBrand_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, custom design & brands
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    const KidProfileCustomDsgnBrandModel =
      gender === 1
        ? KgFitProfileCustomDsgnBrandModel
        : KbFitProfileCustomDsgnBrandModel;
    let kidFP = null;
    let fpCustomDsgnBrand = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidCustomDsgnBrand_200:', 'No Kid Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpCdbItemId = kidFP?.inputStatus?.customDsgnBrand?.itemId;
    const fpCdbIsComplete = kidFP?.inputStatus?.customDsgnBrand?.isComplete;
    if (!fpCdbItemId || fpCdbIsComplete !== true) {
      //-- no custom design & brands of fit profile yet
      //-- make a deep check again
      fpCustomDsgnBrand = await KidProfileCustomDsgnBrandModel.findOne(
        { profileId: kidFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpCustomDsgnBrand) {
        //-- no custom design & brands yet really
        console.log(
          'API_getKidCustomDsgnBrand_200:',
          'No Custom Design & Brands of Kid Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- custom design & brands exists in fact
      //-- adjust fit profile status
      kidFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await kidFP.save();
      //-- okay, not bad
      console.log(
        'API_getKidCustomDsgnBrand_200:',
        'Custom Design & Brands of Kid Fit Profile is returned'
      );
      return res.status(200).json(fpCustomDsgnBrand);
    }
    //-- everything seems fine so far
    fpCustomDsgnBrand = await KidProfileCustomDsgnBrandModel.findById(
      fpCdbItemId,
      {
        _id: 0,
        __v: 0,
        profileId: 0,
        createdAt: 0,
        updatedAt: 0
      }
    );
    if (!fpCustomDsgnBrand) {
      //-- wrong of mismatch
      console.log(
        'API_getKidCustomDsgnBrand_400:',
        'No Custom Design & Brands of Kid Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Custom Design & Brands of Kid Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getKidCustomDsgnBrand_200:',
      'Custom Design & Brands of Kid Fit Profile is retrieved'
    );
    res.status(200).json(fpCustomDsgnBrand);
  } catch (e) {
    console.log('API_getKidCustomDsgnBrand_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editKidSchedule = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_editKidSchedule_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileScheduleModel = dbMainConn.model(
      'FitProfileSchedule',
      fitProfileScheduleSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_editKidSchedule_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_editKidSchedule_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, custom design & brands
    const kidId = kid._id;
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let fpStatus = { id: null, isNew: null };
    let kidFP = null;
    let newKidFP = null;
    let fpSchedule = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- add new
      newKidFP = await KidFitProfileModel.create({ kidId });
      if (!newKidFP) {
        console.log(
          'API_editKidSchedule_400:',
          'Failed to create base of Kid Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Kid Fit Profile'
        });
      }
      fpStatus = { id: newKidFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: kidFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const scheduleFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpSchedule = await FitProfileScheduleModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: scheduleFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpSchedule) {
      console.log(
        'API_editKidSchedule_400:',
        'Failed to edit Schedule of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Schedule of Kid Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newKidFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true
      };
      await newKidFP.save();
    } else {
      kidFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true
      };
      await kidFP.save();
    }
    //-- okay
    console.log(
      'API_editKidSchedule_200:',
      'Schedule of Kid Fit Profile is saved'
    );
    res.status(200).send('Schedule of Kid Fit Profile is saved');
  } catch (e) {
    console.log('API_editKidSchedule_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidSchedule = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidSchedule_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileScheduleModel = dbMainConn.model(
      'FitProfileSchedule',
      fitProfileScheduleSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidSchedule_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidSchedule_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, delivery schedule
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    let fpSchedule = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidSchedule_200:', 'No Kid Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpDsItemId = kidFP?.inputStatus?.schedule?.itemId;
    const fpDsIsComplete = kidFP?.inputStatus?.schedule?.isComplete;
    if (!fpDsItemId || fpDsIsComplete !== true) {
      //-- no delivery schedule of fit profile yet
      //-- make a deep check again
      fpSchedule = await FitProfileScheduleModel.findOne(
        { profileId: kidFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpSchedule) {
        //-- no delivery schedule yet really
        console.log(
          'API_getKidSchedule_200:',
          'No Delivery Schedule of Kid Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- delivery schedule exists in fact
      //-- adjust fit profile status
      kidFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true
      };
      await kidFP.save();
      //-- okay, not bad
      console.log(
        'API_getKidSchedule_200:',
        'Delivery Schedule of Kid Fit Profile is returned'
      );
      return res.status(200).json(fpSchedule);
    }
    //-- everything seems fine so far
    fpSchedule = await FitProfileScheduleModel.findById(fpDsItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpSchedule) {
      //-- wrong of mismatch
      console.log(
        'API_getKidSchedule_400:',
        'No Delivery Schedule of Kid Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Delivery Schedule of Kid Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getKidSchedule_200:',
      'Delivery Schedule of Kid Fit Profile is retrieved'
    );
    res.status(200).json(fpSchedule);
  } catch (e) {
    console.log('API_getKidSchedule_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editKidShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_editKidShipAddress_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_editKidShipAddress_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_editKidShipAddress_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, ship address
    const shipAddrId = req.body?._id;
    if (shipAddrId) {
      const shipAddress = await FitProfileShipAddressModel.findOneAndUpdate(
        { _id: shipAddrId },
        { $set: req.body },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      if (!shipAddress) {
        console.log(
          'API_editKidShipAddress_400:',
          'Failed to modify Ship Address of Kid Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to modify Ship Address of Kid Fit Profile'
        });
      }
      //-- okay
      console.log(
        'API_editKidShipAddress_200:',
        'Ship Address of Kid Fit Profile is modified'
      );
      res.status(200).send(shipAddress);
    } else {
      const kidId = kid._id;
      const KidFitProfileModel =
        gender === 1 ? KgFitProfileModel : KbFitProfileModel;
      let fpStatus = { id: null, isNew: null };
      let kidFP = null;
      let newKidFP = null;
      let fpShipAddress = null;
      kidFP = await KidFitProfileModel.findOne({ kidId });
      if (!kidFP) {
        //-- add new
        newKidFP = await KidFitProfileModel.create({ kidId });
        if (!newKidFP) {
          console.log(
            'API_editKidShipAddress_400:',
            'Failed to create base of Kid Fit Profile'
          );
          return res.status(400).json({
            msg: 'Failed to create base of Kid Fit Profile'
          });
        }
        fpStatus = { id: newKidFP._id, isNew: true };
      } else {
        //-- modify existing one
        fpStatus = { id: kidFP._id, isNew: false };
      }
      //-- check count of addresses as we can add up to 5
      const shipAddrCount = await FitProfileShipAddressModel.countDocuments({
        profileId: fpStatus.id
      });
      if (shipAddrCount >= 5) {
        console.log(
          'API_editKidShipAddress_400:',
          'Cannot add more than 5 Addresses'
        );
        return res.status(400).json({
          msg: 'Cannot add more than 5 Addresses'
        });
      }
      const { ...rest } = req.body;
      const shipAddressFields = {
        profileId: fpStatus.id,
        isDefault: shipAddrCount === 0 ? true : false,
        ...rest
      };
      //-- create
      fpShipAddress = await FitProfileShipAddressModel.create(
        shipAddressFields
      );
      if (!fpShipAddress) {
        console.log(
          'API_editKidShipAddress_400:',
          'Failed to add Ship Address of Kid Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to add Ship Address of Kid Fit Profile'
        });
      }
      if (fpStatus.isNew) {
        newKidFP.inputStatus.shipAddress = {
          itemIDs: [{ itemId: fpShipAddress._id }],
          isComplete: true
        };
        await newKidFP.save();
      } else {
        kidFP.inputStatus.shipAddress.itemIDs.push({
          itemId: fpShipAddress._id
        });
        kidFP.inputStatus.shipAddress.isComplete = true;
        await kidFP.save();
      }
      //-- okay
      console.log(
        'API_editKidShipAddress_200:',
        'Ship Address of Kid Fit Profile is added'
      );
      res.status(200).send(fpShipAddress);
    }
  } catch (e) {
    console.log('API_editKidShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidShipAddressesAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidShipAddressesAll_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidShipAddressesAll_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidShipAddressesAll_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, ship address
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    let fpShipAddresses = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidShipAddressesAll_200:', 'No Kid Fit Profile yet');
      return res.status(200).json([]);
    }
    const fpSaIsComplete = kidFP?.inputStatus?.shipAddress?.isComplete;
    fpShipAddresses = await FitProfileShipAddressModel.find(
      { profileId: kidFP._id },
      { __v: 0, profileId: 0 }
    ).sort({ updatedAt: -1 });
    if (!fpShipAddresses) {
      //-- failed to find
      console.log(
        'API_getKidShipAddressesAll_400:',
        'Failed to get all Ship Addresses of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get all Ship Addresses of Kid Fit Profile'
      });
    }
    if (!fpShipAddresses.length) {
      //-- no ship address exists
      if (fpSaIsComplete) {
        //-- adjust wrong status
        kidFP.inputStatus.shipAddress = {
          itemIDs: [],
          isComplete: false
        };
        await kidFP.save();
      }
    } else {
      if (!fpSaIsComplete) {
        //-- adjust wrong status
        let tmpIDs = [];
        fpShipAddresses.forEach((item) => {
          tmpIDs.unshift({ itemId: item._id });
          //-- use `unshift` instead of `push` because of sort(-1)
        });
        kidFP.inputStatus.shipAddress.itemIDs = tmpIDs;
        kidFP.inputStatus.shipAddress.isComplete = true;
        await kidFP.save();
      }
    }
    //-- okay
    console.log(
      'API_getKidShipAddressesAll_200:',
      'All Ship Addresses of Kid Fit Profile are retrieved'
    );
    res.status(200).json(fpShipAddresses);
  } catch (e) {
    console.log('API_getKidShipAddressesAll_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidShipAddress_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidShipAddress_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidShipAddress_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, ship address
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    let fpShipAddress = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidShipAddress_200:', 'No Kid Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpSaIsComplete = kidFP?.inputStatus?.shipAddress?.isComplete;
    fpShipAddress = await FitProfileShipAddressModel.findOne(
      {
        _id: req.params.id,
        profileId: kidFP._id
      },
      { __v: 0, profileId: 0 }
    );
    if (!fpShipAddress) {
      //-- failed to find
      console.log(
        'API_getKidShipAddress_400:',
        'Failed to get Ship Address of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get Ship Address of Kid Fit Profile'
      });
    }
    if (!fpSaIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...kidFP?.inputStatus?.shipAddress?.itemIDs];
      if (!tmpIDs || (tmpIDs && tmpIDs.length === 0)) {
        tmpIDs = [{ itemId: fpShipAddress._id }];
      } else {
        let isExist = false;
        tmpIDs.forEach((item) => {
          if (String(item.itemId) === String(fpShipAddress._id)) {
            isExist = true;
          }
        });
        if (!isExist) {
          tmpIDs.push({ itemId: fpShipAddress._id });
        }
      }
      kidFP.inputStatus.shipAddress.itemIDs = tmpIDs;
      kidFP.inputStatus.shipAddress.isComplete = true;
      await kidFP.save();
    }
    //-- okay
    console.log(
      'API_getKidShipAddress_200:',
      'Ship Address of Kid Fit Profile is retrieved'
    );
    res.status(200).json(fpShipAddress);
  } catch (e) {
    console.log('API_getKidShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteKidShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_deleteKidShipAddress_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_deleteKidShipAddress_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_deleteKidShipAddress_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, ship address
    const kidId = kid._id;
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- error! no fit profile yet
      console.log(
        'API_deleteKidShipAddress_400:',
        'No Kid Fit Profile exists yet'
      );
      return res.status(400).json({
        msg: 'No Kid Fit Profile exists yet'
      });
    }
    //-- remove
    await FitProfileShipAddressModel.findOneAndRemove({
      _id: req.params.id,
      profileId: kidFP._id
    });
    //-- adjust status
    let _itemIDs = [...kidFP?.inputStatus?.shipAddress?.itemIDs];
    let tmpIDs = null;
    if (!_itemIDs || (_itemIDs && _itemIDs.length === 0)) {
      tmpIDs = [];
    } else {
      tmpIDs = _itemIDs.filter((item) => {
        return String(item.itemId) !== String(req.params.id);
      });
    }
    kidFP.inputStatus.shipAddress.itemIDs = tmpIDs;
    //-- check count of addresses
    const shipAddrCount = await FitProfileShipAddressModel.countDocuments({
      profileId: kidFP._id
    });
    if (shipAddrCount === 0) {
      kidFP.inputStatus.shipAddress.itemIDs = [];
      kidFP.inputStatus.shipAddress.isComplete = false;
    } else {
      kidFP.inputStatus.shipAddress.isComplete = true;
    }
    await kidFP.save();
    //-- okay
    console.log(
      'API_deleteKidShipAddress_200:',
      'Ship Address of Kid Fit Profile is deleted'
    );
    res.status(200).send('Ship Address of Kid Fit Profile is deleted');
  } catch (e) {
    console.log('API_deleteKidShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const setKidShipAddressDefault = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_setKidShipAddressDefault_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_setKidShipAddressDefault_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_setKidShipAddressDefault_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, ship address
    const kidId = kid._id;
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- error! no fit profile yet
      console.log(
        'API_setKidShipAddressDefault_400:',
        'No Kid Fit Profile exists yet'
      );
      return res.status(400).json({
        msg: 'No Kid Fit Profile exists yet'
      });
    }
    //-- update
    //-- set all as false
    const updateAllRes = await FitProfileShipAddressModel.updateMany(
      { profileId: kidFP._id },
      { isDefault: false }
    );
    console.log(
      'API_setKidShipAddressDefault:',
      `${updateAllRes?.nModified} / ${updateAllRes?.n} address(es) are modified`
    );
    //-- set the target as true
    const setDefaultFields = {
      isDefault: true
    };
    const updatedAddress = await FitProfileShipAddressModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: setDefaultFields }
    );
    if (!updatedAddress) {
      console.log(
        'API_setKidShipAddressDefault_400:',
        'Failed to update Ship Address of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to update Ship Address of Kid Fit Profile'
      });
    }
    //-- okay
    console.log(
      'API_setKidShipAddressDefault_200:',
      'Ship Address of Kid Fit Profile is updated'
    );
    res.status(200).send(updatedAddress);
  } catch (e) {
    console.log('API_setKidShipAddressDefault_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addKidBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_addKidBillingInfo_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_addKidBillingInfo_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_addKidBillingInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, billing info
    const kidId = kid._id;
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let fpStatus = { id: null, isNew: null };
    let kidFP = null;
    let newKidFP = null;
    let fpBillingInfo = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- add new
      newKidFP = await KidFitProfileModel.create({ kidId });
      if (!newKidFP) {
        console.log(
          'API_addKidBillingInfo_400:',
          'Failed to create base of Kid Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Kid Fit Profile'
        });
      }
      fpStatus = { id: newKidFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: kidFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const billingInfoFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- create
    fpBillingInfo = await FitProfileBillingInfoModel.create(billingInfoFields);
    if (!fpBillingInfo) {
      console.log(
        'API_addKidBillingInfo_400:',
        'Failed to add Billing Info of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to add Billing Info of Kid Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newKidFP.inputStatus.billingInfo = {
        itemIDs: [{ itemId: fpBillingInfo._id }],
        isComplete: true
      };
      await newKidFP.save();
    } else {
      kidFP.inputStatus.billingInfo.itemIDs.push({
        itemId: fpBillingInfo._id
      });
      kidFP.inputStatus.billingInfo.isComplete = true;
      await kidFP.save();
    }
    //-- okay
    console.log(
      'API_addKidBillingInfo_200:',
      'Billing Info of Kid Fit Profile is added'
    );
    res.status(200).send(fpBillingInfo);
  } catch (e) {
    console.log('API_addKidBillingInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidBillingInfosAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidBillingInfosAll_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidBillingInfosAll_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidBillingInfosAll_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, billing info
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    let fpBillingInfos = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidBillingInfosAll_200:', 'No Kid Fit Profile yet');
      return res.status(200).json([]);
    }
    const fpBiIsComplete = kidFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfos = await FitProfileBillingInfoModel.find(
      { profileId: kidFP._id },
      { __v: 0, profileId: 0 }
    ).sort({ updatedAt: -1 });
    if (!fpBillingInfos) {
      //-- failed to find
      console.log(
        'API_getKidBillingInfosAll_400:',
        'Failed to get all Billing Infos of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get all Billing Infos of Kid Fit Profile'
      });
    }
    if (!fpBillingInfos.length) {
      //-- no billing info exists
      if (fpBiIsComplete) {
        //-- adjust wrong status
        kidFP.inputStatus.billingInfo = {
          itemIDs: [],
          isComplete: false
        };
        await kidFP.save();
      }
    } else {
      if (!fpBiIsComplete) {
        //-- adjust wrong status
        let tmpIDs = [];
        fpBillingInfos.forEach((item) => {
          tmpIDs.unshift({ itemId: item._id });
          /**
           * use `unshift` instead of `push` because of sort(-1)
           */
        });
        kidFP.inputStatus.billingInfo.itemIDs = tmpIDs;
        kidFP.inputStatus.billingInfo.isComplete = true;
        await kidFP.save();
      }
    }
    //-- okay
    console.log(
      'API_getKidBillingInfosAll_200:',
      'All Billing Infos of Kid Fit Profile are retrieved'
    );
    res.status(200).json(fpBillingInfos);
  } catch (e) {
    console.log('API_getKidBillingInfosAll_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log(
        'API_getKidBillingInfo_400:',
        'Invalid access of mismatching child order'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidBillingInfo_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if (
      (gender === 1 && reqUrl.includes('/girl/')) ||
      (gender === 2 && reqUrl.includes('/boy/'))
    ) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidBillingInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, billing info
    const KidFitProfileModel =
      gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    let fpBillingInfo = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid._id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidBillingInfo_200:', 'No Kid Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpBiIsComplete = kidFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfo = await FitProfileBillingInfoModel.findOne(
      {
        _id: req.params.id,
        profileId: kidFP._id
      },
      { __v: 0, profileId: 0 }
    );
    if (!fpBillingInfo) {
      //-- failed to find
      console.log(
        'API_getKidBillingInfo_400:',
        'Failed to get Billing Info of Kid Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get Billing Info of Kid Fit Profile'
      });
    }
    if (!fpBiIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...kidFP?.inputStatus?.billingInfo?.itemIDs];
      if (!tmpIDs || (tmpIDs && tmpIDs.length === 0)) {
        tmpIDs = [{ itemId: fpBillingInfo._id }];
      } else {
        let isExist = false;
        tmpIDs.forEach((item) => {
          if (String(item.itemId) === String(fpBillingInfo._id)) {
            isExist = true;
          }
        });
        if (!isExist) {
          tmpIDs.push({ itemId: fpBillingInfo._id });
        }
      }
      kidFP.inputStatus.billingInfo.itemIDs = tmpIDs;
      kidFP.inputStatus.billingInfo.isComplete = true;
      await kidFP.save();
    }
    //-- okay
    console.log(
      'API_getKidBillingInfo_200:',
      'Billing Info of Kid Fit Profile is retrieved'
    );
    res.status(200).json(fpBillingInfo);
  } catch (e) {
    console.log('API_getKidBillingInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  editKidBasicInfo,
  getKidBasicInfo,
  editKidStyleFit,
  getKidStyleFit,
  editKidPriceRange,
  getKidPriceRange,
  editKidCustomDsgnBrand,
  getKidCustomDsgnBrand,
  editKidSchedule,
  getKidSchedule,
  editKidShipAddress,
  getKidShipAddressesAll,
  getKidShipAddress,
  deleteKidShipAddress,
  setKidShipAddressDefault,
  addKidBillingInfo,
  getKidBillingInfosAll,
  getKidBillingInfo
};
