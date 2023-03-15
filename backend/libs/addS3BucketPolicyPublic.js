/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { PutBucketPolicyCommand } from '@aws-sdk/client-s3';

import { s3Client } from './s3Client.js';

const addS3BucketPolicyPublic = async (bucket) => {
  try {
    const command = new PutBucketPolicyCommand({
      Policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicReadGetObject',
            Effect: 'Allow',
            Principal: '*',
            Action: 's3:GetObject',
            Resource: `arn:aws:s3:::${bucket}/*`
          }
        ]
      }),
      Bucket: bucket
    });
    await s3Client.send(command);
    return true;
  } catch (e) {
    console.log('LIB_addS3BucketPolicyPublic_ERROR:', e);
    return false;
  }
};

export { addS3BucketPolicyPublic };
