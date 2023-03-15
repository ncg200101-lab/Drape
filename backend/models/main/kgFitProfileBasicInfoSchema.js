/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const kgFitProfileBasicInfoSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KgFitProfile',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    birthday: {
      type: Date,
      default: Date.now
    },
    lookingFor: {
      type: Number,
      enum: [0, 1],
      default: 0 //-- Girl
      /**
       * related to Kid's Gender
       * 0: Girl's Product
       * 1: Boy's Product
       */
    },
    relationShip: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Father
       * 1: Mother
       * 2: Other
       */
    },
    heightFt: {
      type: Number,
      min: 1,
      max: 6
      /**
       * 0: --
       * 1: 1, 2: 2, etc.
       */
    },
    heightIn: {
      type: Number,
      min: 0
      /**
       * 0 ~ 11
       */
    },
    weightLbs: {
      type: Number,
      min: 0
    },
    childPersonality: {
      type: [String]
      /**
       * 0: Thoughtful, 1: Sporty, 2: Shy, 3: Outgoing,
       * 4: Artistic, 5: Chatty, 6: Bookworm, 7: Curious,
       * 8: Sassy, 9: Funny, 10: Independent, 11: Kind,
       * 12: Daredevil, 13: Serious, 14: Adventurous, 15: Confident
       */
    },
    preferedSize: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Bottom Size
       * 1: Top Size
       * 2: Shoe Size
       */
    },
    colors: {
      type: [String]
      /**
       * 0: Black, 1: Grey, 2: White, 3: Cream, 4: Brown,
       * 5: Purple, 6: Green, 7: Blue, 8: Orange, 9: Yellow,
       * 10: Red, 11: Pink
       */
    }
  },
  {
    timestamps: true
  }
);

export default kgFitProfileBasicInfoSchema;
