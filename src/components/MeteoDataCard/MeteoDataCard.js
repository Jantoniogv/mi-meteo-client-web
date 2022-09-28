import { useState } from "react";
import { Card } from "antd";

import "./MeteoDataCard.scss";

import MeteoTableList from "../MeteoTableList";
import MeteoCurrentData from "../MeteoCurrentData/MeteoCurrentData";

const tabList = [
  {
    key: "current",
    tab: "Medidas actuales",
  },
  {
    key: "lastHours",
    tab: "Últimas 24 horas",
  },
  {
    key: "last30Days",
    tab: "Últimos 30 días",
  },
  {
    key: "last12month",
    tab: "Últimos 12 meses",
  },
];

const MeteoDataCard = (props) => {
  const { location } = props;

  console.log(location);

  const [activeTabKey1, setActiveTabKey1] = useState("current");

  const contentList = {
    current: <MeteoCurrentData location={location} />,
    lastHours: (
      <MeteoTableList
        typeTime={typeTime(0, 1, 0, 0, 0, 0)}
        typeQuery={typeQuery(1, 1, 1, 1)}
        startInterval={Date.now() - 86400000}
        endInterval={Date.now()}
        location={location}
      />
    ),
    last30Days: (
      <MeteoTableList
        typeTime={typeTime(0, 0, 1, 0, 0, 0)}
        typeQuery={typeQuery(1, 1, 1, 1)}
        startInterval={Date.now() - 2592000000}
        endInterval={Date.now()}
        location={location}
      />
    ),
    last12month: (
      <MeteoTableList
        typeTime={typeTime(0, 0, 0, 0, 1, 0)}
        typeQuery={typeQuery(1, 1, 1, 1)}
        startInterval={Date.now() - 31536000000}
        endInterval={Date.now()}
        location={location}
      />
    ),
  };

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <div className="meteo-card">
      <Card
        title={`Estacion meteorológica de ${location}`}
        style={{
          overflow: "auto",
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
    </div>
  );
};

const typeTime = (a, h, d, w, m, y) => {
  let timeType = {
    all: a,
    hour: h,
    day: d,
    week: w,
    mouth: m,
    year: y,
  };

  return timeType;
};

const typeQuery = (t, h, p, w) => {
  let typeQuery = {
    temp: t,
    hum: h,
    pressure: p,
    water: w,
  };

  return typeQuery;
};

export default MeteoDataCard;
