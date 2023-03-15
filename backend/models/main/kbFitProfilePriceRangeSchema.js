/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const kbFitProfilePriceRangeSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KbFitProfile',
      required: true
    },
    casualShirts: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    shorts: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    jeansPants: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    jackets: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    sweaters: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    buttonDowns: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    casualBottoms: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    shoes: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    }
  },
  {
    timestamps: true
  }
);

export default kbFitProfilePriceRangeSchema;
