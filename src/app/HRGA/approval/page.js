"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import NavigationHRGA from "@/components/navigationHRGA";
import RoomForm from "@/components/roomform";
import room from "@/public/room-1.jpeg";
import Image from "next/image";
import TabelApproval from "@/components/tabelApproval";
import { Modal } from "antd";

export default function Ruangan() {
  const links = [
    { href: "/home", text: "Home" },
    { href: "/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
    { href: "/HRGA/approval", text: "Approval" },
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
      <NavigationHRGA
        links={links}
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
