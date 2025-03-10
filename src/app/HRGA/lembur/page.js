"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState } from "react";
import {
  PlusOutlined,
  UnorderedListOutlined,
  CheckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Tabelhplh from "@/components/HRGA/Lembur/tabelhplh";
import FormPengajuanLembur from "@/components/formPengajuanLembur";
import EditFormLembur from "@/components/editFormLembur";
import { Card } from "antd";
import Link from "next/link";

export default function lembur() {
  const [selectedOvertime, setSelectedOvertime] = useState("1");
  const [periode, setPeriode] = useState("1");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal8").showModal();
  };

  const handleModalOpen = (record) => {
    setSelectedOvertime(record);
    document.getElementById("modal12").showModal();
  };

  const handleEditSuccess = () => {
    document.getElementById("modal12").close();
  };

  return (
    <div>
      <Navbar href={"/HRGA/home"} p={"HRGA"} />
      <NavigationHRGA />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="flex justify-center space-x-4">
            <button
              className="btn bg-second"
              onClick={() => document.getElementById("modal8").showModal()}
            >
              <PlusOutlined />
              Tambah Pengajuan Baru
            </button>
            <Link
              href="/HRGA/lembur/verifikasiLembur"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <CheckOutlined />
              Verifikasi
            </Link>
            <Link
              href="/HRGA/lembur/listDataLembur"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </Link>
            <Link
              href="/HRGA/lembur/calendar"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <CalendarOutlined />
              Calendar
            </Link>
          </div>

          <FormPengajuanLembur
            selectedOvertime={selectedOvertime}
            setSelectedOvertime={setSelectedOvertime}
            periode={periode}
            setPeriode={setPeriode}
          />

          <EditFormLembur
            selectedOvertime={selectedOvertime}
            setSelectedOvertime={setSelectedOvertime}
            periode={periode}
            setPeriode={setPeriode}
            onEditSuccess={handleEditSuccess}
          />

          <div className="max-w-[85rem] mx-auto w-full p-4">
          <h2 className="text-xl font-bold text-black text-center mb-6">
              Riwayat Pengajuan Lembur
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="mb-1"></div>
                <div className="w-full overflow-x-auto">
                  <Tabelhplh modal12={handleModalOpen} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
