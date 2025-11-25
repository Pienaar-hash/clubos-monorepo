import { prisma } from "../../prisma";

export async function getAllProducts() {
  return prisma.product.findMany({ orderBy: { name: "asc" } });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({ where: { id } });
}

export async function createProduct(data: { name: string; category?: string; price: number; quantity: number; threshold?: number }) {
  return prisma.product.create({ data });
}

export async function updateProduct(id: number, data: { name?: string; category?: string; price?: number; quantity?: number; threshold?: number }) {
  return prisma.product.update({ where: { id }, data });
}
