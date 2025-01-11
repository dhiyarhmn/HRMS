"use client";
import Calendar from "@/components/calendar2";
import FormPengajuanLembur from "@/components/formPengajuanLembur";
import Navbar from "@/components/Navbar/navbar";
import Navigation from "@/components/navigation";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function lembur() {
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
                (window.location.href = "/Admin/lembur/listDataLembur")
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
