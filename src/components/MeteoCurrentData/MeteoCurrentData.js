//import MeteoTableList from "../MeteoTableList";

const MeteoCurrentData = (props) => {
  const { meteoDates } = props;

  // const { TabPane } = Tabs;

  return (
    <div className="sing-in__content-tabs">
      <h3>Temperatura: 20 ºC</h3>
      <h3>Humedad: 40 HR</h3>
      <h3>
        Lluvia: 0 l/m<sup>2</sup>
      </h3>
      <h3>
        Luvia acumulada hoy: 30 l/m<sup>2</sup>
      </h3>
    </div>
  );
};

export default MeteoCurrentData;
