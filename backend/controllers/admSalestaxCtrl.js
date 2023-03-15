/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';

import { dbMainConn } from '../config/db.js';
import salesTaxOverStateSchema from '../models/main/salesTaxOverStateSchema.js';
import { listMRTableHandler } from '../utils/helper.js';

const addStateSalesTax = asyncHandler(async (req, res) => {
  try {
    const SalesTaxOverStateModel = dbMainConn.model(
      'SalesTaxOverState',
      salesTaxOverStateSchema
    );
    const { zipMin, zipMax, ...rest } = req.body;

    if (parseInt(zipMax) < parseInt(zipMin)) {
      console.log('API_addStateSalesTax_400:', 'Invalid Zipcode Min & Max');
      return res.status(400).json({
        msg: 'Invalid Zipcode Min & Max'
      });
    }
    //-- create
    const salesTax = await SalesTaxOverStateModel.create({
      zipMin,
      zipMax,
      ...rest
    });
    if (!salesTax) {
      console.log(
        'API_addStateSalesTax_400:',
        'Failed to add sales tax over state'
      );
      return res.status(400).json({
        msg: 'Failed to add sales tax over state'
      });
    }
    //-- okay
    console.log('API_addStateSalesTax_200:', 'Sales tax is added');
    res.status(200).send(salesTax);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log('API_addStateSalesTax_400:', 'State name is duplicated');
      res.status(400).json({
        msg: 'State name is duplicated'
      });
    } else {
      console.log('API_addStateSalesTax_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const listStateSalesTaxTable = asyncHandler(async (req, res) => {
  try {
    const SalesTaxOverStateModel = dbMainConn.model(
      'SalesTaxOverState',
      salesTaxOverStateSchema
    );

    const result = await listMRTableHandler(SalesTaxOverStateModel, req.body);
    if (result === null) {
      console.log(
        'API_listStateSalesTaxTable_400:',
        'Failed to get table list data'
      );
      return res.status(400).json({
        msg: 'Failed to get table list data'
      });
    }
    //-- okay
    console.log(
      'API_listStateSalesTaxTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json(result);
  } catch (e) {
    console.log('API_listStateSalesTaxTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editStateSalesTax = asyncHandler(async (req, res) => {
  try {
    const SalesTaxOverStateModel = dbMainConn.model(
      'SalesTaxOverState',
      salesTaxOverStateSchema
    );
    const { _id, stateName, zipMin, zipMax, taxRate } = req.body;

    const salesTax = await SalesTaxOverStateModel.findById(_id);
    if (!salesTax) {
      console.log(
        'API_editStateSalesTax_400:',
        'Failed to find sales tax over state'
      );
      return res.status(400).json({
        msg: 'Failed to find sales tax over state'
      });
    }
    salesTax.stateName = stateName;
    salesTax.zipMin = zipMin;
    salesTax.zipMax = zipMax;
    salesTax.taxRate = taxRate;
    await salesTax.save();
    //-- okay
    console.log('API_editStateSalesTax_200:', 'Sales tax is updated');
    res.status(200).json(salesTax);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log('API_editStateSalesTax_400:', 'State name is duplicated');
      res.status(400).json({
        msg: 'State name is duplicated'
      });
    } else {
      console.log('API_editStateSalesTax_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const deleteStateSalesTax = asyncHandler(async (req, res) => {
  try {
    const SalesTaxOverStateModel = dbMainConn.model(
      'SalesTaxOverState',
      salesTaxOverStateSchema
    );
    const { _id } = req.body;

    await SalesTaxOverStateModel.findOneAndRemove({ _id });
    //-- okay
    console.log('API_deleteStateSalesTax_200:', 'Sales tax is deleted');
    res.status(200).send('Sales tax is deleted');
  } catch (e) {
    console.log('API_deleteStateSalesTax_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  addStateSalesTax,
  listStateSalesTaxTable,
  editStateSalesTax,
  deleteStateSalesTax
};
