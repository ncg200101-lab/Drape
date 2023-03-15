/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const kbFitProfileCustomDsgnBrandSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KbFitProfile',
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
       * 0: JANIE AND JACK, 1: OLD NAVY, 2: tea, etc.
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

export default kbFitProfileCustomDsgnBrandSchema;
