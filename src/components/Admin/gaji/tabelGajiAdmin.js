import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Spin } from "antd";
import Highlighter from "react-highlight-words";
import { userServices } from "@/api/api";

const TabelGajiAdmin = ({ detail, update }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    const fetchUsersById = async (userId) => {
      try {
        const response = await userServices.getUserById(userId);
        return {
          key: response.data.data.id_employee,
          nama: response.data.data.employee_data.name,
          department_name: response.data.data.employee_data.department_name,
          position: response.data.data.employee_data.position,
        };
      } catch (err) {
        console.error(`Error fetching user ${userId}:`, err);
        return null;
      }
    };

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userListResponse = await userServices.getUsers();
        const userIds = userListResponse.data.data.map(
          (user) => user.id_employee
        );
        const userDataPromises = userIds.map((userId) =>
          fetchUsersById(userId)
        );
        const userData = await Promise.all(userDataPromises);
        const validUserData = userData.filter((user) => user !== null);
        setData(validUserData);
      } catch (err) {
        setError(err.message || "Failed to fetch employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      ...getColumnSearchProps("nama"),
    },
    {
      title: "Departemen",
      dataIndex: "department_name",
      key: "department_name",
      ...getColumnSearchProps("department_name"),
    },
    {
      title: "Posisi",
      dataIndex: "position",
      key: "position",
      ...getColumnSearchProps("position"),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => detail(record.key)}
            className="px-4"
          >
            Detail
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => update(record.key)}
            className="bg-green-500 hover:bg-green-600 border-green-500"
            style={{ backgroundColor: "#10B981", borderColor: "#10B981" }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: "max-content",
          scrollToFirstRowOnChange: true,
        }}
        pagination={{
          responsive: true,
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </div>
  );
};

export default TabelGajiAdmin;
