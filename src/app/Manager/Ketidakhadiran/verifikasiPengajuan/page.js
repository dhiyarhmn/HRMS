"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationManager from "@/components/Manager/navigation/navigationManager";
import { useState, useRef } from "react";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabelvpcm from "@/components/Manager/Ketidakhadiran/tabelvpcm";
import { Card, Input, message } from "antd";
import axios from "axios";
import Link from "next/link";

export default function verifikasiPengajuan() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { TextArea } = Input;
  const [notes, setNotes] = useState(""); // State untuk menyimpan catatan
  const [errorMessage, setErrorMessage] = useState(null);
  const tabelvpcmRef = useRef(null); // Ref untuk mengakses fungsi di Tabelvpcm

  const resetForm = () => {
    setNotes("");
    setErrorMessage(null);
  };

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal6").showModal();
  };

  // Fungsi untuk menghandle approve atau decline
  const handleApproval = async (status) => {
    if (!selectedRecord) {
      setErrorMessage("Tidak ada data yang dipilih.");
      return;
    }

    if (notes.length > 255) {
      setErrorMessage("Notes terlalu panjang! Maksimal 255 karakter.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Cek apakah token ada
      if (!token) {
        setErrorMessage("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      // Request ke API untuk approve/decline
      const response = await axios.post(
        `http://127.0.0.1:8000/api/approvals/${selectedRecord.id_absences}/approve`,
        { status, notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Tampilkan pesan sukses
      message.success(response.data.message);

      // Tutup modal
      document.getElementById("modal6").close();

      // Hapus data dari tabel
      if (tabelvpcmRef.current) {
        tabelvpcmRef.current.removeData(selectedRecord.id_absences);
      }

      // Reset state
      setSelectedRecord(null);
      resetForm();
      setNotes("");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Gagal memperbarui status lembur."
        );
      } else if (error.request) {
        setErrorMessage("Tidak ada response dari server.");
      } else {
        setErrorMessage("Terjadi kesalahan.");
      }
    }
  };

  return (
    <div>
      <Navbar href={"/Manager/home"} p={"Manager"} />
      <NavigationManager />
      <main className="flex-grow px-4 py-6 md:px-6 lg:px-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="max-w-[85rem] mx-auto w-full p-4">
            <Link
              href="/Manager/Ketidakhadiran"
              className="btn bg-second w-[100px] flex items-center gap-2 p-4 rounded-full"
            >
              <ArrowLeftOutlined />
              Back
            </Link>
            <h2 className="text-xl font-bold text-black text-center mb-6">
              Verifikasi Pengajuan Ketidakhadiran
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                  <Tabelvpcm ref={tabelvpcmRef} detail={showmodal} />
                  <dialog
                    id="modal6"
                    className="modal modal-bottom sm:modal-middle" onClose={resetForm}
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
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetForm}>
                            ✕
                          </button>
                        </form>
                        <div className="p-2 flex flex-wrap">
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">NIK</div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">{selectedRecord.nik}</div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">Nama</div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">{selectedRecord.name}</div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">
                              Departemen
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">
                              {selectedRecord.department}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">Jabatan</div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">
                              {selectedRecord.position}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">
                              Tanggal Pengajuan
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">
                              {selectedRecord.created_at}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">
                              Jenis Ketidakhadiran
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">
                              {selectedRecord.absence_description}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">
                              Jenis Periode Ketidakhadiran
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">
                              {selectedRecord.absence_type}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">
                              Periode Awal
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">
                              {selectedRecord.start_date}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">
                              Periode Akhir
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">
                              {selectedRecord.end_date}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">Berkas</div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12">
                              {selectedRecord.document ? (
                                <a
                                  href={selectedRecord.document}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  Lihat Berkas
                                </a>
                              ) : (
                                "Tidak Ada Berkas"
                              )}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-6/12 font-semibold">
                              Keterangan
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-5/12 text-justify">
                              {selectedRecord.description}
                            </div>
                          </div>
                        </div>
                        <div className="w-full mt-10">
                          <div className="font-semibold mb-2 pl-2">Notes:</div>
                          <TextArea
                            rows={2}
                            placeholder="Masukkan notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </div>
                        {errorMessage && (
                          <div className="mb-4 text-red-500 text-center">
                            {errorMessage}
                          </div>
                        )}
                        <div className="modal-action justify-center">
                          <button
                            className="btn bg-green-600 text-white hover:bg-green-700 w-[90px] h-[40px]"
                            onClick={() => handleApproval("Approve")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn bg-red-600 text-white hover:bg-red-700 w-[90px] h-[40px]"
                            onClick={() => handleApproval("Rejected")}
                          >
                            Decline
                          </button>
                        </div>
                      </Card>
                    )}
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
