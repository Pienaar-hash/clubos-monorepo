import dotenv from "dotenv";
dotenv.config();
import pino from "pino";
import cron from "node-cron";
import { syncDailySales } from "./jobs/syncDailySales";

const logger = pino({ name: "yoco-sync", level: "info" });
logger.info("Yoco Sync Service started.");

cron.schedule("15 2 * * *", async () => {
  try {
    await syncDailySales();
  } catch (err) {
    logger.error(err, "Error during Yoco sales sync");
  }
});

(async () => {
  try {
    await syncDailySales();
  } catch (err) {
    logger.error(err, "Error during initial Yoco sync");
  }
})();
