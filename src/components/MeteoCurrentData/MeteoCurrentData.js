import { useState, useEffect } from "react";
import MeteoSpin from "../MeteoSpin";

import "./MeteoCurrentData.scss";

import IconTemp from "../../assets/img/icon-temp.png";

import { getCurrentMeteoApi } from "../../api/meteo";

const MeteoCurrentData = (props) => {
  const { location } = props;

  /* console.log(typeTime.all);
  console.log(typeQuery.temp); */

  const [meteoDates, setMeteoDates] = useState([
    {
      temp: "load",
      hum: "load",
      pressure: "load",
      water: "load",
    },
  ]);

  useEffect(() => {
    const initValue = {
      temp: "no data",
      hum: "no data",
      pressure: "no data",
      water: "no data",
    };
    getCurrentMeteoApi(location).then((response) => {
      if (!response.meteoDates) {
        console.log(response);
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
      {meteoDates[0].temp === "load" ? (
        <MeteoSpin />
      ) : (
        <CurrentData meteoDates={meteoDates} />
      )}
    </div>
  );
};

function CurrentData(props) {
  const meteoDates = props.meteoDates;

  return (
    <>
      <h3>Fecha: {meteoDates[0].date}ºC</h3>

      <h3>Temperatura: {meteoDates[0].temp}ºC</h3>
      <h3>Humedad: {meteoDates[0].hum} HR</h3>
      <h3>Presión atmosferica: {meteoDates[0].pressure} HP</h3>
      <h3>
        Lluvia: {meteoDates[0].water} l/m<sup>2</sup>
      </h3>
      <h3>
        Luvia acumulada hoy: 30 l/m<sup>2</sup>
      </h3>
    </>
  );
}

export default MeteoCurrentData;
