/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const paymentGatewaySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    kidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kids'
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    status: {
      type: Number,
      enum: [0, 1]
      /**
       * ?
       */
    },
    price: {
      type: Number
    },
    profileType: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: women
       * 1: men
       * 2: kids
       */
    },
    count: {
      type: Number
    },
    paymentType: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: style order
       * 1: checkout
       * 2: direct charge
       */
    },
    mailStatus: {
      type: Number,
      enum: [0, 1]
      /**
       * 0: not mail
       * 1: mail
       */
    },
    workStatus: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: not assigned
       * 1: current worklist
       * 2: previous worklist
       */
    },
    transactionId: {
      type: String
      /**
       * e.g. txn_3LiDwAITPrbxGSMc1mv7jmwL
       */
    },
    refundedAt: {
      type: Date
    },
    refundStatus: {
      type: Number,
      enum: [0, 1]
      /**
       * ?
       */
    },
    refundMsg: {
      type: String
    },
    refundTransactionId: {
      type: String
    },
    refundAmount: {
      type: Number
    },
    paymentCardDetailsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentCardDetails',
      required: true
    },
    autoCheckout: {
      type: Number,
      enum: [0, 1]
    },
    autoCheckedOutAt: {
      type: Date
    },
    parentId: {
      type: String
      /**
       * ???
       */
    },
    isParentAutoCheckout: {
      type: Number,
      enum: [0, 1]
      /**
       * ?
       */
    },
    isStyleFee: {
      type: Number,
      enum: [0, 1]
      /**
       * ?
       */
    },
    finalizedAt: {
      type: Date
    },
    finalizeCount: {
      type: Number
    },
    trCount: {
      type: Number
      /**
       * ?
       */
    },
    deliveryId: {
      type: String
      /**
       * ?
       */
    },
    shipAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FitProfileShipAddress'
      /**
       * ?
       */
    },
    paymentIntentId: {
      type: String
      /**
       * e.g. pi_3LiDwAITPrbxGSMc1idb1Mtg
       */
    },
    chargeId: {
      type: String
      /**
       * e.g. ch_3LiDwAITPrbxGSMc1fy8fybt
       */
    },
    receiptUrl: {
      type: String
      /**
       * e.g. https://pay.stripe.com/receipts/payment/...
       */
    },
    doneStatus: {
      type: Number,
      enum: [0, 1]
      /**
       * ?
       */
    }
  },
  {
    timestamps: true
  }
);

export default paymentGatewaySchema;
