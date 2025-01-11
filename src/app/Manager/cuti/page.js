"use client";
import FormPengajuanCuti from "@/components/formPengajuanCuti";
import Navbar from "@/components/Navbar/navbar";
import Navigation from "@/components/navigation";
import Tabelhpc from "@/components/tabelhpc";
import {
  CalendarOutlined,
  CheckOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";

export default function cuti() {
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
              onClick={() => document.getElementById("modal3").showModal()}
            >
              <PlusOutlined />
              Tambah Pengajuan Baru
            </button>

            <button
              className="btn bg-second"
              onClick={() =>
                (window.location.href = "/Manager/cuti/verifikasiPengajuan")
              }
            >
              <CheckOutlined />
              Verifikasi
            </button>
            <button
              className="btn bg-second"
              onClick={() => (window.location.href = "/Manager/cuti/listData")}
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </button>
            <button
              className="btn bg-second"
              onClick={() => (window.location.href = "/Manager/cuti/calendar")}
            >
              <CalendarOutlined />
              Calendar
            </button>
          </div>
          <div className="flex justify-end">
            <button
              className="btn bg-second"
              // onClick={() => document.getElementById("modal3").showModal()}
            >
              Sisa Cuti Tahunan : 12
            </button>
          </div>

          <FormPengajuanCuti
            selectedAbsensi={selectedAbsensi}
            setSelectedAbsensi={setSelectedAbsensi}
            periode={periode}
            setPeriode={setPeriode}
          />

          <div className="flex w-full justify-center bg-second p-4 rounded-lg">
            <div className="overflow-x-auto w-full">
              <Tabelhpc detail={showmodal} />
              <dialog
                id="modal4"
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
                        <div className="w-1/3 font-semibold">Jenis Absensi</div>
                        <div className="w-1/12 text-center">:</div>
                        <div className="w-7/12">
                          {selectedRecord.jenisAbsensi}
                        </div>
                      </div>
                      <div className="w-full flex">
                        <div className="w-1/3 font-semibold">Periode Awal</div>
                        <div className="w-1/12 text-center">:</div>
                        <div className="w-7/12">
                          {selectedRecord.periodeAwal}
                        </div>
                      </div>
                      <div className="w-full flex">
                        <div className="w-1/3 font-semibold">Periode Akhir</div>
                        <div className="w-1/12 text-center">:</div>
                        <div className="w-7/12">
                          {selectedRecord.periodeAkhir}
                        </div>
                      </div>
                      <div className="w-full flex">
                        <div className="w-1/3 font-semibold">Keterangan</div>
                        <div className="w-1/12 text-center">:</div>
                        <div className="w-7/12">
                          {selectedRecord.keterangan}
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
