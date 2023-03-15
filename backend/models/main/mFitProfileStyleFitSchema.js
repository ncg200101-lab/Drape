/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const mFitProfileStyleFitSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MFitProfile',
      required: true
    },
    typicalWear2Work: {
      type: [String],
      enum: ['0', '1', '2']
      /**
       * 0: Casual
       * 1: Business Casual
       * 2: Formal
       */
    },
    casualShirts: {
      type: [String],
      enum: ['0', '1']
      /**
       * 0: Slim
       * 1: Regular
       */
    },
    btnUpShirts: {
      type: [String],
      enum: ['0', '1']
      /**
       * 0: Slim
       * 1: Regular
       */
    },
    jeans: {
      type: [String],
      enum: ['0', '1', '2', '3']
      /**
       * 0: Straight
       * 1: Slim
       * 2: Skinny
       * 3: Relaxed
       */
    },
    bottoms: {
      type: [String],
      enum: ['0', '1']
      /**
       * 0: Tighter Fitting
       * 1: More Relaxed
       */
    },
    shorts: {
      type: [String],
      enum: ['0', '1', '2', '3']
      /**
       * 0: Upper Thigh
       * 1: Lower Thigh
       * 2: Above Knee
       * 3: At The Knee
       */
    },
    colors: {
      type: [String]
      /**
       * 0: Black, 1: Grey, 2: White, 3: Cream, 4: Brown,
       * 5: Purple, 6: Green, 7: Blue, 8: Orange, 9: Yellow,
       * 10: Red, 11: Pink
       */
    },
    outfits: {
      type: [String]
      /**
       * 0 - 19
       */
    },
    fitIssues: {
      type: [String]
      /**
       * 0: Long Arms, 1: Short Arms, 2: Thick Arms, 3: Broad Shoulders,
       * 4: Man Boobs, 5: Big Belly, 6: Big Butt, 7: Small Butt,
       * 8: Thunder Things, 9: Thick Neck, 10: Short Torso, 11: Long Torso
       * 12: Broad Chest, 13: Very Skinny, 14: Skinny Legs
       */
    }
  },
  {
    timestamps: true
  }
);

export default mFitProfileStyleFitSchema;
