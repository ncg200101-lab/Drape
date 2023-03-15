/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const mFitProfileCustomDsgnBrandSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MFitProfile',
      required: true
    },
    dsgnImgUrl1st: {
      type: String
    },
    dsgnImgUrl2nd: {
      type: String
    },
    dsgnImgUrl3rd: {
      type: String
    },
    favBrandStoreLabel: {
      type: [String]
      /**
       * 0: Penguin, 1: NIKE, 2: SCOTCH & SODA, etc.
       */
    },
    addlComments: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mFitProfileCustomDsgnBrandSchema;
