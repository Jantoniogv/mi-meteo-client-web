import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table } from "antd";

import MeteoSpin from "../MeteoSpin";

import "./MeteoTableList.scss";

import IconTemp from "../../assets/img/icon-temp.png";

import { getLast24MeteoApi } from "../../api/meteo";

const MeteoTableList = (props) => {
  const { typeTime, typeQuery, startInterval, endInterval, location } = props;

  /* console.log(typeTime.all);
  console.log(typeQuery.temp); */

  const [meteoDates, setMeteoDates] = useState(undefined);

  useEffect(() => {
    getLast24MeteoApi(
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
          return <b>{new Date(date.date).toLocaleString()}</b>;
        } else if (typeTime.hour) {
          //console.log("aqui llega");
          return (
            <b>
              {new Date(
                date.year,
                date.month - 1,
                date.day,
                date.hour
              ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </b>
          );
        } else if (typeTime.day) {
          return (
            <b>
              {date.day}/{date.month}/{date.year}
            </b>
          );
        } else if (typeTime.month) {
          return (
            <b>
              {new Date(date.year, date.month - 1).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "numeric",
                }
              )}
            </b>
          );
        } else if (typeTime.year) {
          return (
            <b>
              {new Date(date.year).toLocaleDateString(undefined, {
                year: "numeric",
              })}
            </b>
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
            <b>{text.toFixed(1) + " ºC"}</b>{" "}
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
        return <b>{text.toFixed() + " HR"}</b>;
      },
    },
  ];

  let pressure = [
    {
      title: "Presión atmosferica",
      dataIndex: "pressure",
      key: "pressure",
      render: (text) => {
        return <b>{text.toFixed() + " HP"}</b>;
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
          <b>
            {text + " l/m"} <sup>2</sup>{" "}
          </b>
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
