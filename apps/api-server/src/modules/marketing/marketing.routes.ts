import express from "express";

const router = express.Router();

const marketingTriggers = [
  {
    id: 1,
    name: "Inactivity - 3 Weeks",
    description: "Notify players who haven't booked in the last 3 weeks via WhatsApp",
    lastRun: "2025-11-01T00:00:00Z",
    notificationsSent: 4
  },
  {
    id: 2,
    name: "Low Wallet Balance",
    description: "Email players whose wallet balance is below R100",
    lastRun: null,
    notificationsSent: 0
  },
  {
    id: 3,
    name: "Frequent Player Promo",
    description: "Send promo code to players with >5 bookings in a month",
    lastRun: "2025-11-15T00:00:00Z",
    notificationsSent: 10
  }
];

router.get("/triggers", (_req, res) => {
  res.json(marketingTriggers);
});

export default router;
