import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@mui/material";
import { LineChart, LineSeries } from "reaviz";
import PredictionTabs from "../../components/PredictionTabs";
import "./styles/style.css";
import { useParams } from "react-router-dom";
import { getFixutreById } from "../../api/Fixture";
import allFlags from "../../helpers/CountryFlags.json";
import {
  getAllPredictions,
  getQuestionaireByFixtureId,
} from "../../api/Prediction";
import moment from "moment";
import { toast } from "react-toastify";

export default function Predict({ socket }) {
  const [activeOS, setActiveOS] = React.useState("");
  const [fixture, setFixture] = React.useState({});
  const [poolSize, setPoolSize] = React.useState("unlimited");
  const { fixtureId } = useParams();
  const [predictions, setPredictions] = React.useState([]);
  const [questionaires, setQuestionaires] = React.useState([]);
  const [lineChartData, setLineChartData] = React.useState([]);

  const getCountryFlag = (country) => {
    let _url = "";
    allFlags.map((flag, key) => {
      if (
        flag.name === country ||
        flag.name === "United States" ||
        flag.name === "USA" ||
        flag.name === "South Korea" ||
        flag.name === "Korea Public"
      ) {
        _url = flag.image;
      }
    });
    return _url;
  };

  // const poolVolume = async (p) => {
  //   let Volume = 0;
  //   await p.map((prediction) => {
  //     Volume += prediction.amount;
  //   });
  //   return Volume;
  // };

  React.useEffect(() => {
    // Windows
    if (navigator.appVersion.indexOf("Win") != -1) setActiveOS("windowsOS");
    // Mac
    else if (navigator.appVersion.indexOf("Mac") != -1) setActiveOS("macOS");
    // Linux and other
    else setActiveOS("otherOS");

    // Fetch fixtures
    (async () => {
      const response = await getFixutreById(fixtureId);
      setFixture(response.data?.fixture);
    })();

    (async () => {
      const response = await getAllPredictions();
      setPredictions(response.data.data.reverse());

      let lineChartData = [];

      response.data.data.map((prediction, key) => {
        lineChartData.push({
          key: new Date(prediction.created_at),
          data: prediction.amount,
        });
      });

      setLineChartData(lineChartData);
    })();

    (async () => {
      const response = await getQuestionaireByFixtureId(fixtureId);
      setQuestionaires(response.data.data);
    })();
  }, []);
  return (
    <div className="prediction__container">
      <Helmet>
        <title>Playpoint | Prediction | Playpoint</title>
      </Helmet>

      <div className="main__container">
        {/*
         * @note Recent Predictions
         */}
        <div className="recentPredictions">
          <h3>Active Predictions</h3>

          <div className={`prediction__items ${activeOS}`}>
            {predictions.length >= 1 &&
              predictions.map((data, index) => {
                data?.fixtureId === fixtureId && (
                  <div className="predictedCard__container" key={index}>
                    <div>
                      <div className="details">
                        <Button
                          onClick={() => toast("This is under maintainance!")}
                        >
                          View Answer
                        </Button>
                        {/* <p>{console.log()}</p> */}
                      </div>
                      <p>
                        {data?.predictedBy} predicted on {fixture?.HomeTeam} vs{" "}
                        {fixture?.AwayTeam}.
                      </p>
                      <div className="info">
                        <p>
                          ${data?.amount}~{(data?.amount / 0.015).toFixed(2)}{" "}
                          PPTT
                        </p>
                        <p>{moment(data?.created_at).format("lll")}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/*
         * @note Prediction Tabs
         */}
        <div className="predictionTable">
          <div className="predictionTable__topBar">
            <div className="predictionTable__competitor">
              <div>
                <p>{fixture.HomeTeam}</p>
                <img
                  src={getCountryFlag(fixture.HomeTeam)}
                  alt=""
                  loading="lazy"
                />
              </div>
              <span>vs</span>
              <div>
                <img
                  src={getCountryFlag(fixture.AwayTeam)}
                  alt=""
                  loading="lazy"
                />
                <p>{fixture.AwayTeam}</p>
              </div>
            </div>

            <div className="marketInfo">
              {/* @note this needs to be resolved */}
              <div>
                <p>24h Volume</p>
                <p> PPTT</p>
              </div>
              <div>
                <p>Total Predictions</p>
                <p>{predictions.length >= 1 && predictions.length}</p>
              </div>
            </div>
          </div>

          <div className={`predictionTable__mainContainer ${activeOS}`}>
            {/* <LineChart
              className="graphData"
              width="90%"
              height={window.innerWidth >= 576 ? 350 : 200}
              data={lineChartData}
              series={
                <LineSeries
                  colorScheme={(_data, _index, active) =>
                    active ? "#2ecc71" : "#2ecc71"
                  }
                />
              }
            /> */}
            <div className="eventDetails">
              <p>
                <i className="ri-calendar-todo-line"></i> Event Details:{" "}
                {fixture.DateUtc}
              </p>
              <p>
                <i className="ri-bar-chart-2-line"></i> Pool Size: {poolSize}
              </p>
            </div>
            <PredictionTabs
              poolSize={poolSize}
              fixtureId={fixtureId}
              setPoolSize={setPoolSize}
            />
          </div>
        </div>

        {/*
         * @note Leaderboards Predictions
         */}
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
            {/* {fixture[0].length >=1 && fixture.map((data) => {
              return (
                <div className="leaderboardItem__container" key={data}>
                  <p>AUS/QTR</p>
                  <p>123k</p>
                  <p>$432k</p>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
