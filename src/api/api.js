const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Helper untuk request API
const apiRequest = async (endpoint, method = "GET", body = null, headers = {}) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

// Fungsi-fungsi API berdasarkan endpoint
export const login = (data) => apiRequest("/login", "POST", data);
export const logout = () => {
  localStorage.removeItem("auth_token");
};


// Users
export const getUsers = () => apiRequest("/users");
export const getUserById = (id) => apiRequest(`/user/${id}`);
export const createUser = (data) => apiRequest("/user", "POST", data);
export const updateUser = (id, data) => apiRequest(`/user/${id}`, "PUT", data);
export const deleteUser = (id) => apiRequest(`/user/${id}`, "DELETE");

// Roles
export const getRoles = () => apiRequest("/roles");
export const createRole = (data) => apiRequest("/role", "POST", data);
export const getRoleById = (id) => apiRequest(`/role/${id}`);
export const updateRole = (id, data) => apiRequest(`/role/${id}`, "PUT", data);
export const deleteRole = (id) => apiRequest(`/role/${id}`, "DELETE");

// Absences
export const createAbsence = (data) => apiRequest("/absence", "POST", data);
export const getAbsenceById = (id) => apiRequest(`/absence/${id}`);
export const updateAbsence = (id, data) => apiRequest(`/absence/${id}`, "PUT", data);
export const deleteAbsence = (id) => apiRequest(`/absence/${id}`, "DELETE");