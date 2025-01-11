"use client";
import Navbar from "@/components/Navbar/navbar";
import Navigation from "@/components/navigation";
import Tabelvpc from "@/components/tabelvpc";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Input } from "antd";
import { useState } from "react";

export default function verifikasiPengajuan() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { TextArea } = Input;

  const links = [
    { href: "/home", text: "Home" },
    { href: "/Direktur/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal6").showModal();
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
          <div className="w-full flex justify-between items-center">
            <button
              className="btn bg-second"
              onClick={() => (window.location.href = "/Direktur/cuti")}
            >
              <ArrowLeftOutlined />
              Kembali
            </button>
          </div>
          <h2 className="text-xl font-bold text-black text-center">
            Verifikasi Pengajuan Ketidakhadiran
          </h2>

          <div className="flex w-full justify-center">
            <div className="w-full bg-second p-4 rounded-lg">
              <div className="overflow-x-auto w-full">
                <Tabelvpc detail={showmodal} />
                <dialog
                  id="modal6"
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
                          <div className="w-1/3 font-semibold">NIK</div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">{selectedRecord.nik}</div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">Nama</div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">{selectedRecord.nama}</div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">Departemen</div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">
                            {selectedRecord.departemen}
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">Jabatan</div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">{selectedRecord.jabatan}</div>
                        </div>
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
                            Jenis Absensi
                          </div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">
                            {selectedRecord.jenisAbsensi}
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">
                            Periode Awal
                          </div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">
                            {selectedRecord.periodeAwal}
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">
                            Periode Akhir
                          </div>
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
                      <div className="w-full mt-10">
                        <div className="font-semibold mb-2 pl-2">Notes:</div>{" "}
                        <TextArea rows={2} placeholder="Masukkan notes" />
                      </div>
                      <div className="modal-action">
                        <button
                          className="btn"
                          onClick={() =>
                            document.getElementById(`modal6`).close()
                          }
                        >
                          Decline
                        </button>
                        <button
                          className="btn"
                          onClick={() =>
                            document.getElementById(`modal6`).close()
                          }
                        >
                          Approve
                        </button>
                      </div>
                    </Card>
                  )}
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
