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
import validator from 'validator';

import { s3Client } from '../libs/s3Client.js';
import { dbSupplierConn } from '../config/db.js';
import supProdCategorySchema from '../models/supplier/supProdCategorySchema.js';
import supProductSchema from '../models/supplier/supProductSchema.js';
import supProductDeductSchema from '../models/supplier/supProductDeductSchema.js';
import {
  listMRTableHandler,
  compareStartAndEndDates
} from '../utils/helper.js';
import { DEFAULT_SUP_PRODUCT_CATEGORIES } from '../utils/constant.js';

const __dirname = path.resolve();

const addSupProdCategory = asyncHandler(async (req, res) => {
  try {
    const SupProdCategoryModel = dbSupplierConn.model(
      'SupProdCategory',
      supProdCategorySchema
    );
    const { name } = req.body;

    if (DEFAULT_SUP_PRODUCT_CATEGORIES.includes(name)) {
      const categoryExist = await SupProdCategoryModel.findOne({ name });
      if (categoryExist) {
        console.log(
          'API_addSupProdCategory_400:',
          'Default supplier product category already exists'
        );
        return res.status(400).json({
          msg: 'Default supplier product category already exists'
        });
      }
      const defaultCategory = await SupProdCategoryModel.create({
        name,
        isDefault: true // *
      });
      if (!defaultCategory) {
        console.log(
          'API_addSupProdCategory_400:',
          'Failed to add default supplier product category'
        );
        return res.status(400).json({
          msg: 'Failed to add default supplier product category'
        });
      }
      //-- okay
      console.log(
        'API_addSupProdCategory_200:',
        'Default supplier product category is added'
      );
      return res.status(200).send(defaultCategory);
    }
    //-- create custom category
    const customCategory = await SupProdCategoryModel.create({ name });
    if (!customCategory) {
      console.log(
        'API_addSupProdCategory_400:',
        'Failed to add supplier product category'
      );
      return res.status(400).json({
        msg: 'Failed to add supplier product category'
      });
    }
    //-- okay
    console.log(
      'API_addSupProdCategory_200:',
      'Custom supplier product category is added'
    );
    res.status(200).send(customCategory);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log(
        'API_addSupProdCategory_400:',
        'Name of supplier product category is duplicated'
      );
      res.status(400).json({
        msg: 'Name of supplier product category is duplicated'
      });
    } else {
      console.log('API_addSupProdCategory_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const listSupProdCategoriesTable = asyncHandler(async (req, res) => {
  try {
    const SupProdCategoryModel = dbSupplierConn.model(
      'SupProdCategory',
      supProdCategorySchema
    );

    const result = await listMRTableHandler(SupProdCategoryModel, req.body);
    if (result === null) {
      console.log(
        'API_listSupProdCategoriesTable_400:',
        'Failed to get table list data'
      );
      return res.status(400).json({
        msg: 'Failed to get table list data'
      });
    }
    //-- okay
    console.log(
      'API_listSupProdCategoriesTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json(result);
  } catch (e) {
    console.log('API_listSupProdCategoriesTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editSupProdCategory = asyncHandler(async (req, res) => {
  try {
    const SupProdCategoryModel = dbSupplierConn.model(
      'SupProdCategory',
      supProdCategorySchema
    );
    const { _id, name } = req.body;

    const category = await SupProdCategoryModel.findById(_id);
    if (!category) {
      console.log(
        'API_editSupProdCategory_400:',
        'Failed to find supplier product category'
      );
      return res.status(400).json({
        msg: 'Failed to find supplier product category'
      });
    }
    if (category.isDefault === true) {
      console.log(
        'API_editSupProdCategory_400:',
        'Default category cannot be modified'
      );
      return res.status(400).json({
        msg: 'Default category cannot be modified'
      });
    }
    category.name = name;
    await category.save();
    //-- okay
    console.log(
      'API_editSupProdCategory_200:',
      'Supplier product category is updated'
    );
    res.status(200).json(category);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log(
        'API_editSupProdCategory_400:',
        'Name of supplier product category is duplicated'
      );
      res.status(400).json({
        msg: 'Name of supplier product category is duplicated'
      });
    } else {
      console.log('API_editSupProdCategory_500:', e);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const deleteSupProdCategory = asyncHandler(async (req, res) => {
  try {
    const SupProdCategoryModel = dbSupplierConn.model(
      'SupProdCategory',
      supProdCategorySchema
    );
    const { _id } = req.body;

    const category = await SupProdCategoryModel.findById(_id);
    if (!category) {
      console.log(
        'API_deleteSupProdCategory_400:',
        'Failed to find supplier product category'
      );
      return res.status(400).json({
        msg: 'Failed to find supplier product category'
      });
    }
    if (category.isDefault === true) {
      console.log(
        'API_deleteSupProdCategory_400:',
        'Default category cannot be deleted'
      );
      return res.status(400).json({
        msg: 'Default category cannot be deleted'
      });
    }
    await SupProdCategoryModel.findOneAndRemove({ _id });
    //-- okay
    console.log(
      'API_deleteSupProdCategory_200:',
      'Supplier product category is deleted'
    );
    res.status(200).send('Supplier product category is deleted');
  } catch (e) {
    console.log('API_deleteSupProdCategory_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getSupProdCategories = asyncHandler(async (req, res) => {
  try {
    const SupProdCategoryModel = dbSupplierConn.model(
      'SupProdCategory',
      supProdCategorySchema
    );

    const categories = await SupProdCategoryModel.find().sort([
      ['isDefault', 'asc'],
      ['name', 'asc']
    ]);
    //-- okay
    console.log(
      'API_getSupProdCategories_200:',
      'Supplier product categories are retrieved'
    );
    res.status(200).send(categories);
  } catch (e) {
    console.log('API_getSupProdCategories_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addSupplierProduct = asyncHandler(async (req, res) => {
  try {
    const SupProductModel = dbSupplierConn.model(
      'SupProduct',
      supProductSchema
    );

    let {
      category,
      supProductImgUrl,
      quantity,
      dynamicDeduct,
      //-- spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    //-- conditional data validation
    if (DEFAULT_SUP_PRODUCT_CATEGORIES.includes(category)) {
      if (dynamicDeduct) {
        if (!validator.isInt(String(dynamicDeduct), { min: 1 })) {
          console.log(
            'API_addSupplierProduct_400:',
            'Dynamic deduct is invalid'
          );
          return res.status(400).json({
            msg: 'Dynamic deduct is invalid'
          });
        }
      }
    }
    //-- duplication check
    const supProductExist = await SupProductModel.findOne({ category });
    if (supProductExist) {
      console.log(
        'API_addSupplierProduct_400:',
        'Supplier product for the current category already exists'
      );
      return res.status(400).json({
        msg: 'Supplier product for the current category already exists'
      });
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = supProductImgUrl; //-- backup for local image removal below
    if (supProductImgUrl) {
      if (
        supProductImgUrl.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${supProductImgUrl}`)) {
          console.log(
            'API_addSupplierProduct_400:',
            'Supplier product image file does not exist'
          );
          return res.status(400).json({
            msg: 'Supplier product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${supProductImgUrl}`);
          const key = `supplier/supproducts/${supProductImgUrl}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addSupplierProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          supProductImgUrl = s3Url;
        }
      }
    }
    const dataFields = {
      category,
      supProductImgUrl,
      quantity,
      ...rest,
      currentStock: quantity
    };
    if (DEFAULT_SUP_PRODUCT_CATEGORIES.includes(category)) {
      if (dynamicDeduct && validator.isInt(String(dynamicDeduct), { min: 1 })) {
        Object.assign(dataFields, {
          dynamicDeduct: parseInt(dynamicDeduct)
        });
      }
    }
    const supProduct = await SupProductModel.create(dataFields);
    if (!supProduct) {
      console.log(
        'API_addSupplierProduct_400:',
        'Failed to add supplier product'
      );
      return res.status(400).json({
        msg: 'Failed to add supplier product'
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
    console.log('API_addSupplierProduct_200:', 'Supplier product is added');
    res.status(200).send(supProduct);
  } catch (e) {
    console.log('API_addSupplierProduct_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listSupProductsTable = asyncHandler(async (req, res) => {
  try {
    const SupProductModel = dbSupplierConn.model(
      'SupProduct',
      supProductSchema
    );

    const result = await listMRTableHandler(SupProductModel, req.body);
    if (result === null) {
      console.log(
        'API_listSupProductsTable_400:',
        'Failed to get table list data'
      );
      return res.status(400).json({
        msg: 'Failed to get table list data'
      });
    }
    //-- okay
    console.log(
      'API_listSupProductsTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json(result);
  } catch (e) {
    console.log('API_listSupProductsTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addMoreSupProductStock = asyncHandler(async (req, res) => {
  try {
    const SupProductModel = dbSupplierConn.model(
      'SupProduct',
      supProductSchema
    );
    const { _id, count } = req.body;

    const supProduct = await SupProductModel.findById(_id);
    if (!supProduct) {
      console.log(
        'API_addMoreSupProductStock_400:',
        'Failed to find supplier product'
      );
      return res.status(400).json({
        msg: 'Failed to find supplier product'
      });
    }
    supProduct.quantity += count;
    supProduct.currentStock += count;
    await supProduct.save();
    //-- okay
    console.log(
      'API_addMoreSupProductStock_200:',
      'Added more stock to supplier products'
    );
    res.status(200).json(supProduct);
  } catch (e) {
    console.log('API_addMoreSupProductStock_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const manualDeductSupProductStock = asyncHandler(async (req, res) => {
  try {
    const SupProductModel = dbSupplierConn.model(
      'SupProduct',
      supProductSchema
    );
    const { _id, count } = req.body;

    const supProduct = await SupProductModel.findById(_id);
    if (!supProduct) {
      console.log(
        'API_manualDeductSupProductStock_400:',
        'Failed to find supplier product'
      );
      return res.status(400).json({
        msg: 'Failed to find supplier product'
      });
    }
    if (supProduct.currentStock < count) {
      console.log(
        'API_manualDeductSupProductStock_400:',
        'Deduct count cannot be greater than current in-stock'
      );
      return res.status(400).json({
        msg: 'Deduct count cannot be greater than current in-stock'
      });
    }
    supProduct.currentStock -= count;
    supProduct.usedAmount += count;
    await supProduct.save();
    //-- okay
    console.log(
      'API_manualDeductSupProductStock_200:',
      'Deducted stock manually from supplier products'
    );
    res.status(200).json(supProduct);
  } catch (e) {
    console.log('API_manualDeductSupProductStock_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editSupplierProduct = asyncHandler(async (req, res) => {
  try {
    const SupProductModel = dbSupplierConn.model(
      'SupProduct',
      supProductSchema
    );
    let {
      _id,
      name,
      supProductImgUrl,
      description,
      price,
      supplierName,
      supplierAddress,
      supplierEmail,
      supplierPhone,
      currentStock,
      dynamicDeduct
    } = req.body;

    const supProduct = await SupProductModel.findById(_id);
    if (!supProduct) {
      console.log(
        'API_editSupplierProduct_400:',
        'Failed to find supplier product'
      );
      return res.status(400).json({
        msg: 'Failed to find supplier product'
      });
    }
    //-- conditional data validation
    if (DEFAULT_SUP_PRODUCT_CATEGORIES.includes(supProduct.category)) {
      if (dynamicDeduct) {
        if (!validator.isInt(String(dynamicDeduct), { min: 1 })) {
          console.log(
            'API_editSupplierProduct_400:',
            'Dynamic deduct is invalid'
          );
          return res.status(400).json({
            msg: 'Dynamic deduct is invalid'
          });
        }
      }
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = supProductImgUrl; //-- backup for local image removal below
    if (supProductImgUrl) {
      if (
        supProductImgUrl.includes(
          `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )
      ) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${supProductImgUrl}`)) {
          console.log(
            'API_editSupplierProduct_400:',
            'Supplier product image file does not exist'
          );
          return res.status(400).json({
            msg: 'Supplier product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${supProductImgUrl}`);
          const key = `supplier/supproducts/${supProductImgUrl}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_editSupplierProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          supProductImgUrl = s3Url;
        }
      }
    }
    supProduct.name = name;
    supProduct.supProductImgUrl = supProductImgUrl;
    supProduct.description = description;
    supProduct.price = price;
    supProduct.supplierName = supplierName;
    supProduct.supplierAddress = supplierAddress;
    supProduct.supplierEmail = supplierEmail;
    supProduct.supplierPhone = supplierPhone;
    supProduct.currentStock = currentStock;
    supProduct.quantity = supProduct.usedAmount + currentStock;
    if (DEFAULT_SUP_PRODUCT_CATEGORIES.includes(supProduct.category)) {
      if (dynamicDeduct && validator.isInt(String(dynamicDeduct), { min: 1 })) {
        supProduct.dynamicDeduct = parseInt(dynamicDeduct);
      }
    }
    await supProduct.save();
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
    console.log('API_editSupplierProduct_200:', 'Supplier product is updated');
    res.status(200).json(supProduct);
  } catch (e) {
    console.log('API_editSupplierProduct_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteSupplierProduct = asyncHandler(async (req, res) => {
  try {
    const SupProductModel = dbSupplierConn.model(
      'SupProduct',
      supProductSchema
    );
    const { _id } = req.body;

    await SupProductModel.findOneAndRemove({ _id });
    //-- okay
    console.log(
      'API_deleteSupplierProduct_200:',
      'Supplier product is deleted'
    );
    res.status(200).send('Supplier product is deleted');
  } catch (e) {
    console.log('API_deleteSupplierProduct_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listSupProductDeductDetailsTable = asyncHandler(async (req, res) => {
  try {
    const SupProductDeductModel = dbSupplierConn.model(
      'SupProductDeduct',
      supProductDeductSchema
    );
    const {
      start = 0,
      size = 10,
      filters = '[]',
      sorting = '[]',
      globalFilter = ''
    } = req.body;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.log(
        'API_listSupProductDeductDetailsTable_400:',
        'Invalid date format'
      );
      return res.status(400).json({
        msg: 'Invalid date format'
      });
    } else if (!compareStartAndEndDates(startDate, endDate)) {
      console.log(
        'API_listSupProductDeductDetailsTable_400:',
        'Date range selection is invalid'
      );
      return res.status(400).json({
        msg: 'Date range selection is invalid'
      });
    }

    //-- generate date range variables
    const startY = startDate.getFullYear();
    const startM = startDate.getMonth();
    const startD = startDate.getDate();
    const endY = endDate.getFullYear();
    const endM = endDate.getMonth();
    const endD = endDate.getDate();

    const parsedColumnFilters = JSON.parse(filters);
    const filterObject = {};
    if (parsedColumnFilters?.length) {
      parsedColumnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        filterObject[columnId] = { $regex: filterValue, $options: 'i' };
      });
    }
    Object.assign(filterObject, {
      createdAt: {
        $gte: new Date(startY, startM, startD),
        $lt: new Date(endY, endM, endD + 1)
      }
    });
    const globalFilterObject = {};
    if (globalFilter) {
      const globalFilterRegex = new RegExp(globalFilter, 'i');
      globalFilterObject['$or'] = Object.values(
        SupProductDeductModel?.schema?.obj
      )
        .map((key, index) => {
          // if (key?.type?.name === 'String' || key?.type?.name === 'Number') {
          if (key?.type?.name === 'String') {
            return {
              [Object.keys(SupProductDeductModel?.schema?.obj)[index]]:
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
          from: 'supproducts',
          localField: 'supProductId',
          foreignField: '_id',
          as: 'productName'
        }
      },
      {
        $addFields: {
          name: {
            $arrayElemAt: ['$productName.name', 0]
          }
        }
      },
      {
        $match: { $and: [filterObject, globalFilterObject] }
      },
      {
        $project: { productName: 0 }
      }
    ];
    const dataCount = await SupProductDeductModel.aggregate(aggregateQuery);
    const totalRowCount = dataCount.length;
    aggregateQuery.push(
      { $sort: sortOptions },
      { $skip: start },
      { $limit: size }
    );
    const data = await SupProductDeductModel.aggregate(aggregateQuery);
    //-- okay
    console.log(
      'API_listSupProductDeductDetailsTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json({
      data,
      meta: { totalRowCount }
    });
  } catch (e) {
    console.log('API_listSupProductDeductDetailsTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listSupProductDeductSummaryTable = asyncHandler(async (req, res) => {
  try {
    const SupProductDeductModel = dbSupplierConn.model(
      'SupProductDeduct',
      supProductDeductSchema
    );
    const {
      start = 0,
      size = 10,
      filters = '[]',
      sorting = '[]', //-- no need here!
      globalFilter = ''
    } = req.body;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.log(
        'API_listSupProductDeductSummaryTable_400:',
        'Invalid date format'
      );
      return res.status(400).json({
        msg: 'Invalid date format'
      });
    } else if (!compareStartAndEndDates(startDate, endDate)) {
      console.log(
        'API_listSupProductDeductSummaryTable_400:',
        'Date range selection is invalid'
      );
      return res.status(400).json({
        msg: 'Date range selection is invalid'
      });
    }

    //-- generate date range variables
    const startY = startDate.getFullYear();
    const startM = startDate.getMonth();
    const startD = startDate.getDate();
    const endY = endDate.getFullYear();
    const endM = endDate.getMonth();
    const endD = endDate.getDate();

    const parsedColumnFilters = JSON.parse(filters);
    const filterObject = {};
    if (parsedColumnFilters?.length) {
      parsedColumnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        filterObject[columnId] = { $regex: filterValue, $options: 'i' };
      });
    }
    Object.assign(filterObject, {
      createdAt: {
        $gte: new Date(startY, startM, startD),
        $lt: new Date(endY, endM, endD + 1)
      }
    });
    const globalFilterObject = {};
    if (globalFilter) {
      const globalFilterRegex = new RegExp(globalFilter, 'i');
      globalFilterObject['$or'] = Object.values(
        SupProductDeductModel?.schema?.obj
      )
        .map((key, index) => {
          // if (key?.type?.name === 'String' || key?.type?.name === 'Number') {
          if (key?.type?.name === 'String') {
            return {
              [Object.keys(SupProductDeductModel?.schema?.obj)[index]]:
                globalFilterRegex
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }

    let aggregateQuery = [
      {
        $lookup: {
          from: 'supproducts',
          localField: 'supProductId',
          foreignField: '_id',
          as: 'productName'
        }
      },
      {
        $addFields: {
          name: {
            $arrayElemAt: ['$productName.name', 0]
          }
        }
      },
      {
        $match: { $and: [filterObject, globalFilterObject] }
      },
      {
        $project: { productName: 0 }
      },
      {
        $group: {
          _id: '$supProductId',
          name: '$name',
          totalQuantity: { $sum: '$quantity' }
        }
      }
    ];
    const dataCount = await SupProductDeductModel.aggregate(aggregateQuery);
    const totalRowCount = dataCount.length;
    aggregateQuery.push({ $skip: start }, { $limit: size });
    const data = await SupProductDeductModel.aggregate(aggregateQuery);
    //-- okay
    console.log(
      'API_listSupProductDeductSummaryTable_200:',
      'Table list data is retrieved'
    );
    res.status(200).json({
      data,
      meta: { totalRowCount }
    });
  } catch (e) {
    console.log('API_listSupProductDeductSummaryTable_500:', e);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  addSupProdCategory,
  listSupProdCategoriesTable,
  editSupProdCategory,
  deleteSupProdCategory,
  getSupProdCategories,
  addSupplierProduct,
  listSupProductsTable,
  addMoreSupProductStock,
  manualDeductSupProductStock,
  editSupplierProduct,
  deleteSupplierProduct,
  listSupProductDeductDetailsTable,
  listSupProductDeductSummaryTable
};
