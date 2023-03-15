/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const kgFitProfileSchema = new mongoose.Schema(
  {
    kidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kids',
      required: true
    },
    inputStatus: {
      basicInfo: {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'KgFitProfileBasicInfo'
        },
        isComplete: {
          type: Boolean,
          default: false
        }
      },
      styleFit: {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'KgFitProfileStyleFit'
        },
        isComplete: {
          type: Boolean,
          default: false
        }
      },
      priceRange: {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'KgFitProfilePriceRange'
        },
        isComplete: {
          type: Boolean,
          default: false
        }
      },
      customDsgnBrand: {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'KgFitProfileCustomDsgnBrand'
        },
        isComplete: {
          type: Boolean,
          default: false
        }
      },
      schedule: {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'FitProfileSchedule'
        },
        isComplete: {
          type: Boolean,
          default: false
        },
        isActive: {
          type: Boolean,
          default: true // *
        }
      },
      shipAddress: {
        itemIDs: [
          {
            itemId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'FitProfileShipAddress'
            }
          }
        ],
        isComplete: {
          type: Boolean,
          default: false
        }
      },
      billingInfo: {
        itemIDs: [
          {
            itemId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'FitProfileBillingInfo'
            }
          }
        ],
        isComplete: {
          type: Boolean,
          default: false
        }
      }
    }
  },
  {
    timestamps: true
  }
);

export default kgFitProfileSchema;
