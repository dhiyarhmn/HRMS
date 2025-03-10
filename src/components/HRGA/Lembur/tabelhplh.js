import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message} from "antd";
import Highlighter from "react-highlight-words";
import EditButton from "@/components/editButton";
import DeleteLembur from "@/components/deleteLembur";
import axios from "axios";

const { Column, ColumnGroup } = Table;

const Tabelhplh = ({ modal12 }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [dataLembur, setDataLembur] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil token dari localStorage atau cookies
        const token = localStorage.getItem("token");
        // const token = Cookies.get("token"); // Jika token ada di Cookies (gunakan js-cookie)

        const response = await axios.get(
          "http://127.0.0.1:8000/api/overtimeHistory",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token dalam header
              "Content-Type": "application/json",
            },
          }
        );

        const overtimeHistory = response.data.overtime_history;
        const overtimeHistoryArray = Object.values(overtimeHistory);

        setDataLembur(overtimeHistoryArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/destroyOvertime/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Update state setelah penghapusan
      setDataLembur((prevData) =>
        prevData.filter((item) => item.id_overtime !== id)
      );

      // Tampilkan pesan sukses
      message.success("Data Lembur berhasil dihapus!");
  
      // // Tunggu beberapa detik sebelum refresh
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000); // Delay 1000ms (1 detik) sebelum refresh

    } catch (error) {
      console.error("Error deleting data:", error);
      if (error.response) {
          console.error(error.response.data); // Log the detailed error response
          message.error(`${error.response.data.message || "Gagal menghapus data."}`);
      } else if (error.request) {
          message.error("Tidak ada response dari server.");
      } else {
          message.error("Terjadi kesalahan.");
      }
    }
};

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({ closeDropdown: false });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const renderStatusIcon = (status) => {
    if (status === 1) {
      return (
        <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#98D8AA" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="white" />
        </svg>
      );
    }
    if (status === 0) {
      return (
        <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#FF6D60" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" stroke="white" />
        </svg>
      );
    }
    if (status === null) {
      return (
        <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#F7D060" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" stroke="white" />
        </svg>
      );
    }
    return null;
  };

  return (
    <Table dataSource={dataLembur} className="w-full bg-white rounded-lg" align="center" pagination={{
      pageSize: 10,
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} dari ${total} data`,
    }}
    scroll={{scrollToFirstRowOnChange: true,}}>
      <Column title="No" dataIndex="no" align="center" render={(_, __, index) => index + 1} />
      <Column title="Tanggal Pengajuan" dataIndex="submission_time" align="center" {...getColumnSearchProps("submission_time")} />
      <Column title="Start Time" dataIndex="start_time" align="center" {...getColumnSearchProps("start_time")} />
      <Column title="End Time" dataIndex="end_time" align="center" {...getColumnSearchProps("end_time")} />
      <Column title="Total Hour" dataIndex="total_hours" align="center" {...getColumnSearchProps("total_hours")} />
      <Column title="Keterangan" dataIndex="description" align="center" {...getColumnSearchProps("description")} />
      <Column title="Persetujuan" dataIndex="approved_by_hrga" align="center" render={(status) => renderStatusIcon(status)} />
      <Column title="Status" dataIndex="status_approval" align="center" {...getColumnSearchProps("status_approval")} />
      <Column
        title="Action"
        align="center"
        render={(_, record) => (
          <Space size="middle">
            <EditButton onClick= {() => modal12(record)}/>
            <DeleteLembur onDelete={() => handleDelete(record.id_overtime)} />
          </Space>
        )}
      />
    </Table>
  );
};

export default Tabelhplh;