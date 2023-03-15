/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const salesTaxOverStateSchema = new mongoose.Schema(
  {
    stateName: {
      type: String,
      required: true,
      unique: true
    },
    zipMin: {
      type: String
      /**
       * e.g. 00501
       */
    },
    zipMax: {
      type: String
      /**
       * e.g. 99950
       */
    },
    taxRate: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default salesTaxOverStateSchema;
