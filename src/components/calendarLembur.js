import React, { useEffect, useState } from "react";
import { Badge, Calendar, Button, Card } from "antd";
import axios from "axios";

const getListData = (value, overtimeData) => {
  let listData = [];
  const date = value.date();
  const month = value.month() + 1; // Bulan dimulai dari 0 (Januari = 0)
  const year = value.year();

  overtimeData.forEach((item) => {
    const startDate = new Date(item.submission_time); // Gunakan submission_time sebagai tanggal
    const startTime = item.start; // Waktu mulai

    // Gabungkan tanggal dari submission_time dengan waktu dari start
    const fullStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      parseInt(startTime.split(":")[0], 10),
      parseInt(startTime.split(":")[1], 10)
    );

    if (
      fullStartDate.getDate() === date &&
      fullStartDate.getMonth() + 1 === month &&
      fullStartDate.getFullYear() === year
    ) {
      listData.push({
        type: "success", // Anda bisa menyesuaikan type sesuai kebutuhan
        content: item.title,
        data: {
          ...item, // Pastikan item mengandung id_overtime
          id_overtime: item.id_overtime, // Pastikan id_overtime ada di sini
        },
      });
    }
  });

  return listData;
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const App = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [overtimeDetail, setOvertimeDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("token");

        // Lakukan request ke API dengan menyertakan token
        const response = await axios.get(
          "http://127.0.0.1:8000/api/approvedOvertime",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token dalam header
              "Content-Type": "application/json",
            },
          }
        );

        // Set data ke state
        setOvertimeData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error(
            "Unauthorized: Please check your authentication token."
          );
        } else {
          console.error("Error fetching overtime data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const fetchOvertimeDetail = async (id_overtime) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/overtimeDetail/${id_overtime}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("Detail Lembur:", response.data);
      setOvertimeDetail(response.data);
    } catch (error) {
      console.error("Error fetching overtime detail:", error);
    }
  };

  const showModal = (employeeData) => {
    console.log("Data yang dipilih:", employeeData);
    if (employeeData && employeeData.id_overtime) {
      setSelectedRecord(employeeData);
      document.getElementById("modal18").showModal();
      fetchOvertimeDetail(employeeData.id_overtime);
    } else {
      console.error("id_overtime tidak ditemukan di data yang dipilih");
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, overtimeData);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Button type="link" onClick={() => showModal(item.data)}>
              <Badge status={item.type} text={item.content} />
            </Button>
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Calendar cellRender={cellRender} />
      <dialog id="modal18" className="modal modal-bottom sm:modal-middle">
        {overtimeDetail && (
          <Card
            title="Detail Lembur"
            style={{ width: "100%", maxWidth: 500 }}
            className="w-full md:max-w-md"
          >
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="p-2 flex flex-wrap">
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">NIK</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12">{overtimeDetail.nik}</div>
              </div>
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">Nama</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12">
                  {overtimeDetail.employee_name}
                </div>
              </div>
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">Departemen</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12">{overtimeDetail.department}</div>
              </div>
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">Jabatan</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12">{overtimeDetail.position}</div>
              </div>
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">Tanggal Pengajuan</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12">
                  {overtimeDetail.submission_time}
                </div>
              </div>
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">Start Time</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12">{overtimeDetail.start_time}</div>
              </div>
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">End Time</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12">{overtimeDetail.end_time}</div>
              </div>
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">Total Hour</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12">
                  {overtimeDetail.total_hours}
                </div>
              </div>
              <div className="w-full flex">
                <div className="w-5/12 font-semibold">Keterangan</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-6/12 text-justify">
                  {overtimeDetail.description}
                </div>
              </div>
              <div className="modal-action w-full justify-end">
                <button
                  className="btn bg-blue-500 hover:bg-blue-600 text-white w-[90px] h-[40px]"
                  onClick={() => document.getElementById("modal18").close()}
                >
                  Close
                </button>
              </div>
            </div>
          </Card>
        )}
      </dialog>
    </>
  );
};

export default App;
