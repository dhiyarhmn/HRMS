"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";
import DaftarRuanganStaff from "@/components/Staff/ruangan/daftarRuanganStaff";

export default function Ruangan() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar href={"/Staff/home"} p={"Staff"} />
      <NavigationStaff />
      <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="w-full">
          <DaftarRuanganStaff />
        </div>
      </section>
    </div>
  );
}
