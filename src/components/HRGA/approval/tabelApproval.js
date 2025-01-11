import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    nama: "John Brown",
    divisi: 32,
    ruangan: "E101",
    hari: "Senin, 1 Januari 2025",
    jam: "08:00 - 10:00",
  },
  {
    key: "2",
    nama: "Joe Black",
    divisi: 42,
    ruangan: "E102",
    hari: "Senin, 1 Januari 2025",
    jam: "10:00 - 11:00",
  },
  {
    key: "3",
    nama: "Jim Green",
    divisi: 32,
    ruangan: "E103",
    hari: "Senin, 1 Januari 2025",
    jam: "11:00 - 12:00",
  },
  {
    key: "4",
    nama: "Jim Red",
    divisi: 32,
    ruangan: "E104",
    hari: "Selasa, 2 Januari 2025",
    jam: "09:00 - 10:00",
  },
];

const TabelApproval = ({ detail }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm({ closeDropdown: false }); // Dropdown tetap terbuka
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
            Close
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
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      ...getColumnSearchProps("nama"),
    },
    {
      title: "Divisi",
      dataIndex: "divisi",
      key: "divisi",
      ...getColumnSearchProps("divisi"),
    },
    {
      title: "Ruangan",
      dataIndex: "ruangan",
      key: "ruangan",
      ...getColumnSearchProps("ruangan"),
    },
    {
      title: "Hari",
      dataIndex: "hari",
      key: "hari",
      ...getColumnSearchProps("hari"),
    },
    {
      title: "Jam",
      dataIndex: "jam",
      key: "jam",
      ...getColumnSearchProps("jam"),
    },
    {
      title: "Action",
      key: "action",
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
    />
  );
};

export default TabelApproval;
