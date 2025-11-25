import express from "express";
import { getAllStaff, getStaffById, clockInStaff, clockOutStaff } from "./staff.service";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const staffList = await getAllStaff();
    res.json(staffList);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const staffId = Number(req.params.id);
    const staff = await getStaffById(staffId);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.json(staff);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/clockin", async (req, res, next) => {
  try {
    const staffId = Number(req.params.id);
    await clockInStaff(staffId);
    res.status(200).json({ message: "Staff clocked in" });
  } catch (err: any) {
    if (err.message === "Staff not found") {
      return res.status(404).json({ error: "Staff not found" });
    }
    if (err.message === "Staff is already clocked in") {
      return res.status(400).json({ error: "Staff already clocked in" });
    }
    next(err);
  }
});

router.post("/:id/clockout", async (req, res, next) => {
  try {
    const staffId = Number(req.params.id);
    await clockOutStaff(staffId);
    res.status(200).json({ message: "Staff clocked out" });
  } catch (err: any) {
    if (err.message === "Staff not found") {
      return res.status(404).json({ error: "Staff not found" });
    }
    if (err.message === "No active shift to clock out") {
      return res.status(400).json({ error: "No active shift to clock out" });
    }
    next(err);
  }
});

export default router;
