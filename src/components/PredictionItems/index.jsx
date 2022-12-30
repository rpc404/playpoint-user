import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";

import "./styles/style.css";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";

const PredictionItems = ({ predictions, activeOS, open }) => {
  const [{ username }] = useRPCContext();
  const navigate = useNavigate();

  let volume = 0;
  return (
    <div className={`prediction__items__dialog ${open}  ${activeOS}`}>
      {predictions.length >= 1 ? (
        predictions.map((data, index) => {
          volume += data?.amount / 0.02;
          return (
            <div
              className="predictedCard__container"
              key={index}
              onClick={() => navigate(`/prediction/${data._id}`)}
            >
              <div className="predictionCard">
                <div className="imageDiv">
                  <img
                    src={`https://robohash.org/${data?.user[0].username}}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="user__details">
                  {data?.user[0] && (
                    <div className="user">
                      <p>{data?.user[0].username}</p>
                      <div className="details">
                        {data.challenges.length > 0 &&
                          data.challenges.map((challenge, key) => {
                            return (
                              <Chip
                                key={key}
                                variant="outlined"
                                // color="primary"
                                size="small"
                                className="custom-chip"
                                // icon={<i className="ri-git-branch-line"></i>}
                                label={
                                  challenge.type +
                                  " | " +
                                  challenge.participants.length +
                                  " of " +
                                  challenge.slot
                                }
                              />
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="info">
                  <p>
                    {(data?.amount / 0.02).toFixed(2)} <span>PPTT</span>
                  </p>
                </div>
                <i className="ri-arrow-right-line"></i>
              </div>
              <div className="time">
                <p>{moment(data?.created_at).format("LT")}</p>
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

{
  /* <p>{moment(data?.created_at).format("LT")}</p> */
}

export default PredictionItems;
