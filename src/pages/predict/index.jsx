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
import clubFlags from "../../helpers/EPLFlags.json";
import CarabaoClubFlags from "../../helpers/EFLFlags.json";
import EPLFlags from "../../helpers/EPLFlags.json";
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import PredictionItems from "../../components/PredictionItems";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Predict() {
  const { state } = useLocation();

  const { marketplaceSlug } = state;

  const [open, setOpen] = React.useState(false);
  const [currentMode, setCurrentMode] = React.useState("");

  const handleClickOpen = (mode) => {
    setOpen(true);
    setCurrentMode(mode);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HomeTeamFlag = (team) => {
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
    }
  };

  const calculateTimeLeft = (eventTime) => {
    let duration = moment(eventTime).diff(moment.now(), "seconds");
    let seconds = "";
    let minutes = "";
    let hours = "";
    let days = "";
    if ((duration) => 60) {
      minutes = Math.floor(duration / 60);
      seconds = duration % 60;
    }
    if ((minutes) => 60) {
      hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
    }
    if ((hours) => 24) {
      days = Math.floor(hours / 24);
      hours = hours % 24;
    }

    return (
      <div className="timeOut">
        {days > 0 && (
          <div className="block">
            <h2>{days}</h2>
            <span>Days</span>
          </div>
        )}
        {hours > 0 && (
          <div className="block">
            <h2>{hours}</h2>
            <span>Hours</span>
          </div>
        )}
        {minutes > 0 && (
          <div className="block">
            <h2>{minutes}</h2>
            <span>Minutes</span>
          </div>
        )}
        {seconds > 0 && (
          <div className="block">
            <h2>{seconds}</h2>
            <span>Seconds</span>
          </div>
        )}
      </div>
    );
  };

  const [fixture, setFixture] = React.useState({});
  const [poolSize, setPoolSize] = React.useState("unlimited");
  const { fixtureId } = useParams();
  const [, setQuestionaires] = React.useState([]);
  const [lineChartData, setLineChartData] = React.useState([]);
  const [activeOS, setActiveOS] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [{ predictions }, dispatchPredictionsData] = usePredictionsContext();
  const [timeLeft, setTimeLeft] = React.useState(
    calculateTimeLeft(fixture.DateUtc)
  );

  const navigate = useNavigate();
  // console.log(predictions)

  let volume = 0;

  React.useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(fixture.DateUtc));
    }, 1000);
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
      setStatus(response.data?.status);
    })();

    (async () => {
      const response = await getAllPredictionsByFixture(fixtureId);
      console.log(response)
      sessionStorage.setItem(
        "predictions",
        JSON.stringify(response.data.data.reverse())
      );
      dispatchPredictionsData({
        type: "set-predictions",
        payload: response.data.data,
      });

      // let lineChartData = [];
      // response.data.data.map((prediction, key) => {
      //   lineChartData.push({
      //     key: new Date(prediction.created_at),
      //     data: prediction.amount,
      //   });
      // });

      // setLineChartData(lineChartData);
    })();

    // (async () => {
    //   const response = await getQuestionaireByFixtureId(fixtureId);
    //   console.log(response.data);
    //   setQuestionaires(response.data.questionaire);
    // })();
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
        dispatchPredictionsData({
          type: "set-predictions",
          payload: newPrediction,
        });
      }
    });
  }, []);

  return (
    <div className="prediction__container">
      <Helmet>
        <title>
          {fixture.HomeTeam + " - " + fixture.AwayTeam} |Playpoint | Prediction
          |{" "}
        </title>
      </Helmet>

      <div className="main__container">
        {/*
         * @note Recent Predictions
         */}
        <div className="recentPredictions">
          {window.innerWidth <= 425 ? (
            <>
              <h3 onClick={() => handleClickOpen("prediction")}>
                Active Predictions
              </h3>
              <h3 onClick={() => handleClickOpen("leaderboard")}>
                View Leaderboards
              </h3>
            </>
          ) : (
            <h3>Active Predictions</h3>
          )}

          <PredictionItems
            predictions={predictions}
            activeOS={activeOS}
            fixture={fixture}
            open = {open}
          />
        </div>
        {/*
         * @note Prediction Tabs
         */}
        <div className="predictionTable">
          <div className="predictionTable__topBar">
            <div className="predictionTable__competitor">
              <div>
                <p>{fixture?.HomeTeam}</p>
                {HomeTeamFlag(fixture?.HomeTeam)}
              </div>
              <span>vs</span>
              <div>
                {AwayTeamFlag(fixture.AwayTeam)}
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
              {!status || status !== "closed" ? (
                timeLeft
              ) : (
                <div className="fixture_results">
                  <div className="teams_score">
                    <h2>{fixture.HomeTeamScore}</h2>
                    <p>{fixture.HomeTeam}</p>
                  </div>
                  <div className="teams_score">
                    <h2>{fixture.AwayTeamScore}</h2>
                    <p>{fixture.AwayTeam}</p>
                  </div>
                </div>
              )}
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
            <div className="eventDetails">
              <p>
                <i className="ri-calendar-todo-line"></i> Event Details:{" "}
                {moment(fixture.DateUtc).format("LL")}
              </p>
              <p>
                <i className="ri-bar-chart-2-line"></i> Pool Size: {poolSize}
              </p>
            </div>
            {status !== "closed" && (
              <PredictionTabs
                poolSize={poolSize}
                fixtureId={fixtureId}
                setPoolSize={setPoolSize}
                status={status}
              />
            )}
          </div>
        </div>
        {/*
         * @note Leaderboards Predictions
         */}

        <LeaderBoardList fixture={fixture} />

        {/**
         *  @ Dialog for active predictions in mobile view
         */}
        {window.innerWidth <= 425 && (
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            className="custom-paper"
          >
            <AppBar sx={{ position: "relative",background:"#000" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  X
                </IconButton>
                {currentMode === "prediction" && (
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Active Predictions
                  </Typography>
                )}
                {currentMode === "leaderboard" && (
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Leaderboards
                  </Typography>
                )}
              </Toolbar>
            </AppBar>
            {currentMode === "prediction" && (
              <PredictionItems
                predictions={predictions}
                activeOS={activeOS}
                fixture={fixture}
              />
            )}
            {currentMode === "leaderboard" && <LeaderBoardList />}
          </Dialog>
        )}
      </div>
    </div>
  );
}



const LeaderBoardList = ({ fixture }) => {
  return (
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
  );
};
