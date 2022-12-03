import { Button, Slider } from "@mui/material";
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

/**
 * @dev utils for slider
 */
function valuetext(value) {
  return `${value}°C`;
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
    (async () => {
      const allQuestionairesByFixtureId = await getQuestionaireByFixtureId(
        fixtureId
      );
      let tempQ = allQuestionairesByFixtureId.data.questionaire.filter((q) => {
        return (
          q.questionaireType === userPrediction.activeQuestionaire &&
          q.poolType === poolSize &&
          q.questionairePrice === userPrediction.activeAmount
        );
      });

      setQuestionaire({
        questionaires: allQuestionairesByFixtureId.data.questionaire,
        tempQuestionaire: tempQ,
        loading: false,
      });
    })();
  }, [userPrediction]);

  const _predictionData = {
    answers: {},
    predictedBy: "",
    amount: 0,
    questionaireId: "",
    fixtureId: "",
    marketplaceSlug: "",
  };

  const handleRadioChange = (question, answer) => {
    _predictionData.answers[question] = answer;
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
        (_predictionData.amount * 1e18).toString()
      );
      const PredictionContract = new ethers.Contract(
        "0x30D2B1b7fF7b9aDEdD44B15f575D54ACB09b58a1",
        BetaFactoryAPI,
        provider
      ).connect(provider.getSigner());

      // console.log(ethers.utils.parseEther(_predictionData.amount.toString()), _predictionData.amount)

      const PPTTBalance = await PPTTContract.balanceOf(_predictionData.predictedBy);
      if(PPTTBalance < _predictionData.amount){
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
        .then(() => {
          toast("Predicted Successfully!");
          setTimeout(()=>window.location.reload(),2000)
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
                    {questionaire.tempQuestionaire[0]?.questionaires.answers[
                      index
                    ]
                      .split(",")
                      .map((q, i) =>
                        q !== "input" ? (
                          <FormControl key={i} className="row-radio">
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                            >
                              <div className="label" key={i}>
                                <input
                                  type="radio"
                                  name="answer-options"
                                  value={q}
                                  onChange={(e) =>
                                    handleRadioChange(index, e.target.value)
                                  }
                                  className="custom-radio"
                                />
                                <label className="custom-label">{q}</label>
                                {/* <FormControlLabel
                                value={i}
                                control={<Radio />}
                                label={q}
                                // onChange={() => handleRadioChange(index, 1)}
                                onChange={(e) =>
                                  handleRadioChange(index, e.target.value)
                                }
                              /> */}
                              </div>
                            </RadioGroup>
                          </FormControl>
                        ) : q === "input" ? (
                          <div key={i}>
                            <input
                              style={{ padding: "5px 10px" }}
                              type="text"
                              value={_predictionData.answers[index]}
                              placeholder={"Your Answer..."}
                              onChange={(e) =>
                                handleRadioChange(index, e.target.value)
                              }
                            />
                          </div>
                        ) : null
                      )}
                  </div>
                </div>
              )
            )}
        </div>
      )}

      <div className="predictionAmount">
        {/* <div>
          <h4>Prediction Count:</h4>
          <Slider
            aria-label="Custom marks"
            defaultValue={1}
            getAriaValueText={valuetext}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            max={5}
            min={1}
            onChange={(e, value) => {
              setPredictionCount(value);
            }}
          />
        </div> */}

        <div>
          <div className="top">
            <h4>Total Amount: ${totalPredictionPrice}</h4>
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

export default PoolType;
