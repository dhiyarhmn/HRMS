"use client";
import { useState, useEffect } from "react";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Navbar from "@/components/Navbar/navbar";
import {
  ManualForm,
  UploadCSV,
} from "@/components/Admin/generate/generateFormAdmin";
import { Segmented } from "antd";

export default function Generate() {
  const [formType, setFormType] = useState("Manual");
  const [segmentWidth, setSegmentWidth] = useState("auto");

  useEffect(() => {
    const handleResize = () => {
      setSegmentWidth(window.innerWidth < 640 ? "95%" : "auto");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar href={"/Admin/home"} p={"Admin"} />
      <NavigationAdmin />

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Generate Akun Karyawan
            </h1>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-third rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6">
              {/* Segment Control */}
              <div className="flex justify-center mb-6">
                <Segmented
                  options={["Manual", "Import CSV"]}
                  onChange={(value) => setFormType(value)}
                  className="bg-white shadow-sm"
                  style={{ width: segmentWidth }}
                />
              </div>

              {/* Form Container */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                {formType === "Manual" ? <ManualForm /> : <UploadCSV />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
