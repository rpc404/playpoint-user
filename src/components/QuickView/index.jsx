import { Button } from "@mui/material";
import React from "react";
import CountryFlags from "../../helpers/CountryFlags.json";
import { useNavigate, useParams } from "react-router-dom";

export default function QuickView({ handleModalClose }) {
  const navigate = useNavigate();
  const [gameData, setGameData] = React.useState(null);
  let { marketplaceSlug } = useParams();

  const handleModal = () => {
    document.body.style = "";
    handleModalClose(false);
  };

  React.useEffect(() => {
    const tempGame = JSON.parse(localStorage.getItem("quickViewItem"));
    setGameData(tempGame);
  }, []);

  const getFixtureId = (a, b) => {
    return a + "_vs_" + b;
  };

  return (
    <div className="quickViewModal__container">
      <div className="container">
        {gameData && (
          <div className="item">
            <div className="info__container">
              <div>
                Football / <span>{marketplaceSlug}</span>
              </div>
              <Button onClick={handleModal} className="closeBtn">
                Close <i className="ri-close-line"></i>
              </Button>
            </div>
            <div className="topBar">
              <div className="homeTeam">{gameData?.HomeTeam}</div>
              {CountryFlags.map((country, index) => {
                return (
                  country.name === gameData.HomeTeam && (
                    <img src={country.image} alt={country.image} key={index} />
                  )
                );
              })}
              <div className="gameTime">
                {gameData?.DateUtc.split(" ")[1].split(":")[0] +
                  ":" +
                  gameData?.DateUtc.split(" ")[1].split(":")[1]}{" "}
                UTC
              </div>
              {CountryFlags.map((country, index) => {
                return (
                  country.name === gameData.AwayTeam && (
                    <img src={country.image} alt={country.image} key={index} />
                  )
                );
              })}
              <div className="awayTeam">{gameData?.AwayTeam}</div>
            </div>

            <div className="stadiumInformation">
              <i className="ri-map-pin-2-line"></i> {gameData?.Location}
            </div>
            <div className="actions">
              <Button
                className="predictNow"
                onClick={() => {
                  document.body.style = "";
                  navigate(
                    `/predict/${getFixtureId(
                      gameData.HomeTeam,
                      gameData.AwayTeam
                    )}`
                  );
                }}
              >
                <i className="ri-boxing-line"></i>Predict Now
              </Button>
              {/* <Button className="joinChat" onClick={() => navigate("/chats")} ><i className="ri-message-3-line"></i> Join Chat</Button> */}
              {/* <Button
                className="leaderboards"
                onClick={() => navigate("/leaderboards")}
              >
                <i className="ri-bar-chart-grouped-line"></i> Leaderboards
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
