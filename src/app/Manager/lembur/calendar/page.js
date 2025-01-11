"use client";
import Calendar from "@/components/calendar2";
import Navbar from "@/components/Navbar/navbar";
import Navigation from "@/components/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function calendar() {
  const links = [
    { href: "/home", text: "Home" },
    { href: "/Manager/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

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
              onClick={() => (window.location.href = "/Manager/lembur")}
            >
              <ArrowLeftOutlined />
              Kembali
            </button>
          </div>
          <h2 className="text-xl font-bold text-black text-center">Calendar</h2>

          <div className="flex w-full justify-center">
            <div className="flex w-full bg-second p-4 rounded-lg">
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
