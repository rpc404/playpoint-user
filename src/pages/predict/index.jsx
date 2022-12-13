import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@mui/material";
import { LineChart, LineSeries } from "reaviz";
import PredictionTabs from "../../components/PredictionTabs";
import "./styles/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { getFixutreById } from "../../api/Fixture";
import allFlags from "../../helpers/CountryFlags.json";
import {
  getAllPredictionsByFixture,
  getQuestionaireByFixtureId,
} from "../../api/Prediction";
import moment from "moment";
import Pusher from "pusher-js";
import Leaderboards from "../../components/Leaderboards/Leaderboards";
import { usePredictionsContext } from "../../contexts/Predictions/PredictionsContext";

export const getCountryFlag = (country) => {
  let _url = "";
  allFlags.map((flag, key) => {
    if (flag.name === country) {
      _url = flag.image;
    } else if (country === "USA") {
      _url =
        "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg";
    } else if (country === "South Korea") {
      _url =
        "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg";
    } else if (country === "Korea Republic") {
      _url =
        "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg";
    }
  });
  return _url;
};




export default function Predict() {


  const calculateTimeLeft = (eventTime) => {
    let duration = moment(eventTime).diff(moment.now(),"seconds");
    let seconds ="";
    let minutes = "";
    let hours = "";
    let days = "";
    if(duration => 60){
      minutes = Math.floor(duration/60);
      seconds = duration%60;
    }
    if(minutes=>60){
      hours = Math.floor(minutes/60)
      minutes = minutes%60;
    }
    if(hours=>24){
      days = Math.floor(hours/24)
      hours = hours%24;
    }

    return <div className="timeOut">
          {days>0 && <div className="block"><h2>{days}</h2><span>Days</span></div>}
          {hours>0 && <div className="block"><h2>{hours}</h2><span>Hours</span></div>}
          {minutes>0 && <div className="block"><h2>{minutes}</h2><span>Minutes</span></div>}
          {seconds>=0 && <div className="block"><h2>{seconds}</h2><span>Seconds</span></div>}

    </div>;
  }

  const [fixture, setFixture] = React.useState({});
  const [poolSize, setPoolSize] = React.useState("unlimited");
  const { fixtureId } = useParams();
  const [, setQuestionaires] = React.useState([]);
  const [lineChartData, setLineChartData] = React.useState([]);
  const [activeOS, setActiveOS] = React.useState("");
  const [status,setStatus] = React.useState(false)
  const [{predictions}, dispatchPredictionsData] = usePredictionsContext()
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft(fixture.DateUtc));

  const navigate = useNavigate();

  let volume = 0;


  React.useEffect(() => {
      setTimeout(() => {
          setTimeLeft(calculateTimeLeft(fixture.DateUtc));
      },1000);
  });


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
      console.log(response)
      setStatus(response.data?.status)
    })();

    (async () => {
      const response = await getAllPredictionsByFixture(fixtureId);
     
      sessionStorage.setItem(
        "predictions",
        JSON.stringify(response.data.data.reverse())
      );
      dispatchPredictionsData({type:"set-predictions", payload: response.data.data})
      
      // let lineChartData = [];
      // response.data.data.map((prediction, key) => {
      //   lineChartData.push({
      //     key: new Date(prediction.created_at),
      //     data: prediction.amount,
      //   });
      // });

      // setLineChartData(lineChartData);
    })();

    (async () => {
      const response = await getQuestionaireByFixtureId(fixtureId);
      setQuestionaires(response.data.data);
    })();
  }, []);

  React.useEffect(() => {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;
    const pusher = new Pusher("e6640b48a82cccbb13d0", {
      cluster: "ap2",
    });
    pusher.connection.bind("connected", function () {
      console.log("Weboscket Connected");
    });
    const predictionChannel = pusher.subscribe("prediction-channel");
    predictionChannel.bind("new-prediction", (data) => {
      const _predictions =
        JSON.parse(sessionStorage.getItem("predictions")) || [];
      if (data.data[0].fixtureId == fixtureId) {
        const newPrediction = [data.data[0], ..._predictions];
        sessionStorage.setItem("predictions", JSON.stringify(newPrediction));
        dispatchPredictionsData({type:"set-predictions", payload: newPrediction})
      }
    });
  }, []);

  return (
    <div className="prediction__container">
      <Helmet>
        <title>{fixture.HomeTeam +" - "+ fixture.AwayTeam } |Playpoint | Prediction | </title>
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
                volume += data?.amount / 0.02;
                return (
                  <div className="predictedCard__container" key={index}>
                    <div>
                      <div className="details">
                        <Button
                          onClick={() => navigate(`/prediction/${data._id}`)}
                        >
                          View Answer
                        </Button>
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
                          ${data?.amount}~{(data?.amount / 0.02).toFixed(2)}{" "}
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
            <div>
             {(status && status!=="closed") ? timeLeft : 
             <div className="fixture_results">
             <div className="teams_score">
               <h2>{fixture.HomeTeamScore}</h2>
               <p>{fixture.HomeTeam}</p>
             </div>
             <div className="teams_score">
               <h2>{fixture.AwayTeamScore}</h2>
               <p>{fixture.AwayTeam}</p>
             </div>
          </div> }
             <div className="fixture_detail">
              <p>
                <i className="ri-map-pin-line"></i>
                <span>Stadium: </span>
                {fixture.Location}
                </p>
                <p>
                <i className="ri-bar-chart-2-line"></i>
                <span>Match Number: </span>
              {fixture.MatchNumber}
                </p>
             </div>
             
            </div>
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
                {moment(fixture.DateUtc).format("LL")}
              </p>
              <p>
                <i className="ri-bar-chart-2-line"></i> Pool Size: {poolSize}
              </p>
            </div>
            <PredictionTabs
              poolSize={poolSize}
              fixtureId={fixtureId}
              setPoolSize={setPoolSize}
              status={status}
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
          {fixture && <Leaderboards />}{" "}
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
  );
}
