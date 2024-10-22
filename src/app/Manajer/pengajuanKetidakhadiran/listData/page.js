"use client";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { Layout } from "antd";

export default function VerifikasiPengajuan() {
  const { Header, Content, Footer } = Layout;

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

  const goToDetail = (row) => {
    // Menggunakan window.location.href untuk navigasi ke halaman detailList dengan ID
    window.location.href = `/Manajer/pengajuanKetidakhadiran/detailList?id=${row.id}`;
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
            List Data Pengajuan Ketidakhadiran
          </h2>

          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>NIK</th>
                <th>Nama</th>
                <th>Departemen</th>
                <th>Jabatan</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id}>
                  <th>{index + 1}</th>
                  <td>{row.nik}</td>
                  <td>{row.name}</td>
                  <td>{row.department}</td>
                  <td>{row.position}</td>
                  <th>
                    <button
                      className="text-blue-500 hover:text-blue-700 underline bg-transparent border-none p-0 cursor-pointer text-xs"
                      onClick={() => goToDetail(row)}
                    >
                      details
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
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
