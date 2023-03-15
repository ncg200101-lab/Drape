/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const wFitProfilePriceRangeSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WFitProfile',
      required: true
    },
    budgetTops: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Under $50
       * 1: $50 - $75
       * 2: $75 - $100
       * 3: $100 - $125
       * 4: $125+
       */
    },
    budgetBottoms: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Under $30
       * 1: $30 - $50
       * 2: $50 - $70
       * 3: $70 - $90
       * 4: $90+
       */
    },
    budgetOuterwear: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Under $50
       * 1: $50 - $75
       * 2: $75 - $100
       * 3: $100 - $125
       * 4: $125+
       */
    },
    budgetJeans: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Under $75
       * 1: $75 - $100
       * 2: $100 - $125
       * 3: $125 - $175
       * 4: $175+
       */
    },
    budgetJewelry: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Under $40
       * 1: $40 - $60
       * 2: $60 - $80
       * 3: $80 - $100
       * 4: $100+
       */
    },
    budgetAccessories: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Under $75
       * 1: $75 - $125
       * 2: $125 - $175
       * 3: $175 - $250
       * 4: $250+
       */
    },
    budgetDress: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: Under $75
       * 1: $75 - $125
       * 2: $125 - $175
       * 3: $175 - $250
       * 4: $250+
       */
    }
  },
  {
    timestamps: true
  }
);

export default wFitProfilePriceRangeSchema;
