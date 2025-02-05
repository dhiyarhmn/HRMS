"use client";
import { useEffect, useState } from "react";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import TabelApprovalAdmin from "@/components/Admin/approval/tabelApprovalAdmin";
import Navbar from "@/components/Navbar/navbar";
import { Button, message, Modal, Tag, Select, Input } from "antd";
import { bookingServices } from "@/api/api";
import dayjs from "dayjs";

const { Option } = Select;

export default function Approval() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalWidth, setModalWidth] = useState(600);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [rejectNote, setRejectNote] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 640 ? "95%" : 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setRejectNote("");
  };

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "reject", label: "Reject" },
    { value: "pending", label: "Pending" },
    { value: "accept", label: "Accept" },
  ];

  const handleApproval = async (isApproved) => {
    try {
      if (!selectedRecord) return;

      if (isApproved) {
        await bookingServices.approveBooking(selectedRecord.id_booking);
        setSelectedRecord((prev) => ({
          ...prev,
          booking_status: "Accept",
        }));
        setRefreshTrigger((prev) => prev + 1);
        message.success("Booking ruangan berhasil disetujui");
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error("Gagal memproses approval");
    }
  };

  const showRejectModal = () => {
    setIsModalOpen(false);
    setIsRejectModalOpen(true);
  };

  const handleReject = async () => {
    try {
      if (!rejectNote) {
        message.error("Harap isi alasan penolakan");
        return;
      }

      await bookingServices.rejectBooking(
        selectedRecord.id_booking,
        rejectNote
      );
      setSelectedRecord((prev) => ({
        ...prev,
        booking_status: "Reject",
        notes: rejectNote,
      }));
      setRefreshTrigger((prev) => prev + 1);
      message.success("Booking ruangan berhasil ditolak");
      setIsRejectModalOpen(false);
      setRejectNote("");
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Gagal menolak booking");
    }
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar href={"/Admin/home"} p={"Admin"} role="admin" />
      <NavigationAdmin />

      <main className="flex-grow p-6 space-y-8">
        <section className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Approval Booking
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
                <TabelApprovalAdmin
                  detail={showModal}
                  refreshTrigger={refreshTrigger}
                  statusFilter={statusFilter}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Detail Modal */}
      <Modal
        title={
          <h3 className="text-lg font-semibold text-gray-900">
            Detail Booking Ruangan
          </h3>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div key="footer" className="flex justify-end gap-3">
            {selectedRecord?.booking_status !== "Reject" && (
              <Button
                key="reject"
                type="primary"
                danger
                onClick={showRejectModal}
                className="px-6"
              >
                Tolak
              </Button>
            )}
            {selectedRecord?.booking_status === "Pending" && (
              <Button
                key="approve"
                type="primary"
                onClick={() => handleApproval(true)}
                className="px-6"
              >
                Setujui
              </Button>
            )}
          </div>,
        ]}
        width={modalWidth}
        centered
        className="custom-modal"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-sm font-medium text-gray-700 block mb-1">
                  Nama Ruangan
                </strong>
                <p className="text-base text-gray-900">
                  {selectedRecord.room_name}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-sm font-medium text-gray-700 block mb-1">
                  Departemen
                </strong>
                <p className="text-base text-gray-900">
                  {selectedRecord.department_name}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-sm font-medium text-gray-700 block mb-1">
                  Tanggal Booking
                </strong>
                <p className="text-base text-gray-900">
                  {dayjs(selectedRecord.booking_date).format("DD MMMM YYYY")}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <strong className="text-sm font-medium text-gray-700 block mb-1">
                  Status
                </strong>
                <Tag color={getStatusColor(selectedRecord.booking_status)}>
                  {selectedRecord.booking_status.toUpperCase()}
                </Tag>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                <strong className="text-sm font-medium text-gray-700 block mb-2">
                  Jadwal
                </strong>
                <div className="space-y-1">
                  {selectedRecord.times.map((time, index) => (
                    <p key={index} className="text-base text-gray-900">
                      {time.start} - {time.end}
                    </p>
                  ))}
                </div>
              </div>

              {selectedRecord.booking_status === "Reject" && (
                <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                  <strong className="text-sm font-medium text-gray-700 block mb-2">
                    Alasan Penolakan
                  </strong>
                  <p className="text-base text-gray-900">
                    {selectedRecord.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        title="Alasan Penolakan"
        open={isRejectModalOpen}
        onCancel={() => setIsRejectModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsRejectModalOpen(false)}>
            Batal
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={handleReject}
            disabled={!rejectNote}
          >
            Tolak Booking
          </Button>,
        ]}
      >
        <Input.TextArea
          value={rejectNote}
          onChange={(e) => setRejectNote(e.target.value)}
          placeholder="Masukkan alasan penolakan"
          rows={4}
          maxLength={255}
        />
      </Modal>
    </div>
  );
}
