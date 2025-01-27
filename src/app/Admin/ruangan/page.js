"use client";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Navbar from "@/components/Navbar/navbar";
import DaftarRuanganAdmin from "@/components/Admin/ruangan/daftarRuanganAdmin";

export default function Ruangan() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar href={"/Admin/home"} p={"Admin"} />
      <NavigationAdmin />

      {/* Main Content */}
      <main className="flex-grow p-6 space-y-8">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Daftar Ruangan
                </h1>
              </div>

              {/* Content */}
              <div className="mt-4">
                <DaftarRuanganAdmin />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
