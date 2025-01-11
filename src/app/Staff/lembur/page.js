"use client";
import FormPengajuanLembur from "@/components/formPengajuanLembur";
import Navbar from "@/components/Navbar/navbar";
import Navigation from "@/components/navigation";
import Tabelhpls from "@/components/tabelhpls";
import { PlusOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";

export default function cuti() {
  const [selectedAbsensi, setSelectedAbsensi] = useState("1");
  const [periode, setPeriode] = useState("1");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const links = [
    { href: "/Staff/home", text: "Home" },
    { href: "/Staff/cuti", text: "Cuti" },
    { href: "/Staff/lembur", text: "Lembur" },
    { href: "/Staff/ruangan", text: "Ruangan" },
  ];

  const showmodal = (record) => {
    setSelectedRecord(record);
    document.getElementById("modal9").showModal();
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
          </div>

          <FormPengajuanLembur
            selectedAbsensi={selectedAbsensi}
            setSelectedAbsensi={setSelectedAbsensi}
            periode={periode}
            setPeriode={setPeriode}
          />

          <div className="flex w-full justify-center">
            <div className="w-full bg-second p-4 rounded-lg">
              <div className="overflow-x-auto w-full">
                <Tabelhpls detail={showmodal} />
                <dialog
                  id={"modal9"}
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
                          <div className="w-1/3 font-semibold">Start Time</div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">
                            {selectedRecord.startTime}
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">End Time</div>
                          <div className="w-1/12 text-center">:</div>
                          <div className="w-7/12">{selectedRecord.endTime}</div>
                        </div>
                        <div className="w-full flex">
                          <div className="w-1/3 font-semibold">Total Hour</div>
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
                            document.getElementById(`modal9`).close()
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
