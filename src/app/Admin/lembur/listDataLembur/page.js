"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabelldpla from "@/components/Admin/Lembur/tabelldpla";

export default function listDataLembur() {

  const goToDetail = (employeeId) => {
    // Redirect ke halaman detail dengan ID Employee
    window.location.href = `/Admin/lembur/detailListLembur?id=${employeeId}`;
  };

  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"} role="admin" />
      <NavigationAdmin />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-4 p-4">
          <div className="max-w-[85rem] mx-auto w-full">
            <button
              className="btn bg-second w-[100px]"
              onClick={() =>
                (window.location.href = "/Admin/lembur")
              }
            >
              <ArrowLeftOutlined />
              Back
            </button>
          <h2 className="text-xl font-bold text-black text-center mb-6">
            List Data Pegawai
          </h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                <Tabelldpla onDetail={goToDetail}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}