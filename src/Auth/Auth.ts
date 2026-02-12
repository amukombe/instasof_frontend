import { jwtDecode } from "jwt-decode"

type WalletToken = {
  walletid: string;
  email: string;
  sub: string;
  role:string;
  roleid:string;
};

export function getWalletIdFromToken(): string | null {
  const token = localStorage.getItem("wallet_token");
 if (!token) throw new Error("NOT_AUTHENTICATED");

  try {
    const decoded = jwtDecode<WalletToken>(token);
    return decoded.walletid;
  } catch {
    return null;
  }
}