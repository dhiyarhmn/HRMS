"use client";
import FormPengajuanLembur from "@/components/formPengajuanLembur";
import Navbar from "@/components/Navbar/navbar";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import Calendar from "@/components/calendarKetidakhadiran";
import Link from "next/link";

export default function Ketidakhadiran() {
  const [selectedAbsence, setSelectedAbsence] = useState("1");
  const [periode, setPeriode] = useState("1");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal4").showModal();
  };

  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"} role="admin" />
      <NavigationAdmin />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="flex justify-center space-x-4">
            <Link
              href="/Admin/Ketidakhadiran/listData"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </Link>
          </div>

          <FormPengajuanLembur
            selectedAbsence={selectedAbsence}
            setSelectedAbsence={setSelectedAbsence}
            periode={periode}
            setPeriode={setPeriode}
          />

          <div className="max-w-[85rem] mx-auto w-full p-4">
            <h2 className="text-xl font-bold text-black text-center mb-6">
              Calendar Ketidakhadiran Pegawai
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
