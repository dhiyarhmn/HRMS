"use client";
import { Layout } from "antd";

export default function Navigation({ links, headerBg, navigationBg }) {
  const { Header } = Layout;

  return (
    <div>
      <Header
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        className={`justify-center flex mt-8 bg-transparent`}
      >
        <div
          className={`flex items-center h-auto gap-x-12 px-12 py-2 rounded-full bg-third border-2 border-black`}
        >
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="flex flex-col items-center justify-center text-black font-medium w-12 h-auto gap-y-1 cursor-pointer"
            >
              <svg
                className="h-5 w-5 text-black"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <polyline points="5 12 3 12 12 3 21 12 19 12" />{" "}
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />{" "}
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
              <span className="text-sm">{link.text}</span>
            </a>
          ))}
        </div>
      </Header>
    </div>
  );
}
