"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import { useState, useRef } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Tabelvplh from "@/components/HRGA/Lembur/tabelvplh";
import { Card, Input, message } from "antd";
import axios from "axios";
import Link from "next/link";

export default function VerifikasiPengajuan() {
  const [selectedRecord, setSelectedRecord] = useState(null); // State untuk menyimpan data yang dipilih
  const { TextArea } = Input;
  const [notes, setNotes] = useState(""); // State untuk menyimpan catatan
  const [errorMessage, setErrorMessage] = useState(null);
  const tabelvplhRef = useRef(null); // Ref untuk mengakses fungsi di Tabelvplh

  const resetForm = () => {
    setNotes("");
    setErrorMessage(null);
  };

  // Fungsi untuk menampilkan modal detail
  const showmodal = (record) => {
    setSelectedRecord(record); // Set data yang dipilih
    document.getElementById("modal11").showModal(); // Tampilkan modal
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
        `http://127.0.0.1:8000/api/overtime/approve/${selectedRecord.id_overtime}`,
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
      document.getElementById("modal11").close();

      // Hapus data dari tabel
      if (tabelvplhRef.current) {
        tabelvplhRef.current.removeData(selectedRecord.id_overtime);
      }

      // Reset state
      setSelectedRecord(null);
      resetForm();
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
      <Navbar href={"/HRGA/home"} p={"HRGA"} />
      <NavigationHRGA />
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="max-w-[85rem] mx-auto w-full p-4">
            <Link
              href="/HRGA/lembur"
              className="btn bg-second w-[100px] flex items-center gap-2 p-4 rounded-full"
            >
              <ArrowLeftOutlined />
              Back
            </Link>
            <h2 className="text-xl font-bold text-black text-center mb-6">
              Verifikasi Pengajuan Lembur
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                  <Tabelvplh ref={tabelvplhRef} detail={showmodal} />
                  <dialog
                    id="modal11"
                    className="modal modal-bottom sm:modal-middle"
                    onClose={resetForm}
                  >
                    {selectedRecord && (
                      <Card
                        title="Detail"
                        style={{ width: "100%", maxWidth: 500 }}
                      >
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetForm}>
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
                            <div className="w-7/12">{selectedRecord.name}</div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-1/3 font-semibold">
                              Departemen
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-7/12">
                              {selectedRecord.department}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-1/3 font-semibold">Jabatan</div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-7/12">
                              {selectedRecord.position}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-1/3 font-semibold">
                              Tanggal Pengajuan
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-7/12">
                              {selectedRecord.submission_time}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-1/3 font-semibold">
                              Start Time
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-7/12">
                              {selectedRecord.start_time}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-1/3 font-semibold">End Time</div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-7/12">
                              {selectedRecord.end_time}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-1/3 font-semibold">
                              Total Hour
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-7/12">
                              {selectedRecord.total_hours}
                            </div>
                          </div>
                          <div className="w-full flex">
                            <div className="w-1/3 font-semibold">
                              Keterangan
                            </div>
                            <div className="w-1/12 text-center">:</div>
                            <div className="w-7/12">
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
