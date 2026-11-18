const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AuthResponse {
  id: string;
  fullName: string;
  email: string;
  role: string;
  token: string;
  tokenType: string;
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export function saveToken(token: string) {
  localStorage.setItem("campusmind_token", token);
}

export function getToken() {
  return localStorage.getItem("campusmind_token");
}

export function removeToken() {
  localStorage.removeItem("campusmind_token");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  authenticated = false
): Promise<T> {
  if (!API_URL) {
    throw new Error("Backend API URL is not configured.");
  }

  const token = authenticated ? getToken() : null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Request failed (${response.status})`
    );
  }

  return data as T;
}

export function registerUser(
  fullName: string,
  email: string,
  password: string
) {
  return request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
  });
}

export function loginUser(email: string, password: string) {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser() {
  return request<UserResponse>("/api/auth/me", {
    method: "GET",
  }, true);
}