/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';

import { dbMainConn } from '../config/db.js';
import userSchema from '../models/main/userSchema.js';
import employeeSchema from '../models/main/employeeSchema.js';
import { genUsername } from '../utils/helper.js';
import { sendSesEmail } from '../libs/sendSesEmail.js';

const createEmployee = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const UserModel = dbMainConn.model('User', userSchema);
    const EmployeeModel = dbMainConn.model('Employee', employeeSchema);
    const { name, email, password, phone, type, about, address } = req.body;

    const typesArr = ['Stylist', 'Inventory', 'QA', 'Support Guy'];
    let firstName = '';
    let lastName = '';
    const subNameArr = name.split(' ');
    if (subNameArr.length > 1) {
      firstName = subNameArr[0];
      lastName = subNameArr[1];
    } else {
      firstName = typesArr[type].split(' ')[0];
      lastName = name;
    }
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      console.log(
        'API_createEmployee_400:',
        'User with that email already exists'
      );
      return res.status(400).json({
        msg: 'User with that email already exists'
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
      role: type + 103
    });
    if (!user) {
      console.log(
        'API_createEmployee_400:',
        'Failed to create user account for employee'
      );
      return res.status(400).json({
        msg: 'Failed to create user account for employee'
      });
    }
    //-- create stripe customer (?)
    try {
      const customer = await stripe.customers.create({
        name,
        email,
        description: `Register Drape Fit employee [${name}] as a Stripe customer`
      });
      user.stripeCusId = customer.id;
      await user.save();
    } catch (err) {
      //-- remove insufficient user without payment info
      await UserModel.findByIdAndRemove(user._id);
      console.log('API_createEmployee_400:', err);
      return res.status(400).json({
        msg: 'Failed to register employee as a Stripe customer'
      });
    }
    //-- create employee entity
    const employee = await EmployeeModel.create({
      userId: user._id,
      name,
      email,
      phone,
      type,
      typeStr: typesArr[type],
      about,
      address
    });
    if (!employee) {
      //-- remove orphaned user account with no employee entity
      await UserModel.findByIdAndRemove(user._id);
      console.log('API_createEmployee_400:', 'Failed to create employee');
      return res.status(400).json({
        msg: 'Failed to create employee'
      });
    }

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_createEmployee_200:', 'Employee is created');
      return res.status(200).send('Employee is created');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>You have been registered as an employee of Drape Fit Inc. by admin.</p>
      <p>Please use the following credentials to login the Drape Fit service:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Email: ${email}<br>
      Password: ${password}<br>
      Role: ${typesArr[type]}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      You have been registered as an employee of Drape Fit Inc. by admin.\n
      Please use the following credentials to login the Drape Fit service:\n\n
      Email: ${email}\n
      Password: ${password}\n
      Role: ${typesArr[type]}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Employee Registration - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_createEmployee_200:',
        'Employee is created, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Employee is created, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log(
        'API_createEmployee_200:',
        'Employee is created successfully'
      );
      res.status(200).send('Employee is created successfully');
    }
  } catch (e) {
    console.log('API_createEmployee_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listEmployeesTable = asyncHandler(async (req, res) => {
  try {
    const EmployeeModel = dbMainConn.model('Employee', employeeSchema);
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
      globalFilterObject['$or'] = Object.values(EmployeeModel?.schema?.obj)
        .map((key, index) => {
          // if (key?.type?.name === 'String' || key?.type?.name === 'Number') {
          if (key?.type?.name === 'String') {
            return {
              [Object.keys(EmployeeModel?.schema?.obj)[index]]:
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
    const dataCount = await EmployeeModel.aggregate(aggregateQuery);
    const totalRowCount = dataCount.length;
    aggregateQuery.push(
      { $sort: sortOptions },
      { $skip: start },
      { $limit: size }
    );
    const data = await EmployeeModel.aggregate(aggregateQuery);
    //-- okay
    console.log('API_listEmployeesTable_200:', 'Table list data is retrieved');
    res.status(200).json({
      data,
      meta: { totalRowCount }
    });
  } catch (e) {
    console.log('API_listEmployeesTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changeEmployeePwd = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const EmployeeModel = dbMainConn.model('Employee', employeeSchema);
    const { _id, email, password } = req.body;

    const employee = await EmployeeModel.findById(_id);
    if (!employee) {
      console.log(
        'API_changeEmployeePwd_400:',
        'Failed to find employee entity'
      );
      return res.status(400).json({
        msg: 'Failed to find employee entity'
      });
    }
    if (employee.email !== email) {
      console.log('API_changeEmployeePwd_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const user = await UserModel.findById(employee?.userId);
    if (!user) {
      console.log(
        'API_changeEmployeePwd_400:',
        'Failed to find employee account'
      );
      return res.status(400).json({
        msg: 'Failed to find employee account'
      });
    }
    if (user.email !== email) {
      console.log('API_changeEmployeePwd_400:', 'Invalid API request');
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
      console.log('API_changeEmployeePwd_200:', 'Password is changed');
      return res.status(200).send('Password is changed');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your employee account password has been changed by admin.</p>
      <p>Please use the following password to login the Drape Fit service:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Password: ${password}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your employee account password has been changed by admin.\n
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
        'API_changeEmployeePwd_200:',
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
        'API_changeEmployeePwd_200:',
        'Password is changed successfully'
      );
      res.status(200).send('Password is changed successfully');
    }
  } catch (e) {
    console.log('API_changeEmployeePwd_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editEmployeeInfo = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const EmployeeModel = dbMainConn.model('Employee', employeeSchema);
    const { _id, name, email, phone, type, about, address } = req.body;

    const employee = await EmployeeModel.findById(_id);
    if (!employee) {
      console.log(
        'API_editEmployeeInfo_400:',
        'Failed to find employee entity'
      );
      return res.status(400).json({
        msg: 'Failed to find employee entity'
      });
    }
    if (employee.email !== email) {
      console.log('API_editEmployeeInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const user = await UserModel.findById(employee?.userId);
    if (!user) {
      console.log(
        'API_editEmployeeInfo_400:',
        'Failed to find employee account'
      );
      return res.status(400).json({
        msg: 'Failed to find employee account'
      });
    }
    if (user.email !== email) {
      console.log('API_editEmployeeInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }

    const typesArr = ['Stylist', 'Inventory', 'QA', 'Support Guy'];
    let firstName = '';
    let lastName = '';
    const subNameArr = name.split(' ');
    if (subNameArr.length > 1) {
      firstName = subNameArr[0];
      lastName = subNameArr[1];
    } else {
      firstName = typesArr[type].split(' ')[0];
      lastName = name;
    }
    //-- edit employee user account
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = genUsername(firstName, lastName);
    user.role = type + 103;
    await user.save();
    //-- edit employee info
    employee.name = name;
    employee.phone = phone;
    employee.type = type;
    employee.typeStr = typesArr[type];
    employee.about = about;
    employee.address = address;
    await employee.save();
    //-- temporary attachment for table listing
    const resEmployee = JSON.parse(JSON.stringify(employee));
    resEmployee.isActive = user.isActive;

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_editEmployeeInfo_200:', 'Employee info is updated');
      return res.status(200).json({
        msg: 'Employee info is updated',
        data: resEmployee
      });
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your employee account info has been updated by admin.</p>
      <p>Please confirm the following updates:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Name: ${name}<br>
      Phone: ${phone}<br>
      Role: ${typesArr[type]}<br>
      About: ${about}<br>
      Address: ${address}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your employee account info has been updated by admin.\n
      Please confirm the following updates:\n\n
      Name: ${name}\n
      Phone: ${phone}\n
      Role: ${typesArr[type]}\n
      About: ${about}\n
      Address: ${address}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Employee Info Update - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_editEmployeeInfo_200:',
        'Employee info is updated, but failed to send notify-email. Please check if email address is valid.'
      );
      res.status(200).json({
        msg: 'Employee info is updated, but failed to send notify-email. Please check if email address is valid.',
        data: resEmployee
      });
    } else {
      //-- okay
      console.log(
        'API_editEmployeeInfo_200:',
        'Employee info is updated successfully'
      );
      res.status(200).json({
        msg: 'Employee info is updated successfully',
        data: resEmployee
      });
    }
  } catch (e) {
    console.log('API_editEmployeeInfo_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const EmployeeModel = dbMainConn.model('Employee', employeeSchema);
    const { _id } = req.body;

    const employee = await EmployeeModel.findById(_id);
    if (!employee) {
      console.log('API_deleteEmployee_400:', 'Failed to find employee entity');
      return res.status(400).json({
        msg: 'Failed to find employee entity'
      });
    }
    const user = await UserModel.findById(employee?.userId);
    if (!user) {
      console.log('API_deleteEmployee_400:', 'Failed to find employee account');
      return res.status(400).json({
        msg: 'Failed to find employee account'
      });
    }
    if (employee.type + 103 !== user.role) {
      console.log('API_deleteEmployee_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- delete employee account
    await UserModel.findByIdAndRemove(user._id);
    //-- delete employee info
    await EmployeeModel.findByIdAndRemove(_id);

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_deleteEmployee_200:', 'Employee account is deleted');
      return res.status(200).send('Employee account is deleted');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your Drape Fit employee account has been deleted by admin.</p>
      <p>Please contact us if there is any problem or inconvenience.</p>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your Drape Fit employee account has been deleted by admin.\n
      Please contact us if there is any problem or inconvenience.\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Employee Account Deletion - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_deleteEmployee_200:',
        'Employee account is deleted, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Employee account is deleted, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log(
        'API_deleteEmployee_200:',
        'Employee account is deleted successfully'
      );
      res.status(200).send('Employee account is deleted successfully');
    }
  } catch (e) {
    console.log('API_deleteEmployee_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleActiveEmployeeStatus = asyncHandler(async (req, res) => {
  try {
    const UserModel = dbMainConn.model('User', userSchema);
    const EmployeeModel = dbMainConn.model('Employee', employeeSchema);
    const { _id } = req.body;

    const employee = await EmployeeModel.findById(_id);
    if (!employee) {
      console.log(
        'API_toggleActiveEmployeeStatus_400:',
        'Failed to find employee entity'
      );
      return res.status(400).json({
        msg: 'Failed to find employee entity'
      });
    }
    const user = await UserModel.findById(employee?.userId);
    if (!user) {
      console.log(
        'API_toggleActiveEmployeeStatus_400:',
        'Failed to find employee account'
      );
      return res.status(400).json({
        msg: 'Failed to find employee account'
      });
    }
    if (employee.type + 103 !== user.role) {
      console.log('API_toggleActiveEmployeeStatus_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
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
      message = `Employee account is ${prefix}activated`;
      console.log('API_toggleActiveEmployeeStatus_200:', message);
      return res.status(200).send(message);
    }

    //-- send notify-email
    message =
      status === 0
        ? 'You can now log in to the Drape Fit service.'
        : 'Unfortunately, you will not be able to log in to the Drape Fit service while deactivated.';
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your Drape Fit employee account has been ${prefix}activated by admin.</p>
      <p>${message}</p>
      <p>Please contact us if there is any problem or inconvenience.</p>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your Drape Fit employee account has been ${prefix}activated by admin.\n
      ${message}\n
      Please contact us if there is any problem or inconvenience.\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      user.email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Employee Account Activation - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      message = `Employee account is ${prefix}activated, but failed to send notify-email. Please check if email address is valid.`;
      console.log('API_toggleActiveEmployeeStatus_200:', message);
      res.status(200).send(message);
    } else {
      //-- okay
      message = `Employee account is ${prefix}activated successfully`;
      console.log('API_toggleActiveEmployeeStatus_200:', message);
      res.status(200).send(message);
    }
  } catch (e) {
    console.log('API_toggleActiveEmployeeStatus_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  createEmployee,
  listEmployeesTable,
  changeEmployeePwd,
  editEmployeeInfo,
  deleteEmployee,
  toggleActiveEmployeeStatus
};
