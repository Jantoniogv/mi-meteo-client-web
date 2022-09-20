import { Select } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import MeteoLogo from "../../assets/img/logo-meteo-subbetica.png";
import IconLocation from "../../assets/img/icon-location.png";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;

  const { Option } = Select;

  const logoutUser = () => {
    console.log("cerrar");
  };

  return (
    <div className="menu-top">
      <img className="menu-top__logo" src={MeteoLogo} alt="Jose Antonio" />
      <span className="menu-top__location">
        <span className="menu-top__location-label">Estación meteológica: </span>
        <Select
          className="menu-top__location-select"
          defaultValue="Iznajar"
          style={{ width: 120 }}
          //onChange={handleChange}
        >
          <Option value="iznajar">Iznajar</Option>
          <Option value="lucena">Lucena</Option>
        </Select>
      </span>
    </div>
  );
}
