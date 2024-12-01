"use client";
import Navbar from "@/components/navbar";
import Navigation from "@/components/navigation";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState } from "react";
import {
  PlusOutlined,
  UnorderedListOutlined,
  CheckOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import Tabelhpl from "@/components/tabelhpl";
import FormPengajuanLembur from "@/components/formPengajuanLembur";
import { Card } from "antd";

export default function lembur() {
  const [selectedAbsensi, setSelectedAbsensi] = useState("1");
  const [periode, setPeriode] = useState("1");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const links = [
    { href: "/home", text: "Home" },
    { href: "/Manager/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal4").showModal();
  };

  return (
    <div>
      <Navbar />
      <Navigation
        links={links}
        headerBg="flex mt-8 bg-transparent"
        navigationBg="bg-third"
      />
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 mt-6 p-8">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className="btn bg-second"
              onClick={() => document.getElementById("modal8").showModal()}
            >
              <PlusOutlined />
              Tambah Pengajuan Baru
            </button>

            <button
              className="btn bg-second"
              onClick={() =>
                (window.location.href =
                  "/Manager/lembur/verifikasiLembur")
              }
            >
              <CheckOutlined />
              Verifikasi
            </button>
            <button
              className="btn bg-second"
              onClick={() =>
                (window.location.href =
                  "/Manager/lembur/listDataLembur")
              }
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </button>
            <button
              className="btn bg-second"
              onClick={() =>
                (window.location.href =
                  "/Manager/lembur/calendar")
              }
            >
              <CalendarOutlined />
              Calendar
            </button>
          </div>

          <FormPengajuanLembur
            selectedAbsensi={selectedAbsensi}
            setSelectedAbsensi={setSelectedAbsensi}
            periode={periode}
            setPeriode={setPeriode}
          />

          <div className="flex w-full justify-center bg-second p-4 rounded-lg">
            <div className="overflow-x-auto w-full">
              <Tabelhpl detail={showmodal} />
              <dialog
                  id={"modal4"}
                  className="modal modal-bottom sm:modal-middle"
                >
                  {selectedRecord && (
                    <Card
                      title="Detail"
                      style={{
                        width: "100%",
                        maxWidth: 500,
                      }}
                      className="w-full md:max-w-md"
                    >
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <div className="p-2 flex flex-wrap">
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">
                            Tanggal Pengajuan
                          </div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">
                            {selectedRecord.tanggalPengajuan}
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">
                          Start Time
                          </div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">
                            {selectedRecord.startTime}
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">
                          End Time
                          </div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">
                            {selectedRecord.endTime}
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">
                          Total Hour
                          </div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">
                            {selectedRecord.totalHour}
                          </div>
                        </div>
                      </div>
                      <div className="modal-action">
                        <button
                          className="btn"
                          onClick={() =>
                            document.getElementById(`modal4`).close()
                          }
                        >
                          Close
                        </button>
                      </div>
                    </Card>
                  )}
              </dialog>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
