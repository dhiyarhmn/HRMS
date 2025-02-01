import axios from "axios";
import { message } from "antd";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

let isUnauthorizedHandled = false;

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !isUnauthorizedHandled &&
      !originalRequest.url.includes("/login")
    ) {
      isUnauthorizedHandled = true;
      message.error("Sesi Anda telah berakhir, silakan login kembali.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const login = async (identifier, password) => {
  try {
    const response = await api.post("/login", {
      username: identifier,
      password,
    });
    const { message, data } = response.data;

    if (data.user && data.user.token) {
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return { message, user: data.user, first_login: data.first_login };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Login gagal, mohon periksa kembali username/email dan password Anda";
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

export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Employee Services for New User Registration
export const employeeServices = {
  completeNewUserProfile: async (userData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser?.id_employee) {
        throw new Error("ID Pengguna tidak ditemukan");
      }
      const profileResponse = await api.put(
        `/employee/${currentUser.id_employee}`,
        {
          name: userData.name,
          phone: userData.phone,
          gender: userData.gender,
          date_of_birth: userData.date_of_birth,
          marital_status: userData.marital_status,
          dependents: userData.dependents,
        }
      );
      if (userData.new_password) {
        try {
          await api.put(`/user/password`, {
            old_password: userData.old_password,
            new_password: userData.new_password,
            new_password_confirmation: userData.new_password,
          });
        } catch (passwordError) {
          if (
            passwordError.response?.data?.message ===
            "Current password is incorrect"
          ) {
            throw new Error("Password lama yang anda masukkan tidak tepat");
          }
          if (passwordError.response?.status === 422) {
            const errorMessage =
              passwordError.response.data.errors.new_password[0];
            if (
              errorMessage ===
              "The new password field and old password must be different."
            ) {
              throw new Error(
                "Password baru tidak boleh sama dengan password lama"
              );
            }
          }
          throw passwordError;
        }
      }
      if (profileResponse.data.employee) {
        return {
          success: true,
          message: "Profil berhasil diperbarui",
          data: profileResponse.data.employee,
        };
      }
      return {
        success: false,
        message: profileResponse.data.message,
      };
    } catch (error) {
      console.error("Kesalahan API:", error);
      throw new Error(
        error.message ||
          error.response?.data?.message ||
          "Gagal memperbarui profil"
      );
    }
  },
};

// User Services
export const userServices = {
  getUsers: () => api.get("/users"),
  createUser: (userData) => api.post("/user", userData),
  importUsers: (formData) => {
    return api.post("/user/csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateUser: (id, userData) => api.put(`/user/${id}`, userData),
  getUserById: (id) => api.get(`/user/${id}`),
  deleteUser: (id) => api.delete(`/user/${id}`),
  getUserStats: () => api.get("/user/stat"),
  resetPassword: (data) => api.put("/user/resetPassword", data),
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

// bookingServices
export const bookingServices = {
  getBookings: () => api.get("/books"),
  getUserBookings: () => api.get("/books/list"),
  createBooking: async (bookingData) => {
    try {
      const response = await api.post("/book", bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getBookingById: (id_booking) => api.get(`/book/${id_booking}`),
  approveBooking: (id) => api.put(`/approve/book/${id}`),
  rejectBooking: (id) => api.put(`/reject/book/${id}`),
  deleteBooking: (id) => api.delete(`/book/${id}`),
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
  calculatePayroll: (payrollData) =>
    api.post("/payroll/calculate", payrollData),

  getPayrollSummary: (params) => api.get("/payrolls/summary", params),

  getAllPayroll: () => api.get("/payrolls"),

  getPayrollByMonth: (monthData) =>
    api.get("/payrolls/month", { params: monthData }),

  getEmployeePayroll: async () => {
    try {
      const response = await api.get("/payrolls/employee");
      return {
        data: response.data.data || [],
        message: response.data.message,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        return { data: [], message: "Data penggajian tidak ditemukan" };
      }
      throw error;
    }
  },

  updatePayrollByEmployee: (payrollData) =>
    api.put("/payroll/update", payrollData),

  deletePayroll: (id) => api.delete(`/payroll/${id}`),

  deleteAllPayroll: () => api.delete("/payrolls/delete"),
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

export default api;
