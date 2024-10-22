"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { Layout } from "antd";

export default function VerifikasiPengajuan() {
  const { Header, Content, Footer } = Layout;

  // State to store the selected data for the modal
  const [selectedData, setSelectedData] = useState(null);

  // Ref for the modal
  const modalRef = useRef(null);

  const data = [
    {
      id: 1,
      nik: 123,
      name: "Puti Dhiya",
      department: "Marketing",
      position: "Manager",
      status: "Sakit",
    },
    {
      id: 2,
      nik: 234,
      name: "Fikri Prasetya",
      department: "Accounting",
      position: "Staff",
      status: "Sakit",
    },
    {
      id: 3,
      nik: 345,
      name: "Satria Bintang",
      department: "Accounting",
      position: "Manager",
      status: "Sakit",
    },
  ];

  const openModal = (row) => {
    setSelectedData(row);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
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
                (window.location.href = "/Manajer/pengajuanKetidakhadiran")
              }
            >
              Kembali
            </button>
          </div>
          <h2 className="text-xl font-bold text-black mb-6 text-center">
            Verifikasi Pengajuan Ketidakhadiran
          </h2>

          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>NIK</th>
                <th>Nama</th>
                <th>Jenis Absensi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id}>
                  <th>{index + 1}</th>
                  <td>{row.nik}</td>
                  <td>{row.name}</td>
                  <td>{row.status}</td>
                  <th>
                    <button
                      className="text-blue-500 hover:text-blue-700 underline bg-transparent border-none p-0 cursor-pointer text-xs"
                      onClick={() => openModal(row)}
                    >
                      details
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {selectedData && (
            <dialog
              ref={modalRef}
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg text-center">Detail</h3>
                <p className="py-4">
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text text-xs">Nama</span>
                    </div>
                    <input
                      type="text"
                      value={selectedData.name}
                      className="input input-bordered w-full max-w-s"
                      disabled
                    />
                  </label>
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text text-xs">Departemen</span>
                    </div>
                    <input
                      type="text"
                      value={selectedData.department}
                      className="input input-bordered w-full max-w-s"
                      disabled
                    />
                  </label>
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text text-xs">Jabatan</span>
                    </div>
                    <input
                      type="text"
                      value={selectedData.position}
                      className="input input-bordered w-full max-w-s"
                      disabled
                    />
                  </label>
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text text-xs">Jenis Absensi</span>
                    </div>
                    <input
                      type="text"
                      value={selectedData.status}
                      className="input input-bordered w-full max-w-s"
                      disabled
                    />
                  </label>
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-error">Decline</button>
                    <button className="btn btn-success">Approve</button>
                  </form>
                </div>
              </div>
            </dialog>
          )}
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
