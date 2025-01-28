"use client";
import { bookingServices } from "@/api/api";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message, Spin, Tag } from "antd";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";

const TabelBookingDirektur = ({ refreshTrigger, statusFilter }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger, statusFilter]); // Add statusFilter to dependencies

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingServices.getUserBookings();

      if (response.data && response.data.data) {
        let filteredData = response.data.data;

        // Apply status filter
        if (statusFilter && statusFilter !== "all") {
          filteredData = filteredData.filter(
            (booking) =>
              booking.booking_status.toLowerCase() ===
              statusFilter.toLowerCase()
          );
        }

        const transformedData = filteredData.map((booking) => ({
          key: booking.id_booking,
          date: booking.booking_date,
          booking_date: dayjs(booking.booking_date).format("DD MMMM YYYY"),
          room: booking.room.room_name,
          status: booking.booking_status,
          time: booking.times
            .map((time) => `${time.start} - ${time.end}`)
            .join(", "),
          raw_data: booking,
        }));

        setBookings(transformedData);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      message.error("Gagal mengambil data booking");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "accept":
        return "green";
      case "reject":
        return "red";
      default:
        return "default";
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
      title: "Ruangan",
      dataIndex: "room",
      key: "room",
      ...getColumnSearchProps("room"),
      className: "min-w-[150px]",
    },
    {
      title: "Tanggal",
      dataIndex: "booking_date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      className: "min-w-[150px]",
    },
    {
      title: "Jadwal",
      dataIndex: "time",
      key: "time",
      className: "min-w-[200px]",
      render: (text) => (
        <div className="whitespace-normal break-words">{text}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "min-w-[100px]",
      render: (status) => (
        <Tag color={getStatusColor(status)} className="text-sm">
          {status.toUpperCase()}
        </Tag>
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
        dataSource={bookings}
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} dari ${total} data`,
        }}
        scroll={{
          x: "max-content",
          scrollToFirstRowOnChange: true,
        }}
      />
    </div>
  );
};

export default TabelBookingDirektur;