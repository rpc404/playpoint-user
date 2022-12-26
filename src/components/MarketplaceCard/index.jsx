import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getMarketplaceStat } from "../../api/Marketplace";
import Pusher from "pusher-js";
import { toast } from "react-toastify";

export default function MarketplaceCard({ marketplace, totalFixtures, totalPredictions }) {
  // console.log(marketplace.marketplaceSlug,stat);
  const navigate = useNavigate();

  const navHandler = (marketplaceSlug) => {
    sessionStorage.setItem("marketplaceSlug", marketplaceSlug);
    navigate(`/fixture/${marketplaceSlug}`, {
      state: {
        marketplaceSlug,
      },
    });
  };
  const { marketplaceCoverImage, marketplaceName, marketplaceSlug, closed } =
    marketplace;

  const styles = {
    background: `url(${marketplaceCoverImage?.url}) center /cover no-repeat`,
  };

  return (
    <div
      className="marketplaceCard__container"
      onClick={() => {
        closed ? toast("Marketplace Closed")  : navHandler(marketplaceSlug);
        // closed ? alert("markeplace closed") :
          // navHandler(marketplaceSlug);
      }}
    >
      <div className="coverImage" style={styles}></div>
      <span className="marketplaceDetails">
        <span className="marketplaceName">
          <h4>
            <i className="ri-football-line"></i> {marketplaceName}
          </h4>
        </span>
          <div className="info">
            {/* <p>
              {stat.totalQuestionaires} <br />
              <span className="flex">
                <i className="ri-chat-poll-line"></i> Questions
              </span>
            </p> */}
            <p>
              {totalFixtures} <br />
              <span className="flex">
                <i className="ri-bubble-chart-line"></i> Fixtures
              </span>
            </p>
            <p>
              {totalPredictions} <br />
              <span className="flex">
                <i className="ri-bar-chart-grouped-line"></i> Total entries
              </span>
            </p>
          </div>
      </span>
    </div>
  );
}
