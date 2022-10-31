import { useState, useEffect } from "react";
import { Row, Col, Divider } from "antd";

import MeteoSpin from "../MeteoSpin";

import "./MeteoCurrentData.scss";

//import IconTemp from "../../assets/img/icon-temp.png";

import { getCurrentMeteoApi, getFilterMeteoApi } from "../../api/meteo";

const MeteoCurrentData = (props) => {
  const { location, typeTime, typeQuery } = props;

  const [meteoDates, setMeteoDates] = useState(["load"]);

  const [waterSumDates, setWaterSumDates] = useState(["load"]);

  const [date, setDate] = useState(null);

  useEffect(() => {
    getCurrentMeteoApi(location).then((response) => {
      console.log(response);

      if (response.meteoDates) {
        setMeteoDates(response.meteoDates);
        if (response.meteoDates.length !== 0) {
          setDate(response.meteoDates[0].date);
        }
      } else {
        setMeteoDates(["error"]);
        setWaterSumDates(["error"]);
      }
    });

    if (date !== null) {
      const meteoDate = new Date(date).getTime();

      const startInterval = new Date(meteoDate - 86400000).toISOString();
      const endInterval = new Date(meteoDate).toISOString();

      //console.log(meteoDates);

      console.log(startInterval);
      console.log(endInterval);

      getFilterMeteoApi(
        typeTime,
        typeQuery,
        startInterval,
        endInterval,
        location
      ).then((response) => {
        console.log(response);
        if (response.meteoDates) {
          setWaterSumDates(response.meteoDates);
        }
      });
    }
  }, [location, typeTime, typeQuery, date]);

  //console.log(meteoDates);

  return (
    <div className="sing-in__content-tabs">
      {returnComponent(waterSumDates, meteoDates)}
    </div>
  );
};

function returnComponent(waterSumDates, meteoDates) {
  console.log(meteoDates);
  if (meteoDates !== undefined || waterSumDates !== undefined) {
    if (waterSumDates[0] === "load" || meteoDates[0] === "load") {
      return <MeteoSpin />;
    } else if (meteoDates.length === 0 || meteoDates[0] === "error") {
      return <h3>Sin datos</h3>;
    } else if (waterSumDates.length === 0) {
      return <CurrentData meteoDates={meteoDates} waterSum={0} />;
    } else {
      return (
        <CurrentData
          meteoDates={meteoDates}
          waterSum={waterSumDates[0].water}
        />
      );
    }
  } else {
    return <h3>Sin datos</h3>;
  }
}

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
