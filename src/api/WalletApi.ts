export async function getWalletBalance(walletId: string) {
 const API_BASE =import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7017";
 const token = localStorage.getItem("wallet_token");

  if (!token) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const res = await fetch(`${API_BASE}/api/wallet/${walletId}/balance`,
    {
      headers: {
        method: "POST",
        "Content-Type": "application/json",
       // Authorization: `Bearer ${token}`, // ✅ REQUIRED
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch balance");
  }

  return res.json() as Promise<{ walletId: string; balance: number }>;
}






export type GetBalanceResponse = {
  walletId?:string;
  balance?: number;
};



// const API_BASE =import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7017";

// export async function getWalletBalance2(walletId: string): 

// Promise<GetBalanceResponse> {
//   const res = await fetch(`${API_BASE}/api/wallet/wallets/${walletId}/balance`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(walletId),
//   });
//     const data = (await res.json()) as GetBalanceResponse;

//     // Your API returns statuses in the body; also uses HTTP codes
//     if (!res.ok) {
//         const text = await res.text();
//         throw new Error(text || "Failed to fetch balance");
//     }

//     return res.json() as Promise<{ walletId: string; balance: number }>;
// }