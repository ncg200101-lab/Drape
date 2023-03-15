/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    link: {
      type: String
    },
    slot: {
      type: String,
      required: true
      /**
       * `facebook`
       * `twitter`
       * `instagram`
       * etc.
       */
    },
    sortOrder: {
      type: Number
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default socialMediaSchema;
