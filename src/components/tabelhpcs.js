import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table} from "antd";
import Highlighter from "react-highlight-words";
import EditButton from "@/components/editButton";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
    nik: "345",
    nama: "Satria Bintang",
    departemen: "Accounting",
    jabatan: "Manager",
    tanggalPengajuan: "26-09-2024",
    jenisAbsensi: "Sakit dengan Surat Dokter",
    berkas: "Surat Dokter",
    managerStatus: "approved",
    hrgaStatus: "pending",
    periodeAwal: "26-09-2024",
    periodeAkhir: "27-09-2024",
    keterangan: "Aku sakit",
  },
  {
    key: "2",
    nik: "345",
    nama: "Satria Bintang",
    departemen: "Accounting",
    jabatan: "Manager",
    tanggalPengajuan: "01-10-2024",
    jenisAbsensi: "Izin",
    berkas: "",
    managerStatus: "rejected",
    hrgaStatus: "approved",
    periodeAwal: "01-10-2024",
    periodeAkhir: "01-10-2024",
    keterangan: "Aku izin",
  },
  {
    key: "3",
    nik: "345",
    nama: "Satria Bintang",
    departemen: "Accounting",
    jabatan: "Manager",
    tanggalPengajuan: "01-10-2024",
    jenisAbsensi: "Terlambat",
    berkas: "",
    managerStatus: "pending",
    hrgaStatus: "approved",
    periodeAwal: "01-10-2024",
    periodeAkhir: "01-10-2024",
    keterangan: "Aku terlambat",
  },
];

const Tabelhpcs = ({ detail }) => {
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

  const renderStatusIcon = (status) => {
    if (status === "approved") {
      return (
        <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#98D8AA" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="white" />
        </svg>
      );
    }
    if (status === "rejected") {
      return (
        <svg className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#FF6D60" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" stroke="white" />
        </svg>
      );
    }
    if (status === "pending") {
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
    <Table dataSource={data} className="w-full bg-white rounded-lg" align="center">
      <Column title="No" dataIndex="no" align="center" render={(_, __, index) => index + 1} />
      <Column title="Tanggal Pengajuan" dataIndex="tanggalPengajuan" align="center" {...getColumnSearchProps("tanggalPengajuan")} />
      <Column title="Jenis Absensi" dataIndex="jenisAbsensi" align="center" {...getColumnSearchProps("jenisAbsensi")} />
      <Column
        title="Berkas"
        dataIndex="berkas"
        align="center"
        render={(text) => text ? (
          <a href={text} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat Berkas</a>
        ) : (
          "Tidak Ada Berkas"
        )}
      />
      <ColumnGroup title="Status">
        <Column
          title="Manager"
          dataIndex="managerStatus"
          align="center"
          render={(status) => renderStatusIcon(status)}
        />
        <Column
          title="HRGA"
          dataIndex="hrgaStatus"
          align="center"
          render={(status) => renderStatusIcon(status)}
        />
      </ColumnGroup>
      <Column
        title="Action"
        align="center"
        render={(_, record) => (
          <Space size="middle">
            <button onClick={() => detail(record)} className="text-blue-500">
              Detail
            </button>
            <EditButton onClick= {() => detail(record)}/>
          </Space>
        )}
      />
      
    </Table>
  );
};

export default Tabelhpcs;