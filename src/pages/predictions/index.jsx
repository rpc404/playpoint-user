import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPredictionById } from "../../api/Prediction";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import "./styles/style.css";

const Prediction = () => {
  const { pid } = useParams();
  const [predictionData, setPredictionData] = React.useState([]);
  const [questions, setquestions] = React.useState([]);
  const [userPredictions, setUsePredictions] = React.useState([]);
  const [{ userPublicAddress }] = useRPCContext();
  const [currChallenege, setCurrChallenge] = React.useState([])
  const [activePredition, setActivePrediction] = React.useState("");
  React.useEffect(() => {
    getPredictionById(pid).then((res) => {
      if (res.data.data) {
        setPredictionData(res.data.data[0]);
        setquestions(res.data.data[1]);
        console.log(res.data);
      }
    });
  }, []);

  React.useEffect(() => {
    let allp = JSON.parse(sessionStorage.getItem("predictions"));
    allp = allp.filter((prediction) => {
      if (
        prediction.predictedBy === userPublicAddress &&
        prediction._id !== pid
      ) {
        return prediction;
      }
    });
    setUsePredictions(allp);
  }, [userPublicAddress]);

  /**
   * @dev function to join duo challenge
   */
  const joinChallenge = (challenge) => {
    setCurrChallenge(challenge);
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const setParticipant = (prediction) =>{
    console.log(prediction)
    setActivePrediction(prediction._id);
  }

  return (
    <>
    <div className="userprediction_container">
      {predictionData.user && (
        <div className="container">
          <div className="profile_area">
            <img
              src={`https://robohash.org/${
                predictionData.user[0].username || "aa"
              }`}
              loading="lazy"
            />
            <h3>
              <a href="#">{predictionData.user[0].username}</a>
            </h3>
            <p>
              {" "}
              <>
                {`${predictionData.user[0].walletID}`.substring(0, 15) +
                  `...` +
                  `${predictionData.user[0].walletID}`.substring(
                    predictionData.user[0].walletID.length - 3
                  )}{" "}
                <i className="ri-arrow-right-up-line"></i>
              </>
            </p>
            <p>
              Prediction Amount: ${predictionData.amount} ~{" "}
              {predictionData.amount / 0.02}PPTT
            </p>
          </div>
          <div className="answers_area">
            <div>
              <span>Pool: {questions.poolType}</span>
              <span>Price: {questions.questionairePrice}</span>
            </div>
            <h1>Questions & Answers</h1>
            <div className="questions">
              {questions?.questionaires?.questions.map((question, key) => {
                return (
                  <div className="question_answer" key={key}>
                    <h4>
                      Q{key + 1}. {question}
                      <span>
                        {questions?.questionaires?.points[key]} Points
                      </span>
                    </h4>
                    <p>Answer: {predictionData.answers[key]}</p>
                  </div>
                );
              })}
            </div>
            <div className="btn_area" style={{ marginTop: "20px" }}>
              {predictionData.challenges.map((challenges, key) => {
                return (
                  <div
                    style={{
                      border: "0.4px solid white",
                      display: "flex",
                      gap: "10px",
                      padding: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={key}
                  >
                    <p>
                      Pool Type: {String(challenges.type).toLocaleUpperCase()}
                    </p>
                    <p>Total Slot: {challenges.slot}</p>
                    <p>Pool Entry Amount: {challenges.amount / 0.02}PPTT</p>
                    <p>
                      {challenges.participants.length < challenges.slot ? (
                        predictionData.predictedBy !== userPublicAddress ? (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => joinChallenge(challenges)}
                          >
                            Challenge { challenges.participants.length } of {challenges.slot}
                          </Button>
                        ) : (
                          <Button variant="outlined" color="error">
                            Close
                          </Button>
                        )
                      ) : (
                        <p>All Slots Full </p>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="divider"></div>
      <div className="other_prediction">
        <h2>Your Predictions in same pool</h2>
        <div style={{ display: "grid", gap: "10px",gridTemplateColumns:"repeat(2,1fr)"}}>
          {userPredictions.map((_pr, k) => {
            return (
              <div
                style={{ border: "0.2px solid white", padding: "10px" }}
                key={k}
              >
                <div>
                  {questions?.questionaires?.questions.map((question, key) => {
                    return (
                      <div className="question_answer" key={key} style={{margin:"1.2em 0"}}>
                        <h4>
                          Q{key + 1}. {question}
                        </h4>
                        <p>Answer: {_pr.answers[key]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    {
      (predictionData && predictionData.user) &&  <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      color="white"
     className="custom-paper"
    >
      <AppBar sx={{ position: 'relative', backgroundColor:"black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            X
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
           {predictionData.user &&  "Challenge " + predictionData?.user[0]?.username + "-" + currChallenege.type}
          </Typography>
        </Toolbar>
      </AppBar>
      <h2 style={{padding:"20px"}}>Select your entry to challenge {predictionData?.user[0]?.username}</h2>
    <div style={{display:"grid", gridTemplateColumns:"6fr 2fr", maxHeight:"95vh"}}>
      <div style={{ display: "grid", gap: "20px",gridTemplateColumns:"repeat(2,1fr)", overflow:"scroll", padding:"20px" }}>
        {userPredictions.map((_pr, k) => {
          return (
            <div
              style={{ border: "0.2px solid white", padding: "10px", cursor:"pointer" }}
              key={k}
              onClick={()=>setParticipant(_pr)}
              className={activePredition==_pr._id ? "selected":""}
            >
              <div>
                {questions?.questionaires?.questions.map((question, key) => {
                  return (
                    <div className="question_answer" key={key} style={{margin:"1.2em 0"}}>
                      <h4>
                        Q{key + 1}. {question}
                      </h4>
                      <p>Answer: {_pr.answers[key]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        Payment Section
      </div>
    </div>
    </Dialog>
    }
  
    </>
  );
};

export default Prediction;
