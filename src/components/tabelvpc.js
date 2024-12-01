import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    id: 1,
    nik: 123,
    nama: "Puti Dhiya",
    departemen: "Marketing",
    jabatan: "Manager",
    tanggalPengajuan: "26-09-2024",
    jenisAbsensi: "Sakit dengan Surat Dokter",
    berkas: "Surat Dokter",
    periodeAwal: "26-09-2024",
    periodeAkhir: "27-09-2024",
    keterangan: "Aku sakit",
  },
  {
    key: "2",
    id: 2,
    nik: 234,
    nama: "Fikri Prasetya",
    departemen: "Accounting",
    jabatan: "Staff",
    tanggalPengajuan: "01-10-2024",
    jenisAbsensi: "Izin",
    berkas: "",
    periodeAwal: "01-10-2024",
    periodeAkhir: "01-10-2024",
    keterangan: "Aku izin",
  },
  {
    key: "3",
    id: 3,
    nik: "345",
    nama: "Satria Bintang",
    departemen: "Accounting",
    jabatan: "Manager",
    tanggalPengajuan: "10-10-2024",
    jenisAbsensi: "Absen",
    berkas: "",
    periodeAwal: "10-10-2024",
    periodeAkhir: "10-10-2024",
    keterangan: "Aku absen",
  },
];

const Tabelvpc = ({ detail }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "NIK",
      dataIndex: "nik",
      align: "center",
      ...getColumnSearchProps("nik"),
      render: (text) => text,
    },
    {
        title: "Nama",
        dataIndex: "nama",
        align: "center",
        ...getColumnSearchProps("nama"),
        render: (text) => text,
      },
    {
      title: "Jenis Absensi",
      dataIndex: "jenisAbsensi",
      align: "center",
      ...getColumnSearchProps("jenisAbsensi"),
      render: (text) => text,
    },
    {
      title: "Berkas",
      dataIndex: "berkas",
      align: "center",
      render: (text) =>
        text ? (
          <a
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Lihat Berkas
          </a>
        ) : (
          "Tidak Ada Berkas"
        ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => detail(record)} className="text-blue-500">
            Detail
          </button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      className="w-full bg-white rounded-lg"
      align="center"
    />
  );
};

export default Tabelvpc;
