"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/navbar";
import NavigationManager from "@/components/Manager/navigation/navigationManager";
import TabelBookingManager from "@/components/Manager/ruangan/tabelBookingManager";
import DaftarRuanganManager from "@/components/Manager/ruangan/daftarRuanganManager";
import { Select } from "antd";

export default function Ruangan() {
  const [bookingRefreshTrigger, setBookingRefreshTrigger] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleBookingSuccess = () => {
    setBookingRefreshTrigger((prev) => prev + 1);
  };

  // Data options untuk Select
  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "pending", label: "Pending" },
    { value: "accept", label: "Accept" },
    { value: "reject", label: "Reject" },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar href={"/Manager/home"} p={"Manager"} />
      <NavigationManager />

      <main className="flex-grow p-6 space-y-8">
        {/* Section: Daftar Booking */}
        <section className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              {/* Header dan Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Daftar Booking
                </h1>
                <Select
                  defaultValue="all"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                  }}
                  className="!min-w-[200px]"
                  onChange={(value) => setStatusFilter(value)}
                  options={statusOptions}
                />
              </div>

              {/* Tabel */}
              <div className="mt-4">
                <TabelBookingManager
                  refreshTrigger={bookingRefreshTrigger}
                  statusFilter={statusFilter}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section: Daftar Ruangan */}
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
                <DaftarRuanganManager onBookingSuccess={handleBookingSuccess} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
