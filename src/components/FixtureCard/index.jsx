import { Button, Typography } from "@mui/material";
import React from "react";
import CountryFlags from "../../helpers/CountryFlags.json";
// import WorldcupFixtures from "../../helpers/WorldcupFixtures.json";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import { getFixtures } from "../../api/Fixture";
import moment from "moment";

export default function FixtureCard({
  data,
  handleModalOpen,
  group,
  marketplaceSlug,
  fixtures
}) {
  const navigate = useNavigate();
  const getFixtureId = (a, b) => {
    return a + "_vs_" + b;
  };

  // const [fixtures, setFixtures] = React.useState([]);

  React.useEffect(() => {
    console.log(fixtures)
    // (async () => {
    //   const fixtures = await getFixtures(marketplaceSlug);
    //   setFixtures(fixtures?.data?.fixtures);
    // })();
  }, []);

  /**
   * @dev only list games according to dates
   */
  const getGamesByDate = (date) => {
    var games = [];

    fixtures.forEach((data) => {
      if (Moment(data?.DateUtc).format("LL") === date) {
        games.push(data);
      }
    });

    return games;
  };

  return (
    <div className="fixtureCard__container">
      <Typography component={"span"} variant={"h3"}>
        <i className="ri-calendar-line"></i> {data}
      </Typography>

      {getGamesByDate(data).map((data, index) => {
        if (group === "all") {
          return (
            <div className="gameDetails__item" key={index}>
              {window.innerWidth > 576 ? (
                <div
                  onClick={() => navigate(`/predict/${data?._id}`)}
                  className="gameDetails__teamDetails"
                  style={{ cursor: "pointer" }}
                >
                  <div className="teamName">{data?.HomeTeam}</div>
                  {CountryFlags.map((country, i) => {
                    return (
                      (country.name === data?.HomeTeam ||
                        (country.name === "United States" &&
                          data?.HomeTeam === "USA") ||
                        (country.name === "South Korea" &&
                          data?.HomeTeam === "Korea Republic")) && (
                        <img
                          src={country.image}
                          alt={country.name}
                          key={i}
                          loading="lazy"
                          className="home__Image"
                        />
                      )
                    );
                  })}
                  <div className="gameTime">{moment(data?.DateUtc).calendar()}</div>
                  {CountryFlags.map((country, i) => {
                    return (
                      (country.name === data?.AwayTeam ||
                        (country.name === "United States" &&
                          data?.AwayTeam === "USA") ||
                        (country.name === "South Korea" &&
                          data?.AwayTeam === "Korea Republic")) && (
                        <img
                          src={country?.image}
                          alt={country.name}
                          key={i}
                          loading="lazy"
                          className="Away__Image"
                        />
                      )
                    );
                  })}
                  <div className="teamName">{data?.AwayTeam}</div>
                </div>
              ) : (
                <Button
                  className="gameDetails__teamDetails"
                  onClick={() => navigate(`/predict/${data?._id}`)}
                >
                  <div className="teamName">{data?.HomeTeam}</div>
                  {CountryFlags.map((country, i) => {
                    return (
                      (country.name === data?.HomeTeam ||
                        (country.name === "United States" &&
                          data?.HomeTeam === "USA") ||
                        (country.name === "South Korea" &&
                          data?.HomeTeam === "Korea Republic")) && (
                        <img
                          src={country.image}
                          alt={country.name}
                          key={i}
                          loading="lazy"
                          className="home__Image"
                        />
                      )
                    );
                  })}
                  <div className="gameTime">{data?.DateUtc}</div>
                  {CountryFlags.map((country, i) => {
                    return (
                      (country.name === data?.AwayTeam ||
                        (country.name === "United States" &&
                          data?.AwayTeam === "USA") ||
                        (country.name === "South Korea" &&
                          data?.AwayTeam === "Korea Republic")) && (
                        <img
                          src={country?.image}
                          alt={country.name}
                          key={i}
                          loading="lazy"
                          className="Away__Image"
                        />
                      )
                    );
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
        } else if (data?.Group === group)
          return (
            <div className="gameDetails__item" key={index}>
              {window.innerWidth > 576 ? (
                <div
                  className="gameDetails__teamDetails"
                  onClick={() => navigate(`/predict/${data?._id}`)}
                >
                  <div className="teamName">{data?.HomeTeam}</div>
                  {CountryFlags.map((country, i) => {
                    return (
                      (country.name === data?.HomeTeam ||
                        (country.name === "United States" &&
                          data?.HomeTeam === "USA") ||
                        (country.name === "South Korea" &&
                          data?.HomeTeam === "Korea Republic")) && (
                        <img
                          src={country.image}
                          alt={country.name}
                          key={i}
                          loading="lazy"
                          className="home__Image"
                        />
                      )
                    );
                  })}
                  <div className="gameTime">{data?.DateUtc}</div>
                  {CountryFlags.map((country, i) => {
                    return (
                      (country.name === data?.AwayTeam ||
                        (country.name === "United States" &&
                          data?.AwayTeam === "USA") ||
                        (country.name === "South Korea" &&
                          data?.AwayTeam === "Korea Republic")) && (
                        <img
                          src={country?.image}
                          alt={country.name}
                          key={i}
                          loading="lazy"
                          className="Away__Image"
                        />
                      )
                    );
                  })}
                  <div className="teamName">{data?.AwayTeam}</div>
                </div>
              ) : (
                <Button
                  className="gameDetails__teamDetails"
                  onClick={() => navigate(`/predict/${data._id}`)}
                >
                  <div className="teamName">{data?.HomeTeam}</div>
                  {CountryFlags.map((country, i) => {
                    return (
                      (country.name === data?.HomeTeam ||
                        (country.name === "United States" &&
                          data?.HomeTeam === "USA") ||
                        (country.name === "South Korea" &&
                          data?.HomeTeam === "Korea Republic")) && (
                        <img
                          src={country.image}
                          alt={country.name}
                          key={i}
                          loading="lazy"
                          className="home__Image"
                        />
                      )
                    );
                  })}
                  <div className="gameTime">{data?.DateUtc}</div>
                  {CountryFlags.map((country, i) => {
                    return (
                      (country.name === data?.AwayTeam ||
                        (country.name === "United States" &&
                          data?.AwayTeam === "USA") ||
                        (country.name === "South Korea" &&
                          data?.AwayTeam === "Korea Republic")) && (
                        <img
                          src={country?.image}
                          alt={country.name}
                          key={i}
                          loading="lazy"
                          className="Away__Image"
                        />
                      )
                    );
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
