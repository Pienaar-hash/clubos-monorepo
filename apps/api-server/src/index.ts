import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import pino from "pino";

import bookingsRouter from "./modules/bookings/bookings.routes";
import staffRouter from "./modules/staff/staff.routes";
import inventoryRouter from "./modules/inventory/inventory.routes";
import paymentsRouter from "./modules/payments/payments.routes";
import marketingRouter from "./modules/marketing/marketing.routes";

const PORT = Number(process.env.PORT || 3001);
const app = express();
const logger = pino({ name: "api-server", level: "info" });

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    logger.info({ method: req.method, url: req.originalUrl, status: res.statusCode }, "HTTP request");
  });
  next();
});

app.get("/", (_req, res) => {
  res.send("ClubOS API Server is running");
});

app.use("/api/bookings", bookingsRouter);
app.use("/api/staff", staffRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/marketing", marketingRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error({ err }, "Unhandled error");
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  logger.info(`API server listening on port ${PORT}`);
});
