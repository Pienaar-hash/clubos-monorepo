import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  threshold: number;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Inventory</h1>
      {products.length === 0 ? (
        <p>No products in inventory.</p>
      ) : (
        <table className="min-w-full bg-white shadow-sm rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Product</th>
              <th className="py-2 px-3 text-left">Category</th>
              <th className="py-2 px-3 text-left">Price</th>
              <th className="py-2 px-3 text-left">In Stock</th>
              <th className="py-2 px-3 text-left">Low Stock Threshold</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b">
                <td className="py-2 px-3">{prod.name}</td>
                <td className="py-2 px-3">{prod.category || ""}</td>
                <td className="py-2 px-3">R {(prod.price / 100).toFixed(2)}</td>
                <td className={`py-2 px-3 ${prod.quantity <= prod.threshold ? "text-red-600 font-semibold" : ""}`}>
                  {prod.quantity}
                </td>
                <td className="py-2 px-3">{prod.threshold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
