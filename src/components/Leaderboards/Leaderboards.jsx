import { Skeleton } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getAllLeaderboards,
  getLeaderboardByMarketplaceSlug,
} from "../../api/Leaderboards";

import allFlags from "../../helpers/CountryFlags.json";


export default function Leaderboards() {
  const navigate = useNavigate();
  const [activeOS, setActiveOS] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [leaderboards, setLeaderboards] = React.useState([]);


  const getCountryShortName = (country) => {
    let name = "";
    allFlags.map((flag, key) => {
      if (flag.name === country) {
        name = flag.code;
      } else if (country === "USA") {
        name =
          "USA";
      } else if (country === "South Korea" || country === "Korea Republic") {
        name =
          "KR";
      }
    });
    return name;
  };

  React.useEffect(() => {
    // Windows
    if (navigator.appVersion.indexOf("Win") != -1) setActiveOS("windowsOS");
    // Mac
    else if (navigator.appVersion.indexOf("Mac") != -1) setActiveOS("macOS");
    // Linux and other
    else setActiveOS("otherOS");

    // Fetch fixtures
    (async () => {
      const marketplaceSlug = sessionStorage.getItem("marketplaceSlug");
      if (marketplaceSlug !== "") {
        const data = await getLeaderboardByMarketplaceSlug(marketplaceSlug);
        let _leaderboard = data.data.leaderboard;
        console.log(_leaderboard)
        setLeaderboards(_leaderboard);
        setLoading(false);
      } else {
        const data = await getAllLeaderboards();
        setLeaderboards(data.data.leaderboards);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className={`leaderboardItems ${activeOS}`}>
      {leaderboards.length >= 1 &&
        leaderboards.map((leaderboard, key) => {
          return (
            <div className="leaderboardItem__container" key={key} onClick={()=>{navigate(`/predict/${leaderboard.fixture._id}`); window.location.reload()} }>
              <p>
                {getCountryShortName(leaderboard.fixture.HomeTeam)}/{getCountryShortName(leaderboard.fixture.AwayTeam)}
              </p>
              <p>{leaderboard.userCount}</p>
              <p>{leaderboard.volume}</p>
            </div>
          );
        })}
      {loading && (
        <div className="leaderboardItem__container">
          <Skeleton width={70} height={30} />
          <Skeleton width={70} height={30} />
          <Skeleton width={70} height={30} />
        </div>
      )}
    </div>
  );
}
