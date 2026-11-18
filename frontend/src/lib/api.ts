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

export interface DocumentUploadData {
  title: string;
  subject: string;
  semester: string;
  academicYear: string;
  documentType: string;
  description?: string;
  visibility: string;
}

export async function uploadDocument(
  file: File,
  metadata: DocumentUploadData
) {
  const token = getToken();

  if (!token) {
    throw new Error("Please log in to upload documents.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("title", metadata.title);
  formData.append("subject", metadata.subject);
  formData.append("semester", metadata.semester);
  formData.append("academicYear", metadata.academicYear);
  formData.append("documentType", metadata.documentType);
  formData.append("visibility", metadata.visibility);

  if (metadata.description) {
    formData.append("description", metadata.description);
  }

  const response = await fetch(`${API_URL}/api/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || "Document upload failed."
    );
  }

  return data;
}
export interface DocumentResponse {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  semester: number;
  academicYear: string;
  documentType: "NOTES" | "QUESTION_PAPER" | "ASSIGNMENT" | "SYLLABUS" | "BOOK" | "OTHER";
  visibility: "PUBLIC" | "PRIVATE";
  originalFileName: string;
  fileSize: number;
  fileSizeInMB: number;
  uploadedBy: string;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export function getPublicDocuments(
  page=0,
  size=20,
  query=""
) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: "createdAt,desc",
  });

  if (query.trim()) {
    params.set("query", query.trim());
  }

  return request<PageResponse<DocumentResponse>>(
    `/api/documents?${params.toString()}`
  );
}

export function getMyDocuments(page=0, size=20) {
  return request<PageResponse<DocumentResponse>>(
    `/api/documents/my?page=${page}&size=${size}`,
    {},
    true
  );
}


export async function getDocumentFile(
  id: string,
  action: "preview" | "download"
): Promise<Blob> {
  if (!API_URL) throw new Error("Backend API URL is not configured.");

  const token = getToken();

  const response = await fetch(
    `${API_URL}/api/documents/${id}/${action}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );

  if (!response.ok) {
    throw new Error(`Unable to ${action} PDF (${response.status}).`);
  }

  return response.blob();
}

export async function deleteDocument(id: string): Promise<void> {
  if (!API_URL) throw new Error("Backend API URL is not configured.");

  const token = getToken();

  const response = await fetch(`${API_URL}/api/documents/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || data?.error || "Unable to delete document.");
  }
}
