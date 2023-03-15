/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const supProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    supProductImgUrl: {
      type: String
    },
    description: {
      type: String
    },
    quantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true
    },
    supplierName: {
      type: String,
      required: true
    },
    supplierAddress: {
      type: String,
      required: true
    },
    supplierEmail: {
      type: String,
      required: true
    },
    supplierPhone: {
      type: String,
      required: true
    },
    dynamicDeduct: {
      type: Number
      /**
       * conditional value
       */
    },
    currentStock: {
      type: Number,
      default: 0
    },
    usedAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default supProductSchema;
