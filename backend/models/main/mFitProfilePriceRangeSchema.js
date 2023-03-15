/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const mFitProfilePriceRangeSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MFitProfile',
      required: true
    },
    budgetShirts: {
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
    budgetTeesPolos: {
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
    budgetSweatersShirts: {
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
    budgetPantsDenim: {
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
    budgetShorts: {
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
    budgetShoes: {
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
    budgetOuterwear: {
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
    accTiesLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: I want the best
       * 1: $40 - $60
       * 2: Up to $80
       * 3: Up to $100
       */
    },
    accBeltsLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: I want the best
       * 1: $30 - $50
       * 2: Up to $70
       * 3: Up to $90
       */
    },
    accWalletsBagsLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: I want the best
       * 1: $25 - $50
       * 2: Up to $75
       * 3: Up to $100
       */
    },
    accSunglassesLabel: {
      type: Number,
      enum: [0, 1, 2, 3, 4]
      /**
       * 0: I want the best
       * 1: $40 - $60
       * 2: Up to $80
       * 3: Up to $100
       * 4: $100 - $150
       */
    },
    accHatsLabel: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: I want the best
       * 1: $30 - $50
       * 2: Up to $70
       */
    },
    ugSocksLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: I want the best
       * 1: $10 - $25
       * 2: Up to $35
       * 3: Up to $45
       */
    },
    ugUnderwearLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: I want the best
       * 1: $10 - $25
       * 2: Up to $35
       * 3: Up to $45
       */
    },
    ugGroomingLabel: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: I want the best
       * 1: $10 - $25
       * 2: Up to $35
       * 3: Up to $45
       */
    }
  },
  {
    timestamps: true
  }
);

export default mFitProfilePriceRangeSchema;
