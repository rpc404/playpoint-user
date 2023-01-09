import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLeaderboards,
  getLeaderboardByMarketplaceSlug,
} from "../../api/Leaderboards";

import allFlags from "../../helpers/CountryFlags.json";
import { formatNumber } from "../../utils/NumberFomatter";
import GetFlags from "../../utils/GetFlags";

export const getCountryShortName = (country) => {
  if (sessionStorage.getItem("marketplaceSlug") != "fifa-worldcup")
    return country;
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

export default function Leaderboards({ marketplaceSlug }) {
  const navigate = useNavigate();
  const [activeOS, setActiveOS] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [leaderboards, setLeaderboards] = React.useState([]);
  // console.log(marketplaceSlug)

  // const { HomeTeamFlag, AwayTeamFlag } = GetFlags();

  React.useEffect(() => {
    // Windows
    if (navigator.appVersion.indexOf("Win") != -1) setActiveOS("windowsOS");
    // Mac
    else if (navigator.appVersion.indexOf("Mac") != -1) setActiveOS("macOS");
    // Linux and other
    else setActiveOS("otherOS");

    // Fetch fixtures
    (async () => {
      if (marketplaceSlug !== "") {
        sessionStorage.setItem("marketplaceSlug", marketplaceSlug);
        const data = await getLeaderboardByMarketplaceSlug(marketplaceSlug);
        let _leaderboard = data.data.leaderboard;
        setLeaderboards(_leaderboard);
        setLoading(false);
      }
    })();
  }, []);

  // console.log(leaderboards)

  return (
    <div className={`leaderboardItems ${activeOS}`}>
      {leaderboards.length > 0 &&
        !loading &&
        leaderboards.map((leaderboard, key) => {
          return (
            <div
              className="leaderboardItem__container"
              key={key}
              onClick={() => {
                navigate(`/predict/${leaderboard.fixture._id}`);
              }}
            >
              <p>
                {getCountryShortName(leaderboard.fixture.HomeTeam)}
                {GetFlags(marketplaceSlug, leaderboard.fixture.HomeTeam)}
                <span>vs</span>
                {GetFlags(marketplaceSlug, leaderboard.fixture.AwayTeam)}
                {getCountryShortName(leaderboard.fixture.AwayTeam)}
              </p>
              <p>{formatNumber(leaderboard.userCount)}</p>
              <p>{formatNumber(leaderboard.volume)}</p>
            </div>
          );
        })}
      {leaderboards.length < 1 && !loading && (
        <div className="leaderboardItem__container">
          <p style={{ color: "#fff" }}>Leaderboard Not Available!</p>
        </div>
      )}
      {loading &&
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
        )}
    </div>
  );
}
