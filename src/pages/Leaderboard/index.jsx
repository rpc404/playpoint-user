import React from "react";
import {
  getAllLeaderboards,
  getLeaderboardByMarketplaceSlug,
} from "../../api/Leaderboards";
import LeaderboardMain from "../../components/LeaderboardMain";
import "./styles/style.css";
import { getMarketplaces } from "../../api/Marketplace";
import { useMarketplaceContext } from "../../contexts/Marketplace/MarketplaceContext";
import { ACTIONS } from "../../contexts/Marketplace/MarketplaceReducer";

const Leaderboard = () => {
  const [activeOS, setActiveOS] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [leaderboards, setLeaderboards] = React.useState([]);
  const [{ marketplaces }, dispatchMarketplaceData] = useMarketplaceContext();
  const [marketplace, setMarketplace] = React.useState([]);

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

  React.useEffect(() => {
    (async () => {
      if (marketplaces.length === 0) {
        let res = await getMarketplaces();
        res = res.data.marketplaces;
        setMarketplace(res);

        dispatchMarketplaceData({
          type: ACTIONS.SET_ALL_MARKETPLACE,
          payload: res,
        });
      }
      setLoading(false);
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
          {marketplace.map((marketplace, i) => {
            return (
              <option value={`${marketplace.maketplaceName}`} key={i}>
                {marketplace.maketplaceName}
              </option>
            );
          })}
        </select>
      </div>
      {/* <div className="divider"></div> */}

      <LeaderboardMain />
    </div>
  );
};

export default Leaderboard;
