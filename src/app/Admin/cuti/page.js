"use client";
import Navbar from "@/components/navbar";
import Navigation from "@/components/navigation";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState } from "react";
import {
  PlusOutlined,
  UnorderedListOutlined,
  CheckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Tabelhpl from "@/components/tabelhpl";
import FormPengajuanLembur from "@/components/formPengajuanLembur";
import Calendar from "@/components/calendar2";

export default function cuti() {
  const [selectedAbsensi, setSelectedAbsensi] = useState("1");
  const [periode, setPeriode] = useState("1");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const links = [
    { href: "/home", text: "Home" },
    { href: "/Manager/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal4").showModal();
  };

  return (
    <div>
      <Navbar />
      <Navigation
        links={links}
        headerBg="flex mt-8 bg-transparent"
        navigationBg="bg-third"
      />
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 mt-6 p-8">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className="btn bg-second"
              onClick={() =>
                (window.location.href = "/Admin/cuti/listData")
              }
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </button>
          </div>

          <FormPengajuanLembur
            selectedAbsensi={selectedAbsensi}
            setSelectedAbsensi={setSelectedAbsensi}
            periode={periode}
            setPeriode={setPeriode}
          />

          <div className="flex w-full justify-center bg-second p-4 rounded-lg">
            <div className="overflow-x-auto w-full">
              <Calendar />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
