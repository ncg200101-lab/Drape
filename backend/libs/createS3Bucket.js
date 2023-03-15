/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { CreateBucketCommand } from '@aws-sdk/client-s3';

import { s3Client } from './s3Client.js';

const createS3Bucket = async (bucket) => {
  try {
    const command = new CreateBucketCommand({
      Bucket: bucket
    });
    const { Location } = await s3Client.send(command);
    console.log('LIB_createS3Bucket:', Location);
    return true;
  } catch (e) {
    console.log('LIB_createS3Bucket_ERROR:', e);
    return false;
  }
};

export { createS3Bucket };
