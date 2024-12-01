"use client";
import Navbar from "@/components/navbar";
import Navigation from "@/components/navigation";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabelhpc from "@/components/tabelhpc";
import { Card } from "antd";

export default function detailList() {
  // const [selectedData, setSelectedData] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const links = [
    { href: "/home", text: "Home" },
    { href: "/hrga/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];

  // const openDetailModal = (row) => {
  //   setSelectedData(row);
  //   document.getElementById("detail_modal").showModal();
  // };

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal7").showModal();
  };

  // const closeModal = () => {
  //   document.getElementById("detail_modal").close();
  //   setSelectedData(null);
  // };

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
              onClick={() =>
                (window.location.href =
                  "/hrga/cuti/listData")
              }
            >
              <ArrowLeftOutlined />
              Kembali
            </button>
          </div>
          <h2 className="text-xl font-bold text-black text-center">
            Detail List Data Pengajuan Ketidakhadiran
          </h2>

          <div className="w-full bg-second p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between space-x-6 w-full">
              <div className="w-1/2 flex flex-col gap-y-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">NIK</span>
                  </div>
                  <input
                    type="text"
                    placeholder="123"
                    className="input input-bordered w-full"
                    disabled
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Nama</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Puti Dhiya"
                    className="input input-bordered w-full"
                    disabled
                  />
                </label>
              </div>

              <div className="w-1/2 flex flex-col gap-y-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Departemen</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Marketing"
                    className="input input-bordered w-full"
                    disabled
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Jabatan</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Manager"
                    className="input input-bordered w-full"
                    disabled
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center">
            <div className="flex w-full bg-second p-4 rounded-lg">
              <div className="overflow-x-auto w-full">
                <Tabelhpc detail={showmodal} />
                <dialog
                  id="modal7"
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
                      <div className="modal-action">
                        <button
                          className="btn"
                          onClick={() =>
                            document.getElementById(`modal7`).close()
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
        </div>
      </section>
    </div>
  );
}