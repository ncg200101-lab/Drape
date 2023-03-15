/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { ListBucketsCommand } from '@aws-sdk/client-s3';

import { s3Client } from './s3Client.js';

const checkS3Bucket = async (bucket) => {
  try {
    const command = new ListBucketsCommand({});
    const { Buckets } = await s3Client.send(command);
    let result = false;
    if (Buckets.length) {
      Buckets.forEach((b) => {
        if (b.Name === bucket) result = true;
      });
    }
    if (result === true) {
      console.log('LIB_checkS3Bucket:', `Bucket [${bucket}] exists`);
    }
    return result;
  } catch (e) {
    console.log('LIB_checkS3Bucket_ERROR:', e);
    return false;
  }
};

export { checkS3Bucket };
