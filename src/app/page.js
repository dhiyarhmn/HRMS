"use client";
import Image from "next/image";
import dihi from "../public/logo-dihi.png";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";

export default function Home() {
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
            className="flex items-center justify-center w-auto px-6 py-2.5 text-center text-white duration-200 bg-[#027D01] border-2 border-black rounded-full hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
            href="/dashboard"
          >
            Get Started
          </a>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
        className="flex flex-col h-auto"
      >
        <div className="flex">
          <div id="section1" className="flex w-1/2 h-dvh items-center">
            <p>
              (Section 1) Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Deserunt perspiciatis dolore nostrum eaque inventore fuga.
              Suscipit ipsam minus sit omnis dolorum perspiciatis sed itaque
              natus corporis quas, aliquam porro officiis?
            </p>
          </div>
          <div className="flex w-1/2 justify-center items-center">
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
        <div className="flex">
          <div id="section2" className="flex w-full h-dvh items-center gap-x-8">
            <div className="card card-compact bg-base-100 w-1/3 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            <div className="card card-compact bg-base-100 w-1/3 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            <div className="card card-compact bg-base-100 w-1/3 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div id="section3" className="flex w-1/2 h-dvh items-center">
            <p>
              (Section 3) Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Deserunt perspiciatis dolore nostrum eaque inventore fuga.
              Suscipit ipsam minus sit omnis dolorum perspiciatis sed itaque
              natus corporis quas, aliquam porro officiis?
            </p>
          </div>
          <div className="flex w-1/2 justify-center items-center">
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
