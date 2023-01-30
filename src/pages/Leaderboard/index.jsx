import React from "react";
const LeaderboardMain = React.lazy(() =>
  import("../../components/LeaderboardMain")
);
import "./styles/style.css";
import { useMarketplaceContext } from "../../contexts/Marketplace/MarketplaceContext";

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
        const data = await (
          await import("../../api/Leaderboards")
        ).getLeaderboardByMarketplaceSlug(marketplaceSlug);
        let _leaderboard = data.data.leaderboard;
        setLeaderboards(_leaderboard);
        setLoading(false);
      } else {
        const data = (
          await import("../../api/Leaderboards")
        ).getAllLeaderboards();
        setLeaderboards(data.data.leaderboards);
        setLoading(false);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (marketplaces.length === 0) {
        let res = (await import("../../api/Marketplace")).getMarketplaces();
        res = res.data.marketplaces;
        setMarketplace(res);

        dispatchMarketplaceData({
          type: (await import("../../contexts/Marketplace/MarketplaceReducer"))
            .ACTIONS.SET_ALL_MARKETPLACE,
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
