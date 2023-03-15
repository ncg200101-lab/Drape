/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import path from 'path';
import dotenv from 'dotenv';

import { createNewMongoConnect } from '../utils/helper.js';

//-- Load environment variables
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '/environments/dev.env') });

const dbMainConn = createNewMongoConnect(process.env.MONGO_URI_MAIN);
const dbInventoryConn = createNewMongoConnect(process.env.MONGO_URI_INVENTORY);
const dbSupplierConn = createNewMongoConnect(process.env.MONGO_URI_SUPPLIER);

export { dbMainConn, dbInventoryConn, dbSupplierConn };
