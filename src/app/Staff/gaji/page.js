"use client";
import { useEffect, useState } from "react";
import TabelRiwayatGajiStaff from "@/components/Staff/gaji/tabelRiwayatGajiStaff";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";
import SlipGajiStaff from "@/components/Staff/gaji/slipGajiStaff";
import Navbar from "@/components/Navbar/navbar";
import { Modal, Tabs } from "antd";

const { TabPane } = Tabs;

export default function Gaji() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar href={"/Staff/home"} p={"Staff"} />
      <NavigationStaff />

      <main className="flex-grow px-4 py-6 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Riwayat Gaji Karyawan
          </h1>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-third rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6">
              <TabelRiwayatGajiStaff detail={showModal} />
            </div>
          </div>
        </div>
      </main>

      <Modal
        title={
          <h3 className="text-lg font-semibold text-gray-900">
            Detail Riwayat Gaji
          </h3>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        width={modalWidth}
        footer={null}
        centered
        className="custom-modal"
      >
        {selectedRecord && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Detail Gaji" key="1">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Periode</h3>
                    <p className="text-lg">{selectedRecord.formattedPeriod}</p>
                  </div>
                  
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Pendapatan
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Gaji Pokok</span>
                      <span>{formatCurrency(selectedRecord.basic_salary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tunjangan</span>
                      <span>
                        {formatCurrency(selectedRecord.total_allowance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bonus</span>
                      <span>{formatCurrency(selectedRecord.total_bonus)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Potongan</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Potongan Wajib</span>
                      <span>
                        {formatCurrency(selectedRecord.total_deduction)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potongan Lainnya</span>
                      <span>
                        {formatCurrency(selectedRecord.total_other_deduction)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Total Gaji Bersih</h3>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(selectedRecord.total_salary)}
                    </span>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Generate Slip Gaji" key="2">
              <SlipGajiStaff selectedRecord={selectedRecord.key} />
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </div>
  );
}
