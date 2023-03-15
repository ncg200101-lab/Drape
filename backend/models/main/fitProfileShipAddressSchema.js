/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const fitProfileShipAddressSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    addrLine1: {
      type: String,
      required: true
    },
    addrLine2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    stateProvcRegion: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phoneNum: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default fitProfileShipAddressSchema;
