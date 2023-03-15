/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const cmsBasicSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    slot: {
      type: String,
      required: true
      /**
       * `faq`
       * `who-we-are`
       * `our-mission`
       * etc.
       */
    },
    isDraft: {
      type: Boolean,
      default: false
    },
    draftTitle: {
      type: String
    },
    draftContent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default cmsBasicSchema;
