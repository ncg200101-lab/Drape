/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const supProdCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
      /**
       * Box, Tag, ... , Brochure
       */
    },
    isDefault: {
      type: Boolean,
      default: false // *
    }
  },
  {
    timestamps: true
  }
);

export default supProdCategorySchema;
