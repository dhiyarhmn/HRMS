"use client";
import Navbar from "@/components/Navbar/navbar";
import Navigation from "@/components/navigation";
import Tabelldpl from "@/components/tabelldpl";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function listDataLembur() {
  const links = [
    { href: "/home", text: "Home" },
    { href: "/Manager/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

  const goToDetail = (row) => {
    window.location.href = `/Admin/lembur/detailListLembur?id=${row.id}`;
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
              onClick={() => (window.location.href = "/Admin/lembur")}
            >
              <ArrowLeftOutlined />
              Kembali
            </button>
          </div>
          <h2 className="text-xl font-bold text-black text-center">
            List Data Pengajuan Lembur
          </h2>

          <div className="flex w-full justify-center">
            <div className="w-full bg-second p-4 rounded-lg">
              <div className="overflow-x-auto w-full">
                <Tabelldpl onDetail={goToDetail} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
