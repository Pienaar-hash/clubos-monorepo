import express from "express";
import { getAllBookings, getBookingById } from "./bookings.service";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const booking = await getBookingById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

export default router;
