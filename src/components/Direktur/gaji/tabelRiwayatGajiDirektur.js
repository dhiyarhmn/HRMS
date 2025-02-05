import { payrollServices } from "@/api/api";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, message, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

const TabelRiwayatGajiDirektur = ({ detail }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    fetchEmployeePayroll();
  }, []);

  const fetchEmployeePayroll = async () => {
    try {
      setLoading(true);
      const response = await payrollServices.getEmployeePayroll();

      console.log("Payroll Response:", response);

      const transformedData = (
        Array.isArray(response.data) ? response.data : []
      ).map((payroll) => ({
        key: payroll.id || payroll.id_payroll || payroll.key,
        date: payroll.date,
        month: payroll.month,
        year: payroll.year,
        basic_salary: payroll.basic_salary,
        total_allowance: payroll.total_allowance,
        total_bonus: payroll.total_bonus,
        total_deduction: payroll.total_deduction,
        total_other_deduction: payroll.total_other_deduction,
        total_salary: payroll.total_salary,
        formattedPeriod: new Date(payroll.date).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
        }),
        formattedSalary: new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(payroll.total_salary || 0),
      }));

      setData(transformedData);

      
    } catch (err) {
      console.error("Error fetching payroll data:", err);

      if (err.response) {
        message.error(
          `Gagal mengambil data gaji: ${
            err.response.data.message || err.message
          }`
        );
      } else {
        message.error(
          "Gagal mengambil data gaji: Terjadi kesalahan tidak dikenal"
        );
      }

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
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
      <div className="p-4">
        <Input
          ref={searchInput}
          placeholder={`Cari ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-2 block w-full"
        />
        <div className="flex justify-between">
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            className="w-24 mr-2"
          >
            Cari
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            className="w-24"
          >
            Reset
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const targetValue = record[dataIndex] ? record[dataIndex].toString() : "";
      return targetValue.toLowerCase().includes(value.toLowerCase());
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text?.toString() || ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Periode",
      dataIndex: "formattedPeriod",
      key: "month",
      ...getColumnSearchProps("formattedPeriod"),
    },
    {
      title: "Total Gaji",
      dataIndex: "formattedSalary",
      key: "salary",
      ...getColumnSearchProps("formattedSalary"),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => detail(record)}
          className="bg-blue-500 hover:bg-blue-600"
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
        loading={loading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Belum ada data gaji"
            />
          ),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} dari ${total} data`,
        }}
        className="shadow-sm"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default TabelRiwayatGajiDirektur;
