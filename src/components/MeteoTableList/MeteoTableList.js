import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table } from "antd";

import MeteoSpin from "../MeteoSpin";

import "./MeteoTableList.scss";

import IconTemp from "../../assets/img/icon-temp.png";

import { getFilterMeteoApi } from "../../api/meteo";

const MeteoTableList = (props) => {
  const { typeTime, typeQuery, startInterval, endInterval, location } = props;

  /* console.log(typeTime.all);
  console.log(typeQuery.temp); */

  const [meteoDates, setMeteoDates] = useState(null);

  useEffect(() => {
    getFilterMeteoApi(
      typeTime,
      typeQuery,
      startInterval,
      endInterval,
      location
    ).then((response) => {
      if (!response.meteoDates) {
        console.log(response);
        setMeteoDates([]);
      } else {
        setMeteoDates(response.meteoDates);
      }
    });
  }, [typeTime, typeQuery, startInterval, endInterval, location]);

  console.log(meteoDates);

  const pagination = {
    defaultPageSize: 12,
  };

  return (
    <>
      {!meteoDates ? (
        <MeteoSpin />
      ) : (
        <Table
          columns={getColums(typeTime, typeQuery)}
          dataSource={meteoDates}
          rowKey={() => {
            return uuidv4();
          }}
          pagination={pagination}
          onCell
          scroll={{
            x: true,
          }}
          scrollToFirstRowOnChange={true}
        />
      )}
    </>
  );
};

const getColums = (typeTime, typeQuery) => {
  /*  console.log(typeTime.all);
  console.log(typeQuery.temp); */

  let columns;

  let date = [
    {
      title: "Fecha",
      dataIndex: "_id",
      key: "_id",
      render: (date) => {
        if (typeTime.all) {
          return (
            <h3 className="h3-value">{new Date(date.date).toLocaleString()}</h3>
          );
        } else if (typeTime.hour) {
          //console.log("aqui llega");
          return (
            <h3 className="h3-value">
              {new Date(
                Date.UTC(date.year, date.month - 1, date.day, date.hour)
              ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </h3>
          );
        } else if (typeTime.day) {
          return (
            <h3 className="h3-value">
              {new Date(
                Date.UTC(date.year, date.month - 1, date.day)
              ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
              })}
            </h3>
          );
        } else if (typeTime.month) {
          return (
            <h3 className="h3-value">
              {new Date(Date.UTC(date.year, date.month - 1)).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "numeric",
                }
              )}
            </h3>
          );
        } else if (typeTime.year) {
          return (
            <h3 className="h3-value">
              {new Date(Date.UTC(date.year)).toLocaleDateString(undefined, {
                year: "numeric",
              })}
            </h3>
          );
        }
      },
    },
  ];

  let temp = [
    {
      title: "Temperatura",
      dataIndex: "temp",
      key: "temp",
      render: (text) => {
        return (
          <span>
            <img className="icon-temp" src={IconTemp} alt="icon temp" />
            <h3 className="h3-value">{text.toFixed(1) + " ºC"}</h3>{" "}
          </span>
        );
      },
    },
  ];

  let hum = [
    {
      title: "Humedad ambiental",
      dataIndex: "hum",
      key: "hum",
      render: (text) => {
        return <h3 className="h3-value">{text.toFixed() + " HR"}</h3>;
      },
    },
  ];

  let pressure = [
    {
      title: "Presión atmosferica",
      dataIndex: "pressure",
      key: "pressure",
      render: (text) => {
        return <h3 className="h3-value">{text.toFixed() + " HP"}</h3>;
      },
    },
  ];

  let water = [
    {
      title: "Lluvia",
      dataIndex: "water",
      key: "water",
      render: (text) => {
        return (
          <h3 className="h3-value">
            {text + " l/m"} <sup>2</sup>{" "}
          </h3>
        );
      },
    },
  ];

  columns = date;

  if (typeQuery.temp) {
    columns = columns.concat(temp);
  }

  if (typeQuery.hum) {
    columns = columns.concat(hum);
  }

  if (typeQuery.pressure) {
    columns = columns.concat(pressure);
  }

  if (typeQuery.water) {
    columns = columns.concat(water);
  }

  //console.log(JSON.stringify(columns));
  //console.log(typeTime);
  //console.log(typeQuery.temp);

  return columns;
};

export default MeteoTableList;
