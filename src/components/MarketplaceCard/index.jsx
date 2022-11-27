import React from "react";
import { useNavigate } from "react-router-dom";
import { getMarketplaceStat } from "../../api/Marketplace";
import Pusher from "pusher-js";

export default function MarketplaceCard({ marketplace }) {
  const [stat, setStat] = React.useState({});
  React.useEffect(() => {
    getMarketplaceStat(marketplace.marketplaceSlug).then((res) =>
      setStat(res.data.response)
    );
  }, []);

  React.useEffect(() => {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;
    const pusher = new Pusher("2142cda6d39765cba2a9", {
      cluster: "ap2",
    });

    const predictionChannel = pusher.subscribe("prediction-channel");
    predictionChannel.bind("new-prediction", (data) => {
      if (data.data[0].marketplaceSlug == marketplaceSlug) {
        getMarketplaceStat(marketplace.marketplaceSlug).then((res) =>
          setStat(res.data.response)
        );
      }
    });
  }, []);
  const navigate = useNavigate();
  const { marketplaceCoverImage, marketplaceName, marketplaceSlug } =
    marketplace;

  const styles = {
    background: `url(${marketplaceCoverImage?.url}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="marketplaceCard__container"
      onClick={() => {
        navigate(`/fixture`, {
          state: {
            marketplaceSlug,
          },
        });
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
          <p>
            {stat.totalQuestionaires} <br />
            <span className="flex">
              <i className="ri-chat-poll-line"></i> Questions
            </span>
          </p>
          <p>
            {stat.totalFixtures} <br />
            <span className="flex">
              <i className="ri-bubble-chart-line"></i> Fixtures
            </span>
          </p>
          <p>
            {stat.totalPredictions} <br />
            <span className="flex">
              <i className="ri-bar-chart-grouped-line"></i> Predictions
            </span>
          </p>
        </div>
      </span>
    </div>
  );
}
