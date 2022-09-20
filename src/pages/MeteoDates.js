import MeteoDataCard from "../components/MeteoDataCard";

import "./MeteoDates.scss";

export default function MeteoDates() {
  /*   const [meteoDates, setMeteoDates] = useState([]);

  useEffect(() => {
    getLast24MeteoApi().then((response) => {
      setMeteoDates(response.meteoDates);
    });
  }, []);

  console.log(meteoDates); */

  return (
    <div>
      <MeteoDataCard />
    </div>
  );
}
