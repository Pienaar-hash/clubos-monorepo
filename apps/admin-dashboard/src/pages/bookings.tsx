import { useEffect, useState } from "react";

interface Booking {
  id: number;
  startTime: string;
  endTime: string;
  courtName: string | null;
  paid: boolean;
  price: number | null;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Failed to load bookings:", err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Date/Time</th>
              <th className="py-2 px-3 text-left">Court</th>
              <th className="py-2 px-3 text-left">Paid</th>
              <th className="py-2 px-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 10).map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="py-2 px-3">{new Date(booking.startTime).toLocaleString()}</td>
                <td className="py-2 px-3">{booking.courtName || "N/A"}</td>
                <td className="py-2 px-3">{booking.paid ? "Yes" : "No"}</td>
                <td className="py-2 px-3">
                  {booking.price !== null ? `R ${(booking.price / 100).toFixed(2)}` : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
