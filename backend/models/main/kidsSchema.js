/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const kidsSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    kidOrder: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1
      /**
       * 1st ~ 4th child
       * maximum number of kids is 4
       */
    },
    name: {
      type: String,
      required: true
    },
    gender: {
      type: Number,
      enmu: [0, 1, 2],
      default: 0
      /**
       * 0: undefined yet
       * 1: girl
       * 2: boy
       */
    },
    isCheckoutPending: {
      type: Boolean,
      default: false
      /**
       * Temporary field...
       */
    }
  },
  {
    timestamps: true
  }
);

export default kidsSchema;
