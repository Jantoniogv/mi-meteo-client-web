import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table } from "antd";

import { getLast24MeteoApi } from "../../api/meteo";

/* const columns = [
  {
    title: "Fecha",
    dataIndex: "_id",
    key: "_id",
    render: (date) => {
      return (
        <b>
          {new Date(date.date).toLocaleDateString()} {date.hour}:00:00
        </b>
      );
    },
  },
  {
    title: "Temperatura",
    dataIndex: "temp",
    key: "temp",
    // width: "500",
    render: (text) => {
      return <b>{text + " ºC"}</b>;
    },
  },
  {
    title: "Humedad ambiental",
    dataIndex: "hum",
    key: "hum",
    render: (text) => {
      return <b>{text + " HR"}</b>;
    },
  },
  {
    title: "Presión atmosferica",
    dataIndex: "pressure",
    key: "pressure",
    render: (text) => {
      return <b>{text + " HP"}</b>;
    },
  },
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
]; */

const MeteoTableList = (props) => {
  const { typeTime, typeQuery, startInterval, endInterval } = props;

  /* console.log(typeTime.all);
  console.log(typeQuery.temp); */

  const [meteoDates, setMeteoDates] = useState([]);

  /*   useEffect(() => {
    getLast24MeteoApi().then((response) => {
      setMeteoDates(response.meteoDates);
    });
  }, []); */

  useEffect(() => {
    getLast24MeteoApi(typeTime, typeQuery, startInterval, endInterval).then(
      (response) => {
        setMeteoDates(response.meteoDates);
      }
    );
  }, []);

  console.log(meteoDates);

  const pagination = {
    defaultPageSize: 12,
  };

  return (
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
              {new Date(date.date).toLocaleDateString()} {date.hour}:00:00
            </b>
          );
        } else if (typeTime.day) {
          return <b>{new Date(date.date).toLocaleDateString()}</b>;
        } else if (typeTime.mouth) {
          return (
            <b>
              {new Date(date.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "numeric",
              })}
            </b>
          );
        } else if (typeTime.year) {
          return (
            <b>
              {new Date(date.date).toLocaleDateString(undefined, {
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
        return <b>{text + " ºC"}</b>;
      },
    },
  ];

  let hum = [
    {
      title: "Humedad ambiental",
      dataIndex: "hum",
      key: "hum",
      render: (text) => {
        return <b>{text + " HR"}</b>;
      },
    },
  ];

  let pressure = [
    {
      title: "Presión atmosferica",
      dataIndex: "pressure",
      key: "pressure",
      render: (text) => {
        return <b>{text + " HP"}</b>;
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

  if (
    typeQuery.temp &&
    typeQuery.hum &&
    typeQuery.pressure &&
    typeQuery.water
  ) {
    columns = date.concat(temp).concat(hum).concat(pressure).concat(water);
  } else if (
    typeQuery.temp &&
    !typeQuery.hum &&
    !typeQuery.pressure &&
    !typeQuery.water
  ) {
    columns = date.concat(temp);
  } else if (
    typeQuery.temp &&
    typeQuery.hum &&
    !typeQuery.pressure &&
    !typeQuery.water
  ) {
    columns = date.concat(temp).concat(hum);
  } else if (
    typeQuery.temp &&
    typeQuery.hum &&
    typeQuery.pressure &&
    !typeQuery.water
  ) {
    columns = date.concat(temp).concat(hum).concat(pressure);
  } else if (
    typeQuery.temp &&
    !typeQuery.hum &&
    typeQuery.pressure &&
    !typeQuery.water
  ) {
    columns = date.concat(temp).concat(pressure);
  } else if (
    typeQuery.temp &&
    !typeQuery.hum &&
    !typeQuery.pressure &&
    typeQuery.water
  ) {
    columns = date.concat(temp).concat(water);
  } else if (
    !typeQuery.temp &&
    typeQuery.hum &&
    !typeQuery.pressure &&
    !typeQuery.water
  ) {
    columns = date.concat(hum);
  } else if (
    !typeQuery.temp &&
    typeQuery.hum &&
    typeQuery.pressure &&
    !typeQuery.water
  ) {
    columns = date.concat(hum).concat(pressure);
  } else if (
    !typeQuery.temp &&
    typeQuery.hum &&
    typeQuery.pressure &&
    typeQuery.water
  ) {
    columns = date.concat(hum).concat(pressure).concat(water);
  } else if (
    !typeQuery.temp &&
    typeQuery.hum &&
    !typeQuery.pressure &&
    typeQuery.water
  ) {
    columns = date.concat(hum).concat(water);
  } else if (
    !typeQuery.temp &&
    !typeQuery.hum &&
    typeQuery.pressure &&
    !typeQuery.water
  ) {
    columns = date.concat(pressure);
  } else if (
    !typeQuery.temp &&
    !typeQuery.hum &&
    typeQuery.pressure &&
    typeQuery.water
  ) {
    columns = date.concat(pressure).concat(water);
  } else if (
    !typeQuery.temp &&
    !typeQuery.hum &&
    !typeQuery.pressure &&
    typeQuery.water
  ) {
    columns = date.concat(water);
  }

  //console.log(JSON.stringify(columns));
  //console.log(typeTime);
  //console.log(typeQuery.temp);

  return columns;
};

export default MeteoTableList;
