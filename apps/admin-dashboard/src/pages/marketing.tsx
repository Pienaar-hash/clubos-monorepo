import { useEffect, useState } from "react";

interface Trigger {
  id: number;
  name: string;
  description: string;
  lastRun: string | null;
  notificationsSent: number;
}

export default function MarketingPage() {
  const [triggers, setTriggers] = useState<Trigger[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/marketing/triggers`)
      .then((res) => res.json())
      .then((data) => setTriggers(data))
      .catch((err) => console.error("Failed to load marketing triggers:", err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Marketing Triggers</h1>
      {triggers.length === 0 ? (
        <p>No marketing triggers configured.</p>
      ) : (
        <ul className="list-disc list-inside text-gray-800">
          {triggers.map((tr) => (
            <li key={tr.id} className="mb-2">
              <p>
                <strong>{tr.name}</strong>: {tr.description}
              </p>
              <p className="text-sm text-gray-600">
                Last Run: {tr.lastRun ? new Date(tr.lastRun).toLocaleDateString() : "Never"} – Notifications Sent: {tr.notificationsSent}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
