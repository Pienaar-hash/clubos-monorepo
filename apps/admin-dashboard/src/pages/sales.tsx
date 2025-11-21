import { useEffect, useState } from "react";

interface Payment {
  id: number;
  externalId: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  createdAt: string;
}

interface Summary {
  totalAmount: number;
  currency: string;
  count: number;
}

const formatCurrency = (cents: number, currency: string) => {
  return `R ${(cents / 100).toFixed(2)}`;
};

export default function SalesPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`)
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error("Failed to load payments:", err));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/summary`)
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Failed to load summary:", err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales</h1>
      {summary && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <p className="font-semibold">
            Total Revenue:{" "}
            <span className="text-green-700">{formatCurrency(summary.totalAmount, summary.currency)}</span>
          </p>
          <p>Total Transactions: {summary.count}</p>
        </div>
      )}
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
      {payments.length === 0 ? (
        <p>No payment data available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-sm rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">Method</th>
              <th className="py-2 px-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.slice(0, 10).map((pay) => (
              <tr key={pay.id} className="border-b">
                <td className="py-2 px-3">{new Date(pay.createdAt).toLocaleString()}</td>
                <td className="py-2 px-3">{formatCurrency(pay.amount, pay.currency)}</td>
                <td className="py-2 px-3">{pay.method}</td>
                <td className="py-2 px-3">{pay.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
