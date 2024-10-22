"use client";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { Layout } from "antd";
import { useState } from "react";

export default function pengajuanKetidakhadiran() {
  const { Header, Content, Footer } = Layout;
  const [selectedValue, setSelectedValue] = useState('1');

  const pengajuanData = [
    {
      nama: "Satria Bintang",
      departemen: "Accounting",
      jabatan: "Manager",
      tanggalPengajuan: "26-09-2024",
      jenisAbsensi: "Sakit",
      berkas: "Surat Dokter",
      status: "approved",
      periodeAwal: "26-09-2024",
      periodeAkhir: "27-09-2024",
      keterangan: "Aku sakit",
    },
    {
      nama: "Satria Bintang",
      departemen: "Accounting",
      jabatan: "Manager",
      tanggalPengajuan: "01-10-2024",
      jenisAbsensi: "Izin",
      berkas: "",
      status: "rejected",
      periodeAwal: "01-10-2024",
      periodeAkhir: "01-10-2024",
      keterangan: "Aku izin",
    },
    {
      nama: "Satria Bintang",
      departemen: "Accounting",
      jabatan: "Manager",
      tanggalPengajuan: "10-10-2024",
      jenisAbsensi: "Absen",
      berkas: "",
      status: "pending",
      periodeAwal: "10-10-2024",
      periodeAkhir: "10-10-2024",
      keterangan: "Aku absen",
    },
  ];

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
          <Image src={dihi} className="h-10 w-10" />
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
        <div className="flex">
          <div
            id="section1"
            className="flex flex-col w-full h-dvh gap-y-12 justify-center items-center"
          >
            <div className="flex space-x-4">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                <svg
                  className="h-6 w-6 text-slate-900"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Tambah Pengajuan Baru
              </button>

              <button
                className="btn"
                onClick={() =>
                  (window.location.href =
                    "/Manajer/pengajuanKetidakhadiran/verifikasiPengajuan")
                }
              >
                <svg
                  classame="h-6 w-6 text-slate-900"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                Verifikasi
              </button>
              <button
                className="btn"
                onClick={() =>
                  (window.location.href =
                    "/Manajer/pengajuanKetidakhadiran/listData")
                }
              >
                <svg
                  class="h-6 w-6 text-black"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <line x1="9" y1="6" x2="20" y2="6" />{" "}
                  <line x1="9" y1="12" x2="20" y2="12" />{" "}
                  <line x1="9" y1="18" x2="20" y2="18" />{" "}
                  <line x1="5" y1="6" x2="5" y2="6.01" />{" "}
                  <line x1="5" y1="12" x2="5" y2="12.01" />{" "}
                  <line x1="5" y1="18" x2="5" y2="18.01" />
                </svg>
                List Data Pegawai
              </button>
            </div>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg text-center">
                  Form Pengajuan Absensi
                </h3>
                <div className="py-4">
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text">Nama</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Satria Bintang"
                      className="input input-bordered w-full max-w-s"
                      disabled
                    />
                  </label>
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text">Departemen</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Accounting"
                      className="input input-bordered w-full max-w-s"
                      disabled
                    />
                  </label>
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text">Jabatan</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Manager"
                      className="input input-bordered w-full max-w-s"
                      disabled
                    />
                  </label>
                  <div className="label">
                    <span className="label-text">Jenis Absensi</span>
                  </div>
                  <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} className="select select-bordered w-full max-w-s">
                    <option>
                      Select
                    </option>
                    <option>Absen</option>
                    <option>Izin</option>
                    <option>Terlambat</option>
                    <option>Dinas</option>
                    <option>Sakit dengan Surat Dokter</option>
                    <option>Cuti Tahunan</option>
                    <option>Sakit Akibat Kecelakaan Kerja</option>
                    <option>Izin Resmi</option>
                    <option>Skors</option>
                  </select>
                  <div className="label">
                    <span className="label-text">Berkas</span>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-full max-w-s"
                  />
                  <div className="label">
                    <span className="label-text">Lama Periode Absensi</span>
                  </div>
                  <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} className="select select-bordered w-full max-w-s">
                    <option>
                      Select
                    </option>
                    <option>Day</option>
                    <option>Hour</option>
                  </select>
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text">Periode Awal</span>
                    </div>
                    <input
                      type="datetime-local"
                      className="input input-bordered w-full max-w-s"
                    />
                  </label>
                  <label className="form-control w-full max-w-s">
                    <div className="label">
                      <span className="label-text">Periode Akhir</span>
                    </div>
                    <input
                      type="datetime-local"
                      className="input input-bordered w-full max-w-s"
                    />
                  </label>
                  <div className="label">
                    <span className="label-text">Keterangan</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full max-w-s"
                    placeholder="keterangan"
                  ></textarea>

                  <div className="flex justify-center">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn bg-blue-500 text-white"
                    />
                  </div>
                </div>
              </div>
            </dialog>

            <table className="table table-zebra">
              {/* head */}
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
                {pengajuanData.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.tanggalPengajuan}</td>
                    <td>{item.jenisAbsensi}</td>
                    <td>
                      {item.berkas ? (
                        <a className="link link-primary">{item.berkas}</a>
                      ) : (
                        "Tidak Ada Berkas"
                      )}
                    </td>
                    <td>
                      {item.status === "approved" ? (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" fill="#98D8AA" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                            stroke="white"
                          />
                        </svg>
                      ) : item.status === "rejected" ? (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" fill="#FF6D60" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                            stroke="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" fill="#F7D060" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01"
                            stroke="white"
                          />
                        </svg>
                      )}
                    </td>
                    <th>
                      <button
                        className="text-blue-500 hover:text-blue-700 underline bg-transparent border-none p-0 cursor-pointer text-xs"
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${index}`)
                            .showModal()
                        }
                      >
                        details
                      </button>

                      <dialog
                        id={`my_modal_${index}`}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold text-lg text-center">
                            Detail
                          </h3>
                          <div className="py-4">
                            <label className="form-control w-full max-w-s">
                              <div className="label">
                                <span className="label-text">Nama</span>
                              </div>
                              <input
                                type="text"
                                value={item.nama}
                                className="input input-bordered w-full max-w-s"
                                disabled
                              />
                            </label>
                            <label className="form-control w-full max-w-s">
                              <div className="label">
                                <span className="label-text">Departemen</span>
                              </div>
                              <input
                                type="text"
                                value={item.departemen}
                                className="input input-bordered w-full max-w-s"
                                disabled
                              />
                            </label>
                            <label className="form-control w-full max-w-s">
                              <div className="label">
                                <span className="label-text">Jabatan</span>
                              </div>
                              <input
                                type="text"
                                value={item.jabatan}
                                className="input input-bordered w-full max-w-s"
                                disabled
                              />
                            </label>
                            <label className="form-control w-full max-w-s">
                              <div className="label">
                                <span className="label-text">
                                  Jenis Absensi
                                </span>
                              </div>
                              <input
                                type="text"
                                value={item.jenisAbsensi}
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
                                value={item.berkas || "Tidak Ada Berkas"}
                                className="input input-bordered w-full max-w-s"
                                disabled
                              />
                            </label>
                            <label className="form-control w-full max-w-s">
                              <div className="label">
                                <span className="label-text">Periode Awal</span>
                              </div>
                              <input
                                type="text"
                                value={item.periodeAwal}
                                className="input input-bordered w-full max-w-s"
                                disabled
                              />
                            </label>
                            <label className="form-control w-full max-w-s">
                              <div className="label">
                                <span className="label-text">
                                  Periode Akhir
                                </span>
                              </div>
                              <input
                                type="text"
                                value={item.periodeAkhir}
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
                                value={item.keterangan}
                                className="input input-bordered w-full max-w-s"
                                disabled
                              />
                            </label>
                          </div>
                          <div className="modal-action">
                            <button
                              className="btn"
                              onClick={() =>
                                document
                                  .getElementById(`my_modal_${index}`)
                                  .close()
                              }
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </dialog>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
