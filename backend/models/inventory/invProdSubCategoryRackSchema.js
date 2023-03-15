/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const invProdSubCategoryRackSchema = new mongoose.Schema(
  {
    prodCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvProductCategory',
      required: true
    },
    subCategoryRack: {
      type: String,
      required: true,
      unique: true
    },
    rackName: {
      type: String,
      required: true
    },
    note: {
      type: String
    },
    isActive: {
      type: Number,
      enum: [0, 1],
      default: 1
      /**
       * ?
       */
    }
  },
  {
    timestamps: true
  }
);

export default invProdSubCategoryRackSchema;
