import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const PredictionItems = ({ predictions, activeOS, fixture }) => {
  const navigate = useNavigate();
  // console.log(predictions)
  let volume = 0;
  return (
    <div className={`prediction__items ${activeOS}`}>
      {predictions.length >= 1 ? (
        predictions.map((data, index) => {
          volume += data?.amount / 0.02;
          return (
            <div
              className="predictedCard__container"
              key={index}
              onClick={() => navigate(`/prediction/${data._id}`)}
            >
              <div>
                {data.challenges && data.challenges.length > 0 && (
                  <div className="details">
                    {data.challenges.map((challenge, key) => {
                      return (
                        <Chip
                        key={key}
                          variant="outlined"
                          color="warning"
                          size="small"
                          className="custom-chip"
                          icon={<i className="ri-git-branch-line"></i>}
                          label={challenge.type.toUpperCase() + " | "+challenge.participants.length + " of " + challenge.slot}
                        />
                      );
                    })}
                  </div>
                )}
                <p>
                  {data?.user[0] ? (
                    <a
                      href={"/user-profile/" + data?.user[0].username}
                      className="details__username"
                    >
                      {data?.user[0].username}
                    </a>
                  ) : (
                    data?.predictedBy
                  )}{" "}
                  predicted on {fixture?.HomeTeam} vs {fixture?.AwayTeam}.
                </p>
                <div className="info">
                  <p>
                    ${data?.amount}~{(data?.amount / 0.02).toFixed(2)} PPTT
                  </p>
                  <p>{moment(data?.created_at).format("LT")}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="predictedCard__container">
          <p style={{ color: "#fff" }}>
            No Predictions available.Be the first one to predict.
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionItems;
