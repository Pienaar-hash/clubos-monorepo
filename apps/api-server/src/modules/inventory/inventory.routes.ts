import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct } from "./inventory.service";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updated = await updateProduct(Number(req.params.id), req.body);
    res.json(updated);
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    next(err);
  }
});

export default router;
