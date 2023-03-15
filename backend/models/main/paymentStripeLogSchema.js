/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const paymentStripeLogSchema = new mongoose.Schema(
  {
    customerEmail: {
      type: String,
      required: true
    },
    amount: {
      type: Number
    },
    paymentId: {
      type: String
    },
    paymentStatus: {
      type: String
    },
    transactedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default paymentStripeLogSchema;
