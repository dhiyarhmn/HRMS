import Profile from "@/components/profile";
import dihi from "@/public/logo-dihi.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <div>
      <div className="flex w-full h-20 items-center justify-between px-8 bg-first">
        <a
          href="/home"
          className="flex justify-center items-center w-auto h-12 px-4 rounded-full cursor-pointer"
        >
          <Image src={dihi} className="w-12 h-12" />
          <span className="font-semibold">HR Management System</span>
        </a>
        <div className="flex justify-center items-center w-auto h-20 rounded-full">
          <Profile />
        </div>
      </div>
    </div>
  );
}
