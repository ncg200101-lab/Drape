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
import wFitProfileSchema from '../models/main/wFitProfileSchema.js';
import wFitProfileBasicInfoSchema from '../models/main/wFitProfileBasicInfoSchema.js';
import wFitProfileStyleFitSchema from '../models/main/wFitProfileStyleFitSchema.js';
import wFitProfilePriceRangeSchema from '../models/main/wFitProfilePriceRangeSchema.js';
import wFitProfileCustomDsgnBrandSchema from '../models/main/wFitProfileCustomDsgnBrandSchema.js';
import fitProfileScheduleSchema from '../models/main/fitProfileScheduleSchema.js';
import fitProfileShipAddressSchema from '../models/main/fitProfileShipAddressSchema.js';
import fitProfileBillingInfoSchema from '../models/main/fitProfileBillingInfoSchema.js';

const __dirname = path.resolve();

const editWomenFPBasicInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_editWomenFPBasicInfo_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const WFitProfileBasicInfoModel = dbMainConn.model(
      'WFitProfileBasicInfo',
      wFitProfileBasicInfoSchema
    );
    let fpStatus = { id: null, isNew: null };
    let womenFP = null;
    let newWomenFP = null;
    let fpBasicInfo = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- add new
      newWomenFP = await WFitProfileModel.create({
        userId: req.user._id
      });
      if (!newWomenFP) {
        console.log(
          'API_editWomenFPBasicInfo_400:',
          'Failed to create base of Women Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Women Fit Profile'
        });
      }
      fpStatus = { id: newWomenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: womenFP._id, isNew: false };
    }
    const {
      isPregnant,
      dueDate,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    //-- custom validation checks
    if (isPregnant === 0) {
      //-- dueDate
      const d = new Date(dueDate);
      const now = new Date();
      const isDate = d instanceof Date && !isNaN(d);
      if (!isDate) {
        console.log('API_editWomenFPBasicInfo_400:', 'Due Date is invalid');
        return res.status(400).json({
          msg: 'Due Date is invalid'
        });
      }
      if (now > d) {
        console.log('API_editWomenFPBasicInfo_400:', 'Due Date is incorrect');
        return res.status(400).json({
          msg: 'Due Date is incorrect'
        });
      }
      const daysNum = Math.round((d - now) / (1000 * 60 * 60 * 24));
      if (daysNum > 40 * 7) {
        console.log(
          'API_editWomenFPBasicInfo_400:',
          'Please enter date within 40 weeks'
        );
        return res.status(400).json({
          msg: 'Please enter date within 40 weeks'
        });
      }
    }
    const basicInfoFields = {
      profileId: fpStatus.id,
      isPregnant,
      dueDate,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpBasicInfo = await WFitProfileBasicInfoModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: basicInfoFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpBasicInfo) {
      console.log(
        'API_editWomenFPBasicInfo_400:',
        'Failed to edit Basic Info of Women Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Basic Info of Women Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newWomenFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await newWomenFP.save();
    } else {
      womenFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await womenFP.save();
    }
    //-- okay
    console.log(
      'API_editWomenFPBasicInfo_200:',
      'Basic Info of Women Fit Profile is saved'
    );
    res.status(200).send('Basic Info of Women Fit Profile is saved');
  } catch (e) {
    console.log('API_editWomenFPBasicInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPBasicInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPBasicInfo_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const WFitProfileBasicInfoModel = dbMainConn.model(
      'WFitProfileBasicInfo',
      wFitProfileBasicInfoSchema
    );
    let womenFP = null;
    let fpBasicInfo = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPBasicInfo_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpBiItemId = womenFP?.inputStatus?.basicInfo?.itemId;
    const fpBiIsComplete = womenFP?.inputStatus?.basicInfo?.isComplete;
    if (!fpBiItemId || fpBiIsComplete !== true) {
      //-- no basic info of fit profile yet
      //-- make a deep check again
      fpBasicInfo = await WFitProfileBasicInfoModel.findOne(
        { profileId: womenFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpBasicInfo) {
        //-- no basic info yet really
        console.log(
          'API_getWomenFPBasicInfo_200:',
          'No Basic Info of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- basic info exists in fact
      //-- adjust fit profile status
      womenFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await womenFP.save();
      //-- okay, not bad
      console.log(
        'API_getWomenFPBasicInfo_200:',
        'Basic Info of Fit Profile is returned'
      );
      return res.status(200).json(fpBasicInfo);
    }
    //-- everything seems fine so far
    fpBasicInfo = await WFitProfileBasicInfoModel.findById(fpBiItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpBasicInfo) {
      //-- wrong of mismatch
      console.log(
        'API_getWomenFPBasicInfo_400:',
        'No Basic Info of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Basic Info of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getWomenFPBasicInfo_200:',
      'Basic Info of Fit Profile is retrieved'
    );
    res.status(200).json(fpBasicInfo);
  } catch (e) {
    console.log('API_getWomenFPBasicInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPStyleFit = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_editWomenFPStyleFit_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const WFitProfileStyleFitModel = dbMainConn.model(
      'WFitProfileStyleFit',
      wFitProfileStyleFitSchema
    );
    let fpStatus = { id: null, isNew: null };
    let womenFP = null;
    let newWomenFP = null;
    let fpStyleFit = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- add new
      newWomenFP = await WFitProfileModel.create({
        userId: req.user._id
      });
      if (!newWomenFP) {
        console.log(
          'API_editWomenFPStyleFit_400:',
          'Failed to create base of Women Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Women Fit Profile'
        });
      }
      fpStatus = { id: newWomenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: womenFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const styleFitFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpStyleFit = await WFitProfileStyleFitModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: styleFitFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpStyleFit) {
      console.log(
        'API_editWomenFPStyleFit_400:',
        'Failed to edit Style Fit of Women Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Style Fit of Women Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newWomenFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await newWomenFP.save();
    } else {
      womenFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await womenFP.save();
    }
    //-- okay
    console.log(
      'API_editWomenFPStyleFit_200:',
      'Style Fit of Women Fit Profile is saved'
    );
    res.status(200).send('Style Fit of Women Fit Profile is saved');
  } catch (e) {
    console.log('API_editWomenFPStyleFit_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPStyleFit = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPStyleFit_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const WFitProfileStyleFitModel = dbMainConn.model(
      'WFitProfileStyleFit',
      wFitProfileStyleFitSchema
    );
    let womenFP = null;
    let fpStyleFit = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPStyleFit_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpSfItemId = womenFP?.inputStatus?.styleFit?.itemId;
    const fpSfIsComplete = womenFP?.inputStatus?.styleFit?.isComplete;
    if (!fpSfItemId || fpSfIsComplete !== true) {
      //-- no style fit of fit profile yet
      //-- make a deep check again
      fpStyleFit = await WFitProfileStyleFitModel.findOne(
        { profileId: womenFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpStyleFit) {
        //-- no style fit yet really
        console.log(
          'API_getWomenFPStyleFit_200:',
          'No Style Fit of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- style fit exists in fact
      //-- adjust fit profile status
      womenFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await womenFP.save();
      //-- okay, not bad
      console.log(
        'API_getWomenFPStyleFit_200:',
        'Style Fit of Fit Profile is returned'
      );
      return res.status(200).json(fpStyleFit);
    }
    //-- everything seems fine so far
    fpStyleFit = await WFitProfileStyleFitModel.findById(fpSfItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpStyleFit) {
      //-- wrong of mismatch
      console.log(
        'API_getWomenFPStyleFit_400:',
        'No Style Fit of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Style Fit of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getWomenFPStyleFit_200:',
      'Style Fit of Fit Profile is retrieved'
    );
    res.status(200).json(fpStyleFit);
  } catch (e) {
    console.log('API_getWomenFPStyleFit_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPPriceRange = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_editWomenFPPriceRange_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const WFitProfilePriceRangeModel = dbMainConn.model(
      'WFitProfilePriceRange',
      wFitProfilePriceRangeSchema
    );
    let fpStatus = { id: null, isNew: null };
    let womenFP = null;
    let newWomenFP = null;
    let fpPriceRange = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- add new
      newWomenFP = await WFitProfileModel.create({
        userId: req.user._id
      });
      if (!newWomenFP) {
        console.log(
          'API_editWomenFPPriceRange_400:',
          'Failed to create base of Women Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Women Fit Profile'
        });
      }
      fpStatus = { id: newWomenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: womenFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const priceRangeFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpPriceRange = await WFitProfilePriceRangeModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: priceRangeFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpPriceRange) {
      console.log(
        'API_editWomenFPPriceRange_400:',
        'Failed to edit Price Range of Women Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Price Range of Women Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newWomenFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await newWomenFP.save();
    } else {
      womenFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await womenFP.save();
    }
    //-- okay
    console.log(
      'API_editWomenFPPriceRange_200:',
      'Price Range of Women Fit Profile is saved'
    );
    res.status(200).send('Price Range of Women Fit Profile is saved');
  } catch (e) {
    console.log('API_editWomenFPPriceRange_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPPriceRange = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPPriceRange_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const WFitProfilePriceRangeModel = dbMainConn.model(
      'WFitProfilePriceRange',
      wFitProfilePriceRangeSchema
    );
    let womenFP = null;
    let fpPriceRange = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPPriceRange_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpPrItemId = womenFP?.inputStatus?.priceRange?.itemId;
    const fpPrIsComplete = womenFP?.inputStatus?.priceRange?.isComplete;
    if (!fpPrItemId || fpPrIsComplete !== true) {
      //-- no price range of fit profile yet
      //-- make a deep check again
      fpPriceRange = await WFitProfilePriceRangeModel.findOne(
        { profileId: womenFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpPriceRange) {
        //-- no price range yet really
        console.log(
          'API_getWomenFPPriceRange_200:',
          'No Price Range of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- price range exists in fact
      //-- adjust fit profile status
      womenFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await womenFP.save();
      //-- okay, not bad
      console.log(
        'API_getWomenFPPriceRange_200:',
        'Price Range of Fit Profile is returned'
      );
      return res.status(200).json(fpPriceRange);
    }
    //-- everything seems fine so far
    fpPriceRange = await WFitProfilePriceRangeModel.findById(fpPrItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpPriceRange) {
      //-- wrong of mismatch
      console.log(
        'API_getWomenFPPriceRange_400:',
        'No Price Range of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Price Range of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getWomenFPPriceRange_200:',
      'Price Range of Fit Profile is retrieved'
    );
    res.status(200).json(fpPriceRange);
  } catch (e) {
    console.log('API_getWomenFPPriceRange_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_editWomenFPCustomDsgnBrand_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const WFitProfileCustomDsgnBrandModel = dbMainConn.model(
      'WFitProfileCustomDsgnBrand',
      wFitProfileCustomDsgnBrandSchema
    );
    let fpStatus = { id: null, isNew: null };
    let womenFP = null;
    let newWomenFP = null;
    let fpCustomDsgnBrand = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- add new
      newWomenFP = await WFitProfileModel.create({
        userId: req.user._id
      });
      if (!newWomenFP) {
        console.log(
          'API_editWomenFPCustomDsgnBrand_400:',
          'Failed to create base of Women Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Women Fit Profile'
        });
      }
      fpStatus = { id: newWomenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: womenFP._id, isNew: false };
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
    let imgUrlArr = [dsgnImgUrl1st, dsgnImgUrl2nd, dsgnImgUrl3rd];
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
            const key = `fitprofile/women/${url}`;
            const s3Cmd = new PutObjectCommand({
              Bucket: bucket,
              Key: key,
              Body: fileContent
            });
            const s3Res = await s3Client.send(s3Cmd);
            console.log('API_editWomenFPCustomDsgnBrand:', s3Res);
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
      console.log('API_editWomenFPCustomDsgnBrand_400:', errMsg);
      return res.status(400).json({
        msg: errMsg
      });
    }
    //-- renew temp array with updated values
    imgUrlArr = [dsgnImgUrl1st, dsgnImgUrl2nd, dsgnImgUrl3rd];
    const customDsgnBrandFields = {
      profileId: fpStatus.id,
      dsgnImgUrl1st,
      dsgnImgUrl2nd,
      dsgnImgUrl3rd,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpCustomDsgnBrand = await WFitProfileCustomDsgnBrandModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: customDsgnBrandFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpCustomDsgnBrand) {
      console.log(
        'API_editWomenFPCustomDsgnBrand_400:',
        'Failed to edit Custom Design & Brands of Women Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Custom Design & Brands of Women Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newWomenFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await newWomenFP.save();
    } else {
      womenFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await womenFP.save();
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
      'API_editWomenFPCustomDsgnBrand_200:',
      'Custom Design & Brands of Women Fit Profile is saved'
    );
    res
      .status(200)
      .send('Custom Design & Brands of Women Fit Profile is saved');
  } catch (e) {
    console.log('API_editWomenFPCustomDsgnBrand_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPCustomDsgnBrand_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const WFitProfileCustomDsgnBrandModel = dbMainConn.model(
      'WFitProfileCustomDsgnBrand',
      wFitProfileCustomDsgnBrandSchema
    );
    let womenFP = null;
    let fpCustomDsgnBrand = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPCustomDsgnBrand_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpCdbItemId = womenFP?.inputStatus?.customDsgnBrand?.itemId;
    const fpCdbIsComplete = womenFP?.inputStatus?.customDsgnBrand?.isComplete;
    if (!fpCdbItemId || fpCdbIsComplete !== true) {
      //-- no custom design & brands of fit profile yet
      //-- make a deep check again
      fpCustomDsgnBrand = await WFitProfileCustomDsgnBrandModel.findOne(
        { profileId: womenFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpCustomDsgnBrand) {
        //-- no custom design & brands yet really
        console.log(
          'API_getWomenFPCustomDsgnBrand_200:',
          'No Custom Design & Brands of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- custom design & brands exists in fact
      //-- adjust fit profile status
      womenFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await womenFP.save();
      //-- okay, not bad
      console.log(
        'API_getWomenFPCustomDsgnBrand_200:',
        'Custom Design & Brands of Fit Profile is returned'
      );
      return res.status(200).json(fpCustomDsgnBrand);
    }
    //-- everything seems fine so far
    fpCustomDsgnBrand = await WFitProfileCustomDsgnBrandModel.findById(
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
        'API_getWomenFPCustomDsgnBrand_400:',
        'No Custom Design & Brands of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Custom Design & Brands of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getWomenFPCustomDsgnBrand_200:',
      'Custom Design & Brands of Fit Profile is retrieved'
    );
    res.status(200).json(fpCustomDsgnBrand);
  } catch (e) {
    console.log('API_getWomenFPCustomDsgnBrand_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPSchedule = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_editWomenFPSchedule_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileScheduleModel = dbMainConn.model(
      'FitProfileSchedule',
      fitProfileScheduleSchema
    );
    let fpStatus = { id: null, isNew: null };
    let womenFP = null;
    let newWomenFP = null;
    let fpSchedule = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- add new
      newWomenFP = await WFitProfileModel.create({
        userId: req.user._id
      });
      if (!newWomenFP) {
        console.log(
          'API_editWomenFPSchedule_400:',
          'Failed to create base of Women Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Women Fit Profile'
        });
      }
      fpStatus = { id: newWomenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: womenFP._id, isNew: false };
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
        'API_editWomenFPSchedule_400:',
        'Failed to edit Schedule of Women Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Schedule of Women Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newWomenFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true
      };
      await newWomenFP.save();
    } else {
      womenFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true
      };
      await womenFP.save();
    }
    //-- okay
    console.log(
      'API_editWomenFPSchedule_200:',
      'Schedule of Women Fit Profile is saved'
    );
    res.status(200).send('Schedule of Women Fit Profile is saved');
  } catch (e) {
    console.log('API_editWomenFPSchedule_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPSchedule = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPSchedule_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileScheduleModel = dbMainConn.model(
      'FitProfileSchedule',
      fitProfileScheduleSchema
    );
    let womenFP = null;
    let fpSchedule = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPSchedule_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpDsItemId = womenFP?.inputStatus?.schedule?.itemId;
    const fpDsIsComplete = womenFP?.inputStatus?.schedule?.isComplete;
    // const fpDsIsActive = womenFP?.inputStatus?.schedule?.isActive;
    if (!fpDsItemId || fpDsIsComplete !== true) {
      //-- no delivery schedule of fit profile yet
      //-- make a deep check again
      fpSchedule = await FitProfileScheduleModel.findOne(
        { profileId: womenFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpSchedule) {
        //-- no delivery schedule yet really
        console.log(
          'API_getWomenFPSchedule_200:',
          'No Delivery Schedule of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- delivery schedule exists in fact
      //-- adjust fit profile status
      womenFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true,
        isActive: true
      };
      await womenFP.save();
      //-- okay, not bad
      console.log(
        'API_getWomenFPSchedule_200:',
        'Delivery Schedule of Fit Profile is returned'
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
        'API_getWomenFPSchedule_400:',
        'No Delivery Schedule of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Delivery Schedule of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getWomenFPSchedule_200:',
      'Delivery Schedule of Fit Profile is retrieved'
    );
    res.status(200).json(fpSchedule);
  } catch (e) {
    console.log('API_getWomenFPSchedule_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_editWomenFPShipAddress_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    const shipAddrId = req.body?._id;
    if (shipAddrId) {
      const shipAddress = await FitProfileShipAddressModel.findOneAndUpdate(
        { _id: shipAddrId },
        { $set: req.body },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      if (!shipAddress) {
        console.log(
          'API_editWomenFPShipAddress_400:',
          'Failed to modify Ship Address of Women Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to modify Ship Address of Women Fit Profile'
        });
      }
      //-- okay
      console.log(
        'API_editWomenFPShipAddress_200:',
        'Ship Address of Women Fit Profile is modified'
      );
      res.status(200).send(shipAddress);
    } else {
      let fpStatus = { id: null, isNew: null };
      let womenFP = null;
      let newWomenFP = null;
      let fpShipAddress = null;
      womenFP = await WFitProfileModel.findOne({
        userId: req.user._id
      });
      if (!womenFP) {
        //-- add new
        newWomenFP = await WFitProfileModel.create({
          userId: req.user._id
        });
        if (!newWomenFP) {
          console.log(
            'API_editWomenFPShipAddress_400:',
            'Failed to create base of Women Fit Profile'
          );
          return res.status(400).json({
            msg: 'Failed to create base of Women Fit Profile'
          });
        }
        fpStatus = { id: newWomenFP._id, isNew: true };
      } else {
        //-- modify existing one
        fpStatus = { id: womenFP._id, isNew: false };
      }
      //-- check count of addresses as we can add up to 5
      const shipAddrCount = await FitProfileShipAddressModel.countDocuments({
        profileId: fpStatus.id
      });
      if (shipAddrCount >= 5) {
        console.log(
          'API_editWomenFPShipAddress_400:',
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
          'API_editWomenFPShipAddress_400:',
          'Failed to add Ship Address of Women Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to add Ship Address of Women Fit Profile'
        });
      }
      if (fpStatus.isNew) {
        newWomenFP.inputStatus.shipAddress = {
          itemIDs: [{ itemId: fpShipAddress._id }],
          isComplete: true
        };
        await newWomenFP.save();
      } else {
        womenFP.inputStatus.shipAddress.itemIDs.push({
          itemId: fpShipAddress._id
        });
        womenFP.inputStatus.shipAddress.isComplete = true;
        await womenFP.save();
      }
      //-- okay
      console.log(
        'API_editWomenFPShipAddress_200:',
        'Ship Address of Women Fit Profile is added'
      );
      res.status(200).send(fpShipAddress);
    }
  } catch (e) {
    console.log('API_editWomenFPShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPShipAddressesAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPShipAddressesAll_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    let womenFP = null;
    let fpShipAddresses = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPShipAddressesAll_200:', 'No Fit Profile yet');
      return res.status(200).json([]);
    }
    const fpSaIsComplete = womenFP?.inputStatus?.shipAddress?.isComplete;
    fpShipAddresses = await FitProfileShipAddressModel.find(
      { profileId: womenFP._id },
      { __v: 0, profileId: 0 }
    ).sort({ updatedAt: -1 });
    if (!fpShipAddresses) {
      //-- failed to find
      console.log(
        'API_getWomenFPShipAddressesAll_400:',
        'Failed to get all Ship Addresses of Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get all Ship Addresses of Fit Profile'
      });
    }
    if (!fpShipAddresses.length) {
      //-- no ship address exists
      if (fpSaIsComplete) {
        //-- adjust wrong status
        womenFP.inputStatus.shipAddress = {
          itemIDs: [],
          isComplete: false
        };
        await womenFP.save();
      }
    } else {
      if (!fpSaIsComplete) {
        //-- adjust wrong status
        let tmpIDs = [];
        fpShipAddresses.forEach((item) => {
          tmpIDs.unshift({ itemId: item._id });
          /**
           * use `unshift` instead of `push` because of sort(-1)
           */
        });
        womenFP.inputStatus.shipAddress.itemIDs = tmpIDs;
        womenFP.inputStatus.shipAddress.isComplete = true;
        await womenFP.save();
      }
    }
    //-- okay
    console.log(
      'API_getWomenFPShipAddressesAll_200:',
      'All Ship Addresses of Fit Profile are retrieved'
    );
    res.status(200).json(fpShipAddresses);
  } catch (e) {
    console.log('API_getWomenFPShipAddressesAll_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPShipAddress_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    let womenFP = null;
    let fpShipAddress = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPShipAddress_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpSaIsComplete = womenFP?.inputStatus?.shipAddress?.isComplete;
    fpShipAddress = await FitProfileShipAddressModel.findOne(
      {
        _id: req.params.id,
        profileId: womenFP._id
      },
      { __v: 0, profileId: 0 }
    );
    if (!fpShipAddress) {
      //-- failed to find
      console.log(
        'API_getWomenFPShipAddress_400:',
        'Failed to get Ship Address of Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get Ship Address of Fit Profile'
      });
    }
    if (!fpSaIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...womenFP?.inputStatus?.shipAddress?.itemIDs];
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
      womenFP.inputStatus.shipAddress.itemIDs = tmpIDs;
      womenFP.inputStatus.shipAddress.isComplete = true;
      await womenFP.save();
    }
    //-- okay
    console.log(
      'API_getWomenFPShipAddress_200:',
      'Ship Address of Fit Profile is retrieved'
    );
    res.status(200).json(fpShipAddress);
  } catch (e) {
    console.log('API_getWomenFPShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteWomenFPShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_deleteWomenFPShipAddress_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    let womenFP = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- error! no fit profile yet
      console.log(
        'API_deleteWomenFPShipAddress_400:',
        'No Women Fit Profile exists yet'
      );
      return res.status(400).json({
        msg: 'No Women Fit Profile exists yet'
      });
    }
    //-- remove
    await FitProfileShipAddressModel.findOneAndRemove({
      _id: req.params.id,
      profileId: womenFP._id
    });
    //-- adjust status
    let _itemIDs = [...womenFP?.inputStatus?.shipAddress?.itemIDs];
    let tmpIDs = null;
    if (!_itemIDs || (_itemIDs && _itemIDs.length === 0)) {
      tmpIDs = [];
    } else {
      tmpIDs = _itemIDs.filter((item) => {
        return String(item.itemId) !== String(req.params.id);
      });
    }
    womenFP.inputStatus.shipAddress.itemIDs = tmpIDs;
    //-- check count of addresses
    const shipAddrCount = await FitProfileShipAddressModel.countDocuments({
      profileId: womenFP._id
    });
    if (shipAddrCount === 0) {
      womenFP.inputStatus.shipAddress.itemIDs = [];
      womenFP.inputStatus.shipAddress.isComplete = false;
    } else {
      womenFP.inputStatus.shipAddress.isComplete = true;
    }
    await womenFP.save();
    //-- okay
    console.log(
      'API_deleteWomenFPShipAddress_200:',
      'Ship Address of Women Fit Profile is deleted'
    );
    res.status(200).send('Ship Address of Women Fit Profile is deleted');
  } catch (e) {
    console.log('API_deleteWomenFPShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const setWomenFPShipAddressDefault = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_setWomenFPShipAddressDefault_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    let womenFP = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- error! no fit profile yet
      console.log(
        'API_setWomenFPShipAddressDefault_400:',
        'No Women Fit Profile exists yet'
      );
      return res.status(400).json({
        msg: 'No Women Fit Profile exists yet'
      });
    }
    //-- update
    //-- set all as false
    const updateAllRes = await FitProfileShipAddressModel.updateMany(
      { profileId: womenFP._id },
      { isDefault: false }
    );
    console.log(
      'API_setWomenFPShipAddressDefault:',
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
        'API_setWomenFPShipAddressDefault_400:',
        'Failed to update Ship Address of Women Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to update Ship Address of Women Fit Profile'
      });
    }
    //-- okay
    console.log(
      'API_setWomenFPShipAddressDefault_200:',
      'Ship Address of Women Fit Profile is updated'
    );
    res.status(200).send(updatedAddress);
  } catch (e) {
    console.log('API_setWomenFPShipAddressDefault_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addWomenFPBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_addWomenFPBillingInfo_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    let fpStatus = { id: null, isNew: null };
    let womenFP = null;
    let newWomenFP = null;
    let fpBillingInfo = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- add new
      newWomenFP = await WFitProfileModel.create({
        userId: req.user._id
      });
      if (!newWomenFP) {
        console.log(
          'API_addWomenFPBillingInfo_400:',
          'Failed to create base of Women Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Women Fit Profile'
        });
      }
      fpStatus = { id: newWomenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: womenFP._id, isNew: false };
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
        'API_addWomenFPBillingInfo_400:',
        'Failed to add Billing Info of Women Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to add Billing Info of Women Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newWomenFP.inputStatus.billingInfo = {
        itemIDs: [{ itemId: fpBillingInfo._id }],
        isComplete: true
      };
      await newWomenFP.save();
    } else {
      womenFP.inputStatus.billingInfo.itemIDs.push({
        itemId: fpBillingInfo._id
      });
      womenFP.inputStatus.billingInfo.isComplete = true;
      await womenFP.save();
    }
    //-- okay
    console.log(
      'API_addWomenFPBillingInfo_200:',
      'Billing Info of Women Fit Profile is added'
    );
    res.status(200).send(fpBillingInfo);
  } catch (e) {
    console.log('API_addWomenFPBillingInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPBillingInfosAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPBillingInfosAll_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    let womenFP = null;
    let fpBillingInfos = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPBillingInfosAll_200:', 'No Fit Profile yet');
      return res.status(200).json([]);
    }
    const fpBiIsComplete = womenFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfos = await FitProfileBillingInfoModel.find(
      { profileId: womenFP._id },
      { __v: 0, profileId: 0 }
    ).sort({ updatedAt: -1 });
    if (!fpBillingInfos) {
      //-- failed to find
      console.log(
        'API_getWomenFPBillingInfosAll_400:',
        'Failed to get all Billing Infos of Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get all Billing Infos of Fit Profile'
      });
    }
    if (!fpBillingInfos.length) {
      //-- no billing info exists
      if (fpBiIsComplete) {
        //-- adjust wrong status
        womenFP.inputStatus.billingInfo = {
          itemIDs: [],
          isComplete: false
        };
        await womenFP.save();
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
        womenFP.inputStatus.billingInfo.itemIDs = tmpIDs;
        womenFP.inputStatus.billingInfo.isComplete = true;
        await womenFP.save();
      }
    }
    //-- okay
    console.log(
      'API_getWomenFPBillingInfosAll_200:',
      'All Billing Infos of Fit Profile are retrieved'
    );
    res.status(200).json(fpBillingInfos);
  } catch (e) {
    console.log('API_getWomenFPBillingInfosAll_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log(
        'API_getWomenFPBillingInfo_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    let womenFP = null;
    let fpBillingInfo = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPBillingInfo_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpBiIsComplete = womenFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfo = await FitProfileBillingInfoModel.findOne(
      {
        _id: req.params.id,
        profileId: womenFP._id
      },
      { __v: 0, profileId: 0 }
    );
    if (!fpBillingInfo) {
      //-- failed to find
      console.log(
        'API_getWomenFPBillingInfo_400:',
        'Failed to get Billing Info of Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get Billing Info of Fit Profile'
      });
    }
    if (!fpBiIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...womenFP?.inputStatus?.billingInfo?.itemIDs];
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
      womenFP.inputStatus.billingInfo.itemIDs = tmpIDs;
      womenFP.inputStatus.billingInfo.isComplete = true;
      await womenFP.save();
    }
    //-- okay
    console.log(
      'API_getWomenFPBillingInfo_200:',
      'Billing Info of Fit Profile is retrieved'
    );
    res.status(200).json(fpBillingInfo);
  } catch (e) {
    console.log('API_getWomenFPBillingInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  editWomenFPBasicInfo,
  getWomenFPBasicInfo,
  editWomenFPStyleFit,
  getWomenFPStyleFit,
  editWomenFPPriceRange,
  getWomenFPPriceRange,
  editWomenFPCustomDsgnBrand,
  getWomenFPCustomDsgnBrand,
  editWomenFPSchedule,
  getWomenFPSchedule,
  editWomenFPShipAddress,
  getWomenFPShipAddressesAll,
  getWomenFPShipAddress,
  deleteWomenFPShipAddress,
  setWomenFPShipAddressDefault,
  addWomenFPBillingInfo,
  getWomenFPBillingInfosAll,
  getWomenFPBillingInfo
};
