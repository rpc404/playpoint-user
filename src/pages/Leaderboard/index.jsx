import React from "react";
import {
  getAllLeaderboards,
  getLeaderboardByMarketplaceSlug,
} from "../../api/Leaderboards";
import LeaderboardMain from "../../components/LeaderboardMain";
import "./styles/style.css";

const Leaderboard = () => {
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

  return (
    <div className="leaderboard__container">
      <div className="filterarea">
        <h1>Leaderboards</h1>
        <div className="search__container">
          <i className="ri-search-line icon"></i>
          <input type="input" placeholder="Search Fixtures..." />
        </div>
        <select name="" id="">
          <option value="">Select Marketplace</option>
          <option value="">Fifa World Cup</option>
          <option value="">Premiere League</option>
        </select>
      </div>
      {/* <div className="divider"></div> */}

      <LeaderboardMain/>
    </div>
  );
};

export default Leaderboard;
