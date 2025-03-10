"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabeldlpca from "@/components/Admin/Ketidakhadiran/tabeldlpca";
import { Card, message } from "antd";
import axios from "axios";
import Link from "next/link";

export default function detailList() {
  // const [selectedData, setSelectedData] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [employeeId, setEmployeeId] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [dataAnnualLeave, setDataAnnualLeave] = useState({
    leave_total: 0,
    leave_used: 0,
    leave_remaining: 0,
  });

  useEffect(() => {
    // Ambil ID Employee dari URL
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    if (id) {
      setEmployeeId(id);
      fetchEmployeeData(id); // Ambil data employee berdasarkan ID
      fetchAnnualLeaveData(id); // Ambil data Ketidakhadiran tahunan berdasarkan ID
    }
  }, []);

  const fetchEmployeeData = async (employeeId) => {
    try {
      // Ambil token dari localStorage atau cookies
      const token = localStorage.getItem("token");
      // const token = Cookies.get("token"); // Jika token ada di Cookies (gunakan js-cookie)
      console.log(token);

      const response = await axios.get(
        "http://127.0.0.1:8000/api/employeeByRole",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token dalam header
            "Content-Type": "application/json",
          },
        }
      );

      // Cari data employee berdasarkan ID
      const employee = response.data.data.find(
        (emp) => emp["ID Employee"] === parseInt(employeeId)
      );

      if (employee) {
        setEmployeeData(employee); // Set data employee yang ditemukan
      } else {
        console.error("Employee not found");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const fetchAnnualLeaveData = async (employeeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/annualLeaveByIdEmployee/${employeeId}`, // Gunakan employeeId yang dipilih
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { leave_total, leave_used, leave_remaining } = response.data;
      setDataAnnualLeave({ leave_total, leave_used, leave_remaining });
    } catch (error) {
      console.error("Error fetching annual leave data:", error);
    }
  };

  const fetchResetAnnualLeave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/manualResetAnnualLeave",
        {
          id_employee: employeeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Tunggu beberapa detik sebelum refresh
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Delay 1000ms (1 detik) sebelum refresh

      if (response.status === 200) {
        fetchAnnualLeaveData(employeeId);
        message.success("Cuti tahunan berhasil direset.");
      } else {
        message.error("Gagal mereset cuti tahunan.");
      }
    } catch (error) {
      console.error("Error resetting annual leave:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data);
        message.error(
          error.response.data.message || "Gagal mereset cuti tahunan."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        message.error("Tidak ada respons dari server. Silakan coba lagi.");
      } else {
        console.error("Error:", error.message);
        message.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"} role="admin" />
      <NavigationAdmin />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="max-w-[82rem] mx-auto w-full">
            <Link
              href="/Admin/Ketidakhadiran/listData"
              className="btn bg-second w-[100px] flex items-center gap-2 p-4 rounded-full"
            >
              <ArrowLeftOutlined />
              Back
            </Link>
            <h2 className="text-xl font-bold text-black text-center">
              Detail List Data Pengajuan Ketidakhadiran
            </h2>
          </div>

          <div className="max-w-[82rem] mx-auto w-full bg-second rounded-xl shadow-md p-6 overflow-x-auto">
            <div className="flex justify-between space-x-6 w-full">
              <div className="w-1/2 flex flex-col gap-y-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">NIK</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={employeeData ? employeeData.NIK : ""}
                    disabled
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Nama</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={employeeData ? employeeData.Nama : ""}
                    disabled
                  />
                </label>
              </div>
              <div className="w-1/2 flex flex-col gap-y-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Departemen</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={employeeData ? employeeData.Department : ""}
                    disabled
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Jabatan</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={employeeData ? employeeData.Jabatan : ""}
                    disabled
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <div className="flex gap-x-4">
              <button
                className="btn bg-second"
                onClick={() => document.getElementById("modal11").showModal()}
              >
                Info Cuti Tahunan
              </button>
              <dialog
                id="modal11"
                className="modal modal-bottom sm:modal-middle"
              >
                <Card
                  title="Info Cuti Tahunan"
                  style={{
                    width: "100%",
                    maxWidth: 500,
                  }}
                  className="w-full md:max-w-md"
                >
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div className="p-2 flex flex-wrap">
                    <div className="w-full flex">
                      <div className="w-5/12 font-semibold">Jumlah Cuti Tahunan</div>
                      <div className="w-1/12 text-center">:</div>
                      <div className="w-6/12">
                        {dataAnnualLeave.leave_total}
                      </div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-5/12 font-semibold">Cuti Tahunan Terpakai</div>
                      <div className="w-1/12 text-center">:</div>
                      <div className="w-6/12">{dataAnnualLeave.leave_used}</div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-5/12 font-semibold">Cuti Tahunan Tersisa</div>
                      <div className="w-1/12 text-center">:</div>
                      <div className="w-6/12">
                        {dataAnnualLeave.leave_remaining}
                      </div>
                    </div>
                  </div>
                  <div className="modal-action justify-end">
                    <button
                      className="btn bg-blue-500 hover:bg-blue-600 text-white w-[90px] h-[40px]"
                      onClick={() => document.getElementById("modal11").close()}
                    >
                      Close
                    </button>
                  </div>
                </Card>
              </dialog>
              <button
                className="btn bg-second"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Reset Cuti Tahunan
              </button>
              <dialog id="my_modal_1" className="modal">
                <Card
                  title="Reset Cuti Tahunan"
                  style={{ width: "100%", maxWidth: 500 }}
                  className="w-full md:max-w-md"
                >
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <p className="py-4">
                    Apakah Anda Yakin Ingin Reset Cuti Tahunan?
                  </p>
                  <div className="modal-action justify-center">
                    <form method="dialog" className="flex gap-x-4">
                      <button
                        className="btn bg-green-600 text-white h-[40px]"
                        onClick={fetchResetAnnualLeave}
                      >
                        Ya, Reset Sekarang
                      </button>
                      <button className="btn bg-red-600 text-white w-[90px] h-[40px]">
                        Tidak
                      </button>
                    </form>
                  </div>
                </Card>
              </dialog>
            </div>
          </div>

          <div className="max-w-[82rem] mx-auto w-full">
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                  {employeeId && <Tabeldlpca employeeId={employeeId} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
