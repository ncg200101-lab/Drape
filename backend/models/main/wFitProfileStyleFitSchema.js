/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const wFitProfileStyleFitSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WFitProfile',
      required: true
    },
    styleInspiration: {
      type: [String],
      enum: ['0', '1', '2', '3', '4']
      /**
       * 0: Bohemian
       * 1: Casual
       * 2: Classic
       * 3: Edgy
       * 4: Trendy
       */
    },
    dressLength: {
      type: [String],
      enum: ['0', '1', '2', '3']
      /**
       * 0: Mini
       * 1: Short
       * 2: Midi
       * 3: Maxi
       */
    },
    topHalf: {
      type: [String],
      enum: ['0', '1', '2']
      /**
       * 0: Fitted
       * 1: Straight
       * 2: Loose
       */
    },
    pantLength: {
      type: [String],
      enum: ['0', '1', '2']
      /**
       * 0: Ankle
       * 1: Regular
       * 2: Long
       */
    },
    pantRise: {
      type: [String],
      enum: ['0', '1', '2']
      /**
       * 0: Low Rise
       * 1: Mid Rise
       * 2: High Rise
       */
    },
    pantStyle: {
      type: [String],
      enum: ['0', '1', '2', '3', '4']
      /**
       * 0: Skinny
       * 1: Straight
       * 2: Bootcut
       * 3: Relaxed
       * 4: Wide Leg
       */
    },
    appareType: {
      type: [String],
      enum: ['0', '1', '2', '3', '4', '5', '6']
      /**
       * 0: Dresses / Jumpsuits
       * 1: Tops
       * 2: Bottoms
       * 3: Denim
       * 4: Sweaters
       * 5: Jackets
       * 6: Accessories
       */
    },
    bottomType: {
      type: [String],
      enum: ['0', '1', '2', '3', '4', '5', '6']
      /**
       * 0: Skirts
       * 1: Striped Shorts
       * 2: Capri Jeans
       * 3: Cargo Pant
       * 4: Checked Pant
       * 5: Palazzo
       * 6: Denim Shorts
       */
    },
    topType: {
      type: [String],
      enum: ['0', '1', '2']
      /**
       * 0: Sleevelss
       * 1: Shorts Sleeve
       * 2: Long Sleeve
       */
    },
    outFit: {
      type: [String],
      enum: ['0', '1', '2', '3', '4', '5', '6', '7']
    },
    outFitRadio0: {
      type: String,
      enum: ['0', '1', '2', '3']
      /**
       * 0: Always dress this way
       * 1: Sometimes dress this way
       * 2: Occasionally dress this way
       * 3: Never this way
       */
    },
    outFitRadio1: {
      type: String,
      enum: ['0', '1', '2', '3']
    },
    outFitRadio2: {
      type: String,
      enum: ['0', '1', '2', '3']
    },
    outFitRadio3: {
      type: String,
      enum: ['0', '1', '2', '3']
    },
    outFitRadio4: {
      type: String,
      enum: ['0', '1', '2', '3']
    },
    outFitRadio5: {
      type: String,
      enum: ['0', '1', '2', '3']
    },
    outFitRadio6: {
      type: String,
      enum: ['0', '1', '2', '3']
    },
    outFitRadio7: {
      type: String,
      enum: ['0', '1', '2', '3']
    },
    avoidPattern: {
      type: [String],
      enum: ['0', '1', '2', '3', '4', '5']
      /**
       * 0: Lace
       * 1: Animal Print
       * 2: Tribal
       * 3: Polka Dot
       * 4: Stripes
       * 5: Floral
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
    mostlyNeutralsColor: {
      type: [String],
      enum: ['0', '1', '2', '3', '4']
      /**
       * 0: Black
       * 1: Grey
       * 2: Navy
       * 3: Beige
       * 4: White
       */
    },
    mostlyColorfulColor: {
      type: [String],
      enum: ['0', '1', '2', '3']
      /**
       * 0: Red
       * 1: Blue
       * 2: Yellow
       * 3: Purple
       */
    },
    mostlyLightsColor: {
      type: [String],
      enum: ['0', '1', '2']
      /**
       * 0: White
       * 1: Sand
       * 2: Pastels
       */
    },
    missingFit: {
      type: [String],
      enum: ['0', '1', '2', '3', '4', '5']
      /**
       * 0: Sweaters
       * 1: Blouses
       * 2: Jeans
       * 3: Pants
       * 4: Skirts
       * 5: Dresses
       */
    },
    denimStyle1: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    denimStyle2: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    denimStyle3: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    denimStyle4: {
      type: Number,
      enum: [0, 1, 2]
      /**
       * 0: Yes, 1: Maybe, 2: Never
       */
    },
    dressupOccasion: {
      type: Number,
      min: 0,
      max: 7
      /**
       * 0: Business Casual / Work
       * 1: Cocktail / Wedding / Special
       * etc.
       */
    },
    missingCloset: {
      type: [String],
      enum: ['0', '1', '2', '3', '4', '5']
      /**
       * 0: Sweaters
       * 1: Blouses
       * 2: Jeans
       * 3: Pants
       * 4: Skirts
       * 5: Dresses
       */
    }
  },
  {
    timestamps: true
  }
);

export default wFitProfileStyleFitSchema;
