/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const invProductKidSchema = new mongoose.Schema(
  {
    userId: {
      type: String
      /**
       * ?
       */
    },
    gender: {
      type: String,
      enum: ['girl', 'boy'],
      required: true
    },
    prodCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvProductCategory',
      required: true
    },
    prodSubCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvProdSubCategoryRack',
      required: true
    },
    productName1: {
      type: String
    },
    productName2: {
      type: String
    },
    childHeightFt: {
      type: Number
    },
    childHeightIn: {
      type: Number
    },
    childWeight: {
      type: Number
    },
    colorName: {
      type: String
      /**
       * ref: invColorSchema
       */
    },
    sizeType: {
      type: String,
      required: true
      /**
       * '0', '1', etc.
       */
    },
    bestSizeFit: {
      type: Number
    },
    topsSize: {
      type: Number
    },
    bottomsSize: {
      type: Number
    },
    shoeSize: {
      type: Number
    },
    sizeSelected: {
      type: String
    },
    bodyShape: {
      type: Number
    },
    typeOfPrint: {
      type: Number
    },
    purchasePrice: {
      type: Number
    },
    salePrice: {
      type: Number
    },
    quantity: {
      type: Number
    },
    brandName: {
      type: String
      /**
       * ref: brandStaffSchema
       */
    },
    availableStatus: {
      type: Number
    },
    productImage: {
      type: String
    },
    note: {
      type: String
    },
    styleNo: {
      type: String
    },
    isActive: {
      type: Number,
      enum: [0, 1],
      default: 1
      /**
       * 1: active, 0: inactive
       */
    }
  },
  {
    timestamps: true
  }
);

export default invProductKidSchema;
