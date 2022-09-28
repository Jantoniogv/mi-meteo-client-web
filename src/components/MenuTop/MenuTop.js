import { useEffect } from "react";

import { Select } from "antd";
import MeteoLogo from "../../assets/img/logo-mi-meteo-web.png";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { setLocation } = props;

  const { Option } = Select;

  const handleChange = (value) => {
    setLocation(value);
  };

  return (
    <div className="menu-top">
      <img
        className="menu-top__logo"
        src={MeteoLogo}
        alt="Logo MeteoSubbetica"
      />
      <span className="menu-top__location">
        <span className="menu-top__location-label">Estación meteológica: </span>
        <Select
          className="menu-top__location-select"
          defaultValue="Iznajar"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="iznajar">Iznajar</Option>
          <Option value="lucena">Lucena</Option>
        </Select>
      </span>
    </div>
  );
}
