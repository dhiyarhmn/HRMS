"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabeldlpla from "@/components/Admin/Lembur/tabeldlpla";
import { Card } from "antd";
import axios from "axios";

export default function detailListLembur() {
  // const [selectedData, setSelectedData] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [employeeId, setEmployeeId] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    // Ambil ID Employee dari URL
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    if (id) {
      setEmployeeId(id);
      fetchEmployeeData(id); // Ambil data employee berdasarkan ID
    }
  }, []);

  const fetchEmployeeData = async (employeeId) => {
    try {
      // Ambil token dari localStorage atau cookies
      const token = localStorage.getItem("token");
      // const token = Cookies.get("token"); // Jika token ada di Cookies (gunakan js-cookie)

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

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal8").showModal();
  };

  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"} role="admin" />
      <NavigationAdmin />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="max-w-[82rem] mx-auto w-full">
            <button
              className="btn bg-second w-[100px]"
              onClick={() =>
                (window.location.href = "/Admin/lembur/listDataLembur")
              }
            >
              <ArrowLeftOutlined />
              Back
            </button>
            <h2 className="text-xl font-bold text-black text-center">
              Detail List Data Pengajuan Lembur
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

          <div className="max-w-[82rem] mx-auto w-full">
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                  {employeeId && <Tabeldlpla employeeId={employeeId} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
