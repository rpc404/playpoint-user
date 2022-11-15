import { Button, Checkbox, Slider } from "@mui/material";
import React from "react";

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

const PoolType = ({ userPrediction, setUserPrediction }) => {
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
        <div className="questionItem">
          <div className="top">
            <p>
              1. Which of the two teams leads in the first half of the match?
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
        <div className="questionItem">
          <div className="top">
            <p>
              2. Which of the two teams leads in the first half of the match?
            </p>
            <p>30 Points</p>
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
        <div className="questionItem">
          <div className="top">
            <p>
              3. Which of the two teams leads in the first half of the match?
            </p>
            <p>50 Points</p>
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
        {userPrediction.activeQuestionaire === 4 && (
          <div className="questionItem">
            <div className="top">
              <p>
                4. Which of the two teams leads in the first half of the match?
              </p>
              <p>70 Points</p>
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
          />
        </div>

        <div>
          <div className="top">
            <h4>Total Amount: $5</h4>
            <h4>Available: $10</h4>
          </div>
          <Button>Predict</Button>
        </div>
      </div>
    </>
  );
};

export default PoolType;
