/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const invProductWomenSchema = new mongoose.Schema(
  {
    userId: {
      type: String
      /**
       * ?
       */
    },
    prodCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvProductCategory',
      required: true
    },
    prodSubCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvProdSubCategoryRack',
      required: true
    },
    productName1: {
      type: String
    },
    productName2: {
      type: String
    },
    fromHeightFt: {
      type: Number
    },
    fromHeightIn: {
      type: Number
    },
    toHeightFt: {
      type: Number
    },
    toHeightIn: {
      type: Number
    },
    fromWeight: {
      type: Number
    },
    toWeight: {
      type: Number
    },
    fromAge: {
      type: Number
    },
    toAge: {
      type: Number
    },
    profession: {
      type: [String]
    },
    occasions: {
      type: [String]
    },
    bodyType: {
      type: [String],
      default: []
      /**
       * '0' ~ '4'
       */
    },
    skinToneLabel: {
      type: [String],
      default: []
      /**
       * '0' ~ '5'
       */
    },
    brandName: {
      type: String
      /**
       * ref: brandStaffSchema
       */
    },
    colorName: {
      type: String
      /**
       * ref: invColorSchema
       */
    },
    sizeType: {
      type: String,
      required: true
      /**
       * '0', '1', etc.
       */
    },
    bestSizeFit: {
      type: Number
    },
    pantsSize: {
      type: Number
    },
    braSizeNum: {
      type: Number
    },
    braSizeLabel: {
      type: Number
    },
    skirtSize: {
      type: Number
    },
    jeansSize: {
      type: Number
    },
    activeWearSize: {
      type: Number
    },
    jacketSize: {
      type: Number
    },
    bottomSize: {
      type: Number
    },
    dressSizeNo: {
      type: Number
    },
    dressSizeLabel: {
      type: Number
    },
    shirtBlouseSizeNo: {
      type: Number
    },
    shirtBlouseSizeLabel: {
      type: Number
    },
    shoeSizeNum: {
      type: Number
    },
    heelHeightLabel: {
      type: Number
    },
    shoesStyleLabel: {
      type: Number
    },
    topSizeNo: {
      type: Number
    },
    topSizeLabel: {
      type: Number
    },
    sizeSelected: {
      type: String
    },
    styleInspiration: {
      type: [String]
    },
    dressLength: {
      type: Number
    },
    topHalf: {
      type: [String]
    },
    pantLength: {
      type: Number
    },
    pantRaise: {
      type: Number
    },
    pantStyle: {
      type: Number
    },
    appareType: {
      type: Number
    },
    bottomsType: {
      type: Number
    },
    topType: {
      type: Number
    },
    patternsType: {
      type: Number
    },
    denimStyles: {
      type: [String]
    },
    missingFromFit: {
      type: Number
    },
    outFits: {
      type: [String],
      default: []
      /**
       * '0' ~ '7'
       */
    },
    budgetType: {
      type: String
    },
    budgetTops: {
      type: Number
    },
    budgetBottoms: {
      type: Number
    },
    budgetOuterwear: {
      type: Number
    },
    budgetJeans: {
      type: Number
    },
    budgetJewelry: {
      type: Number
    },
    budgetAccessories: {
      type: Number
    },
    budgetDress: {
      type: Number
    },
    sizeShoulders: {
      type: Number
    },
    sizeArms: {
      type: Number
    },
    sizeHips: {
      type: Number
    },
    sizeLegs: {
      type: Number
    },
    purchasePrice: {
      type: Number
    },
    salePrice: {
      type: Number
    },
    quantity: {
      type: Number
    },
    availableStatus: {
      type: Number
    },
    productImage: {
      type: String
    },
    note: {
      type: String
    },
    styleNo: {
      type: String
    },
    isActive: {
      type: Number,
      enum: [0, 1],
      default: 1
      /**
       * 1: active, 0: inactive
       */
    }
  },
  {
    timestamps: true
  }
);

export default invProductWomenSchema;
