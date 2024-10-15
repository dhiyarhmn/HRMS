import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const Filter = () => (
  <Search
    placeholder="Cari nama ruangan"
    allowClear
    onSearch={onSearch}
    style={{
      width: 200,
    }}
  />
);
export default Filter;
