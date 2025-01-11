"use client";
import Calendar from "@/components/calendar2";
import Navbar from "@/components/Navbar/navbar";
import Navigation from "@/components/navigation";
import { CheckOutlined, UnorderedListOutlined } from "@ant-design/icons";

export default function listData() {
  const links = [
    { href: "/home", text: "Home" },
    { href: "/Direktur/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

  const goToDetail = (row) => {
    window.location.href = `/Direktur/cuti/detailList?id=${row.id}`;
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
                (window.location.href = "/Direktur/cuti/verifikasiPengajuan")
              }
            >
              <CheckOutlined />
              Verifikasi
            </button>
            <button
              className="btn bg-second"
              onClick={() => (window.location.href = "/Direktur/cuti/listData")}
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </button>
          </div>
          {/* <h2 className="text-xl font-bold text-black text-center">
            Calendar
          </h2> */}

          <div className="flex w-full justify-center">
            <div className="w-full bg-second p-4 rounded-lg">
              <div className="overflow-x-auto w-full">
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
