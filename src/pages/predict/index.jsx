import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@mui/material";
import { LineChart, LineSeries } from "reaviz";
import PredictionTabs from "../../components/PredictionTabs";
import "./styles/style.css";

export default function Predict() {
  const [activeOS, setActiveOS] = React.useState("");

  React.useEffect(() => {
    // Windows
    if (navigator.appVersion.indexOf("Win") != -1) setActiveOS("windowsOS");
    // Mac
    else if (navigator.appVersion.indexOf("Mac") != -1) setActiveOS("macOS");
    // Linux and other
    else setActiveOS("otherOS");
  }, []);
  return (
    <div className="prediction__container">
      <Helmet>
        <title>Brazil vs Qatar | Prediction | Playpoint</title>
      </Helmet>

      <div className="main__container">
        <div className="recentPredictions">
          <h3>Active Predictions</h3>

          <div className={`prediction__items ${activeOS}`}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data) => {
              return (
                <div className="predictedCard__container" key={data}>
                  <div>
                    <div className="details">
                      <Button>View Answer</Button>
                      <p>Duo</p>
                    </div>
                    <p>0x3ebfb8e...0b9c4 predicted on Sweden vs Netherlands.</p>
                    <div className="info">
                      <p>$5~0.075 PPTT</p>
                      <p>2m Ago</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="predictionTable">
          <div className="predictionTable__topBar">
            <div className="predictionTable__competitor">
              <div>
                <p>Sweden</p>
                <img
                  src="https://www.kindpng.com/picc/m/297-2972143_sweden-logo-png-transparent-png.png"
                  alt=""
                  loading="lazy"
                />
              </div>
              <span>vs</span>
              <div>
                <img
                  src="https://seeklogo.com/images/F/flag-of-brazil-logo-94D3E82278-seeklogo.com.png"
                  alt=""
                  loading="lazy"
                />
                <p>Brazil</p>
              </div>
            </div>

            <div className="marketInfo">
              <div>
                <p>24h Volume (PPTT)</p>
                <p>12,233,333</p>
              </div>
              <div>
                <p>Total Predictions</p>
                <p>1,233,455</p>
              </div>
            </div>
          </div>
          <div className={`predictionTable__mainContainer ${activeOS}`}>
            <LineChart
              className="graphData"
              width="90%"
              height={window.innerWidth >= 576 ? 350 : 200}
              data={[
                { key: new Date("11/25/2019"), data: 30 },
                { key: new Date("11/29/2019"), data: 14 },
                { key: new Date("11/30/2019"), data: 5 },
                { key: new Date("12/01/2019"), data: 40 },
                { key: new Date("12/02/2019"), data: 20 },
              ]}
              series={
                <LineSeries
                  colorScheme={(_data, _index, active) =>
                    active ? "#2ecc71" : "#2ecc71"
                  }
                />
              }
            />
            <div className="eventDetails">
              <p>
                <i className="ri-calendar-todo-line"></i> Event Details: 22nd
                November, 2022
              </p>
              <p>
                <i className="ri-bar-chart-2-line"></i> Pool Size: Unlimited
              </p>
            </div>
            <PredictionTabs />
          </div>
        </div>
        <div className="leaderboards">
          <h3 className="leaderboardsTitle">Leaderboards</h3>
          <div className="leaderboardItemsTitle">
            <p>
              Game<i className="ri-game-line"></i>
            </p>
            <p>
              Users<i className="ri-magic-line"></i>
            </p>
            <p>
              Volume<i className="ri-money-dollar-circle-line"></i>
            </p>
          </div>
          <div className={`leaderboardItems ${activeOS}`}>
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24,
            ].map((data) => {
              return (
                <div className="leaderboardItem__container" key={data}>
                  <p>AUS/QTR</p>
                  <p>123k</p>
                  <p>$432k</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
