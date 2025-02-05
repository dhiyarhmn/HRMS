"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/navbar";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";
import TabelBookingStaff from "@/components/Staff/ruangan/tabelBookingStaff";
import DaftarRuanganStaff from "@/components/Staff/ruangan/daftarRuanganStaff";
import { Select, Modal, Tag } from "antd";

export default function Ruangan() {
  const [bookingRefreshTrigger, setBookingRefreshTrigger] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalWidth, setModalWidth] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 640 ? "95%" : 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBookingSuccess = () => {
    setBookingRefreshTrigger((prev) => prev + 1);
  };

  const showDetailModal = (record) => {
    setSelectedBooking(record);
    setIsDetailModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "accept":
        return "green";
      case "reject":
        return "red";
      default:
        return "default";
    }
  };

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "pending", label: "Pending" },
    { value: "accept", label: "Accept" },
    { value: "reject", label: "Reject" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar href={"/Staff/home"} p={"Staff"} />
      <NavigationStaff />

      <main className="flex-grow p-6 space-y-8">
        <section className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
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

              <div className="mt-4">
                <TabelBookingStaff
                  refreshTrigger={bookingRefreshTrigger}
                  statusFilter={statusFilter}
                  onShowDetail={showDetailModal}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Daftar Ruangan
                </h1>
              </div>

              <div className="mt-4">
                <DaftarRuanganStaff onBookingSuccess={handleBookingSuccess} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Modal
        title={
          <h3 className="text-lg font-semibold text-gray-900">
            Detail Booking Ruangan
          </h3>
        }
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={null}
        width={modalWidth}
        centered
      >
        {selectedBooking && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">Ruangan</p>
              <p>{selectedBooking.room}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">Tanggal</p>
              <p>{selectedBooking.booking_date}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">Jadwal</p>
              <p>{selectedBooking.time}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">Status</p>
              <Tag color={getStatusColor(selectedBooking.status)}>
                {selectedBooking.status.toUpperCase()}
              </Tag>
            </div>
            {selectedBooking.raw_data.notes &&
              selectedBooking.status === "Reject" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">Alasan Penolakan</p>
                  <p>{selectedBooking.raw_data.notes}</p>
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
}
