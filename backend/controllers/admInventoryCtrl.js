/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import path from 'path';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '../libs/s3Client.js';
import { dbMainConn, dbInventoryConn } from '../config/db.js';
import userSchema from '../models/main/userSchema.js';
import brandStaffSchema from '../models/main/brandStaffSchema.js';
import invColorSchema from '../models/inventory/invColorSchema.js';
import invProductCategorySchema from '../models/inventory/invProductCategorySchema.js';
import invProdSubCategoryRackSchema from '../models/inventory/invProdSubCategoryRackSchema.js';
import invProductMenSchema from '../models/inventory/invProductMenSchema.js';
import invProductWomenSchema from '../models/inventory/invProductWomenSchema.js';
import invProductKidSchema from '../models/inventory/invProductKidSchema.js';
import { listMRTableHandler, genUsername } from '../utils/helper.js';
import { sendSesEmail } from '../libs/sendSesEmail.js';
import {
  NORMAL_SIZE_FIT_LIST,
  MEN_WAIST_SIZE_NUM_LIST,
  MEN_SHIRT_SIZE_NO_LIST,
  MEN_INSEAM_SIZE_LIST,
  MEN_BOTTOM_SIZE_LIST,
  MEN_SHOE_SIZE_NUM_LIST,
  MEN_SHOE_SIZE_LABEL_LIST,
  WOMEN_PANTS_SIZE_LIST,
  WOMEN_BRA_SIZE_NUM_LIST,
  WOMEN_BRA_SIZE_LABEL_LIST,
  WOMEN_SKIRT_SIZE_LIST,
  WOMEN_CASUAL_SIZE_LIST,
  WOMEN_SIZE_ARMS_LIST,
  WOMEN_JACKET_SIZE_LIST,
  WOMEN_BOTTOM_SIZE_LIST,
  WOMEN_DRESS_SIZE_LABEL_LIST,
  WOMEN_SHIRT_BLOUSE_SIZE_LABEL_LIST,
  WOMEN_SHOE_SIZE_NUM_LIST,
  WOMEN_SHOES_STYLE_LABEL_LIST,
  WOMEN_HEEL_HEIGHT_LABEL_LIST,
  WOMEN_TOP_SIZE_NO_LIST,
  WOMEN_TOP_SIZE_LABEL_LIST,
  KID_CASUAL_SIZE_LIST,
  KID_SHOE_SIZE_LIST
} from '../utils/constant.js';
import { profile } from 'console';

const __dirname = path.resolve();

