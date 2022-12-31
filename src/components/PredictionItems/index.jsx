import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import image from "../../images/oops1.png";

import "./styles/style.css";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";

const PredictionItems = ({ predictions, activeOS, open, setVolume }) => {
  const [{ username }] = useRPCContext();
  const navigate = useNavigate();

  return (
    <div className={`prediction__items__dialog ${open}  ${activeOS}`}>
      {predictions.length >= 1 ? (
        predictions.map((data, index) => {
         
          return (
            <div
              className="predictedCard__container"
              key={index}
              onClick={() => navigate(`/prediction/${data._id}`)}
            >
              <div className="predictionCard">
                <div className="details">
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
                          {data.challenges &&
                            data.challenges.length > 0 &&
                            data.challenges.map((challenge, key) => {
                              return (
                                <Chip
                                  key={key}
                                  variant="outlined"
                                  size="small"
                                  className="custom-chip"
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
                </div>
                <div className="info">
                  <p>
                    {(data?.amount / 0.02).toFixed(2)} <span>PPTT</span>
                  </p>
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
              <div className="time">
                <p>{moment(data?.created_at).format("LT")}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="noPrediction__container">
          <img src={image} alt="oops_image" />
          <p>No Predictions available.Be the first one to predict.</p>
        </div>
      )}
    </div>
  );
};

{
  /* <p>{moment(data?.created_at).format("LT")}</p> */
}

export default PredictionItems;
