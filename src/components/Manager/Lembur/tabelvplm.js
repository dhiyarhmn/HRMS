import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

const { Column, ColumnGroup } = Table;

const Tabelvplm = React.forwardRef(({ detail, onRemoveData }, ref) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  // Menginisialisasi dengan array kosong agar tidak error jika data belum ada
  const [dataLembur, setDataLembur] = useState([]);

  // Fetch data lembur dari API saat komponen pertama kali di-render
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil token dari localStorage atau cookies
        const token = localStorage.getItem("token");
        // const token = Cookies.get("token"); // Jika token ada di Cookies (gunakan js-cookie)

        console.log(token);

         // Cek apakah token ada
         if (!token) {
          console.error("Token tidak ditemukan.");
          return;
        }
  
        // Request ke API untuk mendapatkan data lembur
        const response = await axios.get("http://127.0.0.1:8000/api/overtime", {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token dalam header
            "Content-Type": "application/json",
          },
        });
  
        // Jika response adalah array, set data ke state
        if (Array.isArray(response.data)) {
          setDataLembur(response.data);
        } else {
          console.warn("Format data tidak sesuai:", response.data);
          setDataLembur([]); // Set data kosong jika format tidak sesuai
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setDataLembur([]); // Set data kosong jika terjadi error
      }
    };

    fetchData();
  }, []); // Fetch data hanya sekali saat komponen di-render

  // Fungsi untuk menghapus data dari tabel berdasarkan id_overtime
    const removeData = (id_overtime) => {
      setDataLembur((prevData) =>
        prevData.filter((item) => item.id_overtime !== id_overtime)
      );
      if (onRemoveData) {
        onRemoveData(id_overtime); // Panggil prop onRemoveData jika ada
      }
    };
  
    // Ekspos fungsi removeData ke ref
    React.useImperativeHandle(ref, () => ({
      removeData,
    }));

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({ closeDropdown: false });
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // Fungsi untuk mendapatkan properti kolom pencarian
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
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
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

  return (
    <Table dataSource={dataLembur} className="w-full bg-white rounded-lg" align="center" pagination={{
      pageSize: 10,
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} dari ${total} data`,
    }}
    scroll={{scrollToFirstRowOnChange: true,}}>
      <Column title="No" dataIndex="no" align="center" render={(_, __, index) => index + 1} />
      <Column title="NIK" dataIndex="nik" align="center" {...getColumnSearchProps("nik")} />
      <Column title="Nama" dataIndex="name" align="center" {...getColumnSearchProps("name")} />
      <Column title="Tanggal Pengajuan" dataIndex="submission_time" align="center" {...getColumnSearchProps("submission_time")} />
      <Column title="Total Hour" dataIndex="total_hours" align="center" {...getColumnSearchProps("total_hours")} />
      <Column
        title="Action"
        align="center"
        render={(_, record) => (
          <Space size="middle">
            <button onClick={() => detail(record)} className="text-blue-500">
             Detail
           </button>
          </Space>
        )}
      />
    </Table>
  );
});

export default Tabelvplm;