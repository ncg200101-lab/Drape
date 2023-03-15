/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const paymentCardDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cardName: {
      type: String,
      required: true
    },
    cardType: {
      type: String,
      required: true
      /**
       * e.g. Visa, Amex, MasterCard, etc.
       */
    },
    cardNumber: {
      type: String
    },
    cardExpiry: {
      type: String
    },
    cvv: {
      type: String
    },
    stripePaymentKey: {
      type: String
      /**
       * e.g. pm_1LiDvQITPrbxGSMcyI70nomQ
       */
    },
    stripeClientSecretKey: {
      type: String
      /**
       * e.g. seti_1LiDtlITPrbxGSMcM8L4qC7o_secret_MR65qXDpAFYZPqqOh6j1AMTwhHNISNE
       */
    },
    stripeSetupIntent: {
      type: String
      /**
       * e.g. seti_1Mg3BrITPrbxGSMciDOObBWA
       */
    },
    isSave: {
      type: Number,
      enum: [0, 1]
      /**
       * ?
       */
    },
    isUseCard: {
      type: Number,
      enum: [0, 1]
    }
  },
  {
    timestamps: true
  }
);

export default paymentCardDetailsSchema;
