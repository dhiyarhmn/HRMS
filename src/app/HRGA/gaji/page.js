"use client";
import TabelGajiHRGA from "@/components/HRGA/gaji/tabelGajiHRGA";
import FormGajiHRGA from "@/components/HRGA/gaji/formGajiHRGA";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import Navbar from "@/components/Navbar/navbar";
import { Modal } from "antd";
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
      <Navbar href={"/HRGA/home"} p={"HRGA"} />
      <NavigationHRGA />

      <section className="flex-grow mt-4 md:mt-6">
        <div className="container mx-auto px-4">
          <div className="bg-second rounded-lg p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <TabelGajiHRGA detail={showModal} />
            </div>
          </div>
        </div>
      </section>

      <Modal
        title="Detail Data"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={modalWidth}
        centered
      >
        {selectedRecord && <FormGajiHRGA selectedRecord={selectedRecord} />}
      </Modal>
    </div>
  );
}
