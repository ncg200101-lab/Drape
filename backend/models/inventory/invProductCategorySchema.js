/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const invProductCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true
    },
    prodName: {
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

export default invProductCategorySchema;
