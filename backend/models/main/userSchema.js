/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { randomBytes, createHash } = await import('node:crypto');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: Number,
      enum: [100, 101, 102, 103, 104, 105, 106, 1040],
      default: 102
      /**
       * 100: Super Admin (Developer)
       * 101: Admin
       * 102: Client (Customer, Influencer)
       * 103: Stylist
       * 104: Inventory Manager
       * 105: QA (Quality Assurance)
       * 106: Support Guy
       * 1040: Brand Staff (by Inventory Manager)
       */
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    fitFor: {
      type: Number,
      enum: [0, 1, 2],
      default: 0
      /**
       * 0: women
       * 1: men
       * 2: kids
       */
    },
    isInfluencer: {
      type: Number,
      enum: [0, 1]
      /**
       * 0: no, pure customer client
       * 1: yes, influencer client
       */
    },
    isActive: {
      type: Number,
      enum: [0, 1],
      default: 1
      /**
       * 0: deactivated
       * 1: active
       * ※ valid for Employee role [103 ~ 106] & Brand Staff role [1040]
       */
    },
    stripeCusId: {
      type: String
    },
    isCheckoutPending: {
      type: Boolean,
      default: false
      /**
       * Temporary field...
       */
    },
    pwdChangedAt: Date,
    pwdResetToken: String,
    pwdResetExpiresAt: Date
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  try {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (e) {
    console.log('MODEL_userSchema_ERROR:', e);
    next(e);
  }
});

userSchema.methods.matchPassword = async function (enteredPwd) {
  try {
    const user = this;
    const isMatch = await bcrypt.compare(enteredPwd, user.password);
    return isMatch;
  } catch (e) {
    console.log('MODEL_userSchema_ERROR:', e);
    return false;
  }
};

userSchema.methods.createPasswordResetToken = function () {
  try {
    const user = this;
    const resetToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(resetToken).digest('hex');
    user.pwdResetToken = hashedToken;
    const ttl = 1000 * 60 * 60; //-- 1 hour = 60 mins
    user.pwdResetExpiresAt = Date.now() + ttl;
    return resetToken;
  } catch (e) {
    console.log('MODEL_userSchema_ERROR:', e);
    throw new Error('Failed to create password-reset token');
  }
};

userSchema.methods.newAuthToken = async function () {
  try {
    const user = this;
    const tokens = [...user.tokens];
    const secret = process.env.JWT_SECRET;
    //-- check and remove expired tokens
    const validTokens = await Promise.allSettled(
      tokens.map(async (token) => {
        try {
          await jwt.verify(token?.token, secret);
          return token;
        } catch (e) {
          console.log(
            'MODEL_userSchema:',
            `Token [${token?.token}] has expired and will be removed`
          );
          return null;
        }
      })
    );
    user.tokens = validTokens
      .filter((token) => token.status === 'fulfilled' && token.value !== null)
      .map((token) => token.value);

    //-- create new token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '12h' });
    user.tokens.push({ token });
    await user.save();
    return token;
  } catch (e) {
    console.log('MODEL_userSchema_ERROR:', e);
    throw new Error('Failed to generate auth token');
  }
};

export default userSchema;
