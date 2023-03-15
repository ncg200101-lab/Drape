/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @coauthor li.yang@drapefit.com
 * @coauthor suprakash.mondal@drapefit.com
 * @company Drape Fit Inc.
 */
import { initMainDB, initSupplierDB, initS3 } from './boot/init.js';
import { app } from './app.js';

//-- Bootstrapping
//-- Load environment variables silently as well
await initMainDB();
await initSupplierDB();
await initS3();

const PORT = process.env.PORT || 5180;

try {
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
    )
  );
} catch (err) {
  console.log(`ERROR_start_server: ${err}`);
  process.exit(1);
}
