import { Button, Slider } from "@mui/material";
import React from "react";
import { getQuestionaireByFixtureId } from "../../../api/Prediction";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./styles/style.css"

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

  // const [userAnswer, setUserAnswer] = React.useState(
  //   userPrediction.questionaireType === 3
  //     ? [{ 0: 0 }, { 1: 0 }, { 2: 0 }]
  //     : [{ 0: 0 }, { 1: 0 }, { 2: 0 }, { 3: 0 }]
  // );
  const _predictionData = {
    _userAnswer: {},
    _userId: "",
    _totalAmount: 0,
  };
  const handleRadioChange = (question, answer) => {
    _predictionData._userAnswer[question] = answer;
  };

  const handlePredction = () => {
    const userData = JSON.parse(localStorage.getItem("rpcUserData"));
    _predictionData._userId = userData.rpcAccountAddress || "";
    _predictionData._totalAmount = totalPredictionPrice;
    console.log(_predictionData);
    // reset
    // _predictionData._userAnswer ={},
    // _predictionData._totalAmount = 0;
    Promise.resolve(()=>{
      _predictionData._userAnswer ={}
    }).then(()=>console.log("e"))
  };
  return (
    <>
      <div className="topBar">
        <div>
          <div>Price:</div>
          {[5, 20, 50].map((amount) => (
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
          {[3, 4].map((questionaire) => (
            <Button
              key={questionaire}
              onClick={() => handleActiveQuestionaire(questionaire)}
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

      <div className="questionaires">
        {!questionaire.loading &&
          questionaire.tempQuestionaire[0]?.questionaires.questions.map(
            (q, index) => (
              <div className="questionItem" key={index}>
                <div className="top">
                  <p>
                    {index + 1}. {q}
                  </p>
                  <p>{(index + 1) * 20} Points</p>
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
                              <input type="radio" name="answer-options" value={i} onChange={(e)=>handleRadioChange(index, e.target.value)} className="custom-radio" />
                              <label className="custom-label">{1}</label>
                              {/* <FormControlLabel
                                value={i}
                                control={<Radio />}
                                label={1}
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
                            value={_predictionData._userAnswer[index]}
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

      <div className="predictionAmount">
        <div>
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
        </div>

        <div>
          <div className="top">
            <h4>Total Amount: ${totalPredictionPrice}</h4>
            {/* @note must get balance from user wallet balance */}
            <h4>Available: $10</h4>
          </div>
          <Button onClick={() => handlePredction()}>Predict</Button>
        </div>
      </div>
    </>
  );
};

export default PoolType;
