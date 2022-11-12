import React from "react";
import { useNavigate } from "react-router-dom";

export default function MarketplaceCard({
  marketplace,
  setActiveFixtureBackground,
}) {
  const navigate = useNavigate();
  const { marketplaceCoverImage, marketplaceName, marketplaceSlug } =
    marketplace;

  const styles = {
    background: `url(${marketplaceCoverImage}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="marketplaceCard__container"
      onClick={() => {
        navigate(`/fixture/${marketplaceSlug}`);
        setActiveFixtureBackground(marketplaceCoverImage);
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
            0 <br />
            <span className="flex">
              <i className="ri-chat-poll-line"></i> Questions
            </span>
          </p>
          <p>
            0 <br />
            <span className="flex">
              <i className="ri-bubble-chart-line"></i> Fixtures
            </span>
          </p>
          <p>
            0 <br />
            <span className="flex">
              <i className="ri-bar-chart-grouped-line"></i> Predictions
            </span>
          </p>
        </div>
      </span>
    </div>
  );
}
