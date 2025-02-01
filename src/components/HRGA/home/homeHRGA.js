import { userServices } from "@/api/api"; // Import API service
import EmployeeChart from "@/components/Admin/EmployeeChart/employeeChart"; // Import komponen chart
import absence from "@/public/absence.gif";
import approval from "@/public/approval.gif";
import salary from "@/public/salary.gif";
import { Card } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Meta } = Card;

export default function HomeHRGA() {
  const router = useRouter();
  const [employeeStats, setEmployeeStats] = useState(null); // State untuk menyimpan data jumlah karyawan

  useEffect(() => {
    // Ambil data jumlah karyawan berdasarkan role
    const fetchEmployeeStats = async () => {
      try {
        const response = await userServices.getUserStats();
        setEmployeeStats(response.data);
      } catch (error) {
        console.error("Gagal mengambil data karyawan:", error);
      }
    };

    fetchEmployeeStats();
  }, []);

  const handleCardClick = (path) => {
    router.push(path);
  };

  const menuItems = [
    {
      title: "Absensi & Cuti",
      image: absence,
      path: "/HRGA/cuti",
      bgColor: "bg-first",
      rounded: "rounded-s-badge rounded-br-badge",
    },
    {
      title: "E-Slip Gaji",
      image: salary,
      path: "/HRGA/gaji",
      bgColor: "bg-second",
      rounded: "rounded-badge",
    },
    {
      title: "Approval Booking",
      image: approval,
      path: "/HRGA/approval",
      bgColor: "bg-third",
      rounded: "rounded-e-badge rounded-tl-badge",
    },
  ];

  // Format data untuk chart
  const chartData = employeeStats
    ? [
        { name: "Admin", value: employeeStats.admin },
        { name: "Director", value: employeeStats.director },
        { name: "HRGA", value: employeeStats.hrga },
        { name: "Manager", value: employeeStats.manager },
        { name: "Staff", value: employeeStats.staff },
      ]
    : [];

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-8">
          Silakan Pilih Fitur yang Tersedia
        </h1>

        {/* Tampilkan Chart Jumlah Karyawan Berdasarkan Role */}
        {employeeStats && (
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Jumlah Karyawan Berdasarkan Role
            </h2>
            <EmployeeChart data={chartData} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex justify-center p-4 md:p-6 lg:p-8 ${item.bgColor} shadow-lg border-4 md:border-6 lg:border-8 border-white ${item.rounded} cursor-pointer transition-transform duration-300 hover:scale-105`}
              onClick={() => handleCardClick(item.path)}
            >
              <Card
                hoverable
                cover={
                  <Image
                    alt={item.title}
                    src={item.image}
                    unoptimized
                    className="object-contain w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 p-1"
                  />
                }
                className="w-full max-w-xs transition-all duration-300 ease-in-out divide-y-2"
              >
                <Meta
                  title={item.title}
                  className="text-center"
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
