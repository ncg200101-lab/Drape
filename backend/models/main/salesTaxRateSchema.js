/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const salesTaxRateSchema = new mongoose.Schema(
  {
    stateName: {
      type: String,
      required: true
    },
    taxRate: {
      type: Number,
      required: true
    },
    zipcodeMin: {
      type: String,
      required: true
    },
    zipcodeMax: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default salesTaxRateSchema;
