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
  getAllPredictionsByFixture,
  getQuestionaireByFixtureId,
} from "../../api/Prediction";
import moment from "moment";
import { toast } from "react-toastify";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import Pusher from "pusher-js";

export default function Predict({ socket }) {
  const [activeOS, setActiveOS] = React.useState("");
  const [fixture, setFixture] = React.useState({});
  const [poolSize, setPoolSize] = React.useState("unlimited");
  const { fixtureId } = useParams();
  const [predictions, setPredictions] = React.useState([]);
  const [questionaires, setQuestionaires] = React.useState([]);
  const [lineChartData, setLineChartData] = React.useState([]);
  // const [volume,setVolume] = React.useState(0)
  let volume = 0;

  const [{ userPublicAddress }, dispatchRPCData] = useRPCContext();

  const getCountryFlag = (country) => {
    let _url = "";
    allFlags.map((flag, key) => {
      if (flag.name === country) {
        _url = flag.image;
      } else if (country === "USA") {
        _url =
          "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg";
      } else if(country === "South Korea"){
        _url = "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg"
      }else if(country === "Korea Republic"){
        _url = "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg"
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
      const response = await getAllPredictionsByFixture(fixtureId);
      sessionStorage.setItem('predictions', JSON.stringify(response.data.data.reverse()))
      setPredictions(response.data.data);

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

  React.useEffect(() => {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;
    const pusher = new Pusher("2142cda6d39765cba2a9", {
      cluster: "ap2",
    });
    pusher.connection.bind("connected", function () {
      console.log("Weboscket Connected");
    });
    const predictionChannel = pusher.subscribe("prediction-channel");
    predictionChannel.bind("new-prediction",(data)=>{
      const _predictions = JSON.parse(sessionStorage.getItem('predictions')) ||[];
      if(data.data[0].fixtureId == fixtureId){
        const newPrediction = [data.data[0], ..._predictions]
        sessionStorage.setItem('predictions', JSON.stringify(newPrediction))
        setPredictions(newPrediction);
      }
    });

  },[])
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
                volume+=(data?.amount / 0.015);
                return (
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
                        {data?.user[0] ? (
                          <a href="#" className="details__username">
                            {data?.user[0].username}
                          </a>
                        ) : (
                          data?.predictedBy
                        )}{" "}
                        predicted on {fixture?.HomeTeam} vs {fixture?.AwayTeam}.
                      </p>
                      <div className="info">
                        <p>
                          ${data?.amount}~{(data?.amount / 0.015).toFixed(2)}{" "}
                          PPTT
                        </p>
                        <p>{moment(data?.created_at).format("LT")}</p>
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
                <p>{fixture?.HomeTeam}</p>
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
                <p>{volume.toFixed(2)} PPTT</p>
              </div>
              <div>
                <p>Total Predictions</p>
                <p>{predictions.length >= 1 && predictions.length}</p>
              </div>
            </div>
          </div>

          <div className={`predictionTable__mainContainer ${activeOS}`}>
            <LineChart
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
            />
            <div className="eventDetails">
              <p>
                <i className="ri-calendar-todo-line"></i> Event Details:{" "}
                {moment(fixture.DateUtc).format('LL')}
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
