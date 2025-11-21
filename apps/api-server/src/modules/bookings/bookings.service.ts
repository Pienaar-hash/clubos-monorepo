import { prisma } from "../../prisma";

export async function getAllBookings() {
  return prisma.booking.findMany({ orderBy: { startTime: "desc" } });
}

export async function getBookingById(id: number) {
  return prisma.booking.findUnique({ where: { id } });
}
