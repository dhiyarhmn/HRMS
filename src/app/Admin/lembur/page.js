"use client";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState } from "react";
import Navbar from "@/components/Navbar/navbar";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import {
  PlusOutlined,
  UnorderedListOutlined,
  CheckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
// import FormPengajuanLembur from "@/components/formPengajuanLembur";
import Calendar from "@/components/calendarLembur";

export default function lembur() {
  const [selectedAbsence, setSelectedAbsence] = useState("1");
  const [periode, setPeriode] = useState("1");
  const [selectedRecord, setSelectedRecord] = useState(null);

  // const showmodal = (record) => {
  //   setSelectedRecord(record);
  //   document.getElementById("modal4").showModal();
  // };

  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"} role="admin" />
      <NavigationAdmin />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="flex justify-center space-x-4">
            <button
              className="btn bg-second"
              onClick={() =>
                (window.location.href = "/Admin/lembur/listDataLembur")
              }
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </button>
          </div>

          <div className="max-w-[85rem] mx-auto w-full">
            <h2 className="text-xl font-bold text-black text-center mb-6">
            Calendar Lembur Pegawai
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                  <Calendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
