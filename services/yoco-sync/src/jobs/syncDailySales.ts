import pino from "pino";
import { prisma } from "../prisma";
import { fetchAllPayments } from "../utils/fetchTransactions";

const logger = pino();

export async function syncDailySales() {
  logger.info("Fetching Yoco payments...");
  const payments = await fetchAllPayments();
  let newCount = 0;

  for (const payment of payments) {
    try {
      await prisma.payment.upsert({
        where: { externalId: payment.id },
        update: {
          amount: payment.total_amount.amount,
          currency: payment.currency || payment.total_amount.currency || "ZAR",
          method: payment.payment_method,
          status: payment.status,
          createdAt: new Date(payment.created_at)
        },
        create: {
          externalId: payment.id,
          amount: payment.total_amount.amount,
          currency: payment.currency || payment.total_amount.currency || "ZAR",
          method: payment.payment_method,
          status: payment.status,
          createdAt: new Date(payment.created_at)
        }
      });
      newCount++;
    } catch (err) {
      logger.error({ err, paymentId: payment.id }, "Failed to upsert payment");
    }
  }

  logger.info(`Yoco sync: fetched ${payments.length} payments, ${newCount} new records upserted.`);
}
