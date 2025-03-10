"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationDirektur from "@/components/Direktur/navigation/navigationDirektur";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState } from "react";
import {
  PlusOutlined,
  UnorderedListOutlined,
  CheckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
// import FormPengajuanLembur from "@/components/formPengajuanLembur";
import Calendar from "@/components/calendarLembur";
import Link from "next/link";

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
      <Navbar href={"/Direktur/home"} p={"Direktur"} />
      <NavigationDirektur />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="flex justify-center space-x-4">
            <Link
              href="/Direktur/lembur/listDataLembur"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </Link>
          </div>

          <div className="max-w-[85rem] mx-auto w-full p-4">
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
