import React from "react";
import CountryFlags from "../../helpers/CountryFlags.json";
import "./styles/style.css";

export default function Topbar() {
  const [flags, setFlags] = React.useState([]);

  React.useEffect(() => {
    var tempFlags = [];
    for (let f = 0; f < CountryFlags.length; f++)
      tempFlags.push(CountryFlags[f]);

    setFlags([...new Set(tempFlags)]);
  }, []);
  return (
    <div className="topbar__container">
      <div className="details">
        Participating Country Sites <i className="ri-attachment-line"></i>
      </div>
      <div className="imgContainers">
        {flags.map((d, i) => {
          return <img src={d.image} alt={d.name} key={i} loading="lazy" />;
        })}
      </div>
    </div>
  );
}
