import { Pagination } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {
  getAllLeaderboards,
  getLeaderboardByMarketplaceSlug,
} from "../../api/Leaderboards";
import FixtureTable from "./components/FixtureTable";
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
      <div className="divider"></div>

      <main>
        <div className="fixturesLeaderboard__container">
          <h2>📈 Top Ranked Fixtures</h2>
          <FixtureTable />
          <Pagination style={{ marginTop: 15 }} count={10} />
        </div>

        <div className="usersLeaderboard__container">
          <h2>⛹️ Top Ranked Users</h2>

          <div className="topThreeUsers">
            <div className="topUser">
              <div className="user__avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/102910615?v=4"
                  loading="lazy"
                />
              </div>
              <div className="user__info">
                <h1>🥇1st Place</h1>
                <h4>
                  <Link to="/">Jessica, 0xb05c64...119e37</Link>
                </h4>
              </div>
              <div className="gameDetails">
                <div>
                  <p>Wins</p>
                  <span>12</span>
                </div>
                <div>
                  <p>Games</p>
                  <span>12</span>
                </div>
                <div>
                  <p>Volume</p>
                  <span>12</span>
                </div>
              </div>
            </div>

            <div className="top3User">
              <div className="user__avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/102910615?v=4"
                  loading="lazy"
                />
              </div>
              <div className="user__info">
                <h4>
                  <Link to="/">🥈Jessica, 0xb05...9e37</Link>
                </h4>
                <div className="gameDetails">
                  <div>
                    <p>Wins</p>
                    <span>12</span>
                  </div>
                  <div>
                    <p>Games</p>
                    <span>12</span>
                  </div>
                  <div>
                    <p>Volume</p>
                    <span>12</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="top3User">
              <div className="user__avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/102910615?v=4"
                  loading="lazy"
                />
              </div>
              <div className="user__info">
                <h4>
                  <Link to="/">🥉 Jessica, 0xb05...9e37</Link>
                </h4>
                <div className="gameDetails">
                  <div>
                    <p>Wins</p>
                    <span>12</span>
                  </div>
                  <div>
                    <p>Games</p>
                    <span>12</span>
                  </div>
                  <div>
                    <p>Volume</p>
                    <span>12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
