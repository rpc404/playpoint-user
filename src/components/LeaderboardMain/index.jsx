import { Pagination } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { Link } from "react-router-dom";
import { getLeaderboardByMarketplaceSlug } from "../../api/Leaderboards";
import { formatNumber } from "../../utils/NumberFomatter";
const FixtureTable = React.lazy(() => import("../FixtureTable"));
import "./styles/style.css";

export default function LeaderboardMain() {
  const [leaderboards, setLeaderboards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [topRanked, setTopRanked] = React.useState([]);
  const [currPage, setCurrPage] = React.useState(1);

  const controller = new AbortController();
  React.useEffect(() => {
    getLeaderboardByMarketplaceSlug("fifa-worldcup", controller).then((res) => {
      setTopRanked(res.data.topranked);
      setLeaderboards(res.data.leaderboard);
    });
    setLoading(false);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main className="leaderboardMain__container">
      <div className="fixturesLeaderboard__container">
        <h1>📈 {t("TopRankedFixtures")}</h1>

        <FixtureTable
          leaderboard={leaderboards}
          currPage={currPage}
          loading={loading}
        />
        <Pagination
          style={{ marginTop: 15 }}
          count={Math.ceil(leaderboards.length / 10)}
          onChange={(e) => setCurrPage(e.target.innerText)}
          variant="outlined"
          hideNextButton
          hidePrevButton
        />
      </div>

      <div className="usersLeaderboard__container">
        <h2>⛹️ {t("TopRankedUsers")}</h2>
        <div className="topThreeUsers">
          <div className="topUser">
            <div className="user__avatar">
              <img
                src={`https://robohash.org/${topRanked[0]?.username || "_0"}`}
                loading="lazy"
                height={"200"}
                width={"200"}
                alt={`${topRanked[0]?.username}'s__image`}
              />
            </div>
            <div className="user__info">
              <h1>🥇{t("1stPlace")}</h1>
              <h2>
                <Link to={`/profile/@${topRanked[0]?.username}`}>
                  {topRanked[0]?.username},{" "}
                  {String(topRanked[0]?.wallet).substring(0, 5)}...
                  {String(topRanked[0]?.wallet).substring(10, 16)}
                </Link>
              </h2>
            </div>
            <div className="gameDetails">
              <div>
                <p>{t("Points")}</p>
                <span>{formatNumber(topRanked[0]?.points)}</span>
              </div>

              <div>
                <p>{t("Amount")}</p>
                <span>{formatNumber(topRanked[0]?.amount)} PPTT</span>
              </div>
            </div>
          </div>
          {topRanked.map((user, i) => {
            if (i > 0 && i < 4) {
              return (
                <div className="top3User" key={i}>
                  <div className="user__avatar">
                    <img
                      src={`https://robohash.org/${user?.username || "_0"}`}
                      loading="lazy"
                      height={"40"}
                      width="40"
                      alt={`${user?.username}'s_image`}
                    />
                  </div>
                  <div className="user__info">
                    <h3>
                      <Link to={`/profile/@${user?.username}`}>
                        {user?.username}, {String(user?.wallet).substring(0, 5)}
                        ...{String(user?.wallet).substring(10, 16)}
                      </Link>
                    </h3>
                    <div className="gameDetails">
                      <div>
                        <p>Pts.</p>
                        <span>{formatNumber(user?.points)}</span>
                      </div>

                      <div>
                        <p>Amt</p>
                        <span>{formatNumber(user?.amount)} PPTT</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </main>
  );
}
