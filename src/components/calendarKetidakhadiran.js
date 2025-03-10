import { useEffect, useState } from "react";
import { Badge, Calendar, Button, Card } from "antd";
import axios from "axios";

const getListData = (value, dataKetidakhadiran) => {
  let listData = [];
  const date = value.date();
  const month = value.month() + 1; // Bulan dimulai dari 0 (Januari = 0)
  const year = value.year();

  dataKetidakhadiran.forEach((item) => {
    const startDate = new Date(item.start);
    const endDate = new Date(item.end);

    // Loop melalui setiap tanggal dalam rentang startDate hingga endDate
    for (
      let currentDate = new Date(startDate);
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      // Jika tanggal saat ini (value) sama dengan tanggal dalam rentang
      if (
        date === currentDay &&
        month === currentMonth &&
        year === currentYear
      ) {
        listData.push({
          type: "success",
          content: item.title, // Misalnya, item.title berisi nama pegawai
          data: item,
        });
      }
    }
  });

  return listData;
};

const App = () => {
  const [dataKetidakhadiran, setDataKetidakhadiran] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [absenceDetail, setAbsenceDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/kalenderKetidakhadiran",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        console.log("Data dari API:", response.data);
        setDataKetidakhadiran(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchAbsenceDetail = async (id_absence) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/absenceDetailbyIdAbsence/${id_absence}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("Detail Ketidakhadiran:", response.data);
      setAbsenceDetail(response.data);
    } catch (error) {
      console.error("Error fetching absence detail:", error);
    }
  };

  const showModal = (employeeData) => {
    console.log("Data yang dipilih:", employeeData);
    if (employeeData && employeeData.id_absence) {
      setSelectedRecord(employeeData);
      document.getElementById("modal16").showModal();
      fetchAbsenceDetail(employeeData.id_absence);
    } else {
      console.error("id_absence tidak ditemukan di data yang dipilih");
    }
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, dataKetidakhadiran);
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
    return info.originNode;
  };

  return (
    <>
      <Calendar cellRender={cellRender} />
      <dialog id="modal16" className="modal modal-bottom sm:modal-middle">
        {absenceDetail && (
          <Card
            title="Detail Ketidakhadiran"
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
                <div className="w-6/12 font-semibold">NIK</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">{absenceDetail.nik}</div>
              </div>
              <div className="w-full flex">
                <div className="w-6/12 font-semibold">Nama</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">{absenceDetail.name}</div>
              </div>
              <div className="w-full flex">
                <div className="w-6/12 font-semibold">Departemen</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">{absenceDetail.department}</div>
              </div>
              <div className="w-full flex">
                <div className="w-6/12 font-semibold">Jabatan</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">{absenceDetail.position}</div>
              </div>
              <div className="w-full flex">
                <div className="w-6/12 font-semibold">Tanggal Pengajuan</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">{absenceDetail.date}</div>
              </div>
              <div className="w-full flex">
                <div className="w-6/12 font-semibold">Jenis Ketidakhadiran</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">
                  {absenceDetail.absence_description}
                </div>
              </div>
              <div className="w-full flex">
                <div className="w-6/12 font-semibold">Jenis Periode Ketidakhadiran</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">
                  {absenceDetail.absence_type}
                </div>
              </div>
              <div className="w-full flex">
                <div className="w-6/12 font-semibold">Periode Awal</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">{absenceDetail.start_date}</div>
              </div>
              <div className="w-full flex">
                <div className="w-6/12 font-semibold">Periode Akhir</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12">{absenceDetail.end_date}</div>
              </div>
              <div className="w-full flex mb-4">
                <div className="w-6/12 font-semibold">Keterangan</div>
                <div className="w-1/12 text-center">:</div>
                <div className="w-5/12 text-justify">
                  {selectedRecord?.description}
                </div>
              </div>
              <div className="modal-action w-full justify-end">
                <button
                  className="btn bg-blue-500 hover:bg-blue-600 text-white w-[90px] h-[40px]"
                  onClick={() => document.getElementById("modal16").close()}
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
