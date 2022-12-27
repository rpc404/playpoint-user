import { Button, FormControlLabel, Slider } from "@mui/material";
import React from "react";
import {
  getQuestionaireByFixtureId,
  setPrediction,
} from "../../../api/Prediction";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import "./styles/style.css";
import { toast } from "react-toastify";
import loader from "../../../helpers/loading.gif";
import { handleRPCWalletLogin } from "../../../utils/RPC";
import { useRPCContext } from "../../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../../contexts/WalletRPC/RPCReducer";
import { ethers } from "ethers";
import ERC20BasicAPI from "../../../utils/ERC20BasicABI.json";
import BetaFactoryAPI from "../../../utils/BetaFactoryABI.json";
import TextField from "@mui/material/TextField";
// import index from "../../Footer";
import Checkbox from "@mui/material/Checkbox";

/**
 * @dev utils for slider
 */
function valuetext(value) {
  return `${value} Slots open`;
}

const marks = [
  {
    value: 1,
    label: "x1",
  },
  {
    value: 2,
    label: "x2",
  },
  {
    value: 3,
    label: "x3",
  },
  {
    value: 4,
    label: "x4",
  },
  {
    value: 5,
    label: "x5",
  },
];

const PoolType = ({
  userPrediction,
  setUserPrediction,
  poolSize,
  fixtureId,
  status,
}) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const _predictionData = {
    answers: {},
    predictedBy: "",
    amount: 0,
    questionaireId: "",
    fixtureId: "",
    marketplaceSlug: "",
  };
  const handleActiveAmount = (amount) => {
    setUserPrediction({
      ...userPrediction,
      activeAmount: amount,
    });
  };
  const handleActiveQuestionaire = (questionaire) => {
    setUserPrediction({
      ...userPrediction,
      activeQuestionaire: questionaire,
    });
  };

  const [questionaire, setQuestionaire] = React.useState({
    questionaires: [],
    tempQuestionaire: [],
    loading: true,
  });

  const [predictionCount, setPredictionCount] = React.useState(1);
  const [totalPredictionPrice, setTotalPredictionPrice] = React.useState(0);
  const [predicting, setPredicting] = React.useState(false);
  const [, setClicked] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [duoMode, setDuoMode] = React.useState(false);
  const [trioMode, setTrioMode] = React.useState(false);
  const [duoSlots, setduoSlots] = React.useState(0);
  const [trioSlots, settrioSlots] = React.useState(0);
  const [duoAmount, setDuoAmount] = React.useState(0);
  const [trioAmount, settrioAmount] = React.useState(0);

  const [{ userPublicAddress, isWalletConnected }, dispatchRPCData] =
    useRPCContext();

  React.useEffect(() => {
    if (isWalletConnected) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const contract = new ethers.Contract(
        "0x53d168578974822bCAa95106C7d5a906BF100948",
        ERC20BasicAPI,
        provider
      );

      (async () => {
        const PPTTBalance = await contract.balanceOf(userPublicAddress);

        setBalance(ethers.utils.formatEther(PPTTBalance));
      })();
    }
  }, [isWalletConnected]);

  React.useEffect(() => {
    setTotalPredictionPrice(userPrediction.activeAmount * predictionCount);
  }, [userPrediction.activeAmount, predictionCount]);

  React.useEffect(() => {
    duoSlots > 0 && setDuoAmount(userPrediction.activeAmount * duoSlots);
  }, [duoSlots]);

  React.useEffect(() => {
    trioSlots > 0 && settrioAmount(userPrediction.activeAmount * trioSlots);
  }, [trioSlots]);

  React.useEffect(() => {
    (async () => {
      const allQuestionairesByFixtureId = await getQuestionaireByFixtureId(
        fixtureId
      );
      let tempQ = allQuestionairesByFixtureId.data.questionaire;
      // let tempQ = allQuestionairesByFixtureId.data.questionaire.filter((q) => {
      //   return (
      //     q.questionaireType === userPrediction.activeQuestionaire &&
      //     q.poolType === poolSize &&
      //     q.questionairePrice === userPrediction.activeAmount
      //   );
      // });

      setQuestionaire({
        questionaires: allQuestionairesByFixtureId.data.questionaire,
        tempQuestionaire: tempQ,
        loading: false,
      });
    })();
  }, [userPrediction]);

  React.useEffect(() => {
    !duoMode && setDuoAmount(0);
    !trioMode && settrioAmount(0);
  }, [duoMode, trioMode]);

  const handleRadioChange = (question, answer) => {
    sessionStorage.setItem("answer" + question, String(answer));
  };

  const validation = (answers) => {
    let _ = false;
    for (
      let index = 0;
      index < questionaire.tempQuestionaire[0]?.questionaires.questions.length;
      index++
    ) {
      if (answers.hasOwnProperty(index)) {
        _ = true;
      } else {
        _ = false;
      }
    }
    return _;
  };

  const handlePrediction = async () => {
    const answer0 = String(sessionStorage.getItem("answer0"));
    const answer1 = String(sessionStorage.getItem("answer1"));
    const answer2 = String(sessionStorage.getItem("answer2"));
    const answer3 = String(sessionStorage.getItem("answer3"));
    _predictionData.answers = {
      0: answer0,
      1: answer1,
      2: answer2,
      3: answer3,
    };
    _predictionData.predictedBy = userPublicAddress;
    _predictionData.amount = userPrediction?.activeAmount;
    _predictionData.questionaireId = questionaire.questionaires[0]._id;
    _predictionData.fixtureId = questionaire.questionaires[0].fixtureId;
    _predictionData.marketplaceSlug =
      questionaire.tempQuestionaire[0].marketplaceSlug;

    if (validation(_predictionData.answers)) {
      setPredicting(true);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const PPTTContract = new ethers.Contract(
        "0x53d168578974822bCAa95106C7d5a906BF100948", // Sepolia PPTT Token Address
        ERC20BasicAPI,
        provider
      ).connect(provider.getSigner());

      // transfer prediction pool
      await PPTTContract.transfer(
        "0x30D2B1b7fF7b9aDEdD44B15f575D54ACB09b58a1", // wallet address
        ((_predictionData.amount / 0.02) * 1e18).toString()
      );

      const PredictionContract = new ethers.Contract(
        "0x30D2B1b7fF7b9aDEdD44B15f575D54ACB09b58a1",
        BetaFactoryAPI,
        provider
      ).connect(provider.getSigner());

      // console.log(ethers.utils.parseEther(_predictionData.amount.toString()), _predictionData.amount)

      const PPTTBalance = await PPTTContract.balanceOf(
        _predictionData.predictedBy
      );
      if (PPTTBalance < _predictionData.amount) {
        return toast("Insufficient PPTT");
      }
      // console.log(contract)
      await PredictionContract.setPrediction(
        JSON.stringify(_predictionData.answers),
        _predictionData.questionaireId,
        _predictionData.predictedBy,
        (_predictionData.amount * 1e18).toString()
      );

      return await setPrediction(_predictionData)
        .then((res) => {
          console.log(res.data);
          toast("Predicted Successfully!");
          toast("Creating Chalenges",{
            theme:"dark",
            type:"info"
          });
          const duochallenegedata = {
            fixtureId:data.fixtureId,
            predictionId:data.id,
            type: "duo",
            amount:duoAmount,
            slot:duoSlots,
            txnhash:"sfdfsd",
            status:"active",
          };
          console.log(duochallenegedata)
          // setTimeout(() => window.location.reload(), 2000);
        })
        .catch((err) => console.log(err))
        .finally(() => setPredicting(false));
    } else return toast.error("Enter All Answers!");
  };

  const handleLogin = async () => {
    const data = await handleRPCWalletLogin();
    await dispatchRPCData({ type: ACTIONS.WALLET_CONNECT, payload: data });
    toast("Wallet Connected!");
  };

  return (
    <>
      <div className="topBar">
        <div>
          <div>Price:</div>
          {[10].map((amount) => (
            <Button
              key={amount}
              className={userPrediction.activeAmount === amount ? "active" : ""}
              onClick={() => handleActiveAmount(amount)}
            >
              ${amount}
            </Button>
          ))}
        </div>
        <div>
          <div>Questionaires:</div>
          {[4].map((questionaire) => (
            <Button
              key={questionaire}
              // onClick={() => handleActiveQuestionaire(questionaire)}
              className={
                userPrediction.activeQuestionaire === questionaire
                  ? "active"
                  : ""
              }
            >
              {questionaire}
            </Button>
          ))}
        </div>
      </div>
      {isWalletConnected && (
        <div className="questionaires">
          <p className="prediction_rule">
            Prediction questions are applicable for first 90 minutes of match
            time only
          </p>
          {!questionaire.loading &&
            questionaire.tempQuestionaire[0]?.questionaires.questions.map(
              (q, index) => (
                <div className="questionItem" key={index}>
                  <div className="top">
                    <p>
                      {index + 1}. {q}
                    </p>
                    <p>
                      {
                        questionaire.tempQuestionaire[0]?.questionaires.points[
                          index
                        ]
                      }{" "}
                      Points
                    </p>
                  </div>
                  <div className="answers">
                    {getAnswer(
                      questionaire.tempQuestionaire[0]?.questionaires.answers[
                        index
                      ],
                      handleRadioChange,
                      index
                    )}
                  </div>
                </div>
              )
            )}
        </div>
      )}
      <div className="challenges">
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => setDuoMode(!duoMode)}
            />
          }
          label="Open for Duo"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => setTrioMode(!trioMode)}
            />
          }
          label="Open for Trio"
        />
        {duoMode && (
          <div className="slots">
            <h4>Drag to make your duo slots open</h4>
            <Slider
              aria-label="Custom marks"
              defaultValue={1}
              getAriaValueText={(value) => valuetext(value)}
              step={1}
              valueLabelDisplay="on"
              marks={marks}
              max={10}
              min={1}
              onChange={(e, value) => {
                setduoSlots(value);
              }}
            />
          </div>
        )}
        {trioMode && (
          <div className="slots">
            <h4>Make your Trio Slots Open</h4>
            <Slider
              aria-label="Custom marks"
              defaultValue={1}
              getAriaValueText={valuetext}
              step={1}
              valueLabelDisplay="on"
              marks={marks}
              max={10}
              min={1}
              onChange={(e, value) => {
                settrioSlots(value);
              }}
            />
          </div>
        )}
      </div>
      <div className="predictionAmount">
        <div>
          <div className="top">
            <div>
              <h4>Pool Entry: {totalPredictionPrice / 0.02}PPTT</h4>
              {duoAmount > 0 && (
                <h4>
                  Duo Entry: {duoSlots} slots x{" "}
                  {userPrediction.activeAmount / 0.02} = {duoAmount / 0.02}PPTT
                </h4>
              )}
              {trioAmount > 0 && (
                <h4>
                  Trio Entry: {trioSlots} slots x{" "}
                  {userPrediction.activeAmount / 0.02} = {trioAmount / 0.02}PPTT
                </h4>
              )}
              {
                <h4>
                  PPTT to pay:{" "}
                  {(trioAmount + duoAmount + userPrediction.activeAmount) /
                    0.02}
                  PPTT
                </h4>
              }
            </div>
            {/* @note must get balance from user wallet balance */}
            <h4>Available: {parseFloat(balance).toFixed(2)} PPTT</h4>
          </div>
          {/* 
          @note button needs to be disabled after */}
          {status && status === "closed" ? (
            <Button disabled={true} className="closed-btn">
              Prediction Closed{" "}
            </Button>
          ) : isWalletConnected ? (
            <Button
              onClick={() => {
                handlePrediction(), setClicked(true);
              }}
              disabled={predicting}
            >
              {predicting ? <img src={loader} alt="loading" /> : "Predict"}
            </Button>
          ) : (
            <Button className="login-btn" onClick={() => handleLogin()}>
              Login to Predict!{" "}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

const getAnswer = (prop, handleRadioChange, index) => {
  if (prop.startsWith("radio")) {
    const tags = String(prop.split("@")[1]).split(",");
    return (
      <div>
        <p>
          <em>*choose one</em>
        </p>
        <div className="row-radio">
          {tags.map((tag, _index) => (
            <div className="wrapper" key={_index}>
              <label className="custom-label">{tag}</label>
              <input
                type="radio"
                name={"q_" + index}
                className="custom-radio"
                value={tag.trim()}
                onChange={(e) => handleRadioChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (prop.startsWith("scoreof2")) {
    const teams = String(prop.split("@")[1]).split(",");
    return (
      <div>
        <p>
          <em>*Enter Scores of both team</em>
        </p>
        <div className="row-input">
          {teams.map((tag, _index) => (
            <div className="wrapper" key={_index}>
              <label className="custom-label">{tag}</label>
              <input
                type="number"
                className="custom-input"
                required
                name={"q_" + index}
                onChange={(e) =>
                  handleScoreChange(_index, tag, index, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (prop.startsWith("number")) {
    return (
      <div>
        <p>
          <em>*Enter any number</em>
        </p>
        <div className="row-input">
          <div className="wrapper">
            <input
              type="number"
              className="custom-input"
              required
              name={"q_" + index}
              onChange={(e) => handleRadioChange(index, e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }
};

const handleScoreChange = (sample, tag, answerNo, value) => {
  value
    ? sessionStorage.setItem(answerNo + "answer" + sample, tag + value)
    : sessionStorage.removeItem(answerNo + "answer" + sample);
  if (sample == 1) {
    let _prev = sessionStorage.getItem(answerNo + "answer" + (sample - 1));
    if (_prev) {
      _prev += "-" + (tag + value);
      sessionStorage.setItem("answer" + answerNo, _prev);
    }
  }
  if (sample == 0) {
    let _prev = sessionStorage.getItem(answerNo + "answer" + (sample + 1));
    if (_prev) {
      _prev = tag + value + "-" + _prev;
      sessionStorage.setItem("answer" + answerNo, _prev);
    } else {
      sessionStorage.setItem("answer" + answerNo, tag + value);
    }
  }
};

export default PoolType;
