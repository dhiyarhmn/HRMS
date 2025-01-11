"use client";
import FormGaji from "@/components/HRGA/gaji/formgaji";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import Navbar from "@/components/Navbar/navbar";
import Tabel from "@/components/tabel";
import { Modal } from "antd";
import { useState } from "react";

export default function Gaji() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // State untuk menyimpan data detail

  const showModal = (record) => {
    setSelectedRecord(record); // Set data dari baris yang dipilih
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar href={"/HRGA/home"} />
      <NavigationHRGA />
      <section>
        <div className="flex w-full min-h-[75dvh] justify-center mt-8 p-4 bg-second">
          <div className="flex w-3/4 justify-center bg-white rounded-lg">
            <Tabel detail={showModal} />
          </div>
        </div>
      </section>

      <Modal
        title="Detail Data"
        open={isModalOpen}
        width={600}
        footer={null}
        onCancel={handleCancel}
      >
        <FormGaji />
      </Modal>
    </div>
  );
}
