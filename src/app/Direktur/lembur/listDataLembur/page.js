"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationDirektur from "@/components/Direktur/navigation/navigationDirektur";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabelldpld from "@/components/Direktur/Lembur/tabelldpld";
import Link from "next/link";

export default function listDataLembur() {

  const goToDetail = (employeeId) => {
    // Redirect ke halaman detail dengan ID Employee
    window.location.href = `/Direktur/lembur/detailListLembur?id=${employeeId}`;
  };

  return (
    <div>
      <Navbar href={"/Direktur/home"} p={"Direktur"} />
      <NavigationDirektur />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-4 p-4">
          <div className="max-w-[85rem] mx-auto w-full p-4">
            <Link
              href="/Direktur/lembur"
              className="btn bg-second w-[100px] flex items-center gap-2 p-4 rounded-full"
            >
              <ArrowLeftOutlined />
              Back
            </Link>
          <h2 className="text-xl font-bold text-black text-center mb-6">
            List Data Pegawai
          </h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                <Tabelldpld onDetail={goToDetail}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}