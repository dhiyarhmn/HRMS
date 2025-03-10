import { userServices } from "@/api/api";
import EmployeeChart from "@/components/Admin/EmployeeChart/employeeChart";
import absence from "@/public/absence.gif";
import overtime from "@/public/overtime.gif";
import approval from "@/public/approval.gif";
import booking from "@/public/booking.gif";
import generate from "@/public/generate.gif";
import salary from "@/public/salary.gif";
import { Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FeatureCard = ({ title, image, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer p-4 flex flex-col items-center space-y-3"
  >
    <div className="relative w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28">
      <Image src={image} alt={title} className="object-contain w-full h-full" />
    </div>
    <h3 className="text-sm lg:text-base font-semibold text-gray-800 text-center">
      {title}
    </h3>
  </div>
);

export default function HomeAdmin() {
  const router = useRouter();
  const [employeeStats, setEmployeeStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        setLoading(true);
        const response = await userServices.getUserStats();
        setEmployeeStats(response.data);
      } catch (error) {
        console.error("Gagal mengambil data karyawan:", error);
        setError("Gagal memuat data karyawan");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeStats();
  }, []);

  const menuItems = [
    { title: "Ketidakhadiran", image: absence, path: "/Admin/Ketidakhadiran" },
    { title: "Lembur", image: overtime, path: "/Admin/lembur" },
    { title: "Gaji", image: salary, path: "/Admin/gaji" },
    { title: "Approval", image: approval, path: "/Admin/approval" },
    { title: "Booking Ruangan", image: booking, path: "/Admin/ruangan" },
    { title: "Generate", image: generate, path: "/Admin/generate" },
  ];

  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="w-full lg:w-2/5 mb-6 lg:mb-0">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center">
                Jumlah Karyawan
              </h2>
              <div className="w-full">
                {loading ? (
                  <div className="flex justify-center items-center h-[300px] md:h-[400px]">
                    <Spin size="large" />
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center h-[300px] md:h-[400px] text-red-500">
                    <p>{error}</p>
                  </div>
                ) : (
                  employeeStats && (
                    <EmployeeChart employeeData={employeeStats.data} />
                  )
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center">
                Fitur yang Tersedia
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {menuItems.map((item, index) => (
                  <FeatureCard
                    key={index}
                    title={item.title}
                    image={item.image}
                    onClick={() => router.push(item.path)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
