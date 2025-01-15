import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    nama: "John Brown",
    divisi: 32,
  },
  {
    key: "2",
    nama: "Joe Black",
    divisi: 42,
  },
  {
    key: "3",
    nama: "Jim Green",
    divisi: 32,
  },
  {
    key: "4",
    nama: "Jim Red",
    divisi: 32,
  },
  {
    key: "5",
    nama: "John Brown",
    divisi: 32,
  },
  {
    key: "6",
    nama: "Joe Black",
    divisi: 42,
  },
  {
    key: "7",
    nama: "Jim Green",
    divisi: 32,
  },
  {
    key: "8",
    nama: "Jim Red",
    divisi: 32,
  },
  {
    key: "9",
    nama: "John Brown",
    divisi: 32,
  },
  {
    key: "10",
    nama: "Joe Black",
    divisi: 42,
  },
  {
    key: "11",
    nama: "Jim Green",
    divisi: 32,
  },
  {
    key: "12",
    nama: "Jim Red",
    divisi: 32,
  },
];

const TabelGajiAdmin = ({ detail }) => {
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
      <div className="p-4" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-3 block w-full"
        />
        <Space className="flex flex-wrap gap-2">
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            className="min-w-[90px]"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            className="min-w-[90px]"
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
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
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => detail(record)}
          className="text-blue-500 p-0"
        >
          Detail
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        dataSource={data}
        className="min-w-full"
        scroll={{ x: "max-content" }}
        pagination={{
          responsive: true,
          position: ["bottomCenter"],
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </div>
  );
};

export default TabelGajiAdmin;
