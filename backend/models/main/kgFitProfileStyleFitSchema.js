/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const kgFitProfileStyleFitSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KgFitProfile',
      required: true
    },
    topSize: {
      type: Number,
      min: 0
      /**
       * 0: 2T, 1: 3T, 2: 4T, etc.
       */
    },
    bottomSize: {
      type: Number,
      min: 0
      /**
       * 0: 2T, 1: 3T, 2: 4T, etc.
       */
    },
    shoeSize: {
      type: Number,
      min: 0
      /**
       * 0: 2 Child, 1: 3 Child, 2: 4 Child, etc.
       */
    },
    bodyShape: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Husky
       * 1: Average
       * 2: Slim
       */
    },
    shirtSleeveLength: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Too short, 1: None, 2: Too long
       */
    },
    shirtTorsoLength: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Too short, 1: None, 2: Too long
       */
    },
    shirtTorsoWidth: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Too tight, 1: None, 2: Too loose
       */
    },
    pantWaist: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Too tight, 1: None, 2: Too loose
       */
    },
    pantLegsLength: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Too short, 1: None, 2: Too long
       */
    },
    pantLegsWidth: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Too tight, 1: None, 2: Too loose
       */
    },
    tShirts: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    topsBlouses: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    sweatShirts: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    sweaters: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    jacketsCoats: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    dressesRompers: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    shorts: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    leggings: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    jeans: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    pants: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    skirts: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    accessories: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    shoes: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    pajamas: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    artsCrafts: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    biking: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    dance: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    playingOutside: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    musicalInstruments: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    reading: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Often, 1: Sometimes, 2: Rarely
       */
    },
    stripes: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    floral: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    animalPrint: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    polkaDots: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    plaid: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    camo: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    }
  },
  {
    timestamps: true
  }
);

export default kgFitProfileStyleFitSchema;
