import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PLAYTOMIC_TOKEN_URL = "https://api.playtomic.io/oauth/token";
const PLAYTOMIC_BOOKINGS_URL = "https://api.playtomic.io/v1/bookings";

export interface PlaytomicBooking {
  id: string;
  start_time: string;
  end_time: string;
  court?: { id: string; name: string };
  players?: any[];
  payment_status?: string;
  price?: number;
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PLAYTOMIC_CLIENT_ID;
  const clientSecret = process.env.PLAYTOMIC_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Playtomic API credentials not set");
  }
  const response = await axios.post(PLAYTOMIC_TOKEN_URL, {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials"
  });
  return response.data.access_token;
}

export async function fetchBookingsForDate(date: Date): Promise<PlaytomicBooking[]> {
  const token = await getAccessToken();
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const startDate = `${y}-${m}-${d}T00:00:00Z`;
  const endDate = `${y}-${m}-${d}T23:59:59Z`;
  const clubId = process.env.PLAYTOMIC_CLUB_ID;

  let url = `${PLAYTOMIC_BOOKINGS_URL}?start=${startDate}&end=${endDate}`;
  if (clubId) {
    url += `&club_id=${clubId}`;
  }

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}
