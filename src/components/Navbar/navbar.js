import Profile from "@/components/Profile/profile";
import dihi from "@/public/logo-dihi.png";
import Image from "next/image";

export default function Navbar({ href, p }) {
  return (
    <div>
      <nav className="flex grow-0 top-0 w-full h-auto p-4">
        <div className="flex bg-third shadow-md w-full h-16 rounded-xl p-4 justify-between items-center">
          <div className="flex grow-0 w-1/6 justify-start">
            <a href={href} className="flex items-center">
              <Image src={dihi} className="w-12 h-12" />
              <span className="font-semibold">HRMS</span>
            </a>
          </div>
          <div className="flex grow w-4/6 justify-center">
            <p className="text-center font-semibold">{p}</p>
          </div>
          <div className="flex grow-0 w-1/6 justify-end">
            <Profile />
          </div>
        </div>
      </nav>
    </div>
  );
}
