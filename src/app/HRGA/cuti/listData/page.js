"use client";
import Navbar from "@/components/navbar";
import Navigation from "@/components/navigation";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabelldpc from "@/components/tabelldpc";

export default function listData() {
  const links = [
    { href: "/home", text: "Home" },
    { href: "/hrga/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

  const goToDetail = (row) => {
    window.location.href = `/hrga/cuti/detailList?id=${row.id}`;
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
          <div className="w-full flex justify-between items-center">
            <button
              className="btn bg-second"
              onClick={() =>
                (window.location.href = "/hrga/cuti")
              }
            >
              <ArrowLeftOutlined />
              Kembali
            </button>
          </div>
          <h2 className="text-xl font-bold text-black text-center">
            List Data Pengajuan Ketidakhadiran
          </h2>

          <div className="flex w-full justify-center">
            <div className="w-full bg-second p-4 rounded-lg">
              <div className="overflow-x-auto w-full">
                <Tabelldpc onDetail={goToDetail}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}