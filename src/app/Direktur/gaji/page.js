"use client";
import Navbar from "@/components/Navbar/navbar";
import Navigation from "@/components/navigation";
import Tabel from "@/components/tabel";
import { Modal } from "antd";
import { useState } from "react";

export default function Gaji() {
  const links = [
    { href: "/home", text: "Home" },
    { href: "/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // State untuk menyimpan data detail

  const showModal = (record) => {
    setSelectedRecord(record); // Set data dari baris yang dipilih
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <section>
        <Navigation links={links} />
        <div className="flex w-full min-h-[75dvh] justify-center mt-8 p-4 bg-second">
          <div className="flex w-3/4 justify-center bg-white rounded-lg">
            <Tabel detail={showModal} />
          </div>
        </div>
      </section>

      <Modal
        title="Detail Data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        {selectedRecord && (
          <div>
            <p>
              <strong>Name:</strong> {selectedRecord.name}
            </p>
            <p>
              <strong>Age:</strong> {selectedRecord.age}
            </p>
            <p>
              <strong>Address:</strong> {selectedRecord.address}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
