/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
const { createHmac, createHash } = await import('node:crypto');
import converter from 'number-to-words';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import { format } from 'date-fns';

import { dbMainConn } from '../config/db.js';
import userSchema from '../models/main/userSchema.js';
import userSignTokenSchema from '../models/main/userSignTokenSchema.js';
import kidsSchema from '../models/main/kidsSchema.js';
import wFitProfileSchema from '../models/main/wFitProfileSchema.js';
import mFitProfileSchema from '../models/main/mFitProfileSchema.js';
import kgFitProfileSchema from '../models/main/kgFitProfileSchema.js';
import kbFitProfileSchema from '../models/main/kbFitProfileSchema.js';
import userLoginLogSchema from '../models/main/userLoginLogSchema.js';
import influencerSchema from '../models/main/influencerSchema.js';
import employeeSchema from '../models/main/employeeSchema.js';
import brandStaffSchema from '../models/main/brandStaffSchema.js';
import {
  chkEmailVeriToken,
  genUsername,
  isValidEmailVeriTokenTTL
} from '../utils/helper.js';
import { sendSesEmail } from '../libs/sendSesEmail.js';

const signupUser = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const UserModel = dbMainConn.model('User', userSchema);
    const UserSignTokenModel = dbMainConn.model(
      'UserSignToken',
      userSignTokenSchema
    );
    const KidsModel = dbMainConn.model('Kids', kidsSchema);

    const { firstName, lastName, email, password, fitFor } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      console.log('API_signupUser_403:', 'User already exists');
      return res.status(403).json({
        msg: 'User already exists'
      });
    }

    //-- create user
    const user = await UserModel.create({
      firstName,
      lastName,
      username: genUsername(firstName, lastName),
      email,
      password,
      fitFor,
      // emailVerified: process.env.NODE_ENV === 'development' ? true : false, // *
      emailVerified: true, //-- for the purpose of milestone testing!!!
      role: undefined //-- default would be applied
    });
    if (user) {
      if (user.fitFor === 2) {
        //-- create child together
        const firstChild = new KidsModel({
          parentId: user._id,
          kidOrder: 1,
          name: 'YOUR FIRST CHILD',
          gender: 0
        });
        await firstChild.save();
      }
      //-- create stripe customer
      try {
        const customer = await stripe.customers.create({
          name: `${firstName} ${lastName}`,
          email,
          description: `Register Drape Fit user [${firstName} ${lastName}] as a Stripe customer`
        });
        user.stripeCusId = customer.id;
        await user.save();
      } catch (err) {
        //-- remove insufficient user without payment info
        await UserModel.findByIdAndRemove(user._id);
        console.log('API_signupUser_400:', err);
        return res.status(400).json({
          msg: 'Failed to register user as a Stripe customer'
        });
      }

      //-- skip verify-email for development stage
      // if (process.env.NODE_ENV === 'development') {
      if (process.env.NODE_ENV) {
        //-- temporary measure for dev milestone testing!!!
        console.log('API_signupUser_200:', 'Please login to your account');
        return res.status(200).send('Please login to your account');
      }

      //-- create verify token
      const tnow = new Date().getTime();
      const hash = createHmac('sha256', process.env.JWT_SECRET)
        .update(`${firstName} ${lastName} - ${tnow}`)
        .digest('hex');
      const signToken = await UserSignTokenModel.create({
        userId: user._id,
        token: hash,
        tokenSetAt: new Date()
      });
      if (signToken) {
        //-- send verify email
        const msgHtml = `<h1>Hi, there!</h1>
          <p>Welcome to our Drape Fit Inc.</p>
          <p>Please use this token string to verify your email address:</p>
          <p>(※ Note that this token is valid only for 1 day.)</p><br>
          <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">${user._id}-${hash}</pre><br>
          <p>Thanks.</p>
          <p><small>The Support Team at Drape Fit Inc.</small></p>
          <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
        `;
        const msgTxt = `Hi, there!\n
          Welcome to our Drape Fit Inc.\n
          Please use this token string to verify your email address:\n
          (※ Note that this token is valid only for 1 day.)\n\n
          ${user._id}-${hash}\n\n
          Thanks.\n
          The Support Team at Drape Fit Inc.
        `;
        const emailSent = await sendSesEmail(
          email,
          process.env.DRAPEFIT_SVC_MAIL,
          'Notice on Email Verification - Drape Fit Inc.',
          msgHtml,
          msgTxt
        );
        if (emailSent && emailSent.message === 'Failed to send email') {
          //-- remove orphaned user & token
          await UserModel.findByIdAndRemove(user._id);
          await UserSignTokenModel.findByIdAndRemove(signToken._id);
          console.log('API_signupUser_400:', 'Failed to send verify-email');
          res.status(400).json({
            msg: 'Failed to send verify-email'
          });
        } else {
          //-- okay
          console.log(
            'API_signupUser_200:',
            'Please verify email that sent to your account'
          );
          res.status(200).send('Please verify email that sent to your account');
        }
      } else {
        console.log('API_signupUser_400:', 'Failed to make verify-token');
        res.status(400).json({
          msg: 'Failed to make verify-token'
        });
      }
    } else {
      console.log('API_signupUser_400:', 'Failed to create user');
      res.status(400).json({
        msg: 'Failed to create user'
      });
    }
  } catch (e) {
    console.log('API_signupUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const UserLoginLogModel = dbMainConn.model(
      'UserLoginLog',
      userLoginLogSchema
    );
    const EmployeeModel = dbMainConn.model('Employee', employeeSchema);
    const BrandStaffModel = dbMainConn.model('BrandStaff', brandStaffSchema);
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('API_loginUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('API_loginUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    if (user.emailVerified) {
      if (user.role > 102 && user.isActive === 0) {
        console.log(
          'API_loginUser_400:',
          'Your employee account is deactivated by admin'
        );
        return res.status(400).json({
          msg: 'Your employee account is deactivated by admin'
        });
      }
      const token = await user.newAuthToken();
      //-- leave login log
      const now = new Date();
      await UserLoginLogModel.create({
        userId: user._id,
        loginAt: now
      });
      if (user.role > 102) {
        const MyModel = user.role > 1000 ? BrandStaffModel : EmployeeModel;
        await MyModel.findOneAndUpdate(
          { userId: user._id },
          {
            $set: {
              lastLoginAt: format(now, 'yyyy-MM-dd HH:mm:ss')
            }
          }
        );
      }
      //-- okay
      console.log('API_loginUser_200:', 'okay');
      res.status(200).json({ token });
    } else {
      console.log('API_loginUser_403:', 'Email is not verified yet');
      res.status(403).json({
        msg: 'Email is not verified yet'
      });
    }
  } catch (e) {
    console.log('API_loginUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const WFitProfileModel = dbMainConn.model('WFitProfile', wFitProfileSchema);
    const MFitProfileModel = dbMainConn.model('MFitProfile', mFitProfileSchema);
    const KidsModel = dbMainConn.model('Kids', kidsSchema);
    const KgFitProfileModel = dbMainConn.model(
      'KgFitProfile',
      kgFitProfileSchema
    );
    const KbFitProfileModel = dbMainConn.model(
      'KbFitProfile',
      kbFitProfileSchema
    );

    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const user = await UserModel.findById(userId);
    if (user) {
      if (user.emailVerified) {
        //-- get fit profile's input status
        let pRoute = '';
        let pStatus = 0;
        const fitFor = user.fitFor;
        if (user.role === 100 || user.role === 101) {
          pRoute = '/dfadmin';
        } else if (user.role === 103) {
          pRoute = '/dfsupplier';
        } else if (user.role === 104) {
          pRoute = '/dfinventory';
        } else {
          if (fitFor === 2) {
            pRoute = '/select-gender';
          } else {
            const wORm = fitFor === 0 ? 'women' : 'men';
            const UserFitProfileModel =
              fitFor === 0 ? WFitProfileModel : MFitProfileModel;
            const userFP = await UserFitProfileModel.findOne({ userId });
            if (!userFP) {
              pRoute = `/welcome/basic-info/${wORm}`;
            } else {
              let statusArr = [];
              statusArr.push({
                label: `/welcome/basic-info/${wORm}`,
                value: userFP?.inputStatus?.basicInfo?.isComplete
              });
              statusArr.push({
                label: `/welcome/style-fit/${wORm}`,
                value: userFP?.inputStatus?.styleFit?.isComplete
              });
              statusArr.push({
                label: `/welcome/price-range/${wORm}`,
                value: userFP?.inputStatus?.priceRange?.isComplete
              });
              statusArr.push({
                label: `/welcome/style-custom/${wORm}`,
                value: userFP?.inputStatus?.customDsgnBrand?.isComplete
              });
              statusArr.push({
                label: `/welcome/schedule`,
                value: userFP?.inputStatus?.schedule?.isComplete
              });
              statusArr.push({
                label: `/welcome/addressbook`,
                value: userFP?.inputStatus?.shipAddress?.isComplete
              });
              statusArr.push({
                label: `/welcome/payment`,
                value: userFP?.inputStatus?.billingInfo?.isComplete
              });
              statusArr.every((item, index) => {
                if (item.value !== true) {
                  pRoute = item.label;
                  pStatus = index;
                  return false;
                }
                return true;
              });
              if (!pRoute) {
                pRoute = '/calendar-schedule';
                pStatus = 7;
              }
            }
          }
        }
        //-- get children info
        let kids = [];
        const myKids = await KidsModel.find({
          parentId: userId
        }).sort({ kidOrder: 1 });
        if (myKids && myKids.length) {
          for (const kid of myKids) {
            let kRoute = '';
            let kStatus = 0;
            let gender = kid.gender;
            if (gender === 0) {
              kRoute = '/welcome/basic-info/kids';
            } else {
              const gORb = gender === 1 ? 'girl' : 'boy';
              const KidFitProfileModel =
                gender === 1 ? KgFitProfileModel : KbFitProfileModel;
              const kidFP = await KidFitProfileModel.findOne({
                kidId: kid._id
              });
              if (!kidFP) {
                kRoute = '/welcome/basic-info/kids';
              } else {
                let statusArr = [];
                statusArr.push({
                  label: `/welcome/basic-info/kids`,
                  value: kidFP?.inputStatus?.basicInfo?.isComplete
                });
                statusArr.push({
                  label: `/welcome/style-fit/kids/${gORb}`,
                  value: kidFP?.inputStatus?.styleFit?.isComplete
                });
                statusArr.push({
                  label: `/welcome/price-range/kids/${gORb}`,
                  value: kidFP?.inputStatus?.priceRange?.isComplete
                });
                statusArr.push({
                  label: `/welcome/style-custom/kids/${gORb}`,
                  value: kidFP?.inputStatus?.customDsgnBrand?.isComplete
                });
                statusArr.push({
                  label: `/welcome/schedule`,
                  value: kidFP?.inputStatus?.schedule?.isComplete
                });
                statusArr.push({
                  label: `/welcome/addressbook`,
                  value: kidFP?.inputStatus?.shipAddress?.isComplete
                });
                statusArr.push({
                  label: `/welcome/payment`,
                  value: kidFP?.inputStatus?.billingInfo?.isComplete
                });
                statusArr.every((item, index) => {
                  if (item.value !== true) {
                    kRoute = item.label;
                    kStatus = index;
                    return false;
                  }
                  return true;
                });
                if (!kRoute) {
                  kRoute = '/calendar-schedule';
                  kStatus = 7;
                }
              }
            }
            kids.push({
              order: kid.kidOrder,
              name: kid.name,
              gender,
              isCheckoutPending: kid.isCheckoutPending, //-- later...
              kRoute,
              kStatus
            });
          }
        }
        //-- okay
        console.log('API_getUserInfo_200:', 'okay');
        res.status(200).json({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          fitFor: user.fitFor,
          isCheckoutPending: user.isCheckoutPending, //-- later...
          pRoute,
          pStatus,
          kids
        });
      } else {
        console.log('API_getUserInfo_403:', 'User is not verified yet');
        res.status(403).json({
          msg: 'User is not verified yet'
        });
      }
    } else {
      console.log('API_getUserInfo_404:', 'User not found');
      res.status(404).json({
        msg: 'User not found'
      });
    }
  } catch (e) {
    console.log('API_getUserInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const UserSignTokenModel = dbMainConn.model(
      'UserSignToken',
      userSignTokenSchema
    );
    const UserLoginLogModel = dbMainConn.model(
      'UserLoginLog',
      userLoginLogSchema
    );
    const { tokenStr } = req.body;

    if (!chkEmailVeriToken(tokenStr)) {
      console.log('API_verifyUser_400:', 'Invalid token string(0)');
      return res.status(400).json({
        msg: 'Invalid token string(0)'
      });
    }
    const _id = tokenStr.split('-')[0];
    const _token = tokenStr.split('-')[1];

    const user = await UserModel.findById(_id);
    if (!user) {
      console.log('API_verifyUser_400:', 'Invalid token string(1)');
      return res.status(400).json({
        msg: 'Invalid token string(1)'
      });
    }
    const signToken = await UserSignTokenModel.findOne({
      userId: user._id,
      token: _token
    });
    if (!signToken) {
      console.log('API_verifyUser_400:', 'Invalid token string(2)');
      return res.status(400).json({
        msg: 'Invalid token string(2)'
      });
    }

    if (isValidEmailVeriTokenTTL(signToken)) {
      await UserModel.updateOne({ _id: user._id }, { emailVerified: true });
      await UserSignTokenModel.findByIdAndRemove(signToken._id);

      const authToken = await user.newAuthToken();
      //-- leave login log
      await UserLoginLogModel.create({
        userId: user._id,
        loginAt: new Date()
      });
      //-- okay
      console.log('API_verifyUser_200:', 'okay');
      res.status(200).json({
        token: authToken
      });
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('API_verifyUser_400:', 'Expired token string');
        return res.status(400).json({
          msg: 'Expired token string'
        });
      }

      //-- renew TTL of expired token
      const tnow = new Date().getTime();
      const hashNew = createHmac('sha256', process.env.JWT_SECRET)
        .update(`${user.firstName} ${user.lastName} - ${tnow}`)
        .digest('hex');
      signToken.token = hashNew;
      signToken.tokenSetAt = new Date();
      await signToken.save();
      //-- send verify email again
      const msgHtml = `<h1>Hi, there!</h1>
        <p>Welcome to our Drape Fit Inc.</p>
        <p>Please use this renewed token string to verify your email address:</p>
        <p>(※ Note that this renewed token is valid only for 1 day.)</p><br>
        <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">${user._id}-${hashNew}</pre><br>
        <p>Thanks.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
      const msgTxt = `Hi, there!\n
        Welcome to our Drape Fit Inc.\n
        Please use this renewed token string to verify your email address:\n
        (※ Note that this renewed token is valid only for 1 day.)\n\n
        ${user._id}-${hashNew}\n\n
        Thanks.\n
        The Support Team at Drape Fit Inc.
      `;
      const emailSent = await sendSesEmail(
        user.email,
        process.env.DRAPEFIT_SVC_MAIL,
        'Notice on Email Verification - Drape Fit Inc.',
        msgHtml,
        msgTxt
      );
      if (emailSent && emailSent.message === 'Failed to send email') {
        //-- ignore email failure
        console.log('API_verifyUser_400:', 'Failed to verify user');
        res.status(400).json({
          msg: 'Failed to verify user'
        });
      } else {
        console.log(
          'API_verifyUser_498:',
          'Expired token string. Please verify email again for renewed token'
        );
        res.status(498).json({
          msg: 'Expired token string. Please verify email again for renewed token'
        });
      }
    }
  } catch (e) {
    console.log('API_verifyUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const handleForgotPwd = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log(
        'API_handleForgotPwd_403:',
        'There is no user with that email'
      );
      return res.status(403).json({
        msg: 'There is no user with that email'
      });
    }

    //-- generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    if (process.env.NODE_ENV === 'development') {
      console.log('API_handleForgotPwd_200:', 'Reset token is created');
      return res.status(200).send(resetToken);
    }

    //-- send token email
    try {
      const msgHtml = `<h2>Forgot your password?</h2>
        <p>No worries, we'll get you back on track.</p>
        <p>Please use this token string to reset your password:</p>
        <p>(※ Note that this token is valid only for 1 hour.)</p><br>
        <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">${resetToken}</pre><br>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
      const msgTxt = `Forgot your password?\n
        No worries, we'll get you back on track.\n
        Please use this token string to reset your password:\n
        (※ Note that this token is valid only for 1 hour.)\n\n
        ${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n
        The Support Team at Drape Fit Inc.
      `;
      const emailSent = await sendSesEmail(
        email,
        process.env.DRAPEFIT_SVC_MAIL,
        'Notice on Password Reset - Drape Fit Inc.',
        msgHtml,
        msgTxt
      );
      if (emailSent && emailSent.message === 'Failed to send email') {
        //-- ignore email failure
        console.log('API_handleForgotPwd_400:', 'Failed to send reset-email');
        res.status(400).json({
          msg: 'Failed to send reset-email'
        });
      } else {
        //-- okay
        console.log(
          'API_handleForgotPwd_200:',
          'Message with reset token sent to that email'
        );
        res.status(200).send('Message with reset token sent to that email');
      }
    } catch (err) {
      console.log(err);
      user.pwdResetToken = undefined;
      user.pwdResetExpiresAt = undefined;
      await user.save();
      console.log(
        'API_handleForgotPwd_400:',
        'Failed to handle request to reset'
      );
      res.status(400).json({
        msg: 'Failed to handle request to reset'
      });
    }
  } catch (e) {
    console.log('API_handleForgotPwd_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const resetUserPwd = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const { tokenStr, newPwd } = req.body;

    const hashedToken = createHash('sha256').update(tokenStr).digest('hex');
    //-- find user based on the token
    const user = await UserModel.findOne({
      pwdResetToken: hashedToken,
      pwdResetExpiresAt: { $gt: Date.now() }
    });
    if (!user) {
      console.log('API_resetUserPwd_400:', 'Token is invalid or has expired');
      return res.status(400).json({
        msg: 'Token is invalid or has expired'
      });
    }

    user.password = newPwd;
    user.pwdChangedAt = new Date();
    user.pwdResetToken = undefined;
    user.pwdResetExpiresAt = undefined;
    await user.save();
    //-- okay
    console.log('API_resetUserPwd_200:', 'Password has been reset');
    res.status(200).send('Password has been reset');
  } catch (e) {
    console.log('API_resetUserPwd_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editLoginDetails = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);

    //-- `req.user` was set in [authMdware.js]
    let user = await UserModel.findById(req.user._id);
    if (!user) {
      console.log('API_editLoginDetails_400:', 'Failed to find user');
      return res.status(400).json({
        msg: 'Failed to find user'
      });
    }
    const { firstName, lastName, currentPwd, newPwd, confirmPwd } = req.body;
    let editFields = {
      firstName,
      lastName,
      username: genUsername(firstName, lastName)
    };
    if (currentPwd) {
      if (newPwd === '' || confirmPwd === '') {
        console.log('API_editLoginDetails_400:', 'New Passwords are required');
        return res.status(400).json({
          msg: 'New Passwords are required'
        });
      } else if (newPwd !== confirmPwd) {
        console.log('API_editLoginDetails_400:', 'New Passwords do not match');
        return res.status(400).json({
          msg: 'New Passwords do not match'
        });
      }
      const isMatch = await bcrypt.compare(currentPwd, user.password);
      if (!isMatch) {
        console.log(
          'API_editLoginDetails_400:',
          'Current Password is incorrect'
        );
        return res.status(400).json({
          msg: 'Current Password is incorrect'
        });
      }
      Object.assign(editFields, {
        password: newPwd,
        pwdChangedAt: new Date()
      });
    }
    Object.assign(user, editFields);
    await user.save();
    //-- okay
    console.log('API_editLoginDetails_200:', 'Login Details have been updated');
    res.status(200).send('Login Details have been updated');
  } catch (e) {
    console.log('API_editLoginDetails_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const selectUserFit = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);

    //-- `req.user` was set in [authMdware.js]
    let user = await UserModel.findById(req.user._id);
    if (!user) {
      console.log('API_selectUserFit_400:', 'Failed to find user');
      return res.status(400).json({
        msg: 'Failed to find user'
      });
    }
    if (user.fitFor !== 2) {
      console.log('API_selectUserFit_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const { fitFor } = req.body;
    user.fitFor = fitFor;
    await user.save();
    //-- okay
    const result = fitFor === 0 ? 'women' : 'men';
    console.log('API_selectUserFit_200:', 'User FitFor has been updated');
    res.status(200).send(result);
  } catch (e) {
    console.log('API_selectUserFit_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` & `req.token` was set in [authMdware.js]
    req.user.tokens = req.user.tokens.filter((token) => {
      return token?.token !== req.token;
    });
    await req.user.save();
    //-- okay
    console.log('API_logoutUser_200:', 'User has been logged out');
    res.status(200).send('User has been logged out');
  } catch (e) {
    console.log('API_logoutUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const strictLogoutUser = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    req.user.tokens = [];
    await req.user.save();
    //-- okay
    console.log(
      'API_strictLogoutUser_200:',
      'User has been strictly logged out'
    );
    res.status(200).send('User has been strictly logged out');
  } catch (e) {
    console.log('API_strictLogoutUser_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addChild = asyncHandler(async (req, res) => {
  try {
    const KidsModel = dbMainConn.model('Kids', kidsSchema);

    //-- `req.user` was set in [authMdware.js]
    const userId = req.user._id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      let msg = 'Invalid access of mismatching child order';
      if (order > 4) {
        msg = 'You can add up to 4 children';
      }
      console.log('API_addChild_400:', msg);
      return res.status(400).json({ msg });
    }
    //-- check count of children for order correctness of child
    const kidCount = await KidsModel.countDocuments({
      parentId: userId
    });
    if (kidCount + 1 !== order) {
      console.log('API_addChild_400:', 'Incorrect order of child');
      return res.status(400).json({
        msg: 'Incorrect order of child'
      });
    }
    //-- add child
    const ordinal = converter.toWordsOrdinal(order).toUpperCase();
    const kidFields = {
      parentId: userId,
      kidOrder: order,
      name: `YOUR ${ordinal} CHILD`,
      gender: 0
    };
    //-- use upsert option (create new if no match is found)
    const kid = await KidsModel.findOneAndUpdate(
      {
        parentId: userId,
        kidOrder: order
      },
      { $set: kidFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!kid) {
      console.log('API_addChild_400:', 'Failed to add child');
      return res.status(400).json({
        msg: 'Failed to add child'
      });
    }
    //-- okay
    console.log('API_addChild_200:', `${ordinal} child is added`);
    res.status(200).send(ordinal);
  } catch (e) {
    console.log('API_addChild_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const confirmInfluencer = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const InfluencerModel = dbMainConn.model('Influencer', influencerSchema);

    const infId = req.params.arg.replace(/-/g, '');
    const influencer = await InfluencerModel.findById(infId);
    if (!influencer) {
      console.log(
        'API_confirmInfluencer_400:',
        'Failed to find influencer entity'
      );
      return res.status(400).send('Failed to confirm influencer registration');
    }
    const user = await UserModel.findById(influencer.userId);
    if (!user) {
      console.log('API_confirmInfluencer_400:', 'Failed to find user account');
      return res.status(400).send('Failed to confirm influencer registration');
    }
    //-- update confirmation
    influencer.isConfirmed = true;
    await influencer.save();
    user.isInfluencer = 1;
    await user.save();
    //-- okay
    console.log('API_confirmInfluencer_302:', 'okay');
    res.redirect('/confirm-influencer/success');
  } catch (e) {
    console.log('API_confirmInfluencer_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  signupUser,
  loginUser,
  getUserInfo,
  verifyUser,
  handleForgotPwd,
  resetUserPwd,
  editLoginDetails,
  selectUserFit,
  logoutUser,
  strictLogoutUser,
  addChild,
  confirmInfluencer
};
