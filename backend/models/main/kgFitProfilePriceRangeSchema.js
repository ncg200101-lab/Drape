/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const kgFitProfilePriceRangeSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KgFitProfile',
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
    skirtsShorts: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    leggings: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    jeans: {
      type: Number,
      enum: [0, 1, 2, 3]
      /**
       * 0: $20 - $30
       * 1: $30 - $40
       * 2: $40 - $50
       * 3: $50+
       */
    },
    dresses: {
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
    blouses: {
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

export default kgFitProfilePriceRangeSchema;
