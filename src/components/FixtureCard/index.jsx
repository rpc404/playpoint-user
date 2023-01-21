import { Button, Typography } from "@mui/material";
import React from "react";
import CountryFlags from "../../helpers/CountryFlags.json";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import GetFlags from "../../utils/GetFlags";
import useWindowDimensions from "../../helpers/UseWindowDimension";

export default function FixtureCard({
  data,
  handleModalOpen,
  group,
  fixtures,
  marketplaceSlug,
}) {
  const navigate = useNavigate();

  /**
   * @dev only list games according to dates
   */
  const getGamesByDate = (date) => {
    var games = [];

    fixtures.forEach((data) => {
      if (moment(data?.DateUtc).format("LL") === date) {
        games.push(data);
      }
    });

    return games;
  };

  // console.log(marketplaceSlug)

  const gameTime = (data) => {
    return (
      <div className="gameTime">
        {data.status[0]?.status === "closed" ? (
          <>
            {data.HomeTeamScore} : {data.AwayTeamScore}
          </>
        ) : (
          moment(data?.DateUtc).format("LT")
        )}
      </div>
    );
  };
  const { width } = useWindowDimensions();
  return (
    <div className="fixtureCard__container">
      <Typography component={"span"} variant={"h3"}>
        🗓️ {data}
      </Typography>

      {getGamesByDate(data)
        .reverse()
        .map((data, index) => {
          console.log(data);
          if (group === "all") {
            return (
              <div className="gameDetails__item" key={index}>
                {
                  <div className={`status ${data.status[0].status}`}>
                    <p>{data.status[0].status}</p>
                    {data.status[0].status === "open" && (
                      <p className="dot"></p>
                    )}
                  </div>
                }
                <div className="gameDetails">
                  <div
                    className="gameDetails__teamDetails"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/predict/${data?._id}`, {
                        state: {
                          marketplaceSlug: marketplaceSlug,
                        },
                      })
                    }
                  >
                    <div className="teamName">{data?.HomeTeam}</div>
                    {GetFlags(marketplaceSlug, data?.HomeTeam)}
                    {gameTime(data)}
                    {GetFlags(marketplaceSlug, data.AwayTeam)}
                    <div className="teamName">{data?.AwayTeam}</div>
                  </div>

                  <div className="gameDetails__location">
                    <i className="ri-map-pin-2-line"></i> {data?.Location}
                  </div>

                  <div className="gameDetails__action">
                    <Button
                      className="quickView"
                      onClick={() => handleModalOpen(data)}
                    >
                      Quick View
                    </Button>
                    <Button>
                      <i className="ri-arrow-right-line"></i>
                    </Button>
                  </div>
                </div>
              </div>
            );
          } else if (data?.Group === group)
            return (
              <div className="gameDetails__item" key={index}>
                {width > 576 ? (
                  <div
                    className="gameDetails__teamDetails"
                    onClick={() => navigate(`/predict/${data?._id}`)}
                  >
                    <div className="teamName">{data?.HomeTeam}</div>
                    {GetFlags(marketplaceSlug, data.HomeTeam)}
                    {gameTime(data)}
                    {GetFlags(marketplaceSlug, data.AwayTeam)}
                    <div className="teamName">{data?.AwayTeam}</div>
                  </div>
                ) : (
                  <Button
                    className="gameDetails__teamDetails"
                    onClick={() => navigate(`/predict/${data._id}`)}
                  >
                    <div className="teamName">{data?.HomeTeam}</div>
                    {CountryFlags.map((country, i) => {
                      return GetFlags(marketplaceSlug, country);
                    })}
                    {gameTime(data)}
                    {CountryFlags.map((country, i) => {
                      return GetFlags(marketplaceSlug, country);
                    })}
                    <div className="teamName">{data?.AwayTeam}</div>
                  </Button>
                )}

                <div className="gameDetails__location">
                  <i className="ri-map-pin-2-line"></i> {data?.Location}
                </div>

                <div className="gameDetails__action">
                  <Button
                    className="quickView"
                    onClick={() => handleModalOpen(data)}
                  >
                    Quick View
                  </Button>
                  <Button>
                    <i className="ri-arrow-right-line"></i>
                  </Button>
                </div>
              </div>
            );
        })}
    </div>
  );
}
