/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const wFitProfileBasicInfoSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WFitProfile',
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
    bodyType: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Inverted Triangle
       * 1: Triangle
       * 2: Rectangle
       * 3: Hourglass
       * 4: Apple
       */
    },
    braSizeNum: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: 30, 2: 32, etc.
       */
    },
    braSizeLabel: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: AA, 2: A, 3: B, etc.
       */
    },
    shirtBlouseSizeNo: {
      type: Number,
      min: 1
      /**
       * 0: --
       * 1: 2, 2: 4, etc.
       */
    },
    shirtBlouseSizeLabel: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: S (2 - 4), 2: XXS (00), etc.
       */
    },
    jacketSize: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: XS (0 - 2), 2: S (2 - 4), etc.
       */
    },
    dressSizeNo: {
      type: Number,
      min: 1
      /**
       * 0: --
       * 1: 2, 2: 4, etc.
       */
    },
    dressSizeLabel: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: L (10 - 12), 2: XXS (00), etc.
       */
    },
    skirtSize: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: XXS, 2: XS, 3: S, etc.
       */
    },
    pantsSize: {
      type: Number,
      min: 1
      /**
       * 0: --
       * 1: 000, 2: 00, 3: 0, etc.
       */
    },
    jeansSize: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: 00, 2: 0, 3: 2, etc.
       */
    },
    bottomSize: {
      type: Number,
      min: 1
      /**
       * 0: --
       * 1: XS (0 - 2), 2: S (2 - 4), etc.
       */
    },
    shoeSizeNum: {
      type: Number,
      min: 0
    },
    shoesStyleLabel: {
      type: [String]
      /**
       * 0: Pumps, 1: Sandals, 2: Sneakers, etc.
       */
    },
    heelHeightLabel: {
      type: [String]
      /**
       * 0: Flat(Under 1"), 1: Low(1"-2"), etc.
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
    bodyShowingOff: {
      type: [String]
      /**
       * 0: Arms, 1: Bust, 2: Stomach, etc.
       */
    },
    bodyKeepCovered: {
      type: [String]
      /**
       * 0: Arms, 1: Bust, 2: Stomach, etc.
       */
    },
    sizeShoulders: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: 00, 2: 0, 3: 2, etc.
       */
    },
    sizeArms: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: XXS, 2: XS, 3: S, etc.
       */
    },
    sizeHips: {
      type: Number,
      min: 0
      /**
       * 0: --
       * 1: 00, 2: 0, 3: 2, etc.
       */
    },
    sizeLegs: {
      type: Number,
      min: 0
    },
    isPregnant: {
      type: Number,
      enum: [0, 1]
      /**
       * 0: Yes, 1: No
       */
    },
    dueDate: {
      type: Date,
      default: Date.now
    },
    maternityFit: {
      type: Number,
      min: 0
    },
    looseFitted: {
      type: Number,
      min: 0
    },
    maternityPants: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: Regular pants with an under-the-belly type
       * 1: All-around stretch to give light support
       * 2: Elastic side panels
       * 3: Fits over bump for maximum support
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

export default wFitProfileBasicInfoSchema;
