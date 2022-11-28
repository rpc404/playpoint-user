import { Skeleton } from "@mui/material";
import React from "react";
import {
  getAllLeaderboards,
  getLeaderboardByMarketplaceSlug,
} from "../../api/Leaderboards";

export default function Leaderboards() {
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
        setLeaderboards(data.data.leaderboards);
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
            <div className="leaderboardItem__container" key={key}>
              <p>
                {leaderboard.fixture.HomeTeam}/{leaderboard.fixture.AwayTeam}
              </p>
              <p>{leaderboard.totalUsers}</p>
              <p>{leaderboard.totalVolume}</p>
            </div>
          );
        })}
      {loading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
          return (
            <div className="leaderboardItem__container" key={index}>
              <Skeleton width={70} height={30} />
              <Skeleton width={70} height={30} />
              <Skeleton width={70} height={30} />
            </div>
          );
        })}
    </div>
  );
}
