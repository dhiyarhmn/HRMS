"use client";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { Layout } from "antd";

export default function pengajuanKetidakhadiran() {
  const { Header, Content, Footer } = Layout;

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
                  (window.location.href =
                    "/Admin/pengajuanKetidakhadiran/listData")
                }
              >
                <svg
                  className="h-6 w-6 text-black"
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
                List Data Pengajuan Ketidakhadiran
              </button>
              <button
                className="btn"
                onClick={() =>
                  (window.location.href =
                    "/Admin/pengajuanLembur/listData")
                }
              >
                <svg
                  className="h-6 w-6 text-black"
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
                List Data Pengajuan Lembur
              </button>
            </div>
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
