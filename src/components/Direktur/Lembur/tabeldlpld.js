import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Popover} from "antd";
import Highlighter from "react-highlight-words";
import EditButton from "@/components/editButton";
import axios from "axios";

const { Column, ColumnGroup } = Table;

const Tabeldlpld = ({ employeeId }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [dataLembur, setDataLembur] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil token dari localStorage atau cookies
        const token = localStorage.getItem("token");
        // const token = Cookies.get("token"); // Jika token ada di Cookies (gunakan js-cookie)

        const response = await axios.get(
          `http://127.0.0.1:8000/api/overtimeHistory/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token dalam header
              "Content-Type": "application/json",
            },
          }
        );

        const overtimeHistory = response.data.overtime_history;
        console.log("Data dari API overtimeHistory:", overtimeHistory); // Debug: Cek data yang diterima
        setDataLembur(overtimeHistory);
        setUserRole(response.data.employee.id_role);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (employeeId) {
      fetchData();
    }
  }, [employeeId]);

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

  const NotesStatus = ({ status, notes }) => {
      const content = (
        <div>
          <p>Status: {status === 1 ? 'Approved' : status === 0 ? 'Declined' : 'Pending'}</p>
          <p>Notes : {notes || "-"}</p>
        </div>
      );
  
      const renderStatusIcon = () => {
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
        <Popover content={content} title="Status Persetujuan">
          <div>{renderStatusIcon()}</div>
        </Popover>
      );
    };

  return (
      <Table
        dataSource={dataLembur}
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
          title="Tanggal Pengajuan"
          dataIndex="submission_time"
          align="center"
          {...getColumnSearchProps("submission_time")}
        />
        <Column
          title="Start Time"
          dataIndex="start_time"
          align="center"
          {...getColumnSearchProps("start_time")}
        />
        <Column
          title="End Time"
          dataIndex="end_time"
          align="center"
          {...getColumnSearchProps("end_time")}
        />
        <Column
          title="Total Hour"
          dataIndex="total_hours"
          align="center"
          {...getColumnSearchProps("total_hours")}
        />
        <Column
        title="Keterangan"
        dataIndex="description"
        align="center"
        {...getColumnSearchProps("description")}
      />
      <ColumnGroup title="Persetujuan">
        {userRole === 1 && (
          <>
            <Column title="Manager" dataIndex="approved_by_manager" align="center" render={(persetujuan, record) => (
            <NotesStatus status={persetujuan} notes={record.notes_manager} />
          )} />
            <Column title="HRGA" dataIndex="approved_by_hrga" align="center" render={(persetujuan, record) => (
            <NotesStatus status={persetujuan} notes={record.notes_hrga} />
          )} />
          </>
        )}
        {userRole === 2 && (
          <>
            <Column title="HRGA" dataIndex="approved_by_hrga" align="center" render={(persetujuan, record) => (
            <NotesStatus status={persetujuan} notes={record.notes_hrga} />
          )} />
          </>
        )}
        {userRole === 3 && (
          <Column title="HRGA" dataIndex="approved_by_hrga" align="center" render={(persetujuan, record) => (
            <NotesStatus status={persetujuan} notes={record.notes_hrga} />
          )} />
        )}
      </ColumnGroup>
        <Column
          title="Status"
          dataIndex="status_approval"
          align="center"
          {...getColumnSearchProps("status_approval")}
        />
      </Table>
    );
  };

export default Tabeldlpld;