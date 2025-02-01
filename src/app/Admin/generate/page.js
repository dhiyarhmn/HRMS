"use client";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Navbar from "@/components/Navbar/navbar";
import { UploadCSV } from "@/components/Admin/generate/generateFormAdmin";

export default function Generate() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar href={"/Admin/home"} p={"Admin"} role="admin" />
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
                  Generate Akun Karyawan
                </h1>
              </div>

              {/* Content */}
              <div className="mt-4">
                {/* Form Container */}
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <UploadCSV />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
