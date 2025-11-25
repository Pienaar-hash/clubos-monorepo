import pino from "pino";
import { prisma } from "../prisma";
import { fetchBookingsForDate } from "../utils/fetchBookings";

const logger = pino();

export async function syncDailyBookings() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  logger.info(`Fetching Playtomic bookings for ${yesterday.toDateString()}...`);

  const bookings = await fetchBookingsForDate(yesterday);
  let newCount = 0;

  for (const booking of bookings) {
    try {
      await prisma.booking.upsert({
        where: { externalId: booking.id },
        update: {
          startTime: new Date(booking.start_time),
          endTime: new Date(booking.end_time),
          courtName: booking.court ? booking.court.name : null,
          paid: booking.payment_status === "paid",
          price: booking.price ? Math.round(booking.price * 100) : null
        },
        create: {
          externalId: booking.id,
          startTime: new Date(booking.start_time),
          endTime: new Date(booking.end_time),
          courtName: booking.court ? booking.court.name : null,
          paid: booking.payment_status === "paid",
          price: booking.price ? Math.round(booking.price * 100) : null
        }
      });
      newCount++;
    } catch (err) {
      logger.error({ err, bookingId: booking.id }, "Failed to upsert booking");
    }
  }

  logger.info(`Playtomic sync: fetched ${bookings.length} bookings, ${newCount} new records upserted.`);
}
