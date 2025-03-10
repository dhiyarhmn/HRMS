"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationDirektur from "@/components/Direktur/navigation/navigationDirektur";
import { UnorderedListOutlined, CheckOutlined } from "@ant-design/icons";
import Calendar from "@/components/calendarKetidakhadiran";
import Link from "next/link";

export default function listData() {
  const goToDetail = (row) => {
    window.location.href = `/Direktur/Ketidakhadiran/detailList?id=${row.id}`;
  };

  return (
    <div>
      <Navbar href={"/Direktur/home"} p={"Direktur"} />
      <NavigationDirektur />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="flex justify-center space-x-4">
            <Link
              href="/Direktur/Ketidakhadiran/verifikasiPengajuan"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <CheckOutlined />
              Verifikasi
            </Link>
            <Link
              href="/Direktur/Ketidakhadiran/listData"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </Link>
          </div>

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
