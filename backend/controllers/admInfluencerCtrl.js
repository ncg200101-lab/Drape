/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';

import { dbMainConn } from '../config/db.js';
import userSchema from '../models/main/userSchema.js';
import influencerSchema from '../models/main/influencerSchema.js';
import { genKebabCaseStr, listMRTableHandler } from '../utils/helper.js';
import { sendSesEmail } from '../libs/sendSesEmail.js';

const createInfluencer = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const InfluencerModel = dbMainConn.model('Influencer', influencerSchema);
    const { name, email, phone, note } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log(
        'API_createInfluencer_400:',
        'User with that email does not exist'
      );
      return res.status(400).json({
        msg: 'User with that email does not exist'
      });
    }
    if (user.role !== 102 || user.isInfluencer === 1) {
      console.log('API_createInfluencer_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const influencerExists = await InfluencerModel.findOne({ email });
    if (influencerExists) {
      console.log(
        'API_createInfluencer_400:',
        'Influencer entity already exists'
      );
      return res.status(400).json({
        msg: 'Influencer entity already exists'
      });
    }

    //-- create influencer
    const influencer = await InfluencerModel.create({
      userId: user._id,
      name,
      email,
      phone,
      note
    });
    if (!influencer) {
      console.log('API_createInfluencer_400:', 'Failed to create influencer');
      return res.status(400).json({
        msg: 'Failed to create influencer'
      });
    }
    const reglink = `http://${
      process.env.SERVER_DOMAIN
    }/dfnew/user/influencer/${genKebabCaseStr(influencer._id)}`;
    influencer.reglink = reglink;
    await influencer.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_createInfluencer_200:', 'Influencer is created');
      return res.status(200).send('Influencer is created');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your Drape Fit account has been registered as an influencer.</p>
      <p>Please use this link to confirm your registration:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">${reglink}</pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your Drape Fit account has been registered as an influencer.\n
      Please use this link to confirm your registration:\n\n
      ${reglink}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Influencer Registration - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      console.log(
        'API_createInfluencer_400:',
        'Influencer is created, but failed to send notify-email'
      );
      return res.status(400).json({
        msg: 'Influencer is created, but failed to send notify-email'
      });
    } else {
      //-- okay
      console.log(
        'API_createInfluencer_200:',
        'Influencer is created successfully'
      );
      res.status(200).send('Influencer is created successfully');
    }
  } catch (e) {
    console.log('API_createInfluencer_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listInfluencersTable = asyncHandler(async (req, res) => {
  try {
    const InfluencerModel = dbMainConn.model('Influencer', influencerSchema);

    const result = await listMRTableHandler(InfluencerModel, req.body);
    if (result === null) {
      console.log(
        'API_listInfluencersTable_400:',
        'Failed to get table list data'
      );
      return res.status(400).json({
        msg: 'Failed to get table list data'
      });
    }
    //-- okay
    console.log(
      'API_listInfluencersTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json(result);
  } catch (e) {
    console.log('API_listInfluencersTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInfluencerInfo = asyncHandler(async (req, res) => {
  try {
    const InfluencerModel = dbMainConn.model('Influencer', influencerSchema);
    const { _id, name, email, phone, note } = req.body;

    const influencer = await InfluencerModel.findById(_id);
    if (!influencer) {
      console.log('API_editInfluencerInfo_400:', 'Failed to find influencer');
      return res.status(400).json({
        msg: 'Failed to find influencer'
      });
    }
    if (influencer.email !== email) {
      console.log('API_editInfluencerInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    influencer.name = name;
    influencer.phone = phone;
    influencer.note = note;
    await influencer.save();
    //-- okay
    console.log('API_editInfluencerInfo_200:', 'Influencer info is updated');
    res.status(200).json(influencer);
  } catch (e) {
    console.log('API_editInfluencerInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteInfluencer = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const InfluencerModel = dbMainConn.model('Influencer', influencerSchema);
    const { _id } = req.body;

    const influencer = await InfluencerModel.findById(_id);
    if (!influencer) {
      console.log('API_deleteInfluencer_400:', 'Failed to find influencer');
      return res.status(400).json({
        msg: 'Failed to find influencer'
      });
    }
    const user = await UserModel.findById(influencer.userId);
    if (!user) {
      console.log('API_deleteInfluencer_400:', 'Failed to check user info');
      return res.status(400).json({
        msg: 'Failed to check user info'
      });
    }
    if (user.role !== 102) {
      console.log('API_deleteInfluencer_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- delete influencer entity
    await InfluencerModel.findOneAndRemove({ _id });
    //-- update user status
    user.isInfluencer = 0;
    await user.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_deleteInfluencer_200:', 'Influencer entity is deleted');
      return res.status(200).send('Influencer entity is deleted');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>The influencer membership for your Drape Fit account has been deleted by admin.</p>
      <p>Please contact us if there is any problem or inconvenience.</p>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      The influencer membership for your Drape Fit account has been deleted by admin.\n
      Please contact us if there is any problem or inconvenience.\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Influencer Membership Deletion - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure
      console.log(
        'API_deleteInfluencer_200:',
        'Influencer entity is deleted, but failed to send notify-email'
      );
    } else {
      //-- okay
      console.log('API_deleteInfluencer_200:', 'Influencer entity is deleted');
    }
    res.status(200).send('Influencer entity is deleted');
  } catch (e) {
    console.log('API_deleteInfluencer_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  createInfluencer,
  listInfluencersTable,
  editInfluencerInfo,
  deleteInfluencer
};
