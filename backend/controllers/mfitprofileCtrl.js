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
import mFitProfileSchema from '../models/main/mFitProfileSchema.js';
import mFitProfileBasicInfoSchema from '../models/main/mFitProfileBasicInfoSchema.js';
import mFitProfileStyleFitSchema from '../models/main/mFitProfileStyleFitSchema.js';
import mFitProfilePriceRangeSchema from '../models/main/mFitProfilePriceRangeSchema.js';
import mFitProfileCustomDsgnBrandSchema from '../models/main/mFitProfileCustomDsgnBrandSchema.js';
import fitProfileScheduleSchema from '../models/main/fitProfileScheduleSchema.js';
import fitProfileShipAddressSchema from '../models/main/fitProfileShipAddressSchema.js';
import fitProfileBillingInfoSchema from '../models/main/fitProfileBillingInfoSchema.js';

const __dirname = path.resolve();

const editMenFPBasicInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_editMenFPBasicInfo_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const MFitProfileBasicInfoModel = dbMainConn.model(
      'MFitProfileBasicInfo',
      mFitProfileBasicInfoSchema
    );
    let fpStatus = { id: null, isNew: null };
    let menFP = null;
    let newMenFP = null;
    let fpBasicInfo = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- add new
      newMenFP = await MFitProfileModel.create({
        userId: req.user._id
      });
      if (!newMenFP) {
        console.log(
          'API_editMenFPBasicInfo_400:',
          'Failed to create base of Men Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Men Fit Profile'
        });
      }
      fpStatus = { id: newMenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: menFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const basicInfoFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpBasicInfo = await MFitProfileBasicInfoModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: basicInfoFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpBasicInfo) {
      console.log(
        'API_editMenFPBasicInfo_400:',
        'Failed to edit Basic Info of Men Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Basic Info of Men Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newMenFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await newMenFP.save();
    } else {
      menFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await menFP.save();
    }
    //-- okay
    console.log(
      'API_editMenFPBasicInfo_200:',
      'Basic Info of Men Fit Profile is saved'
    );
    res.status(200).send('Basic Info of Men Fit Profile is saved');
  } catch (e) {
    console.log('API_editMenFPBasicInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPBasicInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPBasicInfo_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const MFitProfileBasicInfoModel = dbMainConn.model(
      'MFitProfileBasicInfo',
      mFitProfileBasicInfoSchema
    );
    let menFP = null;
    let fpBasicInfo = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPBasicInfo_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpBiItemId = menFP?.inputStatus?.basicInfo?.itemId;
    const fpBiIsComplete = menFP?.inputStatus?.basicInfo?.isComplete;
    if (!fpBiItemId || fpBiIsComplete !== true) {
      //-- no basic info of fit profile yet
      //-- make a deep check again
      fpBasicInfo = await MFitProfileBasicInfoModel.findOne(
        { profileId: menFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpBasicInfo) {
        //-- no basic info yet really
        console.log(
          'API_getMenFPBasicInfo_200:',
          'No Basic Info of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- basic info exists in fact
      //-- adjust fit profile status
      menFP.inputStatus.basicInfo = {
        itemId: fpBasicInfo._id,
        isComplete: true
      };
      await menFP.save();
      //-- okay, not bad
      console.log(
        'API_getMenFPBasicInfo_200:',
        'Basic Info of Fit Profile is returned'
      );
      return res.status(200).json(fpBasicInfo);
    }
    //-- everything seems fine so far
    fpBasicInfo = await MFitProfileBasicInfoModel.findById(fpBiItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpBasicInfo) {
      //-- wrong of mismatch
      console.log(
        'API_getMenFPBasicInfo_400:',
        'No Basic Info of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Basic Info of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getMenFPBasicInfo_200:',
      'Basic Info of Fit Profile is retrieved'
    );
    res.status(200).json(fpBasicInfo);
  } catch (e) {
    console.log('API_getMenFPBasicInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editMenFPStyleFit = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_editMenFPStyleFit_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const MFitProfileStyleFitModel = dbMainConn.model(
      'MFitProfileStyleFit',
      mFitProfileStyleFitSchema
    );
    let fpStatus = { id: null, isNew: null };
    let menFP = null;
    let newMenFP = null;
    let fpStyleFit = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- add new
      newMenFP = await MFitProfileModel.create({
        userId: req.user._id
      });
      if (!newMenFP) {
        console.log(
          'API_editMenFPStyleFit_400:',
          'Failed to create base of Men Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Men Fit Profile'
        });
      }
      fpStatus = { id: newMenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: menFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const styleFitFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpStyleFit = await MFitProfileStyleFitModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: styleFitFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpStyleFit) {
      console.log(
        'API_editMenFPStyleFit_400:',
        'Failed to edit Style Fit of Men Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Style Fit of Men Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newMenFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await newMenFP.save();
    } else {
      menFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await menFP.save();
    }
    //-- okay
    console.log(
      'API_editMenFPStyleFit_200:',
      'Style Fit of Men Fit Profile is saved'
    );
    res.status(200).send('Style Fit of Men Fit Profile is saved');
  } catch (e) {
    console.log('API_editMenFPStyleFit_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPStyleFit = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPStyleFit_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const MFitProfileStyleFitModel = dbMainConn.model(
      'MFitProfileStyleFit',
      mFitProfileStyleFitSchema
    );
    let menFP = null;
    let fpStyleFit = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPStyleFit_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpSfItemId = menFP?.inputStatus?.styleFit?.itemId;
    const fpSfIsComplete = menFP?.inputStatus?.styleFit?.isComplete;
    if (!fpSfItemId || fpSfIsComplete !== true) {
      //-- no style fit of fit profile yet
      //-- make a deep check again
      fpStyleFit = await MFitProfileStyleFitModel.findOne(
        { profileId: menFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpStyleFit) {
        //-- no style fit yet really
        console.log(
          'API_getMenFPStyleFit_200:',
          'No Style Fit of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- style fit exists in fact
      //-- adjust fit profile status
      menFP.inputStatus.styleFit = {
        itemId: fpStyleFit._id,
        isComplete: true
      };
      await menFP.save();
      //-- okay, not bad
      console.log(
        'API_getMenFPStyleFit_200:',
        'Style Fit of Fit Profile is returned'
      );
      return res.status(200).json(fpStyleFit);
    }
    //-- everything seems fine so far
    fpStyleFit = await MFitProfileStyleFitModel.findById(fpSfItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpStyleFit) {
      //-- wrong of mismatch
      console.log(
        'API_getMenFPStyleFit_400:',
        'No Style Fit of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Style Fit of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getMenFPStyleFit_200:',
      'Style Fit of Fit Profile is retrieved'
    );
    res.status(200).json(fpStyleFit);
  } catch (e) {
    console.log('API_getMenFPStyleFit_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editMenFPPriceRange = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_editMenFPPriceRange_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const MFitProfilePriceRangeModel = dbMainConn.model(
      'MFitProfilePriceRange',
      mFitProfilePriceRangeSchema
    );
    let fpStatus = { id: null, isNew: null };
    let menFP = null;
    let newMenFP = null;
    let fpPriceRange = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- add new
      newMenFP = await MFitProfileModel.create({
        userId: req.user._id
      });
      if (!newMenFP) {
        console.log(
          'API_editMenFPPriceRange_400:',
          'Failed to create base of Men Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Men Fit Profile'
        });
      }
      fpStatus = { id: newMenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: menFP._id, isNew: false };
    }
    const { ...rest } = req.body;
    const priceRangeFields = {
      profileId: fpStatus.id,
      ...rest
    };
    //-- use upsert option (create new if no match is found)
    fpPriceRange = await MFitProfilePriceRangeModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: priceRangeFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpPriceRange) {
      console.log(
        'API_editMenFPPriceRange_400:',
        'Failed to edit Price Range of Men Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Price Range of Men Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newMenFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await newMenFP.save();
    } else {
      menFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await menFP.save();
    }
    //-- okay
    console.log(
      'API_editMenFPPriceRange_200:',
      'Price Range of Men Fit Profile is saved'
    );
    res.status(200).send('Price Range of Men Fit Profile is saved');
  } catch (e) {
    console.log('API_editMenFPPriceRange_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPPriceRange = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPPriceRange_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const MFitProfilePriceRangeModel = dbMainConn.model(
      'MFitProfilePriceRange',
      mFitProfilePriceRangeSchema
    );
    let menFP = null;
    let fpPriceRange = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPPriceRange_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpPrItemId = menFP?.inputStatus?.priceRange?.itemId;
    const fpPrIsComplete = menFP?.inputStatus?.priceRange?.isComplete;
    if (!fpPrItemId || fpPrIsComplete !== true) {
      //-- no price range of fit profile yet
      //-- make a deep check again
      fpPriceRange = await MFitProfilePriceRangeModel.findOne(
        { profileId: menFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpPriceRange) {
        //-- no price range yet really
        console.log(
          'API_getMenFPPriceRange_200:',
          'No Price Range of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- price range exists in fact
      //-- adjust fit profile status
      menFP.inputStatus.priceRange = {
        itemId: fpPriceRange._id,
        isComplete: true
      };
      await menFP.save();
      //-- okay, not bad
      console.log(
        'API_getMenFPPriceRange_200:',
        'Price Range of Fit Profile is returned'
      );
      return res.status(200).json(fpPriceRange);
    }
    //-- everything seems fine so far
    fpPriceRange = await MFitProfilePriceRangeModel.findById(fpPrItemId, {
      _id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpPriceRange) {
      //-- wrong of mismatch
      console.log(
        'API_getMenFPPriceRange_400:',
        'No Price Range of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Price Range of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getMenFPPriceRange_200:',
      'Price Range of Fit Profile is retrieved'
    );
    res.status(200).json(fpPriceRange);
  } catch (e) {
    console.log('API_getMenFPPriceRange_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editMenFPCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_editMenFPCustomDsgnBrand_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const MFitProfileCustomDsgnBrandModel = dbMainConn.model(
      'MFitProfileCustomDsgnBrand',
      mFitProfileCustomDsgnBrandSchema
    );
    let fpStatus = { id: null, isNew: null };
    let menFP = null;
    let newMenFP = null;
    let fpCustomDsgnBrand = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- add new
      newMenFP = await MFitProfileModel.create({
        userId: req.user._id
      });
      if (!newMenFP) {
        console.log(
          'API_editMenFPCustomDsgnBrand_400:',
          'Failed to create base of Men Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Men Fit Profile'
        });
      }
      fpStatus = { id: newMenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: menFP._id, isNew: false };
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
            const key = `fitprofile/men/${url}`;
            const s3Cmd = new PutObjectCommand({
              Bucket: bucket,
              Key: key,
              Body: fileContent
            });
            const s3Res = await s3Client.send(s3Cmd);
            console.log('API_editMenFPCustomDsgnBrand:', s3Res);
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
      console.log('API_editMenFPCustomDsgnBrand_400:', errMsg);
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
    fpCustomDsgnBrand = await MFitProfileCustomDsgnBrandModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: customDsgnBrandFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpCustomDsgnBrand) {
      console.log(
        'API_editMenFPCustomDsgnBrand_400:',
        'Failed to edit Custom Design & Brands of Men Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Custom Design & Brands of Men Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newMenFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await newMenFP.save();
    } else {
      menFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await menFP.save();
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
      'API_editMenFPCustomDsgnBrand_200:',
      'Custom Design & Brands of Men Fit Profile is saved'
    );
    res.status(200).send('Custom Design & Brands of Men Fit Profile is saved');
  } catch (e) {
    console.log('API_editMenFPCustomDsgnBrand_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPCustomDsgnBrand_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const MFitProfileCustomDsgnBrandModel = dbMainConn.model(
      'MFitProfileCustomDsgnBrand',
      mFitProfileCustomDsgnBrandSchema
    );
    let menFP = null;
    let fpCustomDsgnBrand = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPCustomDsgnBrand_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpCdbItemId = menFP?.inputStatus?.customDsgnBrand?.itemId;
    const fpCdbIsComplete = menFP?.inputStatus?.customDsgnBrand?.isComplete;
    if (!fpCdbItemId || fpCdbIsComplete !== true) {
      //-- no custom design & brands of fit profile yet
      //-- make a deep check again
      fpCustomDsgnBrand = await MFitProfileCustomDsgnBrandModel.findOne(
        { profileId: menFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpCustomDsgnBrand) {
        //-- no custom design & brands yet really
        console.log(
          'API_getMenFPCustomDsgnBrand_200:',
          'No Custom Design & Brands of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- custom design & brands exists in fact
      //-- adjust fit profile status
      menFP.inputStatus.customDsgnBrand = {
        itemId: fpCustomDsgnBrand._id,
        isComplete: true
      };
      await menFP.save();
      //-- okay, not bad
      console.log(
        'API_getMenFPCustomDsgnBrand_200:',
        'Custom Design & Brands of Fit Profile is returned'
      );
      return res.status(200).json(fpCustomDsgnBrand);
    }
    //-- everything seems fine so far
    fpCustomDsgnBrand = await MFitProfileCustomDsgnBrandModel.findById(
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
        'API_getMenFPCustomDsgnBrand_400:',
        'No Custom Design & Brands of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Custom Design & Brands of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getMenFPCustomDsgnBrand_200:',
      'Custom Design & Brands of Fit Profile is retrieved'
    );
    res.status(200).json(fpCustomDsgnBrand);
  } catch (e) {
    console.log('API_getMenFPCustomDsgnBrand_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editMenFPSchedule = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_editMenFPSchedule_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileScheduleModel = dbMainConn.model(
      'FitProfileSchedule',
      fitProfileScheduleSchema
    );
    let fpStatus = { id: null, isNew: null };
    let menFP = null;
    let newMenFP = null;
    let fpSchedule = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- add new
      newMenFP = await MFitProfileModel.create({
        userId: req.user._id
      });
      if (!newMenFP) {
        console.log(
          'API_editMenFPSchedule_400:',
          'Failed to create base of Men Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Men Fit Profile'
        });
      }
      fpStatus = { id: newMenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: menFP._id, isNew: false };
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
        'API_editMenFPSchedule_400:',
        'Failed to edit Schedule of Men Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to edit Schedule of Men Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newMenFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true
      };
      await newMenFP.save();
    } else {
      menFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true
      };
      await menFP.save();
    }
    //-- okay
    console.log(
      'API_editMenFPSchedule_200:',
      'Schedule of Men Fit Profile is saved'
    );
    res.status(200).send('Schedule of Men Fit Profile is saved');
  } catch (e) {
    console.log('API_editMenFPSchedule_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPSchedule = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPSchedule_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileScheduleModel = dbMainConn.model(
      'FitProfileSchedule',
      fitProfileScheduleSchema
    );
    let menFP = null;
    let fpSchedule = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPSchedule_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpDsItemId = menFP?.inputStatus?.schedule?.itemId;
    const fpDsIsComplete = menFP?.inputStatus?.schedule?.isComplete;
    // const fpDsIsActive = menFP?.inputStatus?.schedule?.isActive;
    if (!fpDsItemId || fpDsIsComplete !== true) {
      //-- no delivery schedule of fit profile yet
      //-- make a deep check again
      fpSchedule = await FitProfileScheduleModel.findOne(
        { profileId: menFP._id },
        { _id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpSchedule) {
        //-- no delivery schedule yet really
        console.log(
          'API_getMenFPSchedule_200:',
          'No Delivery Schedule of Fit Profile yet'
        );
        return res.status(200).json(null);
      }
      //-- delivery schedule exists in fact
      //-- adjust fit profile status
      menFP.inputStatus.schedule = {
        itemId: fpSchedule._id,
        isComplete: true,
        isActive: true
      };
      await menFP.save();
      //-- okay, not bad
      console.log(
        'API_getMenFPSchedule_200:',
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
        'API_getMenFPSchedule_400:',
        'No Delivery Schedule of Fit Profile exists'
      );
      return res.status(400).json({
        msg: 'No Delivery Schedule of Fit Profile exists'
      });
    }
    //-- okay
    console.log(
      'API_getMenFPSchedule_200:',
      'Delivery Schedule of Fit Profile is retrieved'
    );
    res.status(200).json(fpSchedule);
  } catch (e) {
    console.log('API_getMenFPSchedule_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editMenFPShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_editMenFPShipAddress_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
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
          'API_editMenFPShipAddress_400:',
          'Failed to modify Ship Address of Men Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to modify Ship Address of Men Fit Profile'
        });
      }
      //-- okay
      console.log(
        'API_editMenFPShipAddress_200:',
        'Ship Address of Men Fit Profile is modified'
      );
      res.status(200).send(shipAddress);
    } else {
      let fpStatus = { id: null, isNew: null };
      let menFP = null;
      let newMenFP = null;
      let fpShipAddress = null;
      menFP = await MFitProfileModel.findOne({
        userId: req.user._id
      });
      if (!menFP) {
        //-- add new
        newMenFP = await MFitProfileModel.create({
          userId: req.user._id
        });
        if (!newMenFP) {
          console.log(
            'API_editMenFPShipAddress_400:',
            'Failed to create base of Men Fit Profile'
          );
          return res.status(400).json({
            msg: 'Failed to create base of Men Fit Profile'
          });
        }
        fpStatus = { id: newMenFP._id, isNew: true };
      } else {
        //-- modify existing one
        fpStatus = { id: menFP._id, isNew: false };
      }
      //-- check count of addresses as we can add up to 5
      const shipAddrCount = await FitProfileShipAddressModel.countDocuments({
        profileId: fpStatus.id
      });
      if (shipAddrCount >= 5) {
        console.log(
          'API_editMenFPShipAddress_400:',
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
          'API_editMenFPShipAddress_400:',
          'Failed to add Ship Address of Men Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to add Ship Address of Men Fit Profile'
        });
      }
      if (fpStatus.isNew) {
        newMenFP.inputStatus.shipAddress = {
          itemIDs: [{ itemId: fpShipAddress._id }],
          isComplete: true
        };
        await newMenFP.save();
      } else {
        menFP.inputStatus.shipAddress.itemIDs.push({
          itemId: fpShipAddress._id
        });
        menFP.inputStatus.shipAddress.isComplete = true;
        await menFP.save();
      }
      //-- okay
      console.log(
        'API_editMenFPShipAddress_200:',
        'Ship Address of Men Fit Profile is added'
      );
      res.status(200).send(fpShipAddress);
    }
  } catch (e) {
    console.log('API_editMenFPShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPShipAddressesAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPShipAddressesAll_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    let menFP = null;
    let fpShipAddresses = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPShipAddressesAll_200:', 'No Fit Profile yet');
      return res.status(200).json([]);
    }
    const fpSaIsComplete = menFP?.inputStatus?.shipAddress?.isComplete;
    fpShipAddresses = await FitProfileShipAddressModel.find(
      { profileId: menFP._id },
      { __v: 0, profileId: 0 }
    ).sort({ updatedAt: -1 });
    if (!fpShipAddresses) {
      //-- failed to find
      console.log(
        'API_getMenFPShipAddressesAll_400:',
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
        menFP.inputStatus.shipAddress = {
          itemIDs: [],
          isComplete: false
        };
        await menFP.save();
      }
    } else {
      if (!fpSaIsComplete) {
        //-- adjust wrong status
        let tmpIDs = [];
        fpShipAddresses.forEach((item) => {
          tmpIDs.unshift({ itemId: item._id });
          //-- use `unshift` instead of `push` because of sort(-1)
        });
        menFP.inputStatus.shipAddress.itemIDs = tmpIDs;
        menFP.inputStatus.shipAddress.isComplete = true;
        await menFP.save();
      }
    }
    //-- okay
    console.log(
      'API_getMenFPShipAddressesAll_200:',
      'All Ship Addresses of Fit Profile are retrieved'
    );
    res.status(200).json(fpShipAddresses);
  } catch (e) {
    console.log('API_getMenFPShipAddressesAll_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPShipAddress_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    let menFP = null;
    let fpShipAddress = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPShipAddress_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpSaIsComplete = menFP?.inputStatus?.shipAddress?.isComplete;
    fpShipAddress = await FitProfileShipAddressModel.findOne(
      {
        _id: req.params.id,
        profileId: menFP._id
      },
      { __v: 0, profileId: 0 }
    );
    if (!fpShipAddress) {
      //-- failed to find
      console.log(
        'API_getMenFPShipAddress_400:',
        'Failed to get Ship Address of Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get Ship Address of Fit Profile'
      });
    }
    if (!fpSaIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...menFP?.inputStatus?.shipAddress?.itemIDs];
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
      menFP.inputStatus.shipAddress.itemIDs = tmpIDs;
      menFP.inputStatus.shipAddress.isComplete = true;
      await menFP.save();
    }
    //-- okay
    console.log(
      'API_getMenFPShipAddress_200:',
      'Ship Address of Fit Profile is retrieved'
    );
    res.status(200).json(fpShipAddress);
  } catch (e) {
    console.log('API_getMenFPShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteMenFPShipAddress = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_deleteMenFPShipAddress_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    let menFP = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- error! no fit profile yet
      console.log(
        'API_deleteMenFPShipAddress_400:',
        'No Men Fit Profile exists yet'
      );
      return res.status(400).json({
        msg: 'No Men Fit Profile exists yet'
      });
    }
    //-- remove
    await FitProfileShipAddressModel.findOneAndRemove({
      _id: req.params.id,
      profileId: menFP._id
    });
    //-- adjust status
    let _itemIDs = [...menFP?.inputStatus?.shipAddress?.itemIDs];
    let tmpIDs = null;
    if (!_itemIDs || (_itemIDs && _itemIDs.length === 0)) {
      tmpIDs = [];
    } else {
      tmpIDs = _itemIDs.filter((item) => {
        return String(item.itemId) !== String(req.params.id);
      });
    }
    menFP.inputStatus.shipAddress.itemIDs = tmpIDs;
    //-- check count of addresses
    const shipAddrCount = await FitProfileShipAddressModel.countDocuments({
      profileId: menFP._id
    });
    if (shipAddrCount === 0) {
      menFP.inputStatus.shipAddress.itemIDs = [];
      menFP.inputStatus.shipAddress.isComplete = false;
    } else {
      menFP.inputStatus.shipAddress.isComplete = true;
    }
    await menFP.save();
    //-- okay
    console.log(
      'API_deleteMenFPShipAddress_200:',
      'Ship Address of Men Fit Profile is deleted'
    );
    res.status(200).send('Ship Address of Men Fit Profile is deleted');
  } catch (e) {
    console.log('API_deleteMenFPShipAddress_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const setMenFPShipAddressDefault = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_setMenFPShipAddressDefault_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileShipAddressModel = dbMainConn.model(
      'FitProfileShipAddress',
      fitProfileShipAddressSchema
    );
    let menFP = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- error! no fit profile yet
      console.log(
        'API_setMenFPShipAddressDefault_400:',
        'No Men Fit Profile exists yet'
      );
      return res.status(400).json({
        msg: 'No Men Fit Profile exists yet'
      });
    }
    //-- update
    //-- set all as false
    const updateAllRes = await FitProfileShipAddressModel.updateMany(
      { profileId: menFP._id },
      { isDefault: false }
    );
    console.log(
      'API_setMenFPShipAddressDefault:',
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
        'API_setMenFPShipAddressDefault_400:',
        'Failed to update Ship Address of Men Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to update Ship Address of Men Fit Profile'
      });
    }
    //-- okay
    console.log(
      'API_setMenFPShipAddressDefault_200:',
      'Ship Address of Men Fit Profile is updated'
    );
    res.status(200).send(updatedAddress);
  } catch (e) {
    console.log('API_setMenFPShipAddressDefault_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addMenFPBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_addMenFPBillingInfo_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    let fpStatus = { id: null, isNew: null };
    let menFP = null;
    let newMenFP = null;
    let fpBillingInfo = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- add new
      newMenFP = await MFitProfileModel.create({
        userId: req.user._id
      });
      if (!newMenFP) {
        console.log(
          'API_addMenFPBillingInfo_400:',
          'Failed to create base of Men Fit Profile'
        );
        return res.status(400).json({
          msg: 'Failed to create base of Men Fit Profile'
        });
      }
      fpStatus = { id: newMenFP._id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: menFP._id, isNew: false };
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
        'API_addMenFPBillingInfo_400:',
        'Failed to add Billing Info of Men Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to add Billing Info of Men Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newMenFP.inputStatus.billingInfo = {
        itemIDs: [{ itemId: fpBillingInfo._id }],
        isComplete: true
      };
      await newMenFP.save();
    } else {
      menFP.inputStatus.billingInfo.itemIDs.push({
        itemId: fpBillingInfo._id
      });
      menFP.inputStatus.billingInfo.isComplete = true;
      await menFP.save();
    }
    //-- okay
    console.log(
      'API_addMenFPBillingInfo_200:',
      'Billing Info of Men Fit Profile is added'
    );
    res.status(200).send(fpBillingInfo);
  } catch (e) {
    console.log('API_addMenFPBillingInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPBillingInfosAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPBillingInfosAll_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    let menFP = null;
    let fpBillingInfos = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPBillingInfosAll_200:', 'No Fit Profile yet');
      return res.status(200).json([]);
    }
    const fpBiIsComplete = menFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfos = await FitProfileBillingInfoModel.find(
      { profileId: menFP._id },
      { __v: 0, profileId: 0 }
    ).sort({ updatedAt: -1 });
    if (!fpBillingInfos) {
      //-- failed to find
      console.log(
        'API_getMenFPBillingInfosAll_400:',
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
        menFP.inputStatus.billingInfo = {
          itemIDs: [],
          isComplete: false
        };
        await menFP.save();
      }
    } else {
      if (!fpBiIsComplete) {
        //-- adjust wrong status
        let tmpIDs = [];
        fpBillingInfos.forEach((item) => {
          tmpIDs.unshift({ itemId: item._id });
          //-- use `unshift` instead of `push` because of sort(-1)
        });
        menFP.inputStatus.billingInfo.itemIDs = tmpIDs;
        menFP.inputStatus.billingInfo.isComplete = true;
        await menFP.save();
      }
    }
    //-- okay
    console.log(
      'API_getMenFPBillingInfosAll_200:',
      'All Billing Infos of Fit Profile are retrieved'
    );
    res.status(200).json(fpBillingInfos);
  } catch (e) {
    console.log('API_getMenFPBillingInfosAll_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenFPBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log(
        'API_getMenFPBillingInfo_400:',
        'Invalid access of mismatching gender'
      );
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const FitProfileBillingInfoModel = dbMainConn.model(
      'FitProfileBillingInfo',
      fitProfileBillingInfoSchema
    );
    let menFP = null;
    let fpBillingInfo = null;
    menFP = await MFitProfileModel.findOne({
      userId: req.user._id
    });
    if (!menFP) {
      //-- no fit profile yet
      console.log('API_getMenFPBillingInfo_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpBiIsComplete = menFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfo = await FitProfileBillingInfoModel.findOne(
      {
        _id: req.params.id,
        profileId: menFP._id
      },
      { __v: 0, profileId: 0 }
    );
    if (!fpBillingInfo) {
      //-- failed to find
      console.log(
        'API_getMenFPBillingInfo_400:',
        'Failed to get Billing Info of Fit Profile'
      );
      return res.status(400).json({
        msg: 'Failed to get Billing Info of Fit Profile'
      });
    }
    if (!fpBiIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...menFP?.inputStatus?.billingInfo?.itemIDs];
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
      menFP.inputStatus.billingInfo.itemIDs = tmpIDs;
      menFP.inputStatus.billingInfo.isComplete = true;
      await menFP.save();
    }
    //-- okay
    console.log(
      'API_getMenFPBillingInfo_200:',
      'Billing Info of Fit Profile is retrieved'
    );
    res.status(200).json(fpBillingInfo);
  } catch (e) {
    console.log('API_getMenFPBillingInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  editMenFPBasicInfo,
  getMenFPBasicInfo,
  editMenFPStyleFit,
  getMenFPStyleFit,
  editMenFPPriceRange,
  getMenFPPriceRange,
  editMenFPCustomDsgnBrand,
  getMenFPCustomDsgnBrand,
  editMenFPSchedule,
  getMenFPSchedule,
  editMenFPShipAddress,
  getMenFPShipAddressesAll,
  getMenFPShipAddress,
  deleteMenFPShipAddress,
  setMenFPShipAddressDefault,
  addMenFPBillingInfo,
  getMenFPBillingInfosAll,
  getMenFPBillingInfo
};
