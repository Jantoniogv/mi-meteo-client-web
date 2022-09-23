import { useState, useEffect } from "react";

import "./MeteoCurrentData.scss";

import IconTemp from "../../assets/img/icon-temp.png";

import { getCurrentMeteoApi } from "../../api/meteo";

const MeteoCurrentData = (props) => {
  const { location } = props;

  /* console.log(typeTime.all);
  console.log(typeQuery.temp); */

  const initValue = {
    temp: "no data",
    hum: "no data",
    pressure: "no data",
    water: "no data",
  };

  const [meteoDates, setMeteoDates] = useState([initValue]);

  useEffect(() => {
    getCurrentMeteoApi(location).then((response) => {
      if (!response.meteoDates) {
        setMeteoDates([initValue]);
      } else {
        console.log(initValue);
        setMeteoDates(response.meteoDates);
      }
    });
  }, [location]);

  //console.log(meteoDates);

  return (
    <div className="sing-in__content-tabs">
      <h3>Temperatura: {meteoDates[0].temp}ºC</h3>
      <h3>Humedad: {meteoDates[0].hum} HR</h3>
      <h3>Presión atmosferica: {meteoDates[0].pressure} HP</h3>
      <h3>
        Lluvia: {meteoDates[0].water} l/m<sup>2</sup>
      </h3>
      <h3>
        Luvia acumulada hoy: 30 l/m<sup>2</sup>
      </h3>
    </div>
  );
};

export default MeteoCurrentData;