const addColor = asyncHandler(async (req, res) => {
  try {
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const { name } = req.body;

    if (name === '--') {
      console.log('API_addColor_400:', 'Color name is invalid');
      return res.status(400).json({
        msg: 'Color name is invalid'
      });
    }
    //-- create color
    const color = await InvColorModel.create({ name });
    if (!color) {
      console.log('API_addColor_400:', 'Failed to add color for inventory');
      return res.status(400).json({
        msg: 'Failed to add color for inventory'
      });
    }
    //-- okay
    console.log('API_addColor_200:', 'Color is added');
    res.status(200).send(color);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log('API_addColor_400:', 'Color name is duplicated');
      res.status(400).json({
        msg: 'Color name is duplicated'
      });
    } else {
      console.log('API_addColor_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const listColorsTable = asyncHandler(async (req, res) => {
  try {
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);

    const result = await listMRTableHandler(InvColorModel, req.body);
    if (result === null) {
      console.log('API_listColorsTable_400:', 'Failed to get table list data');
      return res.status(400).json({
        msg: 'Failed to get table list data'
      });
    }
    //-- okay
    console.log('API_listColorsTable_200:', 'Table list data is retrieved');
    res.status(200).json(result);
  } catch (e) {
    console.log('API_listColorsTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editColor = asyncHandler(async (req, res) => {
  try {
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const { _id, name } = req.body;

    const color = await InvColorModel.findById(_id);
    if (!color) {
      console.log('API_editColor_400:', 'Failed to find color');
      return res.status(400).json({
        msg: 'Failed to find color'
      });
    }
    if (name === '--') {
      console.log('API_editColor_400:', 'Color name is invalid');
      return res.status(400).json({
        msg: 'Color name is invalid'
      });
    }
    color.name = name;
    await color.save();
    //-- okay
    console.log('API_editColor_200:', 'Color is updated');
    res.status(200).json(color);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log('API_editColor_400:', 'Color name is duplicated');
      res.status(400).json({
        msg: 'Color name is duplicated'
      });
    } else {
      console.log('API_editColor_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  try {
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const { _id } = req.body;

    await InvColorModel.findOneAndRemove({ _id });
    //-- okay
    console.log('API_deleteColor_200:', 'Color is deleted');
    res.status(200).send('Color is deleted');
  } catch (e) {
    console.log('API_deleteColor_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getColors = asyncHandler(async (req, res) => {
  try {
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);

    const colors = await InvColorModel.find({}, { name: 1 });
    const colorNames = colors.map((item) => item.name);
    colorNames.unshift('--');
    //-- okay
    console.log('API_getColors_200:', 'Colors are retrieved');
    res.status(200).send(colorNames);
  } catch (e) {
    console.log('API_getColors_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const createBrandStaff = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const UserModel = dbMainConn.model('User', userSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);
    const { firstName, lastName, email, password, phone, address, brandName } =
      req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      console.log(
        'API_createBrandStaff_400:',
        'User with that email already exists'
      );
      return res.status(400).json({
        msg: 'User with that email already exists'
      });
    }
    if (brandName === '--') {
      console.log('API_createBrandStaff_400:', 'Brand name is invalid');
      return res.status(400).json({
        msg: 'Brand name is invalid'
      });
    }
    const brandExists = await BrandStaffModel.findOne({ brandName });
    if (brandExists) {
      console.log('API_createBrandStaff_400:', 'Brand name already exists');
      return res.status(400).json({
        msg: 'Brand name already exists'
      });
    }
    //-- create user
    const user = await UserModel.create({
      firstName,
      lastName,
      username: genUsername(firstName, lastName),
      email,
      password,
      emailVerified: true, // *
      role: 1040
    });
    if (!user) {
      console.log(
        'API_createBrandStaff_400:',
        'Failed to create user account for brand staff'
      );
      return res.status(400).json({
        msg: 'Failed to create user account for brand staff'
      });
    }
    //-- create stripe customer (?)
    try {
      const customer = await stripe.customers.create({
        name: `${firstName} ${lastName}`,
        email,
        description: `Register Drape Fit brand staff [${firstName} ${lastName}] as a Stripe customer`
      });
      user.stripeCusId = customer.id;
      await user.save();
    } catch (err) {
      //-- remove insufficient user without payment info
      await UserModel.findByIdAndRemove(user._id);
      console.log('API_createBrandStaff_400:', err);
      return res.status(400).json({
        msg: 'Failed to register brand staff as a Stripe customer'
      });
    }
    //-- create brand staff entity
    const brandStaff = await BrandStaffModel.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      address,
      brandName
    });
    if (!brandStaff) {
      //-- remove orphaned user account with no brand staff entity
      await UserModel.findByIdAndRemove(user._id);
      console.log('API_createBrandStaff_400:', 'Failed to create brand staff');
      return res.status(400).json({
        msg: 'Failed to create brand staff'
      });
    }

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_createBrandStaff_200:', 'Brand staff is created');
      return res.status(200).send('Brand staff is created');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>You have been registered as a brand staff of Drape Fit Inc. by inventory manager.</p>
      <p>Please use the following credentials to login the Drape Fit service:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Email: ${email}<br>
      Password: ${password}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      You have been registered as a brand staff of Drape Fit Inc. by inventory manager.\n
      Please use the following credentials to login the Drape Fit service:\n\n
      Email: ${email}\n
      Password: ${password}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Brand Staff Registration - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_createBrandStaff_200:',
        'Brand staff is created, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Brand staff is created, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log(
        'API_createBrandStaff_200:',
        'Brand staff is created successfully'
      );
      res.status(200).send('Brand staff is created successfully');
    }
  } catch (e) {
    console.log('API_createBrandStaff_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listBrandStaffTable = asyncHandler(async (req, res) => {
  try {
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);
    const {
      start = 0,
      size = 10,
      filters = '[]',
      sorting = '[]',
      globalFilter = ''
    } = req.body;

    const parsedColumnFilters = JSON.parse(filters);
    const filterObject = {};
    if (parsedColumnFilters?.length) {
      parsedColumnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        filterObject[columnId] = { $regex: filterValue, $options: 'i' };
      });
    }
    const globalFilterObject = {};
    if (globalFilter) {
      const globalFilterRegex = new RegExp(globalFilter, 'i');
      globalFilterObject['$or'] = Object.values(BrandStaffModel?.schema?.obj)
        .map((key, index) => {
          // if (key?.type?.name === 'String' || key?.type?.name === 'Number') {
          if (key?.type?.name === 'String') {
            return {
              [Object.keys(BrandStaffModel?.schema?.obj)[index]]:
                globalFilterRegex
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }
    const parsedSorting = JSON.parse(sorting);
    const sortOptions = {};
    if (parsedSorting?.length) {
      const { id, desc } = parsedSorting[0];
      sortOptions[id] = desc ? -1 : 1;
    } else {
      sortOptions['createdAt'] = 1;
    }

    let aggregateQuery = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'activeStatus'
        }
      },
      {
        $addFields: {
          isActive: {
            $arrayElemAt: ['$activeStatus.isActive', 0]
          }
        }
      },
      {
        $match: { $and: [filterObject, globalFilterObject] }
      },
      {
        $project: { activeStatus: 0 }
      }
    ];
    const dataCount = await BrandStaffModel.aggregate(aggregateQuery);
    const totalRowCount = dataCount.length;
    aggregateQuery.push(
      { $sort: sortOptions },
      { $skip: start },
      { $limit: size }
    );
    const data = await BrandStaffModel.aggregate(aggregateQuery);
    //-- okay
    console.log('API_listBrandStaffTable_200:', 'Table list data is retrieved');
    res.status(200).json({
      data,
      meta: { totalRowCount }
    });
  } catch (e) {
    console.log('API_listBrandStaffTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changeBrandStaffPwd = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);
    const { _id, email, password } = req.body;

    const brandStaff = await BrandStaffModel.findById(_id);
    if (!brandStaff) {
      console.log(
        'API_changeBrandStaffPwd_400:',
        'Failed to find brand staff entity'
      );
      return res.status(400).json({
        msg: 'Failed to find brand staff entity'
      });
    }
    if (brandStaff.email !== email) {
      console.log('API_changeBrandStaffPwd_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const user = await UserModel.findById(brandStaff?.userId);
    if (!user) {
      console.log(
        'API_changeBrandStaffPwd_400:',
        'Failed to find brand staff account'
      );
      return res.status(400).json({
        msg: 'Failed to find brand staff account'
      });
    }
    if (user.email !== email) {
      console.log('API_changeBrandStaffPwd_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }

    user.password = password;
    user.pwdChangedAt = new Date();
    await user.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_changeBrandStaffPwd_200:', 'Password is changed');
      return res.status(200).send('Password is changed');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your brand staff account password has been changed by inventory manager.</p>
      <p>Please use the following password to login the Drape Fit service:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Password: ${password}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your brand staff account password has been changed by inventory manager.\n
      Please use the following password to login the Drape Fit service:\n\n
      Password: ${password}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Password Change - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_changeBrandStaffPwd_200:',
        'Password is changed, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Password is changed, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log(
        'API_changeBrandStaffPwd_200:',
        'Password is changed successfully'
      );
      res.status(200).send('Password is changed successfully');
    }
  } catch (e) {
    console.log('API_changeBrandStaffPwd_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editBrandStaffInfo = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);
    const { _id, firstName, lastName, email, phone, address, brandName } =
      req.body;

    const brandStaff = await BrandStaffModel.findById(_id);
    if (!brandStaff) {
      console.log(
        'API_editBrandStaffInfo_400:',
        'Failed to find brand staff entity'
      );
      return res.status(400).json({
        msg: 'Failed to find brand staff entity'
      });
    }
    if (brandStaff.email !== email) {
      console.log('API_editBrandStaffInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const user = await UserModel.findById(brandStaff?.userId);
    if (!user) {
      console.log(
        'API_editBrandStaffInfo_400:',
        'Failed to find brand staff account'
      );
      return res.status(400).json({
        msg: 'Failed to find brand staff account'
      });
    }
    if (user.email !== email) {
      console.log('API_editBrandStaffInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    if (brandName === '--') {
      console.log('API_editBrandStaffInfo_400:', 'Brand name is invalid');
      return res.status(400).json({
        msg: 'Brand name is invalid'
      });
    }
    const brandExists = await BrandStaffModel.findOne({ brandName });
    if (brandExists && brandExists?.email !== email) {
      console.log('API_editBrandStaffInfo_400:', 'Brand name is duplicated');
      return res.status(400).json({
        msg: 'Brand name is duplicated'
      });
    }

    //-- edit brand staff user account
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = genUsername(firstName, lastName);
    await user.save();
    //-- edit brand staff info
    brandStaff.firstName = firstName;
    brandStaff.lastName = lastName;
    brandStaff.phone = phone;
    brandStaff.address = address;
    brandStaff.brandName = brandName;
    await brandStaff.save();
    //-- temporary attachment for table listing
    const resBrandStaff = JSON.parse(JSON.stringify(brandStaff));
    resBrandStaff.isActive = user.isActive;

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_editBrandStaffInfo_200:', 'Brand staff info is updated');
      return res.status(200).json({
        msg: 'Brand staff info is updated',
        data: resBrandStaff
      });
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your brand staff account info has been updated by inventory manager.</p>
      <p>Please confirm the following updates:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      First Name: ${firstName}<br>
      Last Name: ${lastName}<br>
      Phone: ${phone}<br>
      Address: ${address}<br>
      Brand Name: ${brandName}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your brand staff account info has been updated by inventory manager.\n
      Please confirm the following updates:\n\n
      First Name: ${firstName}\n
      Last Name: ${lastName}\n
      Phone: ${phone}\n
      Address: ${address}\n
      Brand Name: ${brandName}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Brand Staff Info Update - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_editBrandStaffInfo_200:',
        'Brand staff info is updated, but failed to send notify-email. Please check if email address is valid.'
      );
      res.status(200).json({
        msg: 'Brand staff info is updated, but failed to send notify-email. Please check if email address is valid.',
        data: resBrandStaff
      });
    } else {
      //-- okay
      console.log(
        'API_editBrandStaffInfo_200:',
        'Brand staff info is updated successfully'
      );
      res.status(200).json({
        msg: 'Brand staff info is updated successfully',
        data: resBrandStaff
      });
    }
  } catch (e) {
    console.log('API_editBrandStaffInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteBrandStaff = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);
    const { _id } = req.body;

    const brandStaff = await BrandStaffModel.findById(_id);
    if (!brandStaff) {
      console.log(
        'API_deleteBrandStaff_400:',
        'Failed to find brand staff entity'
      );
      return res.status(400).json({
        msg: 'Failed to find brand staff entity'
      });
    }
    const user = await UserModel.findById(brandStaff?.userId);
    if (!user) {
      console.log(
        'API_deleteBrandStaff_400:',
        'Failed to find brand staff account'
      );
      return res.status(400).json({
        msg: 'Failed to find brand staff account'
      });
    }
    //-- delete brand staff account
    await UserModel.findByIdAndRemove(user._id);
    //-- delete brand staff info
    await BrandStaffModel.findByIdAndRemove(_id);

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log(
        'API_deleteBrandStaff_200:',
        'Brand staff account is deleted'
      );
      return res.status(200).send('Brand staff account is deleted');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your Drape Fit brand staff account has been deleted by inventory manager.</p>
      <p>Please contact us if there is any problem or inconvenience.</p>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your Drape Fit brand staff account has been deleted by inventory manager.\n
      Please contact us if there is any problem or inconvenience.\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Brand Staff Account Deletion - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_deleteBrandStaff_200:',
        'Brand staff account is deleted, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Brand staff account is deleted, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log(
        'API_deleteBrandStaff_200:',
        'Brand staff account is deleted successfully'
      );
      res.status(200).send('Brand staff account is deleted successfully');
    }
  } catch (e) {
    console.log('API_deleteBrandStaff_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleActiveBrandStaffStatus = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);
    const { _id } = req.body;

    const brandStaff = await BrandStaffModel.findById(_id);
    if (!brandStaff) {
      console.log(
        'API_toggleActiveBrandStaffStatus_400:',
        'Failed to find brand staff entity'
      );
      return res.status(400).json({
        msg: 'Failed to find brand staff entity'
      });
    }
    const user = await UserModel.findById(brandStaff?.userId);
    if (!user) {
      console.log(
        'API_toggleActiveBrandStaffStatus_400:',
        'Failed to find brand staff account'
      );
      return res.status(400).json({
        msg: 'Failed to find brand staff account'
      });
    }

    const status = user.isActive;
    let message = '';
    let prefix = status === 0 ? '' : 'de';
    //-- toggle
    user.isActive = status === 0 ? 1 : 0;
    await user.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      message = `Brand staff account is ${prefix}activated`;
      console.log('API_toggleActiveBrandStaffStatus_200:', message);
      return res.status(200).send(message);
    }

    //-- send notify-email
    message =
      status === 0
        ? 'You can now log in to the Drape Fit service.'
        : 'Unfortunately, you will not be able to log in to the Drape Fit service while deactivated.';
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your Drape Fit brand staff account has been ${prefix}activated by inventory manager.</p>
      <p>${message}</p>
      <p>Please contact us if there is any problem or inconvenience.</p>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your Drape Fit brand staff account has been ${prefix}activated by inventory manager.\n
      ${message}\n
      Please contact us if there is any problem or inconvenience.\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      user.email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Brand Staff Account Activation - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      message = `Brand staff account is ${prefix}activated, but failed to send notify-email. Please check if email address is valid.`;
      console.log('API_toggleActiveBrandStaffStatus_200:', message);
      res.status(200).send(message);
    } else {
      //-- okay
      message = `Brand staff account is ${prefix}activated successfully`;
      console.log('API_toggleActiveBrandStaffStatus_200:', message);
      res.status(200).send(message);
    }
  } catch (e) {
    console.log('API_toggleActiveBrandStaffStatus_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const countBrandStaff = asyncHandler(async (req, res) => {
  try {
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);

    const aggregateQuery = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'activeStatus'
        }
      },
      {
        $addFields: {
          isActive: {
            $arrayElemAt: ['$activeStatus.isActive', 0]
          }
        }
      },
      {
        $project: { activeStatus: 0 }
      }
    ];
    const dataTotal = await BrandStaffModel.aggregate(aggregateQuery);
    const countTotal = dataTotal.length;
    const dataActive = dataTotal.map((brand) => {
      if (brand.isActive === 1) {
        return brand;
      }
    });
    const countActive = dataActive.filter(Boolean).length;
    const countInactive = countTotal - countActive;
    //-- okay
    console.log('API_countBrandStaff_200:', 'Count data is retrieved');
    res.status(200).json({
      countTotal,
      countActive,
      countInactive
    });
  } catch (e) {
    console.log('API_countBrandStaff_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getBrandNames = asyncHandler(async (req, res) => {
  try {
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);

    const brands = await BrandStaffModel.find({}, { brandName: 1 });
    const brandNames = brands.map((item) => item.brandName);
    brandNames.unshift('--');
    //-- okay
    console.log('API_getBrandNames_200:', 'Brand names are retrieved');
    res.status(200).send(brandNames);
  } catch (e) {
    console.log('API_getBrandNames_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addInvProdCategory = asyncHandler(async (req, res) => {
  try {
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const { category, prodName, note } = req.body;

    //-- create product category
    const prodCategory = await InvProductCategoryModel.create({
      category,
      prodName,
      note
    });
    if (!prodCategory) {
      console.log(
        'API_addInvProdCategory_400:',
        'Failed to add product category'
      );
      return res.status(400).json({
        msg: 'Failed to add product category'
      });
    }
    //-- okay
    console.log('API_addInvProdCategory_200:', 'Product category is added');
    res.status(200).send(prodCategory);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log(
        'API_addInvProdCategory_400:',
        'Product category is duplicated'
      );
      res.status(400).json({
        msg: 'Product category is duplicated'
      });
    } else {
      console.log('API_addInvProdCategory_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const listInvProdCategoriesTable = asyncHandler(async (req, res) => {
  try {
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const {
      start = 0,
      size = 10,
      filters = '[]',
      sorting = '[]',
      globalFilter = ''
    } = req.body;

    const parsedColumnFilters = JSON.parse(filters);
    const filterObject = {};
    if (parsedColumnFilters?.length) {
      parsedColumnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        //-- consider filter combination
        if (columnId === 'categoryProdName') {
          filterObject['category'] = { $regex: filterValue, $options: 'i' };
          filterObject['prodName'] = { $regex: filterValue, $options: 'i' };
        } else {
          filterObject[columnId] = { $regex: filterValue, $options: 'i' };
        }
      });
    }
    const globalFilterObject = {};
    if (globalFilter) {
      const globalFilterRegex = new RegExp(globalFilter, 'i');
      globalFilterObject['$or'] = Object.values(
        InvProductCategoryModel?.schema?.obj
      )
        .map((key, index) => {
          // if (key?.type?.name === 'String' || key?.type?.name === 'Number') {
          if (key?.type?.name === 'String') {
            return {
              [Object.keys(InvProductCategoryModel?.schema?.obj)[index]]:
                globalFilterRegex
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }
    const parsedSorting = JSON.parse(sorting);
    const sortOptions = {};
    if (parsedSorting?.length) {
      const { id, desc } = parsedSorting[0];
      sortOptions[id] = desc ? -1 : 1;
    }
    const totalRowCount = await InvProductCategoryModel.countDocuments({
      $and: [filterObject, globalFilterObject]
    });
    const data = await InvProductCategoryModel.find({
      $and: [filterObject, globalFilterObject]
    })
      .sort(sortOptions)
      .skip(start)
      .limit(size);
    //-- okay
    console.log(
      'API_listInvProdCategoriesTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json({
      data,
      meta: { totalRowCount }
    });
  } catch (e) {
    console.log('API_listInvProdCategoriesTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvProdCategory = asyncHandler(async (req, res) => {
  try {
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const { _id, category, prodName, note } = req.body;

    const prodCategory = await InvProductCategoryModel.findById(_id);
    if (!prodCategory) {
      console.log(
        'API_editInvProdCategory_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    prodCategory.category = category;
    prodCategory.prodName = prodName;
    prodCategory.note = note;
    await prodCategory.save();
    //-- okay
    console.log('API_editInvProdCategory_200:', 'Product category is updated');
    res.status(200).json(prodCategory);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log(
        'API_editInvProdCategory_400:',
        'Product category is duplicated'
      );
      res.status(400).json({
        msg: 'Product category is duplicated'
      });
    } else {
      console.log('API_editInvProdCategory_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const deleteInvProdCategory = asyncHandler(async (req, res) => {
  try {
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const { _id } = req.body;

    await InvProductCategoryModel.findOneAndRemove({ _id });
    //-- okay
    console.log(
      'API_deleteInvProdCategory_200:',
      'Product category is deleted'
    );
    res.status(200).send('Product category is deleted');
  } catch (e) {
    console.log('API_deleteInvProdCategory_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getInvProdCategories = asyncHandler(async (req, res) => {
  try {
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );

    const prodCategories = await InvProductCategoryModel.find(
      {},
      {
        category: 1,
        prodName: 1
      }
    );
    const categoryNames = prodCategories.map((item) => {
      return {
        id: item._id,
        value: `${item.category}-${item.prodName}`
      };
    });
    categoryNames.unshift({ id: '--', value: '--' });
    //-- okay
    console.log(
      'API_getInvProdCategories_200:',
      'Product categories are retrieved'
    );
    res.status(200).send(categoryNames);
  } catch (e) {
    console.log('API_getInvProdCategories_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addInvProdSubCategoryRack = asyncHandler(async (req, res) => {
  try {
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const { category, subCategoryRack, rackName, note } = req.body;

    if (category === '--') {
      console.log(
        'API_addInvProdSubCategoryRack_400:',
        'Product category is invalid'
      );
      return res.status(400).json({
        msg: 'Product category is invalid'
      });
    }
    const prodCategory = await InvProductCategoryModel.findById(category);
    if (!prodCategory) {
      console.log(
        'API_addInvProdSubCategoryRack_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    //-- create sub-category (rack)
    const prodSubCategoryRack = await InvProdSubCategoryRackModel.create({
      prodCategoryId: prodCategory._id,
      subCategoryRack,
      rackName,
      note
    });
    if (!prodSubCategoryRack) {
      console.log(
        'API_addInvProdSubCategoryRack_400:',
        'Failed to add product sub-category'
      );
      return res.status(400).json({
        msg: 'Failed to add product sub-category'
      });
    }
    //-- okay
    console.log(
      'API_addInvProdSubCategoryRack_200:',
      'Product sub-category is added'
    );
    res.status(200).send(prodSubCategoryRack);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log(
        'API_addInvProdSubCategoryRack_400:',
        'Product sub-category is duplicated'
      );
      res.status(400).json({
        msg: 'Product sub-category is duplicated'
      });
    } else {
      console.log('API_addInvProdSubCategoryRack_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const listInvProdSubCategoriesTable = asyncHandler(async (req, res) => {
  try {
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const {
      start = 0,
      size = 10,
      filters = '[]',
      sorting = '[]',
      globalFilter = ''
    } = req.body;

    const parsedColumnFilters = JSON.parse(filters);
    const filterObject = {};
    if (parsedColumnFilters?.length) {
      parsedColumnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        //-- consider filter combination
        if (columnId === 'categoryProdName') {
          filterObject['category'] = { $regex: filterValue, $options: 'i' };
          filterObject['prodName'] = { $regex: filterValue, $options: 'i' };
        } else if (columnId === 'subCategoryRackName') {
          filterObject['subCategoryRack'] = {
            $regex: filterValue,
            $options: 'i'
          };
          filterObject['rackName'] = { $regex: filterValue, $options: 'i' };
        } else {
          filterObject[columnId] = { $regex: filterValue, $options: 'i' };
        }
      });
    }
    const globalFilterObject = {};
    if (globalFilter) {
      const globalFilterRegex = new RegExp(globalFilter, 'i');
      globalFilterObject['$or'] = Object.values(
        InvProdSubCategoryRackModel?.schema?.obj
      )
        .map((key, index) => {
          // if (key?.type?.name === 'String' || key?.type?.name === 'Number') {
          if (key?.type?.name === 'String') {
            return {
              [Object.keys(InvProdSubCategoryRackModel?.schema?.obj)[index]]:
                globalFilterRegex
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }
    const parsedSorting = JSON.parse(sorting);
    const sortOptions = {};
    if (parsedSorting?.length) {
      const { id, desc } = parsedSorting[0];
      sortOptions[id] = desc ? -1 : 1;
    } else {
      sortOptions['createdAt'] = 1;
    }

    let aggregateQuery = [
      {
        $lookup: {
          from: 'invproductcategories',
          localField: 'prodCategoryId',
          foreignField: '_id',
          as: 'productCategory'
        }
      },
      {
        $addFields: {
          category: {
            $arrayElemAt: ['$productCategory.category', 0]
          },
          prodName: {
            $arrayElemAt: ['$productCategory.prodName', 0]
          }
        }
      },
      {
        $match: { $and: [filterObject, globalFilterObject] }
      },
      {
        $project: { productCategory: 0 }
      }
    ];
    const dataCount = await InvProdSubCategoryRackModel.aggregate(
      aggregateQuery
    );
    const totalRowCount = dataCount.length;
    aggregateQuery.push(
      { $sort: sortOptions },
      { $skip: start },
      { $limit: size }
    );
    const data = await InvProdSubCategoryRackModel.aggregate(aggregateQuery);
    //-- okay
    console.log(
      'API_listInvProdSubCategoriesTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json({
      data,
      meta: { totalRowCount }
    });
  } catch (e) {
    console.log('API_listInvProdSubCategoriesTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvProdSubCategoryRack = asyncHandler(async (req, res) => {
  try {
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const { _id, category, subCategoryRack, rackName, note } = req.body;

    if (category === '--') {
      console.log(
        'API_editInvProdSubCategoryRack_400:',
        'Product category is invalid'
      );
      return res.status(400).json({
        msg: 'Product category is invalid'
      });
    }
    const prodCategory = await InvProductCategoryModel.findById(category);
    if (!prodCategory) {
      console.log(
        'API_editInvProdSubCategoryRack_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    const subCategory = await InvProdSubCategoryRackModel.findById(_id);
    if (!subCategory) {
      console.log(
        'API_editInvProdSubCategoryRack_400:',
        'Failed to find product sub-category'
      );
      return res.status(400).json({
        msg: 'Failed to find product sub-category'
      });
    }
    subCategory.prodCategoryId = prodCategory._id;
    subCategory.subCategoryRack = subCategoryRack;
    subCategory.rackName = rackName;
    subCategory.note = note;
    await subCategory.save();
    //-- temporary attachment for table listing
    const resSubCategory = JSON.parse(JSON.stringify(subCategory));
    resSubCategory.category = prodCategory.category;
    resSubCategory.prodName = prodCategory.prodName;
    //-- okay
    console.log(
      'API_editInvProdSubCategoryRack_200:',
      'Product sub-category is updated'
    );
    res.status(200).json(resSubCategory);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log(
        'API_editInvProdSubCategoryRack_400:',
        'Product sub-category is duplicated'
      );
      res.status(400).json({
        msg: 'Product sub-category is duplicated'
      });
    } else {
      console.log('API_editInvProdSubCategoryRack_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const deleteInvProdSubCategoryRack = asyncHandler(async (req, res) => {
  try {
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const { _id } = req.body;

    await InvProdSubCategoryRackModel.findOneAndRemove({ _id });
    //-- okay
    console.log(
      'API_deleteInvProdSubCategoryRack_200:',
      'Product sub-category is deleted'
    );
    res.status(200).send('Product sub-category is deleted');
  } catch (e) {
    console.log('API_deleteInvProdSubCategoryRack_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getInvProdSubCategories = asyncHandler(async (req, res) => {
  try {
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );

    const categoryId = req.params?.categoryId;
    if (!categoryId) {
      console.log(
        'API_getInvProdSubCategories_400:',
        'Product category is invalid'
      );
      return res.status(400).json({
        msg: 'Product category is invalid'
      });
    }
    if (categoryId === '--') {
      console.log(
        'API_getInvProdSubCategories_200:',
        'Retrieves empty array for empty product category'
      );
      return res.status(200).send([{ id: '--', value: '--' }]);
    }
    const prodCategory = await InvProductCategoryModel.findById(categoryId);
    if (!prodCategory) {
      console.log(
        'API_getInvProdSubCategories_400:',
        'Failed to find product category by category ID param'
      );
      return res.status(400).json({
        msg: 'Failed to find product category by category ID param'
      });
    }
    const subProdCategories = await InvProdSubCategoryRackModel.find(
      { prodCategoryId: prodCategory._id },
      {
        subCategoryRack: 1,
        rackName: 1
      }
    );
    const subCategoryNames = subProdCategories.map((item) => {
      return {
        id: item._id,
        value: `${item.subCategoryRack}-${item.rackName}`
      };
    });
    subCategoryNames.unshift({ id: '--', value: '--' });
    //-- okay
    console.log(
      'API_getInvProdSubCategories_200:',
      'Product sub-categories are retrieved'
    );
    res.status(200).send(subCategoryNames);
  } catch (e) {
    console.log('API_getInvProdSubCategories_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addInvProductForMen = asyncHandler(async (req, res) => {
  try {
    const InvProductMenModel = dbInventoryConn.model(
      'InvProductMen',
      invProductMenSchema
    );
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);

    let {
      prodCategoryId,
      prodSubCategoryId,
      colorName,
      brandName,
      productImage,
      //-- size part
      sizeType,
      bestSizeFit,
      waistSizeNum,
      waistSizeLabel,
      shirtSizeNo,
      shirtSizeLabel,
      bottomSizeNo,
      inseamSizeNum,
      shoeSizeNum,
      shoeSizeLabel,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    const prodCategory = await InvProductCategoryModel.findById(prodCategoryId);
    if (!prodCategory) {
      console.log(
        'API_addInvProductForMen_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    const prodSubCategory = await InvProdSubCategoryRackModel.findById(
      prodSubCategoryId
    );
    if (!prodSubCategory) {
      console.log(
        'API_addInvProductForMen_400:',
        'Failed to find product sub-category'
      );
      return res.status(400).json({
        msg: 'Failed to find product sub-category'
      });
    }
    if (colorName && colorName !== '--') {
      const color = await InvColorModel.findOne({ name: colorName });
      if (!color) {
        console.log(
          'API_addInvProductForMen_400:',
          'Failed to find color name'
        );
        return res.status(400).json({
          msg: 'Failed to find color name'
        });
      }
    }
    if (brandName && brandName !== '--') {
      const brand = await BrandStaffModel.findOne({ brandName });
      if (!brand) {
        console.log(
          'API_addInvProductForMen_400:',
          'Failed to find brand name'
        );
        return res.status(400).json({
          msg: 'Failed to find brand name'
        });
      }
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = productImage || ''; //-- backup for local image removal below
    if (productImage) {
      if (
        productImage.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${productImage}`)) {
          console.log(
            'API_addInvProductForMen_400:',
            'Inventory product image file does not exist'
          );
          return res.status(400).json({
            msg: 'Inventory product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${productImage}`);
          const key = `inventory/invproducts/men/${productImage}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addInvProductForMen:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          productImage = s3Url;
        }
      }
    }
    let styleNo = 'M';
    styleNo += prodCategory.category.toUpperCase();
    styleNo += prodSubCategory.subCategoryRack.toUpperCase();
    let sizeSelected = '';
    switch (sizeType) {
      case '0':
        sizeSelected = 'Free Size';
        if (bestSizeFit) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[bestSizeFit]}`;
        }
        styleNo += '-F-';
        break;
      case '1':
        if (waistSizeNum) {
          sizeSelected = MEN_WAIST_SIZE_NUM_LIST[waistSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (waistSizeLabel) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[waistSizeLabel]}`;
        }
        break;
      case '2':
        if (shirtSizeNo) {
          sizeSelected = MEN_SHIRT_SIZE_NO_LIST[shirtSizeNo];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (shirtSizeLabel) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[shirtSizeLabel]}`;
        }
        break;
      case '3':
        if (inseamSizeNum) {
          sizeSelected = MEN_INSEAM_SIZE_LIST[inseamSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '4':
        if (bottomSizeNo) {
          sizeSelected = MEN_BOTTOM_SIZE_LIST[bottomSizeNo];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '5':
        if (shoeSizeNum) {
          sizeSelected = MEN_SHOE_SIZE_NUM_LIST[shoeSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (shoeSizeLabel) {
          sizeSelected += ` / ${MEN_SHOE_SIZE_LABEL_LIST[shoeSizeLabel]}`;
        }
        break;
      default:
        break;
    }
    const dataFields = {
      prodCategoryId,
      prodSubCategoryId,
      sizeType,
      bestSizeFit,
      waistSizeNum,
      waistSizeLabel,
      shirtSizeNo,
      shirtSizeLabel,
      bottomSizeNo,
      inseamSizeNum,
      shoeSizeNum,
      shoeSizeLabel,
      sizeSelected,
      ...rest
    };
    if (colorName && colorName !== '--') {
      Object.assign(dataFields, { colorName });
    }
    if (brandName && brandName !== '--') {
      Object.assign(dataFields, { brandName });
    }
    if (productImage) {
      Object.assign(dataFields, { productImage });
    }
    const invProduct = await InvProductMenModel.create(dataFields);
    if (!invProduct) {
      console.log(
        'API_addInvProductForMen_400:',
        'Failed to add inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to add inventory product'
      });
    }
    styleNo += `${invProduct._id}-`;
    invProduct.styleNo = styleNo;
    await invProduct.save();
    //-- remove uploaded temp image file after uploading to s3
    if (reqImgUrl) {
      if (
        reqImgUrl.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to remove
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    //-- okay
    console.log('API_addInvProductForMen_200:', 'Inventory product is added');
    res.status(200).send(invProduct);
  } catch (e) {
    console.log('API_addInvProductForMen_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addInvProductForWomen = asyncHandler(async (req, res) => {
  try {
    const InvProductWomenModel = dbInventoryConn.model(
      'InvProductWomen',
      invProductWomenSchema
    );
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);

    let {
      prodCategoryId,
      prodSubCategoryId,
      colorName,
      brandName,
      productImage,
      //-- size part
      sizeType,
      bestSizeFit,
      pantsSize,
      braSizeNum,
      braSizeLabel,
      skirtSize,
      jeansSize,
      activeWearSize,
      jacketSize,
      bottomSize,
      dressSizeNo,
      dressSizeLabel,
      shirtBlouseSizeNo,
      shirtBlouseSizeLabel,
      shoeSizeNum,
      heelHeightLabel,
      shoesStyleLabel,
      topSizeNo,
      topSizeLabel,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    const prodCategory = await InvProductCategoryModel.findById(prodCategoryId);
    if (!prodCategory) {
      console.log(
        'API_addInvProductForWomen_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    const prodSubCategory = await InvProdSubCategoryRackModel.findById(
      prodSubCategoryId
    );
    if (!prodSubCategory) {
      console.log(
        'API_addInvProductForWomen_400:',
        'Failed to find product sub-category'
      );
      return res.status(400).json({
        msg: 'Failed to find product sub-category'
      });
    }
    if (colorName && colorName !== '--') {
      const color = await InvColorModel.findOne({ name: colorName });
      if (!color) {
        console.log(
          'API_addInvProductForWomen_400:',
          'Failed to find color name'
        );
        return res.status(400).json({
          msg: 'Failed to find color name'
        });
      }
    }
    if (brandName && brandName !== '--') {
      const brand = await BrandStaffModel.findOne({ brandName });
      if (!brand) {
        console.log(
          'API_addInvProductForWomen_400:',
          'Failed to find brand name'
        );
        return res.status(400).json({
          msg: 'Failed to find brand name'
        });
      }
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = productImage || ''; //-- backup for local image removal below
    if (productImage) {
      if (
        productImage.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${productImage}`)) {
          console.log(
            'API_addInvProductForWomen_400:',
            'Inventory product image file does not exist'
          );
          return res.status(400).json({
            msg: 'Inventory product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${productImage}`);
          const key = `inventory/invproducts/women/${productImage}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addInvProductForWomen:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          productImage = s3Url;
        }
      }
    }
    let styleNo = 'W';
    styleNo += prodCategory.category.toUpperCase();
    styleNo += prodSubCategory.subCategoryRack.toUpperCase();
    let sizeSelected = '';
    switch (sizeType) {
      case '0':
        sizeSelected = 'Free Size';
        if (bestSizeFit) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[bestSizeFit]}`;
        }
        styleNo += '-F-';
        break;
      case '1':
        if (pantsSize) {
          sizeSelected = WOMEN_PANTS_SIZE_LIST[pantsSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '2':
        if (braSizeNum) {
          sizeSelected = WOMEN_BRA_SIZE_NUM_LIST[braSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (braSizeLabel) {
          sizeSelected += ` / ${WOMEN_BRA_SIZE_LABEL_LIST[braSizeLabel]}`;
        }
        break;
      case '3':
        if (skirtSize) {
          sizeSelected = WOMEN_SKIRT_SIZE_LIST[skirtSize];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '4':
        if (jeansSize) {
          sizeSelected = WOMEN_CASUAL_SIZE_LIST[jeansSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '5':
        if (activeWearSize) {
          sizeSelected = WOMEN_SIZE_ARMS_LIST[activeWearSize];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '6':
        if (jacketSize) {
          sizeSelected = WOMEN_JACKET_SIZE_LIST[jacketSize];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '7':
        if (bottomSize) {
          sizeSelected = WOMEN_BOTTOM_SIZE_LIST[bottomSize];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '8':
        if (dressSizeNo) {
          sizeSelected = WOMEN_CASUAL_SIZE_LIST[dressSizeNo].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (dressSizeLabel) {
          sizeSelected += ` / ${WOMEN_DRESS_SIZE_LABEL_LIST[dressSizeLabel].value}`;
        }
        break;
      case '9':
        if (shirtBlouseSizeNo) {
          sizeSelected = WOMEN_CASUAL_SIZE_LIST[shirtBlouseSizeNo].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (shirtBlouseSizeLabel) {
          sizeSelected += ` / ${WOMEN_SHIRT_BLOUSE_SIZE_LABEL_LIST[shirtBlouseSizeLabel].value}`;
        }
        break;
      case '10':
        if (shoeSizeNum) {
          sizeSelected = WOMEN_SHOE_SIZE_NUM_LIST[shoeSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (heelHeightLabel) {
          sizeSelected += ` / ${WOMEN_HEEL_HEIGHT_LABEL_LIST[heelHeightLabel]}`;
        }
        if (shoesStyleLabel) {
          sizeSelected += ` / ${WOMEN_SHOES_STYLE_LABEL_LIST[shoesStyleLabel]}`;
        }
        break;
      case '11':
        if (topSizeNo) {
          sizeSelected = WOMEN_TOP_SIZE_NO_LIST[topSizeNo];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (topSizeLabel) {
          sizeSelected += ` / ${WOMEN_TOP_SIZE_LABEL_LIST[topSizeLabel]}`;
        }
        break;
      default:
        break;
    }
    const dataFields = {
      prodCategoryId,
      prodSubCategoryId,
      sizeType,
      bestSizeFit,
      pantsSize,
      braSizeNum,
      braSizeLabel,
      skirtSize,
      jeansSize,
      activeWearSize,
      jacketSize,
      bottomSize,
      dressSizeNo,
      dressSizeLabel,
      shirtBlouseSizeNo,
      shirtBlouseSizeLabel,
      shoeSizeNum,
      heelHeightLabel,
      shoesStyleLabel,
      topSizeNo,
      topSizeLabel,
      sizeSelected,
      ...rest
    };
    if (colorName && colorName !== '--') {
      Object.assign(dataFields, { colorName });
    }
    if (brandName && brandName !== '--') {
      Object.assign(dataFields, { brandName });
    }
    if (productImage) {
      Object.assign(dataFields, { productImage });
    }
    const invProduct = await InvProductWomenModel.create(dataFields);
    if (!invProduct) {
      console.log(
        'API_addInvProductForWomen_400:',
        'Failed to add inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to add inventory product'
      });
    }
    styleNo += `${invProduct._id}-`;
    invProduct.styleNo = styleNo;
    await invProduct.save();
    //-- remove uploaded temp image file after uploading to s3
    if (reqImgUrl) {
      if (
        reqImgUrl.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to remove
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    //-- okay
    console.log('API_addInvProductForWomen_200:', 'Inventory product is added');
    res.status(200).send(invProduct);
  } catch (e) {
    console.log('API_addInvProductForWomen_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addInvProductForKids = asyncHandler(async (req, res) => {
  try {
    const InvProductKidModel = dbInventoryConn.model(
      'InvProductKid',
      invProductKidSchema
    );
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);

    let {
      prodCategoryId,
      prodSubCategoryId,
      colorName,
      brandName,
      productImage,
      //-- size part
      sizeType,
      bestSizeFit,
      topsSize,
      bottomsSize,
      shoeSize,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    const gender = req.params?.gender;
    const kidGenders = ['girl', 'boy'];
    if (!kidGenders.includes(gender)) {
      console.log(
        'API_addInvProductForKids_400:',
        'Kid gender param is invalid'
      );
      return res.status(400).json({
        msg: 'Kid gender param is invalid'
      });
    }
    const prodCategory = await InvProductCategoryModel.findById(prodCategoryId);
    if (!prodCategory) {
      console.log(
        'API_addInvProductForKids_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    const prodSubCategory = await InvProdSubCategoryRackModel.findById(
      prodSubCategoryId
    );
    if (!prodSubCategory) {
      console.log(
        'API_addInvProductForKids_400:',
        'Failed to find product sub-category'
      );
      return res.status(400).json({
        msg: 'Failed to find product sub-category'
      });
    }
    if (colorName && colorName !== '--') {
      const color = await InvColorModel.findOne({ name: colorName });
      if (!color) {
        console.log(
          'API_addInvProductForKids_400:',
          'Failed to find color name'
        );
        return res.status(400).json({
          msg: 'Failed to find color name'
        });
      }
    }
    if (brandName && brandName !== '--') {
      const brand = await BrandStaffModel.findOne({ brandName });
      if (!brand) {
        console.log(
          'API_addInvProductForKids_400:',
          'Failed to find brand name'
        );
        return res.status(400).json({
          msg: 'Failed to find brand name'
        });
      }
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = productImage || ''; //-- backup for local image removal below
    if (productImage) {
      if (
        productImage.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${productImage}`)) {
          console.log(
            'API_addInvProductForKids_400:',
            'Inventory product image file does not exist'
          );
          return res.status(400).json({
            msg: 'Inventory product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${productImage}`);
          const key = `inventory/invproducts/${gender}kids/${productImage}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addInvProductForKids:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          productImage = s3Url;
        }
      }
    }
    let styleNo = gender.charAt(0).toUpperCase();
    styleNo += prodCategory.category.toUpperCase();
    styleNo += prodSubCategory.subCategoryRack.toUpperCase();
    let sizeSelected = '';
    switch (sizeType) {
      case '0':
        sizeSelected = 'Free Size';
        if (bestSizeFit) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[bestSizeFit]}`;
        }
        styleNo += '-F-';
        break;
      case '1':
        if (topsSize) {
          sizeSelected = KID_CASUAL_SIZE_LIST[topsSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '2':
        if (bottomsSize) {
          sizeSelected = KID_CASUAL_SIZE_LIST[bottomsSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '3':
        if (shoeSize) {
          sizeSelected = KID_SHOE_SIZE_LIST[shoeSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      default:
        break;
    }
    const dataFields = {
      gender,
      prodCategoryId,
      prodSubCategoryId,
      sizeType,
      bestSizeFit,
      topsSize,
      bottomsSize,
      shoeSize,
      sizeSelected,
      ...rest
    };
    if (colorName && colorName !== '--') {
      Object.assign(dataFields, { colorName });
    }
    if (brandName && brandName !== '--') {
      Object.assign(dataFields, { brandName });
    }
    if (productImage) {
      Object.assign(dataFields, { productImage });
    }
    const invProduct = await InvProductKidModel.create(dataFields);
    if (!invProduct) {
      console.log(
        'API_addInvProductForKids_400:',
        'Failed to add inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to add inventory product'
      });
    }
    styleNo += `${invProduct._id}-`;
    invProduct.styleNo = styleNo;
    await invProduct.save();
    //-- remove uploaded temp image file after uploading to s3
    if (reqImgUrl) {
      if (
        reqImgUrl.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to remove
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    //-- okay
    console.log('API_addInvProductForKids_200:', 'Inventory product is added');
    res.status(200).send(invProduct);
  } catch (e) {
    console.log('API_addInvProductForKids_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listInvProductsTable = asyncHandler(async (req, res) => {
  try {
    const InvProductMenModel = dbInventoryConn.model(
      'InvProductMen',
      invProductMenSchema
    );
    const InvProductWomenModel = dbInventoryConn.model(
      'InvProductWomen',
      invProductWomenSchema
    );
    const InvProductKidModel = dbInventoryConn.model(
      'InvProductKid',
      invProductKidSchema
    );
    const {
      start = 0,
      size = 10,
      filters = '[]',
      sorting = '[]',
      globalFilter = '',
      profile,
      categoryId
    } = req.body;

    const profiles = ['men', 'women', 'boy', 'girl'];
    const kidProfiles = ['boy', 'girl'];
    if (!profiles.includes(profile)) {
      console.log('API_listInvProductsTable_400:', 'Profile is invalid');
      return res.status(400).json({
        msg: 'Profile is invalid'
      });
    }
    if (!categoryId) {
      console.log('API_listInvProductsTable_400:', 'Category is invalid');
      return res.status(400).json({
        msg: 'Category is invalid'
      });
    }
    let InvProductModel = null;
    switch (profile) {
      case 'men':
        InvProductModel = InvProductMenModel;
        break;
      case 'women':
        InvProductModel = InvProductWomenModel;
        break;
      default:
        InvProductModel = InvProductKidModel;
        break;
    }
    const parsedColumnFilters = JSON.parse(filters);
    const filterObject = {};
    if (parsedColumnFilters?.length) {
      parsedColumnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        filterObject[columnId] = { $regex: filterValue, $options: 'i' };
      });
    }
    if (kidProfiles.includes(profile)) {
      Object.assign(filterObject, {
        gender: profile
      });
    }
    if (categoryId !== '--') {
      Object.assign(filterObject, {
        prodCategoryId: categoryId
      });
    }
    const globalFilterObject = {};
    if (globalFilter) {
      const globalFilterRegex = new RegExp(globalFilter, 'i');
      globalFilterObject['$or'] = Object.values(InvProductModel?.schema?.obj)
        .map((key, index) => {
          // if (key?.type?.name === 'String' || key?.type?.name === 'Number') {
          if (key?.type?.name === 'String') {
            return {
              [Object.keys(InvProductModel?.schema?.obj)[index]]:
                globalFilterRegex
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }
    const parsedSorting = JSON.parse(sorting);
    const sortOptions = {};
    if (parsedSorting?.length) {
      const { id, desc } = parsedSorting[0];
      sortOptions[id] = desc ? -1 : 1;
    } else {
      sortOptions['createdAt'] = 1;
    }
    const totalRowCount = await InvProductModel.countDocuments({
      $and: [filterObject, globalFilterObject]
    });
    const data = await InvProductModel.find({
      $and: [filterObject, globalFilterObject]
    })
      .sort(sortOptions)
      .skip(start)
      .limit(size);
    //-- okay
    console.log(
      'API_listInvProductsTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json({
      data,
      meta: { totalRowCount }
    });
  } catch (e) {
    console.log('API_listInvProductsTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvProductForMen = asyncHandler(async (req, res) => {
  try {
    const InvProductMenModel = dbInventoryConn.model(
      'InvProductMen',
      invProductMenSchema
    );
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);

    let {
      _id,
      prodCategoryId,
      prodSubCategoryId,
      colorName,
      brandName,
      productImage,
      //-- size part
      sizeType,
      bestSizeFit,
      waistSizeNum,
      waistSizeLabel,
      shirtSizeNo,
      shirtSizeLabel,
      bottomSizeNo,
      inseamSizeNum,
      shoeSizeNum,
      shoeSizeLabel,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    const invProduct = await InvProductMenModel.findById(_id);
    if (!invProduct) {
      console.log(
        'API_editInvProductForMen_400:',
        'Failed to find inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to find inventory product'
      });
    }
    const prodCategory = await InvProductCategoryModel.findById(prodCategoryId);
    if (!prodCategory) {
      console.log(
        'API_editInvProductForMen_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    const prodSubCategory = await InvProdSubCategoryRackModel.findById(
      prodSubCategoryId
    );
    if (!prodSubCategory) {
      console.log(
        'API_editInvProductForMen_400:',
        'Failed to find product sub-category'
      );
      return res.status(400).json({
        msg: 'Failed to find product sub-category'
      });
    }
    if (colorName && colorName !== '--') {
      const color = await InvColorModel.findOne({ name: colorName });
      if (!color) {
        console.log(
          'API_editInvProductForMen_400:',
          'Failed to find color name'
        );
        return res.status(400).json({
          msg: 'Failed to find color name'
        });
      }
    }
    if (brandName && brandName !== '--') {
      const brand = await BrandStaffModel.findOne({ brandName });
      if (!brand) {
        console.log(
          'API_editInvProductForMen_400:',
          'Failed to find brand name'
        );
        return res.status(400).json({
          msg: 'Failed to find brand name'
        });
      }
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = productImage || ''; //-- backup for local image removal below
    if (productImage) {
      if (
        productImage.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${productImage}`)) {
          console.log(
            'API_editInvProductForMen_400:',
            'Inventory product image file does not exist'
          );
          return res.status(400).json({
            msg: 'Inventory product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${productImage}`);
          const key = `inventory/invproducts/men/${productImage}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_editInvProductForMen:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          productImage = s3Url;
        }
      }
    }
    let styleNo = 'M';
    styleNo += prodCategory.category.toUpperCase();
    styleNo += prodSubCategory.subCategoryRack.toUpperCase();
    let sizeSelected = '';
    switch (sizeType) {
      case '0':
        sizeSelected = 'Free Size';
        if (bestSizeFit) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[bestSizeFit]}`;
        }
        styleNo += '-F-';
        break;
      case '1':
        if (waistSizeNum) {
          sizeSelected = MEN_WAIST_SIZE_NUM_LIST[waistSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (waistSizeLabel) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[waistSizeLabel]}`;
        }
        break;
      case '2':
        if (shirtSizeNo) {
          sizeSelected = MEN_SHIRT_SIZE_NO_LIST[shirtSizeNo];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (shirtSizeLabel) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[shirtSizeLabel]}`;
        }
        break;
      case '3':
        if (inseamSizeNum) {
          sizeSelected = MEN_INSEAM_SIZE_LIST[inseamSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '4':
        if (bottomSizeNo) {
          sizeSelected = MEN_BOTTOM_SIZE_LIST[bottomSizeNo];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '5':
        if (shoeSizeNum) {
          sizeSelected = MEN_SHOE_SIZE_NUM_LIST[shoeSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (shoeSizeLabel) {
          sizeSelected += ` / ${MEN_SHOE_SIZE_LABEL_LIST[shoeSizeLabel]}`;
        }
        break;
      default:
        break;
    }
    styleNo += `${_id}-`;
    const dataFields = {
      prodCategoryId,
      prodSubCategoryId,
      sizeType,
      bestSizeFit,
      waistSizeNum,
      waistSizeLabel,
      shirtSizeNo,
      shirtSizeLabel,
      bottomSizeNo,
      inseamSizeNum,
      shoeSizeNum,
      shoeSizeLabel,
      sizeSelected,
      styleNo,
      ...rest
    };
    if (colorName && colorName !== '--') {
      Object.assign(dataFields, { colorName });
    }
    if (brandName && brandName !== '--') {
      Object.assign(dataFields, { brandName });
    }
    if (productImage) {
      Object.assign(dataFields, { productImage });
    }
    const invProductUpdate = await InvProductMenModel.findOneAndUpdate(
      { _id },
      { $set: dataFields }
    );
    if (!invProductUpdate) {
      console.log(
        'API_editInvProductForMen_400:',
        'Failed to edit inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to edit inventory product'
      });
    }
    //-- remove uploaded temp image file after uploading to s3
    if (reqImgUrl) {
      if (
        reqImgUrl.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to remove
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    //-- okay
    console.log(
      'API_editInvProductForMen_200:',
      'Inventory product is updated'
    );
    res.status(200).send(invProductUpdate);
  } catch (e) {
    console.log('API_editInvProductForMen_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvProductForWomen = asyncHandler(async (req, res) => {
  try {
    const InvProductWomenModel = dbInventoryConn.model(
      'InvProductWomen',
      invProductWomenSchema
    );
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);

    let {
      _id,
      prodCategoryId,
      prodSubCategoryId,
      colorName,
      brandName,
      productImage,
      //-- size part
      sizeType,
      bestSizeFit,
      pantsSize,
      braSizeNum,
      braSizeLabel,
      skirtSize,
      jeansSize,
      activeWearSize,
      jacketSize,
      bottomSize,
      dressSizeNo,
      dressSizeLabel,
      shirtBlouseSizeNo,
      shirtBlouseSizeLabel,
      shoeSizeNum,
      heelHeightLabel,
      shoesStyleLabel,
      topSizeNo,
      topSizeLabel,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    const invProduct = await InvProductWomenModel.findById(_id);
    if (!invProduct) {
      console.log(
        'API_editInvProductForWomen_400:',
        'Failed to find inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to find inventory product'
      });
    }
    const prodCategory = await InvProductCategoryModel.findById(prodCategoryId);
    if (!prodCategory) {
      console.log(
        'API_editInvProductForWomen_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    const prodSubCategory = await InvProdSubCategoryRackModel.findById(
      prodSubCategoryId
    );
    if (!prodSubCategory) {
      console.log(
        'API_editInvProductForWomen_400:',
        'Failed to find product sub-category'
      );
      return res.status(400).json({
        msg: 'Failed to find product sub-category'
      });
    }
    if (colorName && colorName !== '--') {
      const color = await InvColorModel.findOne({ name: colorName });
      if (!color) {
        console.log(
          'API_editInvProductForWomen_400:',
          'Failed to find color name'
        );
        return res.status(400).json({
          msg: 'Failed to find color name'
        });
      }
    }
    if (brandName && brandName !== '--') {
      const brand = await BrandStaffModel.findOne({ brandName });
      if (!brand) {
        console.log(
          'API_editInvProductForWomen_400:',
          'Failed to find brand name'
        );
        return res.status(400).json({
          msg: 'Failed to find brand name'
        });
      }
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = productImage || ''; //-- backup for local image removal below
    if (productImage) {
      if (
        productImage.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${productImage}`)) {
          console.log(
            'API_editInvProductForWomen_400:',
            'Inventory product image file does not exist'
          );
          return res.status(400).json({
            msg: 'Inventory product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${productImage}`);
          const key = `inventory/invproducts/women/${productImage}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_editInvProductForWomen:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          productImage = s3Url;
        }
      }
    }
    let styleNo = 'W';
    styleNo += prodCategory.category.toUpperCase();
    styleNo += prodSubCategory.subCategoryRack.toUpperCase();
    let sizeSelected = '';
    switch (sizeType) {
      case '0':
        sizeSelected = 'Free Size';
        if (bestSizeFit) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[bestSizeFit]}`;
        }
        styleNo += '-F-';
        break;
      case '1':
        if (pantsSize) {
          sizeSelected = WOMEN_PANTS_SIZE_LIST[pantsSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '2':
        if (braSizeNum) {
          sizeSelected = WOMEN_BRA_SIZE_NUM_LIST[braSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (braSizeLabel) {
          sizeSelected += ` / ${WOMEN_BRA_SIZE_LABEL_LIST[braSizeLabel]}`;
        }
        break;
      case '3':
        if (skirtSize) {
          sizeSelected = WOMEN_SKIRT_SIZE_LIST[skirtSize];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '4':
        if (jeansSize) {
          sizeSelected = WOMEN_CASUAL_SIZE_LIST[jeansSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '5':
        if (activeWearSize) {
          sizeSelected = WOMEN_SIZE_ARMS_LIST[activeWearSize];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '6':
        if (jacketSize) {
          sizeSelected = WOMEN_JACKET_SIZE_LIST[jacketSize];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '7':
        if (bottomSize) {
          sizeSelected = WOMEN_BOTTOM_SIZE_LIST[bottomSize];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '8':
        if (dressSizeNo) {
          sizeSelected = WOMEN_CASUAL_SIZE_LIST[dressSizeNo].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (dressSizeLabel) {
          sizeSelected += ` / ${WOMEN_DRESS_SIZE_LABEL_LIST[dressSizeLabel].value}`;
        }
        break;
      case '9':
        if (shirtBlouseSizeNo) {
          sizeSelected = WOMEN_CASUAL_SIZE_LIST[shirtBlouseSizeNo].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (shirtBlouseSizeLabel) {
          sizeSelected += ` / ${WOMEN_SHIRT_BLOUSE_SIZE_LABEL_LIST[shirtBlouseSizeLabel].value}`;
        }
        break;
      case '10':
        if (shoeSizeNum) {
          sizeSelected = WOMEN_SHOE_SIZE_NUM_LIST[shoeSizeNum];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (heelHeightLabel) {
          sizeSelected += ` / ${WOMEN_HEEL_HEIGHT_LABEL_LIST[heelHeightLabel]}`;
        }
        if (shoesStyleLabel) {
          sizeSelected += ` / ${WOMEN_SHOES_STYLE_LABEL_LIST[shoesStyleLabel]}`;
        }
        break;
      case '11':
        if (topSizeNo) {
          sizeSelected = WOMEN_TOP_SIZE_NO_LIST[topSizeNo];
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        if (topSizeLabel) {
          sizeSelected += ` / ${WOMEN_TOP_SIZE_LABEL_LIST[topSizeLabel]}`;
        }
        break;
      default:
        break;
    }
    styleNo += `${_id}-`;
    const dataFields = {
      prodCategoryId,
      prodSubCategoryId,
      sizeType,
      bestSizeFit,
      pantsSize,
      braSizeNum,
      braSizeLabel,
      skirtSize,
      jeansSize,
      activeWearSize,
      jacketSize,
      bottomSize,
      dressSizeNo,
      dressSizeLabel,
      shirtBlouseSizeNo,
      shirtBlouseSizeLabel,
      shoeSizeNum,
      heelHeightLabel,
      shoesStyleLabel,
      topSizeNo,
      topSizeLabel,
      sizeSelected,
      styleNo,
      ...rest
    };
    if (colorName && colorName !== '--') {
      Object.assign(dataFields, { colorName });
    }
    if (brandName && brandName !== '--') {
      Object.assign(dataFields, { brandName });
    }
    if (productImage) {
      Object.assign(dataFields, { productImage });
    }
    const invProductUpdate = await InvProductWomenModel.findOneAndUpdate(
      { _id },
      { $set: dataFields }
    );
    if (!invProductUpdate) {
      console.log(
        'API_editInvProductForWomen_400:',
        'Failed to edit inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to edit inventory product'
      });
    }
    //-- remove uploaded temp image file after uploading to s3
    if (reqImgUrl) {
      if (
        reqImgUrl.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to remove
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    //-- okay
    console.log(
      'API_editInvProductForWomen_200:',
      'Inventory product is updated'
    );
    res.status(200).send(invProductUpdate);
  } catch (e) {
    console.log('API_editInvProductForWomen_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvProductForKids = asyncHandler(async (req, res) => {
  try {
    const InvProductKidModel = dbInventoryConn.model(
      'InvProductKid',
      invProductKidSchema
    );
    const InvProductCategoryModel = dbInventoryConn.model(
      'InvProductCategory',
      invProductCategorySchema
    );
    const InvProdSubCategoryRackModel = dbInventoryConn.model(
      'InvProdSubCategoryRack',
      invProdSubCategoryRackSchema
    );
    const InvColorModel = dbInventoryConn.model('InvColor', invColorSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);

    let {
      _id,
      prodCategoryId,
      prodSubCategoryId,
      colorName,
      brandName,
      productImage,
      //-- size part
      sizeType,
      bestSizeFit,
      topsSize,
      bottomsSize,
      shoeSize,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    const invProduct = await InvProductKidModel.findById(_id);
    if (!invProduct) {
      console.log(
        'API_editInvProductForKids_400:',
        'Failed to find inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to find inventory product'
      });
    }
    const gender = req.params?.gender;
    const kidGenders = ['girl', 'boy'];
    if (!kidGenders.includes(gender) || invProduct.gender !== gender) {
      console.log(
        'API_editInvProductForKids_400:',
        'Kid gender param is invalid'
      );
      return res.status(400).json({
        msg: 'Kid gender param is invalid'
      });
    }
    const prodCategory = await InvProductCategoryModel.findById(prodCategoryId);
    if (!prodCategory) {
      console.log(
        'API_editInvProductForKids_400:',
        'Failed to find product category'
      );
      return res.status(400).json({
        msg: 'Failed to find product category'
      });
    }
    const prodSubCategory = await InvProdSubCategoryRackModel.findById(
      prodSubCategoryId
    );
    if (!prodSubCategory) {
      console.log(
        'API_editInvProductForKids_400:',
        'Failed to find product sub-category'
      );
      return res.status(400).json({
        msg: 'Failed to find product sub-category'
      });
    }
    if (colorName && colorName !== '--') {
      const color = await InvColorModel.findOne({ name: colorName });
      if (!color) {
        console.log(
          'API_editInvProductForKids_400:',
          'Failed to find color name'
        );
        return res.status(400).json({
          msg: 'Failed to find color name'
        });
      }
    }
    if (brandName && brandName !== '--') {
      const brand = await BrandStaffModel.findOne({ brandName });
      if (!brand) {
        console.log(
          'API_editInvProductForKids_400:',
          'Failed to find brand name'
        );
        return res.status(400).json({
          msg: 'Failed to find brand name'
        });
      }
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = productImage || ''; //-- backup for local image removal below
    if (productImage) {
      if (
        productImage.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${productImage}`)) {
          console.log(
            'API_editInvProductForKids_400:',
            'Inventory product image file does not exist'
          );
          return res.status(400).json({
            msg: 'Inventory product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${productImage}`);
          const key = `inventory/invproducts/${gender}kids/${productImage}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_editInvProductForKids:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          productImage = s3Url;
        }
      }
    }
    let styleNo = gender.charAt(0).toUpperCase();
    styleNo += prodCategory.category.toUpperCase();
    styleNo += prodSubCategory.subCategoryRack.toUpperCase();
    let sizeSelected = '';
    switch (sizeType) {
      case '0':
        sizeSelected = 'Free Size';
        if (bestSizeFit) {
          sizeSelected += ` / ${NORMAL_SIZE_FIT_LIST[bestSizeFit]}`;
        }
        styleNo += '-F-';
        break;
      case '1':
        if (topsSize) {
          sizeSelected = KID_CASUAL_SIZE_LIST[topsSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '2':
        if (bottomsSize) {
          sizeSelected = KID_CASUAL_SIZE_LIST[bottomsSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      case '3':
        if (shoeSize) {
          sizeSelected = KID_SHOE_SIZE_LIST[shoeSize].value;
          styleNo += `-${sizeSelected}-`;
        } else {
          styleNo += '-?-';
        }
        break;
      default:
        break;
    }
    styleNo += `${_id}-`;
    const dataFields = {
      prodCategoryId,
      prodSubCategoryId,
      sizeType,
      bestSizeFit,
      topsSize,
      bottomsSize,
      shoeSize,
      sizeSelected,
      styleNo,
      ...rest
    };
    if (colorName && colorName !== '--') {
      Object.assign(dataFields, { colorName });
    }
    if (brandName && brandName !== '--') {
      Object.assign(dataFields, { brandName });
    }
    if (productImage) {
      Object.assign(dataFields, { productImage });
    }
    const invProductUpdate = await InvProductKidModel.findOneAndUpdate(
      { _id },
      { $set: dataFields }
    );
    if (!invProductUpdate) {
      console.log(
        'API_editInvProductForKids_400:',
        'Failed to edit inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to edit inventory product'
      });
    }
    //-- remove uploaded temp image file after uploading to s3
    if (reqImgUrl) {
      if (
        reqImgUrl.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to remove
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    //-- okay
    console.log(
      'API_editInvProductForKids_200:',
      'Inventory product is updated'
    );
    res.status(200).send(invProductUpdate);
  } catch (e) {
    console.log('API_editInvProductForKids_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteInvProductForMen = asyncHandler(async (req, res) => {
  try {
    const InvProductMenModel = dbInventoryConn.model(
      'InvProductMen',
      invProductMenSchema
    );
    const { _id } = req.body;

    await InvProductMenModel.findOneAndRemove({ _id });
    //-- okay
    console.log(
      'API_deleteInvProductForMen_200:',
      'Inventory product is deleted'
    );
    res.status(200).send('Inventory product is deleted');
  } catch (e) {
    console.log('API_deleteInvProductForMen_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteInvProductForWomen = asyncHandler(async (req, res) => {
  try {
    const InvProductWomenModel = dbInventoryConn.model(
      'InvProductWomen',
      invProductWomenSchema
    );
    const { _id } = req.body;

    await InvProductWomenModel.findOneAndRemove({ _id });
    //-- okay
    console.log(
      'API_deleteInvProductForWomen_200:',
      'Inventory product is deleted'
    );
    res.status(200).send('Inventory product is deleted');
  } catch (e) {
    console.log('API_deleteInvProductForWomen_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteInvProductForKids = asyncHandler(async (req, res) => {
  try {
    const InvProductKidModel = dbInventoryConn.model(
      'InvProductKid',
      invProductKidSchema
    );
    const { _id } = req.body;

    await InvProductKidModel.findOneAndRemove({ _id });
    //-- okay
    console.log(
      'API_deleteInvProductForKids_200:',
      'Inventory product is deleted'
    );
    res.status(200).send('Inventory product is deleted');
  } catch (e) {
    console.log('API_deleteInvProductForKids_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleInvProductActiveForMen = asyncHandler(async (req, res) => {
  try {
    const InvProductMenModel = dbInventoryConn.model(
      'InvProductMen',
      invProductMenSchema
    );
    const { _id } = req.body;

    const invProduct = await InvProductMenModel.findById(_id);
    if (!invProduct) {
      console.log(
        'API_toggleInvProductActiveForMen_400:',
        'Failed to find inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to find inventory product'
      });
    }
    const status = invProduct.isActive;
    let message = '';
    let prefix = status === 0 ? '' : 'de';
    //-- toggle
    invProduct.isActive = status === 0 ? 1 : 0;
    invProduct.save();
    message = `Inventory product is ${prefix}activated`;
    //-- okay
    console.log('API_toggleInvProductActiveForMen_200:', message);
    res.status(200).send(message);
  } catch (e) {
    console.log('API_toggleInvProductActiveForMen_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleInvProductActiveForWomen = asyncHandler(async (req, res) => {
  try {
    const InvProductWomenModel = dbInventoryConn.model(
      'InvProductWomen',
      invProductWomenSchema
    );
    const { _id } = req.body;

    const invProduct = await InvProductWomenModel.findById(_id);
    if (!invProduct) {
      console.log(
        'API_toggleInvProductActiveForWomen_400:',
        'Failed to find inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to find inventory product'
      });
    }
    const status = invProduct.isActive;
    let message = '';
    let prefix = status === 0 ? '' : 'de';
    //-- toggle
    invProduct.isActive = status === 0 ? 1 : 0;
    invProduct.save();
    message = `Inventory product is ${prefix}activated`;
    //-- okay
    console.log('API_toggleInvProductActiveForWomen_200:', message);
    res.status(200).send(message);
  } catch (e) {
    console.log('API_toggleInvProductActiveForWomen_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleInvProductActiveForKids = asyncHandler(async (req, res) => {
  try {
    const InvProductKidModel = dbInventoryConn.model(
      'InvProductKid',
      invProductKidSchema
    );
    const { _id } = req.body;

    const invProduct = await InvProductKidModel.findById(_id);
    if (!invProduct) {
      console.log(
        'API_toggleInvProductActiveForKids_400:',
        'Failed to find inventory product'
      );
      return res.status(400).json({
        msg: 'Failed to find inventory product'
      });
    }
    const status = invProduct.isActive;
    let message = '';
    let prefix = status === 0 ? '' : 'de';
    //-- toggle
    invProduct.isActive = status === 0 ? 1 : 0;
    invProduct.save();
    message = `Inventory product is ${prefix}activated`;
    //-- okay
    console.log('API_toggleInvProductActiveForKids_200:', message);
    res.status(200).send(message);
  } catch (e) {
    console.log('API_toggleInvProductActiveForKids_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  addColor,
  listColorsTable,
  editColor,
  deleteColor,
  getColors,
  createBrandStaff,
  listBrandStaffTable,
  changeBrandStaffPwd,
  editBrandStaffInfo,
  deleteBrandStaff,
  toggleActiveBrandStaffStatus,
  countBrandStaff,
  getBrandNames,
  addInvProdCategory,
  listInvProdCategoriesTable,
  editInvProdCategory,
  deleteInvProdCategory,
  getInvProdCategories,
  addInvProdSubCategoryRack,
  listInvProdSubCategoriesTable,
  editInvProdSubCategoryRack,
  deleteInvProdSubCategoryRack,
  getInvProdSubCategories,
  addInvProductForMen,
  addInvProductForWomen,
  addInvProductForKids,
  listInvProductsTable,
  editInvProductForMen,
  editInvProductForWomen,
  editInvProductForKids,
  deleteInvProductForMen,
  deleteInvProductForWomen,
  deleteInvProductForKids,
  toggleInvProductActiveForMen,
  toggleInvProductActiveForWomen,
  toggleInvProductActiveForKids
};
