import MeteoDataCard from "../components/MeteoDataCard";

import "./MeteoDates.scss";

export default function MeteoDates(props) {
  const { location } = props;

  return (
    <div>
      <MeteoDataCard location={location} />
    </div>
  );
}
