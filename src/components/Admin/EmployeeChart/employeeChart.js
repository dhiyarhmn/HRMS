import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const EmployeeChart = ({ employeeData }) => {
  const [chartDimensions, setChartDimensions] = useState({
    height: 400,
    outerRadius: 140,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setChartDimensions({
          height: 300,
          outerRadius: 80,
        });
      } else if (width < 1024) {
        setChartDimensions({
          height: 350,
          outerRadius: 100,
        });
      } else {
        setChartDimensions({
          height: 400,
          outerRadius: 110,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!employeeData) return null;

  const chartData = [
    { name: "Admin", value: employeeData.admin },
    { name: "Direktur", value: employeeData.director },
    { name: "HRGA", value: employeeData.hrga },
    { name: "Manager", value: employeeData.manager },
    { name: "Staff", value: employeeData.staff },
  ];

  const MobileTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
              Role
            </th>
            <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">
              Jumlah
            </th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-3 py-2 text-xs text-gray-700">{item.name}</td>
              <td className="px-3 py-2 text-xs text-gray-700 text-right">
                {item.value}
              </td>
            </tr>
          ))}
          <tr className="border-t bg-gray-50">
            <td className="px-3 py-2 font-semibold text-xs text-gray-700">
              Total
            </td>
            <td className="px-3 py-2 font-semibold text-xs text-gray-700 text-right">
              {employeeData.total_users}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <MobileTable />
      </div>

      <div className="hidden md:block h-[300px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={chartDimensions.outerRadius * 0.4}
              outerRadius={chartDimensions.outerRadius}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, value, percent }) =>
                `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-opacity hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend verticalAlign="bottom" align="center" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default EmployeeChart;
