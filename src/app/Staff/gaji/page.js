"use client";
import Navbar from "@/components/Navbar/navbar";
import TabelRiwayatGajiStaff from "@/components/Staff/gaji/tabelRiwayatGajiStaff";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

export default function Gaji() {
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
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar href={"/Staff/home"} p={"Staff"} />
      <NavigationStaff />

      <section className="flex-grow mt-4 md:mt-6">
        <div className="container mx-auto px-4">
          <div className="bg-second rounded-lg p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <TabelRiwayatGajiStaff detail={showModal} />
            </div>
          </div>
        </div>
      </section>

      <Modal
        title="Detail Data"
        open={isModalOpen}
        onCancel={handleCancel}
        width={modalWidth}
        footer={null}
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
                <strong className="text-gray-700 block mb-1">Bulan:</strong>
                <p className="text-gray-900">{selectedRecord.bulan}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong className="text-gray-700 block mb-1">Jumlah:</strong>
                <p className="text-gray-900">{selectedRecord.jumlah}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded sm:col-span-2">
                <strong className="text-gray-700 block mb-1">Status:</strong>
                <p className="text-gray-900">{selectedRecord.status}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
