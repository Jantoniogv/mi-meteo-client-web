import { useState, useEffect } from "react";
import { Row, Col, Divider } from "antd";

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
  const meteoDates = props.meteoDates[0];

  return (
    <>
      {/* <h3>
        Actualizado a:{" "}
        {new Date(meteoDates.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </h3>
      <br></br>
      <h3>
        Temperatura:{" "}
        <span>
          {meteoDates.temp.toFixed(1) + " ºC"}
          <img className="icon-temp" src={IconTemp} alt="icon temp" />
        </span>
      </h3>
      <h3>Humedad: {meteoDates.hum.toFixed()} HR</h3>
      <h3>Presión atmosferica: {meteoDates.pressure.toFixed()} HP</h3>
      <h3>
        Lluvia: {meteoDates.water.toFixed(1)} l/m<sup>2</sup>
      </h3>
      <h3>
        Luvia acumulada hoy: 30 l/m<sup>2</sup>
      </h3> */}

      <div className="date">
        <h3 className="h3-data__date">Actualizado a: </h3>
        <h3 className="h3-value__date">
          {new Date(meteoDates.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </h3>
      </div>

      <Divider />

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Temperatura:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">
            {/* <img className="icon-temp" src={IconTemp} alt="icon temp" /> */}
            {meteoDates.temp.toFixed(1) + " ºC"}
          </h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Humedad:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">{meteoDates.hum.toFixed() + " %"}</h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Presión atmosferica:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">{meteoDates.pressure.toFixed() + " hPa"}</h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Lluvia en los últimos 10 minutos:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">
            {meteoDates.water.toFixed()} l/m<sup>2</sup>
          </h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Lluvia acumulada desde las 00:00:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">
            {meteoDates.water.toFixed()} l/m<sup>2</sup>
          </h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Dirección del viento:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">{meteoDates.dir_wind}</h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Vel. media del viento:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">{meteoDates.avg_wind} km/h</h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Vel. max. del viento:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">{meteoDates.max_wind} km/h</h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Vel. min. del viento:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">{meteoDates.min_wind} km/h</h3>
        </Col>
      </Row>
    </>
  );
}

export default MeteoCurrentData;
