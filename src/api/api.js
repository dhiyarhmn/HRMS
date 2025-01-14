import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    const { message, data } = response.data;

    if (data.user && data.user.token) {
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return { message, user: data.user, first_login: data.first_login };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

export const logout = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.reject(error);
  }
};

export const checkAuthUser = async () => {
  try {
    const response = await api.get("/userSession");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// User Services
export const userServices = {
  getUsers: () => api.get("/users"),
  createUser: (userData) => api.post("/user", userData),
  importUsers: (formData) => {
    return api.post("/user/csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Penting: set content type yang benar
      },
    });
  },
  updateUser: (id, userData) => api.put(`/user/${id}`, userData),
  getUserById: (id) => api.get(`/user/${id}`),
  deleteUser: (id) => api.delete(`/user/${id}`),
  getUserStats: () => api.get("/user/stat"),
};

// Role Services
export const roleServices = {
  getRoles: () => api.get("/roles"),
  createRole: (roleData) => api.post("/role", roleData),
  getRoleById: (id) => api.get(`/role/${id}`),
  updateRole: (id, roleData) => api.put(`/role/${id}`, roleData),
  deleteRole: (id) => api.delete(`/role/${id}`),
};

// Department Services
export const departmentServices = {
  getDepartments: () => api.get("/departments"),
  createDepartment: (deptData) => api.post("/department", deptData),
  getDepartmentById: (id) => api.get(`/department/${id}`),
  updateDepartment: (id, deptData) => api.put(`/department/${id}`, deptData),
  deleteDepartment: (id) => api.delete(`/department/${id}`),
};

// Room Services
export const roomServices = {
  getRooms: () => api.get("/rooms"),
  createRoom: (roomData) => api.post("/room", roomData),
  getRoomById: (id) => api.get(`/room/${id}`),
  updateRoom: (id, roomData) => api.put(`/room/${id}`, roomData),
  deleteRoom: (id) => api.delete(`/room/${id}`),
  getListRoomBookings: (roomId) => api.get(`/list/book/${roomId}`),
};

