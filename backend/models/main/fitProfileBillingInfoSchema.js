/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const fitProfileBillingInfoSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    paymentMethod: {
      type: String
    },
    paymentIntent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default fitProfileBillingInfoSchema;
