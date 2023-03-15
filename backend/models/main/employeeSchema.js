/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: Stylist
       * 1: Inventory
       * 2: QA
       * 3: Support Guy
       */
    },
    typeStr: {
      type: String
    },
    about: {
      type: String
    },
    address: {
      type: String
    },
    lastLoginAt: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default employeeSchema;
