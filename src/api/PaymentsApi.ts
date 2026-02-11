export type MomoDto = {
  phoneNumber: string;
  amount: number;
};

export type PayMobileMoneyResponse = {
  statusCode: string;
  statusDesc: string;
  reference: string;
 // requestId: string;
  // phoneNumber: string;
  // amount: number;
};

const API_BASE =import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7017";
 
export async function depositToWallet(
  payload: MomoDto
):Promise<PayMobileMoneyResponse>{
  const token = localStorage.getItem("wallet_token");
  if (!token) {
    throw new Error("NOT_AUTHENTICATED");
  }
  const res = await fetch(`${API_BASE}/api/Payments/withdraw`, {
    method: "POST",
    headers: {
       "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to submit payment request");
  }
  return res.json();
}

export async function withdrawFromWallet(
  payload: MomoDto
):Promise<PayMobileMoneyResponse> {
  const res = await fetch(`${API_BASE}/api/Payments/Deposit`, {method: "POST", headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`, },body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}