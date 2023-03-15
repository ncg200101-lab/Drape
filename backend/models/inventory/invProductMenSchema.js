/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const invProductMenSchema = new mongoose.Schema(
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
    waistSizeNum: {
      type: Number
    },
    waistSizeLabel: {
      type: Number
    },
    shirtSizeNo: {
      type: Number
    },
    shirtSizeLabel: {
      type: Number
    },
    inseamSizeNum: {
      type: Number
    },
    bottomSizeNo: {
      type: Number
    },
    shoeSizeNum: {
      type: Number
    },
    shoeSizeLabel: {
      type: Number
    },
    sizeSelected: {
      type: String
    },
    bodyShape: {
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
    typicalWear2Work: {
      type: [String]
    },
    casualShirts: {
      type: Number
    },
    btnUpShirts: {
      type: Number
    },
    jeansFit: {
      type: Number
    },
    shortsLong: {
      type: Number
    },
    colorName: {
      type: String
      /**
       * ref: invColorSchema
       */
    },
    bottomFit: {
      type: Number
    },
    outFits: {
      type: [String],
      default: []
      /**
       * '0' ~ '19'
       */
    },
    fitIssues: {
      type: [String],
      default: []
      /**
       * '0' ~ '14'
       */
    },
    budgetType: {
      type: String
    },
    budgetShirts: {
      type: Number
    },
    budgetTeesPolos: {
      type: Number
    },
    budgetSweatersShirts: {
      type: Number
    },
    budgetPantsDenim: {
      type: Number
    },
    budgetShorts: {
      type: Number
    },
    budgetShoes: {
      type: Number
    },
    budgetOuterwear: {
      type: Number
    },
    budgetTies: {
      type: Number
    },
    budgetBelts: {
      type: Number
    },
    budgetWalletsBags: {
      type: Number
    },
    budgetSunglasses: {
      type: Number
    },
    budgetHats: {
      type: Number
    },
    budgetSocks: {
      type: Number
    },
    budgetUnderwear: {
      type: Number
    },
    budgetGrooming: {
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
    brandName: {
      type: String
      /**
       * ref: brandStaffSchema
       */
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

export default invProductMenSchema;
