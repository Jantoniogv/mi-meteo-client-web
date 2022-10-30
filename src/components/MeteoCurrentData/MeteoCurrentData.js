import { useState, useEffect } from "react";
import { Row, Col, Divider } from "antd";

import MeteoSpin from "../MeteoSpin";

import "./MeteoCurrentData.scss";

//import IconTemp from "../../assets/img/icon-temp.png";

import { getCurrentMeteoApi, getFilterMeteoApi } from "../../api/meteo";

const MeteoCurrentData = (props) => {
  const { location, typeTime, typeQuery } = props;

  const [meteoDates, setMeteoDates] = useState([
    {
      temp: "load",
      hum: "load",
      pressure: "load",
      water: "load",
    },
  ]);

  const [waterSumDates, setWaterSumDates] = useState([
    {
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
        console.log(response.meteoDates);
        setMeteoDates(response.meteoDates);
      }
    });
  }, [location]);

  useEffect(() => {
    ///////////////////

    if (
      meteoDates[0].date !== "load" &&
      meteoDates[0].date !== "no data" &&
      meteoDates[0].date !== undefined
    ) {
      const meteoDate = new Date(meteoDates[0].date).getTime();

      const startInterval = new Date(meteoDate - 86400000).toISOString();
      const endInterval = new Date(meteoDate).toISOString();

      console.log(meteoDates[0].date);

      console.log(startInterval);
      console.log(endInterval);

      getFilterMeteoApi(
        typeTime,
        typeQuery,
        startInterval,
        endInterval,
        location
      ).then((response) => {
        if (response.meteoDates) {
          console.log(response);
          setWaterSumDates(response.meteoDates);
        }
      });
    }
  }, [meteoDates, typeTime, typeQuery, location]);

  //console.log(meteoDates);

  return (
    <div className="sing-in__content-tabs">
      {waterSumDates[0].water === "load" ? (
        <MeteoSpin />
      ) : (
        <CurrentData
          meteoDates={meteoDates}
          waterSum={waterSumDates[0].water}
        />
      )}
    </div>
  );
};

function CurrentData(props) {
  const meteoDates = props.meteoDates[0];
  const waterSum = props.waterSum;

  return (
    <>
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
          <h3 className="h3-value">{meteoDates.temp.toFixed(1) + " ºC"}</h3>
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
            {meteoDates.water.toFixed(1)} l/m<sup>2</sup>
          </h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Lluvia acumulada desde las 00:00:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">
            {waterSum.toFixed(1)} l/m<sup>2</sup>
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
          <h3 className="h3-value">{meteoDates.avg_wind.toFixed()} km/h</h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Vel. max. del viento:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">{meteoDates.max_wind.toFixed()} km/h</h3>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={15}>
          <h3 className="h3-data">Vel. min. del viento:</h3>
        </Col>
        <Col span={5}>
          <h3 className="h3-value">{meteoDates.min_wind.toFixed()} km/h</h3>
        </Col>
      </Row>
    </>
  );
}

export default MeteoCurrentData;
