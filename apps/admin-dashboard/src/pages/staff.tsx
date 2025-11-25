import { useEffect, useState } from "react";

interface Timesheet {
  id: number;
  clockIn: string;
  clockOut: string | null;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  timesheets: Timesheet[];
}

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/staff`)
      .then((res) => res.json())
      .then((data) => setStaffList(data))
      .catch((err) => console.error("Failed to load staff:", err));
  }, []);

  const getHours = (t: Timesheet) => {
    if (!t.clockOut) return null;
    const start = new Date(t.clockIn).getTime();
    const end = new Date(t.clockOut).getTime();
    const hours = (end - start) / 1000 / 3600;
    return hours.toFixed(1);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Staff</h1>
      {staffList.length === 0 ? (
        <p>No staff data available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-sm rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Role</th>
              <th className="py-2 px-3 text-left">Shifts (count)</th>
              <th className="py-2 px-3 text-left">Hours (last shift)</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => {
              const lastTimesheet = staff.timesheets[staff.timesheets.length - 1];
              return (
                <tr key={staff.id} className="border-b">
                  <td className="py-2 px-3">{staff.name}</td>
                  <td className="py-2 px-3">{staff.role}</td>
                  <td className="py-2 px-3">{staff.timesheets.length}</td>
                  <td className="py-2 px-3">
                    {lastTimesheet
                      ? lastTimesheet.clockOut
                        ? `${getHours(lastTimesheet)}h`
                        : "Currently Clocked In"
                      : "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
