"use client";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { Layout } from "antd";
import { useState } from "react";

export default function detailList() {
  const { Header, Content, Footer } = Layout;

  const [selectedData, setSelectedData] = useState(null);

  const data = [
    {
      id: 1,
      tanggalPengajuan: "26-09-2024",
      jenisAbsensi: "Sakit",
      berkas: "Surat Dokter",
      status: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#98D8AA" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4"
            stroke="white"
          />
        </svg>
      ),
      // status: "Sakit",
    },
    {
      id: 2,
      tanggalPengajuan: "01-10-204",
      jenisAbsensi: "Terlambat",
      berkas: "Tidak Ada Berkas",
      status: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#FF6D60" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            stroke="white"
          />
        </svg>
      ),
      // status: "Sakit",
    },
    {
      id: 3,
      tanggalPengajuan: "15-10-2024",
      jenisAbsensi: "Izin",
      berkas: "Tidak Ada Berkas",
      status: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#F7D060" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01"
            stroke="white"
          />
        </svg>
      ),
      // status: "Sakit",
    },
  ];

  const openDetailModal = (row) => {
    setSelectedData(row);
    document.getElementById("detail_modal").showModal();
  };

  const closeModal = () => {
    document.getElementById("detail_modal").close();
    setSelectedData(null);
  };

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 20,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        className="bg-transparent justify-center"
      >
        <div className="flex items-center bg-white h-auto gap-x-8 px-12 rounded-full">
          <Image src={dihi} className="h-10 w-10" alt="DIHI logo" />
          <a href="#section1">Cuti</a>
          <a href="#section2">Lembur</a>
          <a href="#section3">Ruangan</a>
          <a href="#section4">Gaji</a>
        </div>
      </Header>

      <Content
        style={{
          padding: "0 48px",
          marginTop: "80px",
        }}
      >
        <div
          id="section1"
          className="flex flex-col w-full h-dvh gap-y-12 justify-center items-center"
        >
          <div className="w-full flex justify-between items-center">
            <button
              className="btn btn-success text-xs px-6"
              style={{ alignSelf: "flex-start" }}
              onClick={() =>
                (window.location.href =
                  "/Manajer/pengajuanKetidakhadiran/listData")
              }
            >
              Kembali
            </button>
          </div>
          <h2 className="text-xl font-bold text-black mb-6 text-center">
            Detail List Data Pengajuan Ketidakhadiran
          </h2>

          <div className="w-full bg-green-100 p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between space-x-6">
              <div className="w-1/2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">NIK</span>
                  </div>
                  <input
                    type="text"
                    placeholder="123"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nama</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Puti Dhiya"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </label>
              </div>

              <div className="w-1/2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Departemen</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Marketing"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Jabatan</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Manager"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />
                </label>
              </div>
            </div>
          </div>

          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal Pengajuan</th>
                <th>Jenis Absensi</th>
                <th>Berkas</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id}>
                  <th>{index + 1}</th>
                  <td>{row.tanggalPengajuan}</td>
                  <td>{row.jenisAbsensi}</td>
                  <td>{row.berkas}</td>
                  <td>{row.status}</td>
                  <th>
                    <button
                      className="text-blue-500 hover:text-blue-700 underline bg-transparent border-none p-0 cursor-pointer text-xs"
                      onClick={() => openDetailModal(row)}
                    >
                      details
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          <dialog id="detail_modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </form>
              {selectedData && (
                <>
                  <h3 className="font-bold text-lg text-center">Detail</h3>
                  <p className="py-4">
                    <label className="form-control w-full max-w-s">
                      <div className="label">
                        <span className="label-text">Tanggal Pengajuan</span>
                      </div>
                      <input
                        type="text"
                        value={selectedData.tanggalPengajuan}
                        className="input input-bordered w-full max-w-s"
                        disabled
                      />
                    </label>
                    <label className="form-control w-full max-w-s">
                      <div className="label">
                        <span className="label-text">Jenis Absensi</span>
                      </div>
                      <input
                        type="text"
                        value={selectedData.jenisAbsensi}
                        className="input input-bordered w-full max-w-s"
                        disabled
                      />
                    </label>
                    <label className="form-control w-full max-w-s">
                      <div className="label">
                        <span className="label-text">Berkas</span>
                      </div>
                      <input
                        type="text"
                        value={selectedData.berkas}
                        className="input input-bordered w-full max-w-s"
                        disabled
                      />
                    </label>
                    <label className="form-control w-full max-w-s">
                      <div className="label">
                        <span className="label-text">Periode Absensi</span>
                      </div>
                      <input
                        type="text"
                        placeholder="26-09-2024 sampai 26-09-2024"
                        className="input input-bordered w-full max-w-s"
                        disabled
                      />
                    </label>
                    <label className="form-control w-full max-w-s">
                      <div className="label">
                        <span className="label-text">Keterangan</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Aku Sakit"
                        className="input input-bordered w-full max-w-s"
                        disabled
                      />
                    </label>
                  </p>
                </>
              )}
              <div className="modal-action">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
        }}
        className="bg-[#027D01]"
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
