import { Button, Checkbox, Slider } from "@mui/material";
import React from "react";
import { getQuestionaireByFixtureId } from "../../../api/Prediction";

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
          questionaire.tempQuestionaire[0]?.questionaires.map((q, index) => (
            <div className="questionItem" key={index}>
              <div className="top">
                <p>
                  {++index}. {q}
                </p>
                <p>20 Points</p>
              </div>
              <div className="answers">
                <div className="label">
                  <Checkbox />
                  Sweden
                </div>
                <div className="label">
                  <Checkbox />
                  Draw
                </div>
                <div className="label">
                  <Checkbox />
                  Brazil
                </div>
              </div>
            </div>
          ))}
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
          <Button>Predict</Button>
        </div>
      </div>
    </>
  );
};

export default PoolType;
