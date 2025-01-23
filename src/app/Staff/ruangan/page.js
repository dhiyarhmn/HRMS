"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";
import DaftarRuanganStaff from "@/components/Staff/ruangan/daftarRuanganStaff";

export default function Ruangan() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar href={"/Staff/home"} p={"Staff"} />
      <NavigationStaff />

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Daftar Ruangan
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-third rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6">
              <DaftarRuanganStaff />
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}
