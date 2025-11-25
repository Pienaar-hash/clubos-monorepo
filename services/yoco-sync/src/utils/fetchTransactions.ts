import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const YOCO_LIST_PAYMENTS_URL = "https://api.yoco.com/v1/payments/";

interface YocoPayment {
  id: string;
  created_at: string;
  currency: string;
  payment_method: string;
  status: string;
  amount_excl_tip?: { amount: number; currency: string };
  total_amount: { amount: number; currency: string };
}

export async function fetchAllPayments(): Promise<YocoPayment[]> {
  const apiKey = process.env.YOCO_API_KEY;
  if (!apiKey) throw new Error("Yoco API key not provided");

  const headers = { Authorization: `Bearer ${apiKey}` };
  let payments: YocoPayment[] = [];
  let url: string | null = YOCO_LIST_PAYMENTS_URL;

  while (url) {
    const response = await axios.get(url, { headers });
    const data = response.data;
    if (data.data) {
      payments.push(...data.data);
    }
    url = data.next_cursor ? `${YOCO_LIST_PAYMENTS_URL}?cursor=${data.next_cursor}` : null;
  }

  return payments;
}

export type { YocoPayment };
