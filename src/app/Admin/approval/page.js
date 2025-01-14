"use client";
import { useEffect, useState } from "react";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import TabelApprovalAdmin from "@/components/Admin/approval/tabelApprovalAdmin";
import Navbar from "@/components/Navbar/navbar";
import { Button, message, Modal } from "antd";

export default function Approval() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalWidth, setModalWidth] = useState(600);

  // Handle window resize for modal width
  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 640 ? "95%" : 600);
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleApproval = (isApproved) => {
    const action = isApproved
      ? message.success(`Peminjaman ruangan disetujui`)
      : message.error(`Peminjaman ruangan ditolak`);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar href={"/Admin/home"} p={"Admin"} />
      <NavigationAdmin
      />
      {/* Added margin between navigation and content */}
      <section className="flex-grow mt-4 md:mt-6">
        <div className="container mx-auto px-4">
          <div className="bg-second rounded-lg p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <TabelApprovalAdmin detail={showModal} />
            </div>
          </div>
        </div>
      </section>
      <Modal
        title="Detail Data"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="reject"
            type="primary"
            danger
            onClick={() => handleApproval(false)}
            className="mr-2"
          >
            Tolak
          </Button>,
          <Button
            key="approve"
            type="primary"
            onClick={() => handleApproval(true)}
          >
            Setujui
          </Button>,
        ]}
        width={modalWidth}
        centered
      >
        {selectedRecord && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <strong className="text-gray-700 block mb-1">Nama:</strong>
                <p className="text-gray-900">{selectedRecord.nama}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong className="text-gray-700 block mb-1">Divisi:</strong>
                <p className="text-gray-900">{selectedRecord.divisi}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong className="text-gray-700 block mb-1">Ruangan:</strong>
                <p className="text-gray-900">{selectedRecord.ruangan}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong className="text-gray-700 block mb-1">Hari:</strong>
                <p className="text-gray-900">{selectedRecord.hari}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded sm:col-span-2">
                <strong className="text-gray-700 block mb-1">Jam:</strong>
                <p className="text-gray-900">{selectedRecord.jam}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
