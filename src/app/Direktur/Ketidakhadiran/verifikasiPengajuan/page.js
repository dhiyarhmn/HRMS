"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationDirektur from "@/components/Direktur/navigation/navigationDirektur";
import { useState, useRef } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabelvpcd from "@/components/Direktur/Ketidakhadiran/tabelvpcd";
import { Card, Input, message } from "antd";
import axios from "axios";
import Link from "next/link";

export default function verifikasiPengajuan() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { TextArea } = Input;
  const [notes, setNotes] = useState(""); // State untuk menyimpan catatan
  const tabelvpcdRef = useRef(null); // Ref untuk mengakses fungsi di Tabelvpcd

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal6").showModal();
  };

  // Fungsi untuk menghandle approve atau decline
  const handleApproval = async (status) => {
    if (!selectedRecord) {
      message.error("Tidak ada data yang dipilih.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Cek apakah token ada
      if (!token) {
        message.error("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      // Request ke API untuk approve/decline
      const response = await axios.post(
        `http://127.0.0.1:8000/api/approvals/${selectedRecord.id_absences}/approve`,
        {
          status: status,
          notes: notes,
        },
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
      if (tabelvpcdRef.current) {
        tabelvpcdRef.current.removeData(selectedRecord.id_absences);
      }

      // Reset state
      setSelectedRecord(null);
      setNotes("");
    } catch (error) {
      console.error("Error:", error);
      message.error(
        "Gagal memperbarui status ketidakhadiran. Silakan coba lagi."
      );
    }
  };

  return (
    <div>
      <Navbar href={"/Direktur/home"} p={"Direktur"} />
      <NavigationDirektur />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="max-w-[85rem] mx-auto w-full p-4">
            <Link
              href="/Direktur/Ketidakhadiran"
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
                  <Tabelvpcd ref={tabelvpcdRef} detail={showmodal} />
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
                        <div className="modal-action justify-center">
                          <button
                            className="btn bg-green-600 hover:bg-green-700 text-white w-[90px] h-[40px]"
                            onClick={() => handleApproval("Approve")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn bg-red-600 hover:bg-red-700 text-white w-[90px] h-[40px]"
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
