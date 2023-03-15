/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const supProductDeductSchema = new mongoose.Schema(
  {
    supProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupProduct',
      required: true
    },
    quantity: {
      type: Number
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
      /**
       * ID of `PaymentGateway`
       */
    }
  },
  {
    timestamps: true
  }
);

export default supProductDeductSchema;
