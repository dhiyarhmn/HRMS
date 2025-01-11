import Profile from "@/components/Profile/profile";
import dihi from "@/public/logo-dihi.png";
import Image from "next/image";

export default function Navbar({href, p}) {
  return (
    <div>
      <div className="flex w-full h-20 items-center justify-between px-8 bg-first">
        <div className="flex w-1/3 justify-start">
          <a
            href={href}
            className="flex justify-center items-center w-auto h-12 px-4 rounded-full cursor-pointer bg-white"
          >
            <Image src={dihi} className="w-12 h-12" />
            <span className="font-semibold">HR Management System</span>
          </a>
        </div>
        <div className="flex w-1/3 justify-center">
          <p className="text-center font-bold">{p}</p>
        </div>
        <div className="flex w-1/3 justify-end">
          <div className="flex justify-center items-center w-auto h-20 rounded-full">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}
