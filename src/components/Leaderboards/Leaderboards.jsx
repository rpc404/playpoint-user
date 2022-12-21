import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLeaderboards,
  getLeaderboardByMarketplaceSlug,
} from "../../api/Leaderboards";

import allFlags from "../../helpers/CountryFlags.json";
export const getCountryShortName = (country) => {
  let name = "";
  allFlags.map((flag, key) => {
    if (flag.name === country) {
      name = flag.code;
    } else if (country === "USA") {
      name = "USA";
    } else if (country === "South Korea" || country === "Korea Republic") {
      name = "KR";
    }
  });
  return name;
};

export default function Leaderboards() {
  const navigate = useNavigate();
  const [activeOS, setActiveOS] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [leaderboards, setLeaderboards] = React.useState([]);


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
        setLeaderboards(_leaderboard);
        setLoading(false);
      } else {
        const data = await getAllLeaderboards();
        setLeaderboards(data.data.leaderboards);
        setLoading(false);
      }
    })();
  }, []);
  // console.log(leaderboards)
  return (
    <div className={`leaderboardItems ${activeOS}`}>
      {leaderboards.length >= 1 && !loading ? (
        leaderboards.map((leaderboard, key) => {
          return (
            <div
              className="leaderboardItem__container"
              key={key}
              onClick={() => {
                navigate(`/predict/${leaderboard.fixture._id}`);
                window.location.reload();
              }}
            >
              <p>
                {getCountryShortName(leaderboard.fixture.HomeTeam)}
                <img
                  src={getCountryShortName(leaderboard.fixture.HomeTeam)}
                  loading="lazy"
                  alt=""
                />
                <span>vs</span>
                <img
                  src={getCountryShortName(leaderboard.fixture.AwayTeam)}
                  loading="lazy"
                  alt=""
                />
                {getCountryShortName(leaderboard.fixture.AwayTeam)}
              </p>
              <p>{leaderboard.userCount}</p>
              <p>{leaderboard.volume}</p>
            </div>
          );
        })
      ) : (
        <div className="leaderboardItem__container">
          <p style={{ color: "#fff" }}>Leaderboard Not Available!</p>
        </div>
      )}
      {loading && leaderboards.length < 1 ? (
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(
          (_, index) => {
            return (
              <div className="leaderboardItem__container" key={index}>
                <Skeleton width={70} height={30} />
                <Skeleton width={70} height={30} />
                <Skeleton width={70} height={30} />
              </div>
            );
          }
        )
      ) : (
        <div className="leaderboardItem__container">
          <p>Leaderboard Not Available.</p>
        </div>
      )}
    </div>
  );
}
