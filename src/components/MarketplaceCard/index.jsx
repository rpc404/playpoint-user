import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MarketplaceCard({
  marketplace,
  totalFixtures,
  totalPredictions,
}) {
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
        closed ? toast("Marketplace Closed") : navHandler(marketplaceSlug);
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
