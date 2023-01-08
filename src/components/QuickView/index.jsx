import { Button } from "@mui/material";
import React from "react";
import CountryFlags from "../../helpers/CountryFlags.json";
import { useNavigate } from "react-router-dom";
import GetFlags from "../../utils/GetFlags";
import Moment from "moment";

export default function QuickView({ handleModalClose }) {
  const navigate = useNavigate();
  const [gameData, setGameData] = React.useState(null);

  // const { HomeTeamFlag, AwayTeamFlag } = GetFlags();

  const handleModal = () => {
    document.body.style = "";
    handleModalClose(false);
  };

  React.useEffect(() => {
    const tempGame = JSON.parse(localStorage.getItem("quickViewItem"));
    setGameData(tempGame);
  }, []);

  return (
    <div className="quickViewModal__container">
      <div className="container">
        {gameData && (
          <div className="item">
            <div className="info__container">
              <div>
                Football / <span>{gameData.marketplaceSlug}</span>
              </div>
              <Button onClick={handleModal} className="closeBtn">
                Close <i className="ri-close-line"></i>
              </Button>
            </div>
            <div className="topBar">
              <div className="homeTeam">{gameData?.HomeTeam}</div>
              {GetFlags(gameData.marketplaceSlug, gameData.HomeTeam)}
              <div className="gameTime">
                {Moment(gameData?.DateUtc).format("LL")}
              </div>
              {GetFlags(gameData.marketplaceSlug, gameData.AwayTeam)}
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
                  navigate(`/predict/${gameData._id}`);
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
