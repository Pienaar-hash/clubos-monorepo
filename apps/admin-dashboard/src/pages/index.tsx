export default function Home() {
  return (
    <div className="text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Welcome to ClubOS Admin Dashboard</h1>
      <p>Select a section from the navigation bar to view data.</p>
      <ul className="list-disc list-inside mt-3 text-gray-700">
        <li>
          <strong>Bookings:</strong> View recent court bookings and their details.
        </li>
        <li>
          <strong>Sales:</strong> See POS sales transactions and totals.
        </li>
        <li>
          <strong>Staff:</strong> Monitor staff shifts and clock-in status.
        </li>
        <li>
          <strong>Inventory:</strong> Manage pro-shop stock levels.
        </li>
        <li>
          <strong>Marketing:</strong> Review automated marketing triggers.
        </li>
      </ul>
    </div>
  );
}
