"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Form, Spin, message } from "antd";
import Highlighter from "react-highlight-words";
import { userServices } from "@/api/api"; // Sesuaikan path ke file API Anda

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // State untuk menyimpan data user
  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk mengontrol modal
  const [selectedUserId, setSelectedUserId] = useState(null); // State untuk menyimpan ID user yang dipilih
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  // Fetch data user saat komponen pertama kali di-render
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userServices.getUsers();
      setUsers(response.data.data); // Sesuaikan dengan struktur response dari backend
    } catch (error) {
      message.error("Gagal mengambil data user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = (id_employee) => {
    setSelectedUserId(id_employee); // Simpan ID user yang dipilih
    setIsModalVisible(true); // Tampilkan modal
  };

  const onFinish = async (values) => {
    
    try {
      // Panggil fungsi resetPassword dari userServices
      const response = await userServices.resetPassword({
        id_employee: selectedUserId,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
      });

      if (response.status === 200) {
        message.success("Password berhasil diubah");
        form.resetFields();
        setIsModalVisible(false); // Tutup modal
      }
    } catch (error) {
      message.error(
        "Gagal mengubah password: " +
          (error.response?.data?.message || "Terjadi kesalahan")
      );
    }
  };

  // Fungsi untuk fitur pencarian
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
      title: "ID Employee",
      dataIndex: "id_employee",
      key: "id_employee",
      ...getColumnSearchProps("id_employee"),
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Role",
      dataIndex: "role_name",
      key: "role_name",
      ...getColumnSearchProps("role_name"),
    },
    {
      title: "Aksi",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleResetPassword(record.id_employee)}
          className="px-4"
        >
          Reset Password
        </Button>
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
    <main className="flex-grow p-6 space-y-8">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Reset Password
              </h1>
            </div>

            {/* Content */}
            <div className="mt-4">
              <Table
                columns={columns}
                dataSource={users}
                rowKey="id_employee"
                scroll={{ x: "max-content" }}
                pagination={{
                  responsive: true,
                  pageSize: 5,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modal untuk reset password */}
      <Modal
        title="Reset Password"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Password Baru"
            name="new_password"
            rules={[{ required: true, message: "Password baru harus diisi" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Konfirmasi Password Baru"
            name="new_password_confirmation"
            dependencies={["new_password"]}
            rules={[
              {
                required: true,
                message: "Konfirmasi password baru harus diisi",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Konfirmasi password tidak sesuai")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }} // Tombol memenuhi lebar form
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default ResetPassword;
