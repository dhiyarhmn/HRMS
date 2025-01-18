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
      // Hapus window.location.href untuk mencegah reload
      // Gunakan router.push sebagai gantinya di komponen
      return Promise.reject(error);
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
    // Tangkap pesan error dari backend
    const errorMessage =
      error.response?.data?.message ||
      "Login gagal, cek kembali username dan password";
    throw new Error(errorMessage);
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
      const response = await api.post("/book", bookingData); // Langsung kirim bookingData tanpa modifikasi
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBookingById: (id_booking) => api.get(`/book/${id_booking}`),
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
      throw new Error(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  },

  getHomeRoute: (role) => {
    const routes = {
      staff: "/Staff/home",
      manager: "/Manager/home",
      hrga: "/HRGA/home",
      director: "/Direktur/home",
      admin: "/Admin/home",
    };
    const normalizedRole = role?.toLowerCase();
    return routes[normalizedRole] || "/login";
  },

  completeNewUserProfile: async (userData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser?.id_employee) {
        throw new Error("User ID not found");
      }

      // Hapus position dari userData jika tidak diperlukan
      const requestData = {
        name: userData.name,
        phone: userData.phone,
        gender: userData.gender,
        date_of_birth: userData.date_of_birth,
      };

      // Hanya tambahkan position jika ada
      if (userData.position) {
        requestData.position = userData.position;
      }

      const response = await api.put(`/employee/update`, requestData);

      // Periksa status response
      if (response.status === 200 && response.data.employee) {
        // Update local storage dengan data baru
        const updatedUserData = {
          ...currentUser,
          ...response.data.employee,
          isProfileCompleted: true,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        return {
          success: true,
          message: response.data.message,
          data: response.data.employee,
        };
      }

      return {
        success: false,
        message: response.data.message || "Failed to update profile",
      };
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile";
      throw new Error(errorMessage);
    }
  },

  completeNewUserProfile: async (userData) => {
    try {
      // Ambil user data dari localStorage
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser?.id_employee) {
        throw new Error("User ID not found");
      }

      const response = await api.put(`/employee/${currentUser.id_employee}`, {
        name: userData.name,
        phone: userData.phone,
        gender: userData.gender,
        position: userData.position,
        date_of_birth: userData.date_of_birth,
      });

      if (response.data.employee) {
        // Update user data in localStorage
        const updatedUserData = {
          ...currentUser,
          ...response.data.employee,
          first_login: false,
          isProfileCompleted: true,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        return {
          success: true,
          message: response.data.message,
          data: response.data.employee,
        };
      }

      return {
        success: false,
        message: response.data.message,
      };
    } catch (error) {
      console.error("API Error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  },
};

// Allowance Services
export const allowanceServices = {
  getAllowances: () => api.get("/allowances"),
  createAllowance: (allowanceData) => {
    return api.post("/allowance", allowanceData);
  },
  getAllowanceById: (id) => api.get(`/allowance/${id}`),
  updateAllowance: (id, allowanceData) =>
    api.put(`/allowance/${id}`, allowanceData),
  deleteAllowance: (id) => api.delete(`/allowance/${id}`),
};

// Deduction Services
export const deductionServices = {
  getDeductions: () => api.get("/deductions"),
  createDeduction: (deductionData) => {
    return api.post("/deduction", deductionData);
  },
  getDeductionById: (id) => api.get(`/deduction/${id}`),
  updateDeduction: (id, deductionData) =>
    api.put(`/deduction/${id}`, deductionData),
  deleteDeduction: (id) => api.delete(`/deduction/${id}`),
};

// Other Deduction Services
export const otherDeductionServices = {
  getOtherDeductions: () => api.get("/other_deductions"),
  createOtherDeduction: (deductionData) => {
    return api.post("/other_deduction", deductionData);
  },
  getOtherDeductionById: (id) => api.get(`/other_deduction/${id}`),
  updateOtherDeduction: (id, deductionData) =>
    api.put(`/other_deduction/${id}`, deductionData),
  deleteOtherDeduction: (id) => api.delete(`/other_deduction/${id}`),
};

// Bonus Services
export const bonusServices = {
  getBonuses: () => api.get("/bonuses"),
  createBonus: (bonusData) => {
    return api.post("/bonus", bonusData);
  },
  getBonusById: (id) => api.get(`/bonus/${id}`),
  updateBonus: (id, bonusData) => api.put(`/bonus/${id}`, bonusData),
  deleteBonus: (id) => api.delete(`/bonus/${id}`),
};

// Payroll Services
export const payrollServices = {
  // Menghitung payroll untuk karyawan tertentu
  calculatePayroll: (payrollData) =>
    api.post("/payroll/calculate", payrollData),

  // Mendapatkan semua data payroll
  getAllPayroll: () => api.get("/payrolls"),

  // Mendapatkan payroll berdasarkan bulan
  getPayrollByMonth: (monthData) =>
    api.get("/payrolls/month", { params: monthData }),

  // Mendapatkan payroll berdasarkan karyawan
  getPayrollByEmployee: (employeeData) =>
    api.get("/payrolls/employee", {
      params: { id_employee: employeeData.id_employee },
    }),

  // Update payroll karyawan
  updatePayrollByEmployee: (payrollData) =>
    api.put("/payroll/update", payrollData),

  // Menghapus payroll tertentu
  deletePayroll: (id) => api.delete(`/payroll/${id}`),

  // Menghapus semua data payroll
  deleteAllPayroll: () => api.delete("/payrolls/delete"),
};

export default api;
