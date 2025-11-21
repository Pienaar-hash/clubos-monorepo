import { prisma } from "../../prisma";

export async function getAllStaff() {
  return prisma.staff.findMany({
    include: { timesheets: true }
  });
}

export async function getStaffById(id: number) {
  return prisma.staff.findUnique({
    where: { id },
    include: { timesheets: true }
  });
}

export async function clockInStaff(staffId: number) {
  const staff = await prisma.staff.findUnique({ where: { id: staffId } });
  if (!staff) throw new Error("Staff not found");

  const openShift = await prisma.timesheet.findFirst({
    where: { staffId, clockOut: null }
  });
  if (openShift) {
    throw new Error("Staff is already clocked in");
  }

  return prisma.timesheet.create({
    data: { staffId, clockIn: new Date(), clockOut: null }
  });
}

export async function clockOutStaff(staffId: number) {
  const staff = await prisma.staff.findUnique({ where: { id: staffId } });
  if (!staff) throw new Error("Staff not found");

  const openShift = await prisma.timesheet.findFirst({
    where: { staffId, clockOut: null },
    orderBy: { clockIn: "desc" }
  });
  if (!openShift) {
    throw new Error("No active shift to clock out");
  }

  return prisma.timesheet.update({
    where: { id: openShift.id },
    data: { clockOut: new Date() }
  });
}
