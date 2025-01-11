"use client";
import TabelApproval from "@/components/HRGA/approval/tabelApproval";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import Navbar from "@/components/Navbar/navbar";
import { Button, message, Modal } from "antd";
import { useState } from "react";

export default function Approval() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // State untuk menyimpan data detail

  const showModal = (record) => {
    setSelectedRecord(record); // Set data dari baris yang dipilih
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

    // Lakukan aksi tambahan di sini, seperti mengirim data ke API
    // Contoh:
    // fetch('/api/approval', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     id: selectedRecord.id,
    //     approved: isApproved
    //   }),
    // });
  };

  return (
    <div>
      <Navbar href={"/HRGA/home"} />
      <NavigationHRGA
        headerBg="flex mt-8 bg-transparent"
        navigationBg="bg-third"
      />
      <section>
        <div className="flex w-full min-h-[75dvh] justify-center mt-8 p-4 bg-second">
          <div className="flex w-3/4 justify-center bg-white rounded-lg">
            <TabelApproval detail={showModal} />
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
        width={600}
      >
        {selectedRecord && (
          <div>
            <p>
              <strong>Nama:</strong> {selectedRecord.nama}
            </p>
            <p>
              <strong>Divisi:</strong> {selectedRecord.divisi}
            </p>
            <p>
              <strong>Ruangan:</strong> {selectedRecord.ruangan}
            </p>
            <p>
              <strong>Hari:</strong> {selectedRecord.hari}
            </p>
            <p>
              <strong>Jam:</strong> {selectedRecord.jam}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
