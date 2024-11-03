"use client";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import bg1 from "@/public/bg-1.jpg";
import bg2 from "@/public/bg-2.jpg";
import bg3 from "@/public/bg-3.jpg";
import satria from "@/public/satria.gif";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import Navigation from "@/components/navigation";

export default function Home() {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 20,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        className="bg-transparent justify-center z-50"
      >
        <div className="flex items-center z-10 bg-white h-auto gap-x-8 px-12 rounded-full shadow-2xl border-2 border-black">
          <div className="demo-logo">
            <Image
              src={dihi}
              alt="logo"
              style={{
                marginRight: 16,
              }}
              className="h-10 w-10"
            />
          </div>
          <a href="#section1">Section 1</a>
          <a href="#section2">Section 2</a>
          <a href="#section3">Section 3</a>
          <a
            aria-describedby="get-started"
            className="flex cursor-pointer items-center justify-center w-auto px-6 py-2.5 text-center text-white duration-200 bg-[#027D01] border-2 border-black rounded-full hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
            href="/login"
          >
            Get Started!
          </a>
        </div>
      </Header>
      <Content className="flex flex-col h-auto">
        <div id="section1" className="flex w-full h-dvh relative">
          <Image src={bg2} className="w-full h-auto" />
          {/* <div className="pattern w-full h-auto"></div> */}
          {/* Overlay Hitam di Atas Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="flex items-center absolute z-10 w-full h-dvh pl-12">
            <div className="flex flex-col gap-y-8">
              <p className="font-bold text-9xl text-white">JANGAN</p>
              <p className="font-bold text-9xl text-white">GIF.</p>
            </div>
          </div>
        </div>

        <div id="section2" className="flex w-full h-dvh relative">
          <Image src={bg3} className="w-full h-auto" />
          <div className="absolute h-1/2 inset-0 bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute h-full inset-0 bg-gradient-to-t from-black to-transparent"></div>
          {/* <div className="pattern w-full h-auto"></div> */}
          <div className="flex items-center absolute w-full h-dvh gap-x-12 p-20">
            <div className="card card-compact bg-base-100 w-1/3 shadow-xl border-2 border-black hover:scale-105 duration-300 cursor-pointer">
              <figure>
                <Image src={satria} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">For Sale!</h2>
                <p>Gocap bonus kandang</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Perbudak Sekarang</button>
                </div>
              </div>
            </div>
            <div className="card card-compact bg-base-100 w-1/3 shadow-xl border-2 border-black hover:scale-105 duration-300 cursor-pointer">
              <figure>
                <Image src={satria} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">For Sale!</h2>
                <p>Gocap bonus kandang</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Perbudak Sekarang</button>
                </div>
              </div>
            </div>
            <div className="card card-compact bg-base-100 w-1/3 shadow-xl border-2 border-black hover:scale-105 duration-300 cursor-pointer">
              <figure>
                <Image src={satria} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">For Sale!</h2>
                <p>Gocap bonus kandang</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Perbudak Sekarang</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="section3" className="flex w-full h-dvh relative">
          <Image src={bg1} className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
          {/* <div className="pattern w-full h-auto"></div> */}
          <div className="flex absolute w-full h-dvh">
            <div className="flex w-1/2 h-dvh items-center justify-center px-20">
              <p className="bg-white rounded-full p-8">
                (Section 3) Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Deserunt perspiciatis dolore nostrum eaque inventore fuga.
                Suscipit ipsam minus sit omnis dolorum perspiciatis sed itaque
                natus corporis quas, aliquam porro officiis?
              </p>
            </div>
            <div className="flex w-1/2 h-dvh justify-center items-center">
              <div className="grid grid-cols-2 grid-rows-2 gap-4 w-1/2 h-1/2">
                <div className="flex justify-center items-center bg-gray-200 rounded-r-[60px] rounded-bl-[60px]">
                  <Image src={dihi} alt="logo" width={100} height={50} />
                </div>
                <div className="flex justify-center items-center bg-gray-200 rounded-l-[60px] rounded-br-[60px]">
                  <Image src={dihi} alt="logo" width={100} height={50} />
                </div>
                <div className="flex row-start-2 justify-center items-center bg-gray-200 rounded-r-[60px] rounded-tl-[60px]">
                  <Image src={dihi} alt="logo" width={100} height={50} />
                </div>
                <div className="flex row-start-2 justify-center items-center bg-gray-200 rounded-l-[60px] rounded-tr-[60px]">
                  <Image src={dihi} alt="logo" width={100} height={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
        className="bg-transparent"
      >
        PT Daekyung Indah Heavy Industry ©{new Date().getFullYear()} Created by Fikri
      </Footer>
    </Layout>
  );
}
