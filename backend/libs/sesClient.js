/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { SESClient } from '@aws-sdk/client-ses';

const region = process.env.AWS_REGION;

const sesClient = new SESClient({ region });

export { sesClient };
