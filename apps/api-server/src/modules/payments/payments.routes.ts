import express from "express";
import { getAllPayments, getPaymentById, getPaymentsSummary } from "./payments.service";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const payments = await getAllPayments();
    res.json(payments);
  } catch (err) {
    next(err);
  }
});

router.get("/summary", async (_req, res, next) => {
  try {
    const summary = await getPaymentsSummary();
    res.json(summary);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const payment = await getPaymentById(Number(req.params.id));
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json(payment);
  } catch (err) {
    next(err);
  }
});

export default router;
