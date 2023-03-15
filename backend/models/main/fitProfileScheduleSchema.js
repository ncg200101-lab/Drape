/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const fitProfileScheduleSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    deliveryMode: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: every monthly
       * 1: every 2 month
       * 2: every 3 month
       */
    },
    deliveryDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default fitProfileScheduleSchema;
