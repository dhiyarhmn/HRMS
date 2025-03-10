import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

const { Column, ColumnGroup } = Table;

const Tabelldpcm = ({ detail, onDetail }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [dataKetidakhadiran, setDataKetidakhadiran] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil token dari localStorage atau cookies
        const token = localStorage.getItem("token");
        // const token = Cookies.get("token"); // Jika token ada di Cookies (gunakan js-cookie)

        const response = await axios.get(
          "http://127.0.0.1:8000/api/employeeByRole",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token dalam header
              "Content-Type": "application/json",
            },
          }
        );

        const employeeDetail = response.data.data;
        console.log("Data dari API employeeByRole:", employeeDetail); // Debug: Cek data yang diterima
        setDataKetidakhadiran(employeeDetail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <Table
      dataSource={dataKetidakhadiran}
      className="w-full bg-white rounded-lg"
      align="center"
      pagination={{
        pageSize: 10,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} dari ${total} data`,
      }}
      scroll={{scrollToFirstRowOnChange: true,}}
    >
      <Column
        title="No"
        dataIndex="no"
        align="center"
        render={(_, __, index) => index + 1}
      />
      <Column
        title="NIK"
        dataIndex="NIK"
        align="center"
        {...getColumnSearchProps("NIK")}
      />
      <Column
        title="Nama"
        dataIndex="Nama"
        align="center"
        {...getColumnSearchProps("Nama")}
      />
      <Column
        title="Departemen"
        dataIndex="Department"
        align="center"
        {...getColumnSearchProps("Department")}
      />
      <Column
        title="Jabatan"
        dataIndex="Jabatan"
        align="center"
        {...getColumnSearchProps("Jabatan")}
      />

      <Column
        title="Action"
        align="center"
        render={(_, record) => (
          <Space size="middle">
            <button
              onClick={() => onDetail(record["ID Employee"])} // Kirim ID Employee yang dipilih
              className="text-blue-500"
            >
              Detail
            </button>
          </Space>
        )}
      />
    </Table>
  );
};

export default Tabelldpcm;
