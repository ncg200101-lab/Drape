/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import Stripe from 'stripe';

import { dbMainConn, dbSupplierConn } from '../config/db.js';
import userSchema from '../models/main/userSchema.js';
import supProdCategorySchema from '../models/supplier/supProdCategorySchema.js';
import { genUsername } from '../utils/helper.js';
import { checkS3Bucket } from '../libs/checkS3Bucket.js';
import { createS3Bucket } from '../libs/createS3Bucket.js';
import { addS3BucketCorsRules } from '../libs/addS3BucketCorsRules.js';
import { addS3BucketPolicyPublic } from '../libs/addS3BucketPolicyPublic.js';
import { DEFAULT_SUP_PRODUCT_CATEGORIES } from '../utils/constant.js';

const initMainDB = async () => {
  try {
    //-- CREATE [Super Admin] ACCOUNT
    const UserModel = dbMainConn.model('User', userSchema);
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_INITPWD;
    //-- check
    const user = await UserModel.findOne({ email });
    if (!user) {
      const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
      //-- create
      const spadmin = await UserModel.create({
        firstName: 'Secret',
        lastName: 'Guard',
        username: genUsername('Secret', 'Guard'),
        email,
        password, //-- must be changed by owner in production
        emailVerified: true, // *
        role: 100 // *
      });
      if (spadmin) {
        const customer = await stripe.customers.create({
          name: 'Secret Guard',
          email,
          description: 'Register Drape Fit super admin as a Stripe customer'
        });
        spadmin.stripeCusId = customer.id;
        await spadmin.save();
        //-- okay
        console.log('BOOT_initMainDB:', 'Super admin is created');
        return true;
      } else {
        //-- ignore error
        console.log(
          'BOOT_initMainDB_ERROR:',
          'Oops, failed to create super admin'
        );
        return false;
      }
    } else {
      //-- no need to create
      console.log('BOOT_initMainDB:', 'Yup, super admin already exists');
      return true;
    }
  } catch (err) {
    console.log('BOOT_initMainDB_ERROR:', err);
    return false;
  }
};

const initSupplierDB = async () => {
  try {
    //-- ADD default supplier product categories
    const SupProdCategoryModel = dbSupplierConn.model(
      'SupProdCategory',
      supProdCategorySchema
    );
    let failedArr = [];
    for (const category of DEFAULT_SUP_PRODUCT_CATEGORIES) {
      const categoryItem = await SupProdCategoryModel.findOneAndUpdate(
        { name: category },
        {
          $set: {
            name: category,
            isDefault: true // *
          }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      if (!categoryItem) {
        failedArr.push(category);
      }
    }
    if (failedArr.length) {
      console.log(
        'BOOT_initSupplierDB_ERROR:',
        `Failed to create the following default categories: ${JSON.stringify(
          failedArr
        )}`
      );
      return false;
    } else {
      //-- okay
      console.log(
        'BOOT_initSupplierDB:',
        'Initializing default supplier product categories is OK'
      );
      return true;
    }
  } catch (err) {
    console.log('BOOT_initSupplierDB_ERROR:', err);
    return false;
  }
};

const initS3 = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const bucket = process.env.S3_BUCKET_NAME;
      if ((await checkS3Bucket(bucket)) !== true) {
        if ((await createS3Bucket(bucket)) !== true) {
          console.log('BOOT_initS3_ERROR:', 'Failed to Create S3 Bucket');
          return false;
        }
      }
      if ((await addS3BucketCorsRules(bucket)) !== true) {
        console.log(
          'BOOT_initS3_ERROR:',
          'Failed to Add CORS rules to S3 Bucket'
        );
        return false;
      }
      if ((await addS3BucketPolicyPublic(bucket)) !== true) {
        console.log(
          'BOOT_initS3_ERROR:',
          'Failed to Add Public Policy to S3 Bucket'
        );
        return false;
      }
      console.log('BOOT_initS3:', 'S3 Bucket is configured');
    } else {
      console.log(
        'BOOT_initS3:',
        'No need to configure S3 Bucket in development mode'
      );
    }
    return true;
  } catch (err) {
    console.log('BOOT_initS3_ERROR:', err);
    return false;
  }
};

export { initMainDB, initSupplierDB, initS3 };
