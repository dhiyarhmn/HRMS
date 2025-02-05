"use client";
import TabelGajiHRGA from "@/components/HRGA/gaji/tabelGajiHRGA";
import FormGajiHRGA from "@/components/HRGA/gaji/formGajiHRGA";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import Navbar from "@/components/Navbar/navbar";
import UpdateGajiModal from "@/components/HRGA/gaji/UpdateGajiModal";
import { Modal } from "antd";
import { useEffect, useState } from "react";

export default function Gaji() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalWidth, setModalWidth] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 640 ? "95%" : 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showDetailModal = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const showUpdateModal = (record) => {
    setSelectedRecord(record);
    setIsUpdateModalOpen(true);
  };

  const handleDetailCancel = () => {
    setIsDetailModalOpen(false);
    setSelectedRecord(null);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar href={"/HRGA/home"} p={"HRGA"} />
      <NavigationHRGA />
      <main className="flex-grow p-6 space-y-8">
        <section className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Data Gaji Karyawan
                </h1>
              </div>

              <div className="mt-4">
                <TabelGajiHRGA
                  detail={showDetailModal}
                  update={showUpdateModal}
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
            Detail Data Gaji
          </h3>
        }
        open={isDetailModalOpen}
        onCancel={handleDetailCancel}
        footer={null}
        width={modalWidth}
        centered
        className="custom-modal"
      >
        {selectedRecord && <FormGajiHRGA selectedRecord={selectedRecord} />}
      </Modal>

      {/* Update Modal */}
      <UpdateGajiModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateCancel}
        selectedRecord={selectedRecord}
      />
    </div>
  );
}