// Room Booking Services
export const bookingServices = {
  getBookings: () => api.get("/books"),
  createBooking: async (bookingData) => {
    try {
      const response = await api.post("/book", {
        id_room: bookingData.id_room,
        booking_date: bookingData.booking_date,
        start_time: bookingData.start_time,
        end_time: bookingData.end_time,
        usage_duration: String(bookingData.usage_duration), // Pastikan dalam format string
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBookingById: (id) => api.get(`/book/${id_booking}`),
  approveBooking: (id) => api.post(`/approve/book/${id}`),
  deleteBooking: (id) => api.delete(`/book/${id}`),
};

// Overtime Services
export const overtimeServices = {
  createOvertime: (overtimeData) => api.post("/overtime/create", overtimeData),
  approveOvertime: (id) => api.post(`/overtime/approve/${id}`),
  getOvertimeApprovals: () => api.get("/overtime"),
  editOvertime: (id) => api.get(`/overtime/${id}/edit`),
  updateOvertime: (id, overtimeData) =>
    api.put(`/overtime/update/${id}`, overtimeData),
  deleteOvertime: (id) => api.delete(`/overtime/${id}`),
};

// Overtime Rate Services
export const overtimeRateServices = {
  getOvertimeRates: () => api.get("/overtime_rate"),
  getOvertimeRateById: (id) => api.get(`/overtime_rate/${id}`),
  updateOvertimeRate: (id, rateData) =>
    api.put(`/overtime_rate/${id}`, rateData),
  deleteOvertimeRate: (id) => api.delete(`/overtime_rate/${id}`),
};

// Annual Leave Services
export const annualLeaveServices = {
  getAnnualLeaves: () => api.get("/annual_leave"),
  getAnnualLeaveById: (id) => api.get(`/annual_leave/${id}`),
  updateAnnualLeave: (id, leaveData) =>
    api.put(`/annual_leave/${id}`, leaveData),
  deleteAnnualLeave: (id) => api.delete(`/annual_leave/${id}`),
};

// Absence Services
export const absenceServices = {
  createAbsence: (absenceData) => api.post("/absence", absenceData),
  getAbsenceById: (id) => api.get(`/absence/${id}`),
  editAbsence: (id) => api.get(`/absence/${id}/edit`),
  updateAbsence: (id, absenceData) => api.put(`/absence/${id}`, absenceData),
  deleteAbsence: (id) => api.delete(`/absence/${id}`),
};

// Absence Detail Services
export const absenceDetailServices = {
  getAbsenceDetails: () => api.get("/details"),
  createAbsenceDetail: (detailData) => api.post("/detail", detailData),
  getAbsenceDetailById: (id) => api.get(`/detail/${id}`),
  updateAbsenceDetail: (id, detailData) => api.put(`/detail/${id}`, detailData),
  deleteAbsenceDetail: (absenceCode) => api.delete(`/detail/${absenceCode}`),
};

// Approval Services
export const approvalServices = {
  getApprovals: () => api.get("/approvals"),
  getApprovalsByRole: () => api.get("/approvals/byrole"),
  getApprovalById: (id) => api.get(`/approvals/${id}`),
  editApproval: (id) => api.get(`/approvals/${id}/edit`),
  approveApproval: (id) => api.post(`/approvals/${id}/approve`),
  updateApproval: (id, approvalData) =>
    api.put(`/approvals/${id}`, approvalData),
  deleteApproval: (id) => api.delete(`/approvals/${id}`),
};

// Employee Services for New User Registration
export const employeeServices = {
  updateNewUserProfile: async (userData) => {
    try {
      const response = await api.put(`/employee/${userData.id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update profile");
    }
  },
  
  // Get employee details
  getEmployeeDetails: async (id) => {
    try {
      const response = await api.get(`/employee/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch employee details");
    }
  },

  completeNewUserProfile: async (userData) => {
    try {
      const response = await api.put("/employee/update", {
        name: userData.name,
        phone: userData.phone,
        gender: userData.gender,
        position: userData.position,
        date_of_birth: userData.date_of_birth
      });

      if (response.data.success) {
        // Update user data in localStorage
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const updatedUserData = {
          ...currentUser,
          first_login: false,
          ...userData
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      }

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update profile");
    }
  },

  // Helper function untuk redirect berdasarkan role
  getHomeRoute: (role) => {
    const roleRoutes = {
      "director": "/Direktur/home",
      "admin": "/Admin/home",
      "hrga": "/HRGA/home",
      "manager": "/Manager/home",
      "staff": "/Staff/home"
    };
    return roleRoutes[role] || "/login";
  }
};

// Allowance Services
export const allowanceServices = {
  getAllowances: () => api.get("/allowances"),
  createAllowance: (allowanceData) => api.post("/allowance", allowanceData),
  getAllowanceById: (id) => api.get(`/allowance/${id}`),
  updateAllowance: (id, allowanceData) =>
    api.put(`/allowance/${id}`, allowanceData),
  deleteAllowance: (id) => api.delete(`/allowance/${id}`),
};

// Deduction Services
export const deductionServices = {
  getDeductions: () => api.get("/deductions"),
  createDeduction: (deductionData) => api.post("/deduction", deductionData),
  getDeductionById: (id) => api.get(`/deduction/${id}`),
  updateDeduction: (id, deductionData) =>
    api.put(`/deduction/${id}`, deductionData),
  deleteDeduction: (id) => api.delete(`/deduction/${id}`),
};

// Other Deduction Services
export const otherDeductionServices = {
  getOtherDeductions: () => api.get("/other_deductions"),
  createOtherDeduction: (deductionData) =>
    api.post("/other_deduction", deductionData),
  getOtherDeductionById: (id) => api.get(`/other_deduction/${id}`),
  updateOtherDeduction: (id, deductionData) =>
    api.put(`/other_deduction/${id}`, deductionData),
  deleteOtherDeduction: (id) => api.delete(`/other_deduction/${id}`),
};

// Bonus Services
export const bonusServices = {
  getBonuses: () => api.get("/bonuses"),
  createBonus: (bonusData) => api.post("/bonus", bonusData),
  getBonusById: (id) => api.get(`/bonus/${id}`),
  updateBonus: (id, bonusData) => api.put(`/bonus/${id}`, bonusData),
  deleteBonus: (id) => api.delete(`/bonus/${id}`),
};

export default api;
