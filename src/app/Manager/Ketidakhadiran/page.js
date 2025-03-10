"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationManager from "@/components/Manager/navigation/navigationManager";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState, useEffect } from "react";
import {
  PlusOutlined,
  UnorderedListOutlined,
  CheckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Tabelhpcm from "@/components/Manager/Ketidakhadiran/tabelhpcm";
import FormPengajuanKetidakhadiran from "@/components/formPengajuanKetidakhadiran";
import EditFormKetidakhadiran from "@/components/editFormKetidakhadiran";
import { Card } from "antd";
import axios from "axios";
import Link from "next/link";

export default function Ketidakhadiran() {
  const [selectedAbsence, setSelectedAbsence] = useState("1");
  const [periode, setPeriode] = useState("1");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [dataAnnualLeave, setDataAnnualLeave] = useState({
    leave_total: 0,
    leave_used: 0,
    leave_remaining: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil token dari localStorage atau cookies
        const token = localStorage.getItem("token");
        // const token = Cookies.get("token"); // Jika token ada di Cookies (gunakan js-cookie)

        // console.log(token);

        const response = await axios.get(
          "http://127.0.0.1:8000/api/annualLeaveByAuth",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token dalam header
              "Content-Type": "application/json",
            },
          }
        );

        // Ambil data langsung dari response.data
        const { leave_total, leave_used, leave_remaining } = response.data;

        // Simpan data ke state
        setDataAnnualLeave({
          leave_total,
          leave_used,
          leave_remaining,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal3").showModal();
  };

  const handleModalOpen = (record) => {
    setSelectedAbsence(record);
    document.getElementById("modal13").showModal();
  };

  const handleEditSuccess = () => {
    document.getElementById("modal13").close();
  };

  return (
    <div>
      <Navbar href={"/Manager/home"} p={"Manager"} />
      <NavigationManager />
      <main className="flex-grow px-4 py-6 md:px-6 lg:px-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="flex justify-center space-x-4">
            <button
              className="btn bg-second"
              onClick={() => document.getElementById("modal3").showModal()}
            >
              <PlusOutlined />
              Tambah Pengajuan Baru
            </button>
            <Link
              href="/Manager/Ketidakhadiran/verifikasiPengajuan"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <CheckOutlined />
              Verifikasi
            </Link>
            <Link
              href="/Manager/Ketidakhadiran/listData"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <UnorderedListOutlined />
              List Data Pegawai
            </Link>
            <Link
              href="/Manager/Ketidakhadiran/calendar"
              className="btn bg-second flex items-center gap-2 p-4 rounded-full"
            >
              <CalendarOutlined />
              Calendar
            </Link>
          </div>

          <FormPengajuanKetidakhadiran
            selectedAbsence={selectedAbsence}
            setSelectedAbsence={setSelectedAbsence}
            periode={periode}
            setPeriode={setPeriode}
          />

          <EditFormKetidakhadiran
            selectedAbsence={selectedAbsence}
            setSelectedAbsence={setSelectedAbsence}
            periode={periode}
            setPeriode={setPeriode}
            onEditSuccess={handleEditSuccess}
          />
          <div className="max-w-[85rem] mx-auto w-full p-4">
            <div className="flex justify-end">
              <button
                className="btn bg-second"
                onClick={() => document.getElementById("modal11").showModal()}
              >
                Info Cuti Tahunan
              </button>
              <dialog
                id="modal11"
                className="modal modal-bottom sm:modal-middle"
              >
                <Card
                  title="Info Cuti Tahunan"
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
                      <div className="w-5/12 font-semibold">
                        Jumlah Cuti Tahunan
                      </div>
                      <div className="w-1/12 text-center">:</div>
                      <div className="w-6/12">
                        {dataAnnualLeave.leave_total}
                      </div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-5/12 font-semibold">
                        Cuti Tahunan Terpakai
                      </div>
                      <div className="w-1/12 text-center">:</div>
                      <div className="w-6/12">{dataAnnualLeave.leave_used}</div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-5/12 font-semibold">
                        Cuti Tahunan Tersisa
                      </div>
                      <div className="w-1/12 text-center">:</div>
                      <div className="w-6/12">
                        {dataAnnualLeave.leave_remaining}
                      </div>
                    </div>
                  </div>
                  <div className="modal-action justify-end">
                    <button
                      className="btn bg-blue-500 hover:bg-blue-600 text-white w-[90px] h-[40px]"
                      onClick={() => document.getElementById("modal11").close()}
                    >
                      Close
                    </button>
                  </div>
                </Card>
              </dialog>
            </div>
            <h2 className="text-xl font-bold text-black text-center mb-6">
              Riwayat Pengajuan Ketidakhadiran
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                  <Tabelhpcm modal13={handleModalOpen} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
