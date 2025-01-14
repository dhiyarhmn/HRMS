"use client";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Navbar from "@/components/Navbar/navbar";
import DaftarRuanganAdmin from "@/components/Admin/ruangan/daftarRuanganAdmin";

export default function Ruangan() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar href={"/Admin/home"} p={"Admin"} />
      <NavigationAdmin />
      <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="w-full">
          <DaftarRuanganAdmin />
        </div>
      </section>
    </div>
  );
}
