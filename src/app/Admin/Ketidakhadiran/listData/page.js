"use client";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabelldpca from "@/components/Admin/Ketidakhadiran/tabelldpca";
import Navbar from "@/components/Navbar/navbar";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Link from "next/link";

export default function listData() {
  const goToDetail = (employeeId) => {
    window.location.href = `/Admin/Ketidakhadiran/detailList?id=${employeeId}`;
  };

  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"} role="admin" />
      <NavigationAdmin />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-4 p-4">
          <div className="max-w-[85rem] mx-auto w-full p-4">
            <Link
              href="/Admin/Ketidakhadiran"
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
                  <Tabelldpca onDetail={goToDetail} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
