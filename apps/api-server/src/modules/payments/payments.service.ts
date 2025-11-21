import { prisma } from "../../prisma";

export async function getAllPayments() {
  return prisma.payment.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPaymentById(id: number) {
  return prisma.payment.findUnique({ where: { id } });
}

export async function getPaymentsSummary() {
  const result = await prisma.payment.aggregate({
    _sum: { amount: true },
    _count: { _all: true }
  });

  return {
    totalAmount: result._sum.amount || 0,
    currency: "ZAR",
    count: result._count._all
  };
}
