/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const mFitProfileBasicInfoSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MFitProfile',
      required: true
    },
    heightFt: {
      type: Number,
      min: 0,
      max: 2
      /**
       * 0: 4, 1: 5, 2: 6
       */
    },
    heightIn: {
      type: Number,
      min: 0,
      max: 11
    },
    weightLbs: {
      type: Number,
      min: 0
    },
    birthday: {
      type: Date,
      default: Date.now
    },
    isParent: {
      type: Number,
      enum: [0, 1]
      /**
       * 0: Yes, 1: No
       */
    },
    waistSizeNum: {
      type: Number,
      min: 1
      /**
       * 0: --
       * 1: 28, etc.
       */
    },
    waistSizeLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: --
       * 1: Sometimes too small
       * 2: Just right
       * 3: Sometimes too big
       */
    },
    shirtSizeNo: {
      type: Number,
      min: 1,
      max: 7
      /**
       * 0: --
       * 1: XS, 2: S, 3: M, 4: L, 5: XL, 6: XXL, 7: 3XL
       */
    },
    shirtSizeLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: --
       * 1: Sometimes too small
       * 2: Just right
       * 3: Sometimes too big
       */
    },
    bottomSizeNo: {
      type: Number,
      min: 0,
      max: 7
      /**
       * 0: --
       * 1: XS, 2: S, 3: M, 4: L, 5: XL, 6: XXL, 7: 3XL
       */
    },
    inseamSizeNum: {
      type: Number,
      min: 1
      /**
       * 0: --
       * 1: 28, etc.
       */
    },
    shoeSizeNum: {
      type: Number,
      min: 0
    },
    shoeSizeLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: Narrow
       * 1: Medium
       * 2: Wide
       * 3: Extra Wide
       */
    },
    professionLabel: {
      type: Number,
      min: 0
      /**
       * 0: Architecture / Engineering
       * 1: Art / Design
       * etc.
       */
    },
    bodyShapeLabel: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Trapezoid
       * 1: Rectangle
       * 2: Triangle
       * 3: Oval
       * 4: Inverted Triangle
       */
    },
    skinToneLabel: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5]
      /**
       * 0: Extremely fair skin
       * 1: Fair skin
       * 2: Medium skin
       * 3: Olive skin
       * 4: Brown skin
       * 5: Other
       */
    },
    snsLinkedin: {
      type: String
    },
    snsInstagram: {
      type: String
    },
    snsTwitter: {
      type: String
    },
    snsPinterest: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mFitProfileBasicInfoSchema;
