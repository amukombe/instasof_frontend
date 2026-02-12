export type LoginUserDto = {
  Email: string;
  Password: string;
};

export type LoginResponse = {
  userId?: string;
  email?: string;
  fullName?: string;
  userRoleName?: string;
  roleId?: number;
  status: string;
  token?: string;
};

/** ✅ NEW: Register DTO */
export type CreateWalletUserDto = {
  FullName: string
  Email: string;
  PhoneNumber: string;
  Password: string;
  ConfirmPassword:string ;
};

/** ✅ NEW: Register response (align to your API style) */
export type RegisterResponse = {
  status: string;
  userId?: number | string;
  walletId?: string;
};

const API_BASE =import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7017";

export async function login(payload: LoginUserDto): 

Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/User/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as LoginResponse;

  // Your API returns statuses in the body; also uses HTTP codes
  if (!res.ok) {
    // data.status should contain INVALID_CREDENTIALS or other
    throw new Error(data?.status || "LOGIN_FAILED");
  }

  return data;
}

/** ✅ NEW: Register */
export async function register(payload: CreateWalletUserDto): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE}/api/User/Register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as RegisterResponse;

  if (!res.ok) {
    throw new Error(data?.status || "REGISTER_FAILED");
  }

  return data;
}