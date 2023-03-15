/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION;

const s3Client = new S3Client({ region });

export { s3Client };
