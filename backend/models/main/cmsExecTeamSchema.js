/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const cmsExecTeamSchema = new mongoose.Schema(
  {
    name: {
      type: String
      /**
       * e.g. Sukhendu Mukherjee
       */
    },
    position: {
      type: String
      /**
       * e.g. CEO & CO-FOUNDER
       */
    },
    posOrder: {
      type: Number,
      required: true
      /**
       * e.g.
       * 1: for `CEO & CO-FOUNDER`
       * 2: for `CIO & CO-FOUNDER`
       */
    },
    content: {
      type: String
    },
    isDraft: {
      type: Boolean,
      default: false
    },
    draftName: {
      type: String
    },
    draftPosition: {
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

export default cmsExecTeamSchema;
