import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLeaderboards,
  getLeaderboardByMarketplaceSlug,
} from "../../api/Leaderboards";

import allFlags from "../../helpers/CountryFlags.json";
import { formatNumber } from "../../utils/NumberFomatter";
import clubFlags from "../../helpers/EPLFlags.json";
import CarabaoClubFlags from "../../helpers/EFLFlags.json";
import EPLFlags from "../../helpers/EPLFlags.json"

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

export default function Leaderboards({marketplaceSlug}) {
  const navigate = useNavigate();
  const [activeOS, setActiveOS] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [leaderboards, setLeaderboards] = React.useState([]);
  // console.log(marketplaceSlug)

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
        sessionStorage.setItem("marketplaceSlug", marketplaceSlug)
        const data = await getLeaderboardByMarketplaceSlug(marketplaceSlug);
        let _leaderboard = data.data.leaderboard;
        setLeaderboards(_leaderboard);
        setLoading(false);
      }
    })();
  }, []);

  const HomeTeamFlag = (team) => {
    if (localStorage.getItem("marketplaceSlug") === "English-Football-League397") {
      return clubFlags.map((club, i) => {
        if (club.name === team) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (localStorage.getItem("marketplaceSlug") === "Carabao-Cup237") {
      return CarabaoClubFlags.map((club, i) => {
        if (club.name === team) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (marketplaceSlug === "premiere-league") {
      return EPLFlags.map((club, i) => {
        if (
          club.name.replace(" ", "").toLowerCase().trim() ===
          team.replace(" ", "").toLowerCase().trim()
        ) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    }
  };

  const AwayTeamFlag = (team) => {
    if (marketplaceSlug === "English-Football-League397") {
      return clubFlags.map((club, i) => {
        if (club.name === team) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (marketplaceSlug === "Carabao-Cup237") {
      return CarabaoClubFlags.map((club, i) => {
        if (club.name === team) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    } else if (marketplaceSlug === "premiere-league") {
      return EPLFlags.map((club, i) => {
        if (
          club.name.replace(" ", "").toLowerCase().trim() ===
          team.replace(" ", "").toLowerCase().trim()
        ) {
          return (
            <img
              src={club.image_url}
              alt={club.name}
              key={i}
              className="home__Image"
            />
          );
        }
      });
    }
  };

  return (
    <div className={`leaderboardItems ${activeOS}`}>
      {leaderboards.length > 0 && !loading ? (
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
                {/* <img
                  src={getCountryShortName(leaderboard.fixture.HomeTeam)}
                  loading="lazy"
                  alt=""
                /> */}
                {HomeTeamFlag(leaderboard.fixture.HomeTeam)}
                <span>vs</span>
                {/* <img
                  src={getCountryShortName(leaderboard.fixture.AwayTeam)}
                  loading="lazy"
                  alt=""
                /> */}
                {AwayTeamFlag(leaderboard.fixture.AwayTeam)}
                {getCountryShortName(leaderboard.fixture.AwayTeam)}
              </p>
              <p>{formatNumber(leaderboard.userCount)}</p>
              <p>{formatNumber(leaderboard.volume)}</p>
            </div>
          );
        })
      ) : (
        <div className="leaderboardItem__container">
          <p style={{ color: "#fff" }}>Leaderboard Not Available!</p>
        </div>
      )}
      {!loading &&
        leaderboards.length < 1 &&
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
