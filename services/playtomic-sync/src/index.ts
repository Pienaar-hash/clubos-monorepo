import dotenv from "dotenv";
dotenv.config();
import pino from "pino";
import cron from "node-cron";
import { syncDailyBookings } from "./jobs/syncDailyBookings";

const logger = pino({ name: "playtomic-sync", level: "info" });

logger.info("Playtomic Sync Service started.");

cron.schedule("0 2 * * *", async () => {
  try {
    await syncDailyBookings();
  } catch (err) {
    logger.error(err, "Error during Playtomic bookings sync");
  }
});

(async () => {
  try {
    await syncDailyBookings();
  } catch (err) {
    logger.error(err, "Error during initial Playtomic sync");
  }
})();
