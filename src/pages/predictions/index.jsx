import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPredictionById } from "../../api/Prediction";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import {
  Slide,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
  Button,
  Stack,
  Skeleton,
} from "@mui/material";
import { ethers } from "ethers";
import ERC20BasicAPI from "../../utils/ERC20BasicABI.json";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import "./styles/style.css";
import { getChallenge, mkaeDuo } from "../../api/Challenge";

const Prediction = () => {
  const { pid } = useParams();
  const [predictionData, setPredictionData] = React.useState([]);
  const [questions, setquestions] = React.useState([]);
  const [userPredictions, setUsePredictions] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const [initData] = useRPCContext();
  const [currChallenege, setCurrChallenge] = React.useState([]);
  const [activePredition, setActivePrediction] = React.useState("");
  const { userPublicAddress, userPPTTBalance, userETHBalance } = initData;
  const [floatingButton, ShowFloatingButton] = React.useState(false);
  const [mode, setMode] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [challengeStat, setCStat] = React.useState({});

  React.useEffect(() => {
    if (!open) {
      getPredictionById(pid).then((res) => {
        if (res.data.data) {
          console.log(res.data.data);
          setPredictionData(res.data.data[0]);
          setquestions(res.data.data[1]);
          setloading(false);
        }
      });
    }
  }, [open, mode]);

  React.useEffect(() => {
    if (mode == "watch-challenge") {
      console.log("fetching");
      getChallenge(currChallenege).then((res) => {
        console.log(res.data);
        setCStat(res.data);
      });
    }
  }, [mode]);

  React.useEffect(() => {
    setloading(true);
    let allp = JSON.parse(sessionStorage.getItem("predictions"));
    if (allp) {
      allp = allp.filter((prediction) => {
        if (
          prediction.predictedBy === userPublicAddress &&
          prediction._id !== pid
        ) {
          return prediction;
        }
      });
      setUsePredictions(allp);
      setloading(false);
    }
  }, [userPublicAddress]);

  /**
   * @dev function to join duo challenge
   */
  const joinChallenge = (challenge, _mode) => {
    setCurrChallenge(challenge);
    setMode(_mode);
    setOpen(true);
  };
  const watchChallenge = (_mode, id) => {
    setMode(_mode);
    setOpen(true);
    setCurrChallenge(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setParticipant = (prediction) => {
    setActivePrediction(prediction._id);
  };

  const _joinChallenge = async () => {
    toast("Challenging..", {
      type: "info",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const PPTTContract = new ethers.Contract(
      import.meta.env.VITE_BETA_PPTT_CONTRACT_ADDRESS, // Sepolia PPTT Token Address
      ERC20BasicAPI,
      provider
    ).connect(provider.getSigner());

    const _ppttAmount =
      currChallenege.amount > 10
        ? toFixed((currChallenege.amount / 0.02) * 10 ** 18)
        : ((currChallenege.amount / 0.02) * 1e18).toString();
    console.log(_ppttAmount);
    // transfer prediction pool
    const txn = await PPTTContract.transfer(
      import.meta.env.VITE_BETA_FACTORY_CONTRACT_ADDRESS, // contract address
      _ppttAmount
    );

    const data = {
      predictionId: currChallenege.predictionId,
      type: currChallenege.type,
      participants: {
        prediction: activePredition,
        txnhash: txn.hash,
      },
    };
    const res = await mkaeDuo(data);
    if (res.status == 201) {
      toast("Challenge Created", { type: "success" });
      handleClose();
    }
  };

  return (
    <>
      <div className="userprediction_container">
        {predictionData.user && !loading ? (
          <div className="container">
            <div className="profile_area">
              <img
                src={`https://robohash.org/${predictionData.user[0].username ||
                  "aa"}`}
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
              <div className="btn_area">
                {predictionData.challenges.map((challenges, key) => {
                  return (
                    <div className="pool_info" key={key}>
                      <p>
                        Pool Type: {String(challenges.type).toLocaleUpperCase()}
                      </p>
                      <p>Total Slot: {challenges.slot}</p>
                      <p>Pool Entry Amount: {challenges.amount / 0.02}PPTT</p>
                      <p>
                        {predictionData.predictedBy !== userPublicAddress ? (
                          challenges.participants.length < challenges.slot ? (
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() =>
                                joinChallenge(challenges, "challenge")
                              }
                            >
                              Challenge {challenges.participants.length} of{" "}
                              {challenges.slot}
                            </Button>
                          ) : (
                            <p>All Slots Full </p>
                          )
                        ) : (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                              watchChallenge("watch-challenge", challenges._id)
                            }
                          >
                            View Challenge
                          </Button>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="skeleton__container__predictions">
            <div className="profile_area">
              <Stack spacing={1}>
                <Skeleton variant="rectangular" width={200} height={100} />
                <Skeleton variant="rectangular" width={70} height={20} />
                <Skeleton variant="rectangular" width={160} height={20} />
                <Skeleton variant="rectangular" width={210} height={20} />
              </Stack>
            </div>
            <div className="answer_area">
              <Stack spacing={0}>
                <Skeleton
                  variant="text"
                  component={"p"}
                  width={200}
                  height={40}
                />
                <Skeleton
                  variant="text"
                  component={"h1"}
                  width={300}
                  height={50}
                />
                {[0, 1].map((question, i) => {
                  return (
                    <Stack key={i}>
                      <Skeleton
                        variant="text"
                        component={"h1"}
                        width={500}
                        height={50}
                        className="question"
                      />
                      <Skeleton
                        variant="text"
                        component={"h4"}
                        width={800}
                        height={50}
                        className="points"
                      />
                      <Skeleton
                        variant="text"
                        component={"p"}
                        width={100}
                        height={50}
                        className="answer"
                      />
                    </Stack>
                  );
                })}
              </Stack>
              <Stack
                sx={{ display: "flex", flexDirection: "row", gap: "70px" }}
              >
                <Skeleton variant="rectangular" width={100} height={40} />
                <Skeleton variant="rectangular" width={100} height={40} />
                <Skeleton variant="rectangular" width={200} height={40} />
                <Skeleton variant="rectangular" width={200} height={40} />
              </Stack>
            </div>
          </div>
        )}
        <div className="divider"></div>
        <div className="other_prediction__container">
          <h2>Your Predictions in same pool</h2>
          {!loading ? (
            <div className="otherpredictions">
              {userPredictions.length > 0 ? (
                userPredictions.map((_pr, k) => {
                  return (
                    <div key={k}>
                      <div className="otherpredictions_box">
                        {questions?.questionaires?.questions.map(
                          (question, key) => {
                            return (
                              <div
                                className="question_answer"
                                key={key}
                                style={{ margin: "1.2em 0" }}
                              >
                                <h4>
                                  Q{key + 1}. {question}
                                </h4>
                                <p>Answer: {_pr.answers[key]}</p>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h3>Looks like you have only 1 or no entries in this pool</h3>
                  <a
                    href={`/predict/${predictionData.fixtureId}`}
                    className="pp_button"
                  >
                    Predic Now
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="otherpredictionskeleton__container">
              <div className="otherpredictions">
                {[0, 1, 2, 3].map((predictions, i) => {
                  return (
                    <div key={i}>
                      {[0, 1, 2].map((_, i) => {
                        return (
                          <Stack
                            spacing={1}
                            sx={{ marginBottom: "1em" }}
                            key={i}
                          >
                            <Skeleton
                              variant="rectangular"
                              width={550}
                              height={30}
                            />
                            <Skeleton
                              variant="rectangular"
                              width={100}
                              height={30}
                            />
                          </Stack>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {predictionData && predictionData.user && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          color="white"
          className="custom-paper"
        >
          <AppBar sx={{ position: "relative", backgroundColor: "black" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                X
              </IconButton>
              {mode == "challenge" && (
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {predictionData.user &&
                    "Challenge " +
                      predictionData?.user[0]?.username +
                      "-" +
                      currChallenege.type}
                </Typography>
              )}
              {mode == "watch-challenge" && (
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Your Challenge Pools
                </Typography>
              )}
            </Toolbar>
          </AppBar>

          {mode == "challenge" && (
            <div>
              <h2 className="dialog__title">
                Select your entry to challenge{" "}
                {predictionData?.user[0]?.username}
              </h2>
              <div className="predictions__container">
                <div
                  className="predictions"
                  onClick={() => ShowFloatingButton(true)}
                >
                  {userPredictions.map((_pr, k) => {
                    return (
                      <div
                        style={{
                          border: "0.2px solid white",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                        key={k}
                        onClick={() => setParticipant(_pr)}
                        className={activePredition == _pr._id ? "selected" : ""}
                      >
                        <div>
                          {questions?.questionaires?.questions.map(
                            (question, key) => {
                              return (
                                <div
                                  className="question_answer"
                                  key={key}
                                  style={{ margin: "1.2em 0" }}
                                >
                                  <h4>
                                    Q{key + 1}. {question}
                                  </h4>
                                  <p>Answer: {_pr.answers[key]}</p>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {floatingButton && (
                    <div className="floatingButton__container">
                      <Button variant="contained">Challange</Button>
                    </div>
                  )}
                </div>
                {activePredition && (
                  <div className="activePrediction__container">
                    <h4>Selected Entry</h4>
                    <hr />
                    <p>
                      Entry ID: <span>{activePredition}</span>{" "}
                    </p>
                    <p>
                      Challenge Entry Amount:{" "}
                      <span>{currChallenege.amount / 0.02}PPTT</span>
                    </p>
                    <p>
                      Available Assets:{" "}
                      <span>
                        {parseFloat(userETHBalance).toFixed(2)} ETH{" "}
                        {parseFloat(userPPTTBalance).toFixed(2)} PPTT
                      </span>
                    </p>
                    <Button variant="outlined" onClick={() => _joinChallenge()}>
                      Challenge
                    </Button>
                  </div>
                )}
              </div>

              {floatingButton && (
                <div className="floatingButton__container">
                  <Button variant="contained" onClick={() => _joinChallenge()}>
                    Challange
                  </Button>
                </div>
              )}
            </div>
          )}

          {mode == "watch-challenge" && challengeStat._id ? (
            <div className="challenege_status_container">
              <h3>
                Challenge ID: #
                {challengeStat._id.slice(-10, challengeStat._id.length)}
              </h3>
              <div className="csc__Header">
                <p>No of slots: {challengeStat.slot}</p>
                <p>Intra Pool: {challengeStat.type}</p>
                <p>Pool status: {challengeStat.status}</p>
                <p>Filled: {challengeStat.participants.length}</p>
              </div>
              <div className="csc__Content">
                {challengeStat.participants.map((_challenger, key) => {
                  <p>sdfdfsd</p>;
                })}
                <div className="card"></div>
              </div>
            </div>
          ) : (
            <h3>Looks like you have no entries in the pool of </h3>
          )}
        </Dialog>
      )}
    </>
  );
};

export default Prediction;
